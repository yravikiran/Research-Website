const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");

// Mobile menu toggle
toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Close mobile menu after click
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

// Helper: set active link
function setActive(id) {
  navLinks.forEach(a => a.classList.remove("active"));
  const link = document.querySelector(`.nav a[href="#${id}"]`);
  if (link) link.classList.add("active");
}

// Robust scroll spy using IntersectionObserver
const headerOffset = 80; // accounts for sticky header + breathing room
const observer = new IntersectionObserver(
  (entries) => {
    // pick the entry with the highest intersection ratio that is intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  },
  {
    root: null,
    // top margin negative so section becomes "active" after it clears header
    rootMargin: `-${headerOffset}px 0px -55% 0px`,
    threshold: [0.15, 0.25, 0.4, 0.6]
  }
);

sections.forEach(section => observer.observe(section));

// Set initial active on load (important)
window.addEventListener("load", () => {
  // if user lands mid-page via refresh, set correct active
  let current = sections[0]?.id || "home";
  const scrollY = window.scrollY + headerOffset;

  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) current = sec.id;
  });

  setActive(current);
});
