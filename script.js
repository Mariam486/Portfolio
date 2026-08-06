// ---------- Data ----------
const skills = [
  { name: "Python", color: "#3776AB", glyph: "Py" },
  { name: "Java", color: "#E76F00", glyph: "J" },
  { name: "C++", color: "#00599C", glyph: "C++" },
  { name: "JavaScript", color: "#F0DB4F", glyph: "JS", dark:true },
  { name: "HTML", color: "#E44D26", glyph: "H" },
  { name: "CSS", color: "#264DE4", glyph: "C" },
  { name: "React", color: "#149ECA", glyph: "R" },
  { name: "MySQL", color: "#4479A1", glyph: "Q" },
  { name: "Git", color: "#F1502F", glyph: "Git" },
  { name: "Figma", color: "#A259FF", glyph: "F" },
  { name: "Canva", color: "#00C4CC", glyph: "Cv" },
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
skills.forEach(s => {
  const el = document.createElement('div');
  el.className = 'skill-chip reveal';
  el.innerHTML = `<div class="skill-glyph" style="background:${s.color}; color:${s.dark ? '#1c1a17' : '#fff'}">${s.glyph}</div><span>${s.name}</span>`;
  skillsGrid.appendChild(el);
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
