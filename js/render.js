// ============================================================
// render.js — Renders portfolio sections from data.js
// ============================================================

function escapeHTML(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function safeUrl(value = '') {
  const url = String(value).trim();
  return /^(https?:\/\/|mailto:)/i.test(url) ? url : '';
}

function renderHero() {
  const o = window.PORTFOLIO_DATA.owner;
  const el = document.getElementById('hero-content');
  if (!el) return;

  el.innerHTML = `
    <div class="hero-grid reveal">
      <div class="hero-text">
        <div class="hero-badge">available for work</div>
        <h1 class="hero-title">${escapeHTML(o.name)}</h1>
        <p class="hero-tagline mono">${escapeHTML(o.tagline)}</p>
        <p class="hero-desc">${escapeHTML(o.bio)}</p>
        <div class="hero-btns">
          <a href="#projects" class="btn-primary">View Projects</a>
          <a href="${safeUrl(o.github) || '#'}" target="_blank" rel="noopener" class="btn-secondary">GitHub ↗</a>
          <a href="#contact" class="btn-secondary">Contact Me</a>
        </div>
      </div>
      <div class="hero-photo-wrap" aria-label="Profile photo">
        <div class="hero-photo-ring">
          <img src="${escapeHTML(o.photo)}" alt="${escapeHTML(o.name)}" class="hero-photo" onerror="this.src='assets/profile-placeholder.svg'">
        </div>
        <div class="hero-photo-glow"></div>
      </div>
    </div>`;
}

function renderAbout() {
  const o = window.PORTFOLIO_DATA.owner;
  const el = document.getElementById('about-content');
  if (!el) return;

  el.innerHTML = `
    <div class="glass reveal">
      <div class="about-text">
        <p>${escapeHTML(o.bio)}</p>
        <p>I focus on practical results — cleaning data that is genuinely usable, building automations that run reliably, and organizing information so decisions become easier.</p>
      </div>
      <div class="about-stats">
        <div class="stat-item reveal reveal-delay-1">
          <div class="stat-number mono">${window.PORTFOLIO_DATA.projects.length}</div>
          <div class="stat-label">Portfolio Projects</div>
        </div>
        <div class="stat-item reveal reveal-delay-2">
          <div class="stat-number mono">3+</div>
          <div class="stat-label">Tools & Platforms Used</div>
        </div>
        <div class="stat-item reveal reveal-delay-3">
          <div class="stat-number mono">Remote</div>
          <div class="stat-label">Work Preference</div>
        </div>
      </div>
    </div>`;
}

function renderSkills() {
  const el = document.getElementById('skills-content');
  if (!el) return;

  const skillGroups = window.PORTFOLIO_DATA.skills;
  el.innerHTML = `<div class="skills-grid">${skillGroups.map((category, index) => `
    <article class="glass skill-card reveal reveal-delay-${Math.min(index + 1, 3)}">
      <h3 class="skill-cat-title">${escapeHTML(category.category)}</h3>
      ${category.items.map(skill => `
        <div class="skill-item">
          <div class="skill-info">
            <span class="skill-name">${escapeHTML(skill.name)}</span>
            <span class="skill-label">${escapeHTML(skill.label)}</span>
          </div>
          <div class="skill-bar-bg" aria-label="${escapeHTML(skill.name)}: ${skill.level}%">
            <div class="skill-bar-fill" style="--target-width:${Number(skill.level) || 0}%"></div>
          </div>
        </div>`).join('')}
    </article>`).join('')}</div>`;
}

function renderProjects() {
  const el = document.getElementById('projects-grid');
  if (!el) return;

  const projects = window.PORTFOLIO_DATA.projects;
  el.innerHTML = projects.map(buildProjectCard).join('') + `
    <button class="project-card-add" type="button" onclick="openAddModal()" aria-label="Add a new portfolio project">
      <span class="add-icon" aria-hidden="true">＋</span>
      <span class="mono">Add New Project</span>
    </button>`;
}

function buildProjectCard(project) {
  const imageHTML = project.image
    ? `<img src="${escapeHTML(project.image)}" alt="Screenshot of ${escapeHTML(project.title)}" class="project-img" onerror="this.outerHTML='<div class=&quot;project-img-placeholder&quot;>[ screenshot ]</div>'">`
    : '<div class="project-img-placeholder">[ screenshot ]</div>';

  const github = safeUrl(project.github);
  const demo = safeUrl(project.demo);

  return `
    <article class="glass project-card" data-id="${Number(project.id)}">
      ${imageHTML}
      <div class="project-body">
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-summary">${escapeHTML(project.summary)}</p>
        <div class="project-result">${escapeHTML(project.result)}</div>
        <div class="project-tools">
          ${(project.tools || []).map(tool => `<span class="tool-tag">${escapeHTML(tool)}</span>`).join('')}
        </div>
        <div class="project-links">
          ${github ? `<a href="${github}" target="_blank" rel="noopener" class="project-link">GitHub ↗</a>` : ''}
          ${demo ? `<a href="${demo}" target="_blank" rel="noopener" class="project-link">Live Demo ↗</a>` : ''}
        </div>
      </div>
      <div class="edit-overlay">
        <button class="edit-btn-icon" type="button" onclick="openEditModal(${Number(project.id)})">✎ Edit Project</button>
      </div>
    </article>`;
}

function renderContact() {
  const owner = window.PORTFOLIO_DATA.owner;
  const el = document.getElementById('contact-links');
  if (!el) return;

  const links = [
    { href: owner.email ? `mailto:${owner.email}` : '', icon: emailIcon(), label: owner.email || 'Email Me' },
    { href: owner.github, icon: githubIcon(), label: 'GitHub' },
    { href: owner.linkedin, icon: linkedinIcon(), label: 'LinkedIn' },
    { href: owner.fiverr, icon: briefcaseIcon(), label: 'Fiverr' },
    { href: owner.upwork, icon: briefcaseIcon(), label: 'Upwork' }
  ].filter(link => safeUrl(link.href));

  el.innerHTML = links.map(link => {
    const href = safeUrl(link.href);
    const target = href.startsWith('mailto:') ? '_self' : '_blank';
    return `<a href="${href}" target="${target}" rel="noopener" class="contact-link">${link.icon}<span>${escapeHTML(link.label)}</span></a>`;
  }).join('') || '<p class="dim mono">Add your contact links in js/data.js</p>';
}

function githubIcon() { return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`; }
function linkedinIcon() { return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`; }
function emailIcon() { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`; }
function briefcaseIcon() { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`; }

function renderAll() {
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
}
