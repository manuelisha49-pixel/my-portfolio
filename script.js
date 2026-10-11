/* =====================================================
   Krissia Manuel | Portfolio
   Edit the TRAITS and PROJECTS lists below to change
   your content. No other code needs to be touched.
   ===================================================== */

/* ---------- 1. YOUR TRAITS (click the card to see the next one) ---------- */
const TRAITS = [
  { name: "Honesty",      desc: "I own my work and say what is true, even when it is hard." },
  { name: "Adaptability", desc: "I pick up new tools and change direction when a project needs it." },
  { name: "Creativity",   desc: "I turn ideas into clean layouts, prototypes and working designs." }
];

/* ---------- 2. YOUR PROJECTS ----------
   image  : file inside the assets folder
   title  : project name
   type   : small label shown on the front of the card
   desc   : the description shown when the card is clicked
   tags   : small chips on the back of the card
   link   : where the button goes (put your real link here)
   button : the text on the button                          */
const PROJECTS = [
  {
    image: "assets/proj1.png",
    title: "Library Management System",
    type: "System",
    desc: "A desktop system for searching books by genre, borrowing, reserving and returning them, and keeping a history of every transaction.",
    tags: ["VB.NET", "MySQL"],
    link: "#",
    button: "View project"
  },
  {
    image: "assets/proj2.png",
    title: "DonLoco Norzagaray",
    type: "Web design",
    desc: "A barbershop booking interface where customers log in, book a service, pick a barber and choose a time.",
    tags: ["UI/UX", "Figma"],
    link: "#",
    button: "View project"
  },
  {
    image: "assets/proj3.png",
    title: "Student Portal Storyboard",
    type: "UI/UX",
    desc: "A storyboard of the full student portal flow: login, dashboard, student profile, grades, schedule and certificate of registration.",
    tags: ["Wireframing", "Prototyping"],
    link: "#",
    button: "View project"
  },
  {
    image: "assets/proj4.png",
    title: "Student Management",
    type: "UI design",
    desc: "A clean sign-in screen for a student management system, designed to be simple and easy to use.",
    tags: ["UI Design", "Figma"],
    link: "#",
    button: "View project"
  }
];

