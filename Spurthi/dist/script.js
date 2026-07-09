const header = document.querySelector("[data-header]");
const yearTarget = document.querySelector("[data-year]");
const progress = document.querySelector("[data-progress]");
const revealItems = document.querySelectorAll("[data-reveal]");
const typeTarget = document.querySelector("[data-typewriter]");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

const setProgress = () => {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
};

const setActiveNav = () => {
  if (!sections.length) return;

  const orderedSections = [...sections].sort((first, second) => first.offsetTop - second.offsetTop);
  const documentBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  const activationLine = (header ? header.getBoundingClientRect().height : 0) + 120;
  const current = documentBottom
    ? orderedSections[orderedSections.length - 1]
    : orderedSections.reduce((active, section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= activationLine && rect.bottom > activationLine ? section : active;
      }, orderedSections[0]);

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
};

const setActiveHash = (hash) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === hash);
  });
};

const scrollHashIntoView = () => {
  const hash = window.location.hash;
  if (!hash) return;

  if (hash === "#top") {
    window.scrollTo({ top: 0, behavior: "auto" });
    setActiveHash(hash);
    return;
  }

  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView({
    block: "start",
    behavior: "auto"
  });
  setActiveHash(hash);
};

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.18 })
  : null;

if (revealObserver) {
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const handleScroll = () => {
  setHeaderState();
  setProgress();
  setActiveNav();
};

handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", setProgress);
window.addEventListener("hashchange", () => {
  window.setTimeout(() => {
    scrollHashIntoView();
    setActiveNav();
  }, 0);
});

if (window.location.hash) {
  scrollHashIntoView();
  window.setTimeout(scrollHashIntoView, 100);
}

if (typeTarget && !reducedMotion) {
  const phrases = [
    "Software Engineer.",
    "ML Explorer.",
    "Full-stack Builder.",
    "Android Developer."
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = phrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    typeTarget.textContent = phrase.slice(0, characterIndex);

    if (!deleting && characterIndex === phrase.length) {
      deleting = true;
      window.setTimeout(tick, 1200);
      return;
    }

    if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    window.setTimeout(tick, deleting ? 42 : 74);
  };

  tick();
}
