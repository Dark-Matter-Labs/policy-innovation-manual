/* =====================================================================
   Temporary password gate (client-side).
   NOTE: this is a soft gate to deter casual access before internal
   sharing — it is NOT real security. The page content is still present
   in the downloaded HTML. For true protection, use host-level password
   protection (Netlify site password / Vercel deployment protection).

   To change the password: replace PASS_HASH below with the SHA-256 hex
   of the new password. Generate it in a browser console with:
     await crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOURPASSWORD'))
       .then(b => [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''))
   ===================================================================== */
(function () {
  "use strict";

  var PASS_HASH = "4222916c7a9d21100182afa6d5d1d7671988206e7a4a78a1ce9dad04525ad1a2"; // "mdpi2026"
  var KEY = "nzc_gate";

  function unlock() {
    document.documentElement.classList.remove("gate-locked");
    var g = document.querySelector(".gate");
    if (g) g.parentNode.removeChild(g);
  }

  // Already unlocked this session?
  try {
    if (sessionStorage.getItem(KEY) === "1") { unlock(); return; }
  } catch (e) { /* sessionStorage blocked — gate will still show */ }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }

  function hashHex(str) {
    var data = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", data).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    });
  }

  function build() {
    var logo = el("img", { class: "gate__logo", src: "assets/img/nzc-logo-stacked.png", alt: "NetZeroCities", width: "72", height: "72" });
    var title = el("h1", { class: "gate__title", text: "Mission Policy Innovation Navigation Kit" });
    var sub = el("p", { class: "gate__sub", text: "This preview is password-protected. Please enter the password to continue." });

    var input = el("input", { type: "password", class: "gate__input", placeholder: "Password", "aria-label": "Password", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
    var btn = el("button", { type: "submit", class: "gate__btn", text: "Enter" });
    var err = el("p", { class: "gate__err", role: "alert" });
    err.hidden = true;

    var form = el("form", { class: "gate__form", novalidate: "novalidate" }, [input, btn]);
    var card = el("div", { class: "gate__card" }, [logo, title, sub, form, err]);
    var overlay = el("div", { class: "gate", role: "dialog", "aria-modal": "true", "aria-label": "Password required" }, [card]);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = input.value || "";
      hashHex(val).then(function (h) {
        if (h === PASS_HASH) {
          try { sessionStorage.setItem(KEY, "1"); } catch (e2) {}
          unlock();
        } else {
          err.textContent = "That password is not right. Please try again.";
          err.hidden = false;
          card.classList.remove("gate__card--shake");
          void card.offsetWidth; // reflow to restart animation
          card.classList.add("gate__card--shake");
          input.value = "";
          input.focus();
        }
      });
    });

    document.body.appendChild(overlay);
    input.focus();
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