/* =====================================================
   Everything below is the logic. You don't need to edit it.
   ===================================================== */
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme (light / dark) ---------- */
  const root = document.documentElement;
  const themeBtn = $("#themeBtn");

  function applyTheme(theme, save) {
    root.setAttribute("data-theme", theme);
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    if (save) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
  }
  applyTheme(root.getAttribute("data-theme") || "light", false);

  themeBtn.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  });

  // Follow the device setting until the visitor picks one themselves
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (!saved) applyTheme(e.matches ? "dark" : "light", false);
  });

  /* ---------- Hero title: split into letters ---------- */
  let n = 0;
  $$(".hero-line").forEach((line) => {
    const text = line.dataset.text;
    text.split("").forEach((ch) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = ch;
      s.style.setProperty("--i", n++);
      line.appendChild(s);
    });
  });

  // Gentle mouse parallax on the title
  const heroTitle = $(".hero-title");
  const hero = $(".hero");
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    heroTitle.classList.add("parallax");
    hero.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      $(".l1", heroTitle).style.transform = `translate(${-x * 14 - 4}px, ${-y * 6}px)`;
      $(".l2", heroTitle).style.transform = `translate(${x * 14}px, ${y * 6}px)`;
    });
    hero.addEventListener("mouseleave", () => {
      $(".l1", heroTitle).style.transform = "";
      $(".l2", heroTitle).style.transform = "";
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Nav shadow, Home button, active link ---------- */
  const navWrap = $(".nav-wrap");
  const toHome = $("#toHome");
  function onScroll() {
    const y = window.scrollY;
    navWrap.classList.toggle("scrolled", y > 20);
    toHome.classList.toggle("show", y > window.innerHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const spyMap = {};
  $$("[data-spy]").forEach((a) => (spyMap[a.dataset.spy] = a));
  const spyTargets = ["home", "about", "achievements", "skills", "projects"].map((id) => document.getElementById(id));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Object.values(spyMap).forEach((a) => a.classList.remove("active"));
          const link = spyMap[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  spyTargets.forEach((t) => t && spy.observe(t));

  // Make "Education" count as part of About
  const edu = document.getElementById("education");
  if (edu) {
    new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (en.isIntersecting) {
          Object.values(spyMap).forEach((a) => a.classList.remove("active"));
          spyMap.about.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" }).observe(edu);
  }

  /* ---------- Scroll reveal (with small stagger inside groups) ---------- */
  $$(".hobbies, .collage, .tools, .skill-cards, .contact-cards, .project-grid").forEach((group) => {
    $$(".reveal", group).forEach((el, i) => el.style.setProperty("--d", i * 0.08 + "s"));
  });
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => revealObs.observe(el));

  /* ---------- Number counters ---------- */
  const countObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const to = +el.dataset.to;
        const suffix = el.dataset.suffix || "";
        if (reduceMotion) { el.textContent = to + suffix; }
        else {
          const start = performance.now();
          const dur = 1200;
          (function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(to * eased) + (p === 1 ? suffix : "");
            if (p < 1) requestAnimationFrame(tick);
          })(start);
        }
        countObs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  $$(".count").forEach((el) => countObs.observe(el));

  /* ---------- Traits: click for the next one ---------- */
  const stack = $("#traitStack");
  const traitCount = $("#traitCount");
  let order = TRAITS.map((_, i) => i); // order[0] is the card on top
  let busy = false;

  const traitEls = TRAITS.map((t) => {
    const card = document.createElement("div");
    card.className = "trait-card";
    card.innerHTML =
      '<span class="trait-label">Trait</span>' +
      '<div><div class="trait-name"></div><p class="trait-desc"></p></div>';
    card.querySelector(".trait-name").textContent = t.name;
    card.querySelector(".trait-desc").textContent = t.desc;
    stack.appendChild(card);
    return card;
  });

  function layoutTraits() {
    // Show up to 3 cards in the stack; extra ones tuck in behind
    order.forEach((cardIndex, pos) => {
      const el = traitEls[cardIndex];
      const p = Math.min(pos, 2);
      el.dataset.p = pos;
      el.style.setProperty("--p", p);
      el.style.visibility = pos > 2 ? "hidden" : "visible";
      el.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
    });
    traitCount.textContent = order[0] + 1 + " / " + TRAITS.length;
    stack.setAttribute("aria-label", "Current trait: " + TRAITS[order[0]].name + ". Show next trait");
  }
  layoutTraits();

  function nextTrait() {
    if (busy || TRAITS.length < 2) return;
    busy = true;
    const top = traitEls[order[0]];
    if (reduceMotion) {
      order.push(order.shift());
      layoutTraits();
      busy = false;
      return;
    }
    top.classList.add("swipe");
    setTimeout(() => {
      order.push(order.shift());
      top.classList.remove("swipe");
      layoutTraits();
      setTimeout(() => (busy = false), 350);
    }, 340);
  }
  stack.addEventListener("click", nextTrait);
  stack.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nextTrait(); }
  });

  /* ---------- Projects: click a card to flip it ---------- */
  const grid = $("#projectGrid");
  PROJECTS.forEach((p, i) => {
    const wrap = document.createElement("article");
    wrap.className = "project reveal";

    const tags = (p.tags || []).map((t) => `<li>${t}</li>`).join("");
    wrap.innerHTML = `
      <div class="project-inner" role="button" tabindex="0" aria-pressed="false" aria-label="${p.title}: show details">
        <div class="face front">
          <img src="${p.image}" alt="Screenshot of ${p.title}" />
          <div class="cap"><span>${p.title}</span><em>${p.type || ""}</em></div>
        </div>
        <div class="face back">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <ul class="tags">${tags}</ul>
          <div class="back-foot">
            <a class="project-btn" href="${p.link}" target="_blank" rel="noopener">${p.button || "View project"}</a>
            <span class="back-hint">Click card to flip back</span>
          </div>
        </div>
      </div>`;
    grid.appendChild(wrap);

    const inner = $(".project-inner", wrap);
    const back = $(".face.back", wrap);
    const btn = $(".project-btn", wrap);
    btn.tabIndex = -1;
    back.setAttribute("aria-hidden", "true");

    function toggle(force) {
      const flipped = typeof force === "boolean" ? force : !wrap.classList.contains("flipped");
      wrap.classList.toggle("flipped", flipped);
      inner.setAttribute("aria-pressed", String(flipped));
      back.setAttribute("aria-hidden", String(!flipped));
      btn.tabIndex = flipped ? 0 : -1;
      // Only one card open at a time
      if (flipped) $$(".project.flipped", grid).forEach((other) => { if (other !== wrap) other.querySelector(".project-inner").dispatchEvent(new CustomEvent("close")); });
    }
    inner.addEventListener("click", (e) => { if (e.target.closest(".project-btn")) return; toggle(); });
    inner.addEventListener("keydown", (e) => {
      if (e.target.closest(".project-btn")) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
    inner.addEventListener("close", () => toggle(false));
  });

  /* ---------- Achievements lightbox ---------- */
  const shots = $$(".shot");
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  let current = 0;
  let lastFocus = null;

  function showShot(i, animate) {
    current = (i + shots.length) % shots.length;
    const src = $("img", shots[current]);
    const set = () => { lbImg.src = src.src; lbImg.alt = src.alt; };
    if (animate && !reduceMotion) {
      lbImg.classList.add("swap");
      setTimeout(() => { set(); lbImg.classList.remove("swap"); }, 200);
    } else set();
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    showShot(i, false);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#lbClose").focus();
  }
  function closeLb() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  shots.forEach((s, i) => s.addEventListener("click", () => openLb(i)));
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", () => showShot(current - 1, true));
  $("#lbNext").addEventListener("click", () => showShot(current + 1, true));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showShot(current - 1, true);
    if (e.key === "ArrowRight") showShot(current + 1, true);
  });

  /* ---------- Misc ---------- */
  $("#year").textContent = new Date().getFullYear();
  observeReveals();
})();
