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
    image: "proj1.jpg",
    title: "Library Management System",
    type: "System",
    desc: "A desktop system for searching books by genre, borrowing, reserving and returning them, and keeping a history of every transaction.",
    tags: ["VB.NET", "MySQL"],
    link: "#",
    button: "View project"
  },
  {
    image: "proj2.jpg",
    title: "DonLoco Norzagaray",
    type: "Web design",
    desc: "A barbershop booking interface where customers log in, book a service, pick a barber and choose a time.",
    tags: ["UI/UX", "Figma"],
    link: "#",
    button: "View project"
  },
  {
    image: "proj3.jpg",
    title: "Student Portal Storyboard",
    type: "UI/UX",
    desc: "A storyboard of the full student portal flow: login, dashboard, student profile, grades, schedule and certificate of registration.",
    tags: ["Wireframing", "Prototyping"],
    link: "#",
    button: "View project"
  },
  {
    image: "proj4.jpg",
    title: "Student Management",
    type: "UI design",
    desc: "A clean sign-in screen for a student management system, designed to be simple and easy to use.",
    tags: ["UI Design", "Figma"],
    link: "#",
    button: "View project"
  }
];

/* Where the "View more projects" button goes (your GitHub, Behance, Drive, etc.) */
const MORE_PROJECTS_LINK = "#";

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

  /* ---------- Traits: click for the next one (same 3D motion as the projects) ---------- */
  const stack = $("#traitStack");
  const traitCount = $("#traitCount");
  const TN = TRAITS.length;
  let traitActive = 0;

  const traitEls = TRAITS.map((t) => {
    const card = document.createElement("div");
    card.className = "trait-card";
    card.innerHTML =
      '<span class="trait-label">Trait</span>' +
      '<div><div class="trait-name"></div><p class="trait-desc"></p></div>';
    card.querySelector(".trait-name").textContent = t.name;
    card.querySelector(".trait-desc").textContent = t.desc;
    stack.appendChild(card);
    return { el: card, prev: null };
  });

  function layoutTraits() {
    traitEls.forEach((c, i) => {
      let o = i - traitActive;
      if (o > TN / 2) o -= TN;
      if (o < -TN / 2) o += TN;
      const abs = Math.abs(o);
      const sign = Math.sign(o);
      const visible = abs <= 1;

      // A card wrapping around the loop jumps instantly instead of sliding across
      const jump = c.prev !== null && Math.abs(o - c.prev) > TN / 2;
      if (jump) c.el.style.transition = "none";
      c.el.style.transform = `translateX(${sign * 46}%) translateZ(${-abs * 140}px) rotateY(${-sign * 32}deg)`;
      c.el.style.opacity = visible ? (abs === 0 ? 1 : 0.8) : 0;
      c.el.style.filter = abs === 0 ? "none" : "blur(1.5px) brightness(0.8)";
      c.el.style.zIndex = 10 - abs;
      c.el.classList.toggle("is-active", abs === 0);
      c.el.setAttribute("aria-hidden", abs === 0 ? "false" : "true");
      if (jump) { void c.el.offsetWidth; c.el.style.transition = ""; }
      c.prev = o;
    });
    traitCount.textContent = traitActive + 1 + " / " + TN;
    stack.setAttribute("aria-label", "Current trait: " + TRAITS[traitActive].name + ". Show next trait");
  }
  layoutTraits();

  function nextTrait() {
    if (TN < 2) return;
    traitActive = (traitActive + 1) % TN;
    layoutTraits();
  }
  stack.addEventListener("click", nextTrait);
  stack.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nextTrait(); }
  });

  /* ---------- Projects: 3D coverflow gallery ---------- */
  const stage = $("#cfStage");
  const cf = $("#coverflow");
  const info = $("#cfInfo");
  const infoTitle = $("#cfTitle");
  const infoDesc = $("#cfDesc");
  const infoTags = $("#cfTags");
  const infoLink = $("#cfLink");
  const dotsWrap = $("#cfDots");
  $("#moreProjects").href = MORE_PROJECTS_LINK;

  const N = PROJECTS.length;
  let active = 0;
  let dragMoved = false;

  const cards = PROJECTS.map((p, i) => {
    const card = document.createElement("div");
    card.className = "cf-card";
    card.setAttribute("role", "button");
    card.tabIndex = -1;
    card.setAttribute("aria-label", "Show " + p.title);
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = "Screenshot of " + p.title;
    img.draggable = false;
    card.appendChild(img);
    card.addEventListener("click", () => { if (!dragMoved && i !== active) go(i); });
    stage.appendChild(card);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "cf-dot";
    dot.setAttribute("aria-label", "Show " + p.title);
    dot.addEventListener("click", () => go(i));
    dotsWrap.appendChild(dot);
    return { card, dot, prev: null };
  });

  function layoutFlow() {
    cards.forEach((c, i) => {
      let o = i - active;
      if (o > N / 2) o -= N;
      if (o < -N / 2) o += N;
      const abs = Math.abs(o);
      const sign = Math.sign(o);
      const visible = abs <= 1 || (abs === 2 && N >= 5);
      const x = -50 + (abs === 0 ? 0 : sign * (58 + (abs - 1) * 34));

      // A card that wraps around the loop jumps instantly instead of sliding across the stage
      const jump = c.prev !== null && Math.abs(o - c.prev) > N / 2;
      if (jump) c.card.style.transition = "none";
      c.card.style.transform = `translateX(${x}%) translateZ(${-abs * 160}px) rotateY(${-sign * 32}deg)`;
      c.card.style.opacity = visible ? (abs === 0 ? 1 : abs === 1 ? 0.85 : 0.45) : 0;
      c.card.style.filter = abs === 0 ? "none" : `blur(${abs * 1.5}px) brightness(0.8)`;
      c.card.style.zIndex = 10 - abs;
      c.card.style.pointerEvents = visible ? "auto" : "none";
      c.card.classList.toggle("is-active", abs === 0);
      if (jump) { void c.card.offsetWidth; c.card.style.transition = ""; }
      c.prev = o;

      c.dot.classList.toggle("on", abs === 0);
      c.dot.setAttribute("aria-current", abs === 0 ? "true" : "false");
    });

    const p = PROJECTS[active];
    infoTitle.textContent = p.title;
    infoDesc.textContent = p.desc;
    infoTags.innerHTML = "";
    (p.tags || []).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      infoTags.appendChild(li);
    });
    infoLink.href = p.link || "#";
    infoLink.textContent = p.button || "View project";
    info.classList.remove("swap");
    void info.offsetWidth;
    info.classList.add("swap");
  }

  function go(i) {
    active = ((i % N) + N) % N;
    layoutFlow();
  }
  layoutFlow();

  if (N < 2) {
    $("#cfPrev").hidden = true;
    $("#cfNext").hidden = true;
    dotsWrap.hidden = true;
  }
  $("#cfPrev").addEventListener("click", () => go(active - 1));
  $("#cfNext").addEventListener("click", () => go(active + 1));
  cf.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
  });

  // Swipe / drag to change project
  let startX = null;
  stage.addEventListener("pointerdown", (e) => { startX = e.clientX; dragMoved = false; });
  stage.addEventListener("pointermove", (e) => {
    if (startX !== null && Math.abs(e.clientX - startX) > 8) dragMoved = true;
  });
  window.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (dx > 50) go(active - 1);
    else if (dx < -50) go(active + 1);
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
