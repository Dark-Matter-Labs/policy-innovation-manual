/* =====================================================================
   Navigation Kit — site behaviour
   Progressive enhancement: content works without JS; this adds the
   shared nav, the two-axis Navigator toggle, case filters, and menu.
   All DOM is built with safe methods (no innerHTML).
   ===================================================================== */
(function () {
  "use strict";

  /* small DOM helper — text only, never parses HTML */
  function el(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  /* ---- Shared navigation model (single source of truth) ---- */
  var NAV = [
    { group: "Overview", items: [
      { href: "index.html",         idx: "00", label: "Introduction" },
      { href: "support-model.html", idx: "01", label: "Support Model" },
      { href: "methods.html",       idx: "02", label: "Methods" }
    ]},
    { group: "Evidence", items: [
      { href: "cases.html",   idx: "03", label: "Practice Cases" },
      { href: "lessons.html", idx: "04", label: "Lessons & Direction" }
    ]},
    { group: "For practitioners", items: [
      { href: "playbook.html",  idx: "05", label: "EU Policy Labs Playbook" },
      { href: "resources.html", idx: "06", label: "Tools & Navigation Kit" }
    ]}
  ];

  var here = (location.pathname.split("/").pop() || "index.html");
  if (here === "") here = "index.html";

  function buildRail() {
    var rail = document.querySelector("[data-rail]");
    if (!rail) return;

    var logo = el("a", { class: "rail__logo", href: "https://netzerocities.eu/", target: "_blank", rel: "noopener", "aria-label": "NetZeroCities" }, [
      el("img", { src: "assets/img/nzc-logo-stacked.png", alt: "NetZeroCities", width: "70", height: "70" })
    ]);

    var brand = el("a", { class: "brand", href: "index.html" }, [
      el("span", { class: "brand__kicker", text: "Task 6.5" }),
      el("span", { class: "brand__title", text: "Mission Policy Innovation Navigation Kit" }),
      el("span", { class: "brand__sub", text: "Policy & Regulatory Innovation" })
    ]);

    var nav = el("nav", { class: "nav", "aria-label": "Sections" });
    NAV.forEach(function (g) {
      nav.appendChild(el("span", { class: "nav__label", text: g.group }));
      g.items.forEach(function (it) {
        var attrs = { href: it.href };
        if (it.href === here) attrs["aria-current"] = "page";
        nav.appendChild(el("a", attrs, [
          el("span", { class: "idx", text: it.idx }),
          document.createTextNode(it.label)
        ]));
      });
    });

    var foot = el("div", { class: "rail__foot" });
    [
      "A working knowledge base.",
      "Dark Matter Labs · Demos Helsinki",
      "for the NetZeroCities consortium.",
      "",
      "Grant Agreement 101121530",
      "Dissemination: Public"
    ].forEach(function (line, i, arr) {
      foot.appendChild(document.createTextNode(line));
      if (i < arr.length - 1) foot.appendChild(el("br"));
    });

    rail.appendChild(logo);
    rail.appendChild(brand);
    rail.appendChild(nav);
    rail.appendChild(foot);
  }

  function buildTopbar() {
    var tb = document.querySelector("[data-topbar]");
    if (!tb) return;

    var brand = el("a", { class: "topbar__brand", href: "index.html" }, [
      el("img", { class: "topbar__logo", src: "assets/img/nzc-logo-stacked.png", alt: "NetZeroCities", width: "34", height: "34" }),
      el("span", {}, [
        document.createTextNode("Navigation Kit"),
        el("small", { text: "NetZeroCities · Task 6.5" })
      ])
    ]);
    var btn = el("button", { class: "menu-btn", "aria-expanded": "false", "aria-controls": "rail", text: "Menu" });
    tb.appendChild(brand);
    tb.appendChild(btn);

    var scrim = document.querySelector(".scrim");
    function close() { document.body.classList.remove("nav-open"); btn.setAttribute("aria-expanded", "false"); }
    function open() { document.body.classList.add("nav-open"); btn.setAttribute("aria-expanded", "true"); }
    btn.addEventListener("click", function () {
      document.body.classList.contains("nav-open") ? close() : open();
    });
    if (scrim) scrim.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---- Navigator: toggle between "by support level" and "by method" ---- */
  function initNavigator() {
    document.querySelectorAll("[data-navigator]").forEach(function (nav) {
      var buttons = nav.querySelectorAll(".toggle button");
      var views = nav.querySelectorAll("[data-view]");
      function show(mode) {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.mode === mode)); });
        views.forEach(function (v) { v.hidden = v.dataset.view !== mode; });
      }
      buttons.forEach(function (b) {
        b.addEventListener("click", function () { show(b.dataset.mode); });
      });
      show(nav.dataset.navigator || "level");
    });
  }

  /* ---- Case filters (tier + method), combinable ---- */
  function initFilters() {
    var bar = document.querySelector("[data-filterbar]");
    var cases = Array.prototype.slice.call(document.querySelectorAll("[data-case]"));
    if (!bar || !cases.length) return;
    var state = { tier: "all", method: "all" };
    var count = document.querySelector("[data-count]");

    function apply() {
      var shown = 0;
      cases.forEach(function (c) {
        var tiers = (c.dataset.tier || "").split(" ");
        var methods = (c.dataset.method || "").split(" ");
        var okT = state.tier === "all" || tiers.indexOf(state.tier) > -1;
        var okM = state.method === "all" || methods.indexOf(state.method) > -1;
        var ok = okT && okM;
        c.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      if (count) count.textContent = shown + (shown === 1 ? " engagement" : " engagements");
    }

    bar.querySelectorAll(".filter").forEach(function (f) {
      f.addEventListener("click", function () {
        var dim = f.dataset.dim, val = f.dataset.val;
        state[dim] = val;
        bar.querySelectorAll('.filter[data-dim="' + dim + '"]').forEach(function (o) {
          o.setAttribute("aria-pressed", String(o === f));
        });
        apply();
      });
    });
    apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildRail();
    buildTopbar();
    initNavigator();
    initFilters();
  });
})();
