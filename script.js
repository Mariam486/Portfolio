// ---------- Data ----------
const skills = [
  { name: "Python", gradient: "linear-gradient(135deg, #3776AB, #245579)", glyph: "Py" },
  { name: "Java", gradient: "linear-gradient(135deg, #E76F00, #b94c00)", glyph: "J" },
  { name: "C++", gradient: "linear-gradient(135deg, #1269a6, #004b80)", glyph: "C++" },
  { name: "JavaScript", gradient: "linear-gradient(135deg, #F4DB4F, #d6ac22)", glyph: "JS", dark:true },
  { name: "HTML", gradient: "linear-gradient(135deg, #ef633f, #c83d25)", glyph: "H" },
  { name: "CSS", gradient: "linear-gradient(135deg, #3d5ce8, #2441bd)", glyph: "C" },
  { name: "React", gradient: "linear-gradient(135deg, #20b5d5, #108cae)", glyph: "R" },
  { name: "MySQL", gradient: "linear-gradient(135deg, #5e90b1, #356a8d)", glyph: "Q" },
  { name: "Git", gradient: "linear-gradient(135deg, #f15a3a, #d13921)", glyph: "Git" },
  { name: "Figma", gradient: "linear-gradient(135deg, #a65cf3, #8141cc)", glyph: "F" },
  { name: "Canva", gradient: "linear-gradient(135deg, #18cbd0, #0c9fa9)", glyph: "Cv" },
];

const projects = [
  {
    title: "SafeRoute",
    desc: "AI-powered route safety recommendation system analyzing historical data to calculate optimized low-risk travel paths.",
    tags: ["Python", "Django", "Maps API"],
    gradA: "#232946", gradB: "#3f66d1",
    thumbText: "SafeRoute"
  },
  {
    title: "Crypto Encryption Tool",
    desc: "Comprehensive tool for secure file and message encryption and decryption using advanced classic algorithms.",
    tags: ["Python", "Cryptography"],
    gradA: "#0b1d33", gradB: "#0e6ba8",
    thumbText: "Crypto Tool"
  },
  {
    title: "Arena 456",
    desc: "An interactive web application delivering an engaging, visually immersive user experience — frontend and UI/UX designed with modern web technologies.",
    tags: ["Python", "AI", "Data Analysis"],
    gradA: "#1a1f2b", gradB: "#3a4a63",
    thumbText: "Arena 456"
  },
  {
    title: "Text Editor (Undo/Redo)",
    desc: "Stack-based customizable desktop rich text editor implementing instant state tracking for complete revision history.",
    tags: ["Java", "Data Structures"],
    gradA: "#1e2222", gradB: "#3c4a44",
    thumbText: "Text Editor"
  }
];

const experience = [
  { title: "Generative AI Intern", role: "Arch Technologies", year: "2025", icon:"🏢", desc:"Actively contributing to engineering excellence, design thinking, and practical software implementation." },
  { title: "Designer", role: "GDGoC (DSU)", year: "2025 – PRESENT", icon:"✦", desc:"Actively contributing to engineering excellence, design thinking, and practical software implementation." },
  { title: "Design Team Member", role: "MLSC (DSU)", year: "2024 – 2025", icon:"◎", desc:"Actively contributing to engineering excellence, design thinking, and practical software implementation." },
  { title: "Judge – Robofest 2025", role: "Python Programming Category", year: "2025", icon:"</>", desc:"Actively contributing to engineering excellence, design thinking, and practical software implementation." },
  { title: "WES Society", role: "Co-Director Creativity", year: "2024 – 2025", icon:"👤", desc:"Actively contributing to engineering excellence, design thinking, and practical software implementation." },
];


// ---------- Render skills ----------
const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.setAttribute('role', 'region');
skillsGrid.setAttribute('aria-label', 'Technologies I work with');
skillsGrid.innerHTML = `
  <div class="skills-loop__track">
    <ul class="skills-loop__list" data-skills-list></ul>
    <ul class="skills-loop__list" data-skills-list aria-hidden="true"></ul>
  </div>`;

const createSkill = (s, index, duplicate = false) => {
  const item = document.createElement('li');
  item.className = 'skills-loop__item';
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `skill-chip${duplicate ? '' : ' reveal'}`;
  el.style.setProperty('--skill-gradient', s.gradient);
  el.style.setProperty('--skill-ink', s.dark ? '#1c1a17' : '#fff');
  el.style.setProperty('--skill-delay', `${index * 45}ms`);
  el.setAttribute('aria-label', s.name);
  el.innerHTML = `
    <span class="skill-back" aria-hidden="true"></span>
    <span class="skill-front">
      <span class="skill-glyph" aria-hidden="true">${s.glyph}</span>
    </span>
    <span class="skill-label">${s.name}</span>`;
  item.appendChild(el);
  return item;
};

