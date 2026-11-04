(function () {
  var c = window.SITE_CONFIG || {};
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }
  function link(text, url, cls) {
    var a = el("a", cls, text);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  document.querySelectorAll("[data-cfg]").forEach(function (n) {
    var v = c[n.getAttribute("data-cfg")];
    if (v) n.textContent = v;
  });
  document.querySelectorAll("[data-logo]").forEach(function (n) {
    if (c.assets && c.assets.logo) n.src = c.assets.logo;
  });
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  var grid = document.getElementById("apps-grid");
  if (grid) {
    (c.apps || []).forEach(function (app) {
      var card = el("article", "card app-card reveal");
      var head = el("div", "app-head");
      var icon = el("img", "app-icon");
      icon.src = app.icon; icon.alt = ""; icon.width = 64; icon.height = 64;
      var t = el("div");
      t.appendChild(el("h3", "", app.name));
      t.appendChild(el("p", "muted", "Developer: " + app.developer));
      head.appendChild(icon); head.appendChild(t);
      card.appendChild(head);
      card.appendChild(el("p", "", app.description));
      var ul = el("ul", "chips");
      (app.features || []).forEach(function (f) { ul.appendChild(el("li", "", f)); });
      card.appendChild(ul);
      var actions = el("div", "actions");
      var gp = safeUrl(app.googlePlayUrl);
      if (gp) actions.appendChild(link("Get it on Google Play", gp, "btn btn-primary"));
      else {
        var b = el("span", "btn btn-disabled", "Google Play link coming soon");
        b.setAttribute("aria-disabled", "true");
        actions.appendChild(b);
      }
      var pp = safeUrl(app.privacyUrl);
      if (pp) actions.appendChild(link("Privacy policy", pp, "btn btn-ghost"));
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  var list = document.getElementById("app-privacy-list");
  if (list) {
    var any = false;
    (c.apps || []).forEach(function (app) {
      var pp = safeUrl(app.privacyUrl);
      if (pp) { any = true; var li = el("li"); li.appendChild(link(app.name + " privacy policy", pp)); list.appendChild(li); }
    });
    if (!any) list.appendChild(el("li", "muted", "App privacy policy links will appear here once provided."));
  }

  var contact = document.getElementById("contact-list");
  if (contact) {
    function row(label, node) {
      var li = el("li"); li.appendChild(el("strong", "", label + ": ")); li.appendChild(node); contact.appendChild(li);
    }
    var pending = function () { return el("span", "muted", "Coming soon"); };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.supportEmail || "")) {
      var m = el("a", "", c.supportEmail); m.href = "mailto:" + c.supportEmail; row("Support email", m);
    } else row("Support email", pending());
    var yt = safeUrl(c.youtubeUrl);
    row("YouTube", yt ? link(yt, yt) : pending());
    (c.socialLinks || []).forEach(function (s) {
      var u = safeUrl(s.url);
      if (u) row(s.label, link(u, u));
    });
  }

  var toggle = document.getElementById("nav-toggle"), nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    items.forEach(function (i) { io.observe(i); });
  } else items.forEach(function (i) { i.classList.add("in"); });
})();