document.querySelectorAll('[data-skills-list]').forEach((list, copyIndex) => {
  skills.forEach((s, index) => list.appendChild(createSkill(s, index, copyIndex > 0)));
});

const skillsLoopTrack = skillsGrid.querySelector('.skills-loop__track');
skillsGrid.addEventListener('pointerenter', () => {
  skillsLoopTrack.classList.add('is-paused');
});
skillsGrid.addEventListener('pointerleave', () => {
  skillsLoopTrack.classList.remove('is-paused');
});
skillsGrid.addEventListener('focusin', () => skillsLoopTrack.classList.add('is-paused'));
skillsGrid.addEventListener('focusout', (event) => {
  if (!skillsGrid.contains(event.relatedTarget)) skillsLoopTrack.classList.remove('is-paused');
});

// ---------- Contact form ----------
const openContactForm = document.getElementById('openContactForm');
const closeContactForm = document.getElementById('closeContactForm');
const contactFormWrap = document.getElementById('contactFormWrap');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

const setContactFormOpen = (isOpen) => {
  contactFormWrap.classList.toggle('is-open', isOpen);
  contactFormWrap.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) {
    contactForm.querySelector('input')?.focus();
  } else {
    openContactForm.focus();
  }
};

openContactForm.addEventListener('click', () => setContactFormOpen(true));
closeContactForm.addEventListener('click', () => setContactFormOpen(false));
contactFormWrap.addEventListener('click', (event) => {
  if (event.target === contactFormWrap) setContactFormOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contactFormWrap.classList.contains('is-open')) {
    setContactFormOpen(false);
  }
});
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = `Portfolio enquiry from ${data.get('name')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  formFeedback.textContent = 'Your email draft is ready — thank you for reaching out.';
  formFeedback.classList.add('is-visible');
  window.setTimeout(() => {
    window.location.href = `mailto:mariamfatima486@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, 120);
});

// ---------- Render projects ----------
const projectList = document.getElementById('projectList');
projects.forEach(p => {
  const el = document.createElement('div');
  el.className = 'project-card reveal';
  el.innerHTML = `
    <div class="project-thumb" style="--thumb-a:${p.gradA}; --thumb-b:${p.gradB}">${p.thumbText}</div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tag-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-links">
        <a href="#">🐙 Source</a>
        <a href="#">↗ Live Demo</a>
      </div>
    </div>`;
  projectList.appendChild(el);
});

// ---------- Render timeline ----------
const timeline = document.getElementById('timeline');
experience.forEach(e => {
  const el = document.createElement('div');
  el.className = 'timeline-item reveal';
  el.innerHTML = `
    <div class="tl-icon">${e.icon}</div>
    <div class="tl-content">
      <h3>${e.title}</h3>
      <div class="tl-role">${e.role}</div>
      <div class="tl-year">${e.year}</div>
      <div class="tl-desc">${e.desc}</div>
    </div>`;
  timeline.appendChild(el);
});

// ---------- Scroll reveal ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- Header scroll state ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ---------- Active nav link on scroll ----------
const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...navLinks].map(l => document.querySelector(l.getAttribute('href')));
window.addEventListener('scroll', () => {
  let current = sections[0];
  sections.forEach(s => {
    if (s && window.scrollY >= s.offsetTop - 120) current = s;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current.id);
  });
});

// ---------- BorderGlow — all info cards ----------
document.querySelectorAll('.edu-glow').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
    const ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1) * 100;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty('--edge-proximity', proximity.toFixed(3));
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  });
});

// ---------- Theme toggle (light/dark) ----------
const themeBtn = document.getElementById('themeToggle');
let dark = false;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  const r = document.documentElement;
  r.style.setProperty('--bg',         dark ? '#1c1714' : '#f6f4f1');
  r.style.setProperty('--bg-card',    dark ? '#251f1b' : '#ffffff');
  r.style.setProperty('--bg-header',  dark ? 'rgba(28,23,20,0.88)' : 'rgba(246,244,241,0.85)');
  r.style.setProperty('--ink',        dark ? '#f2ebe4' : '#1c1a17');
  r.style.setProperty('--ink-soft',   dark ? '#a8998e' : '#6b6560');
  r.style.setProperty('--ink-faint',  dark ? '#665850' : '#a39d96');
  r.style.setProperty('--coral-tint', dark ? '#3a1a10' : '#ffe4da');
  r.style.setProperty('--line',       dark ? '#302520' : '#eae6e0');
  themeBtn.textContent = dark ? '☀' : '🌙';
});
