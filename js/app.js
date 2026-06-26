// ============================================================
// app.js — interactions, edit mode, and HTML export
// ============================================================

let editingProjectId = null;

function initPortfolio() {
  renderAll();
  setupScrollReveal();
  setupNavbar();
  setupModalEvents();
  document.getElementById('year').textContent = new Date().getFullYear();
}

function setupNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 24), { passive: true });
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => bar.classList.add('animated'));
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));
}

function refreshPortfolio() {
  renderAll();
  setupScrollReveal();
}

function toggleEditMode() {
  const active = document.body.classList.toggle('edit-mode');
  const button = document.getElementById('edit-fab');
  button.classList.toggle('active', active);
  button.setAttribute('aria-pressed', String(active));
  button.querySelector('.edit-fab-label').textContent = active ? 'Exit Edit Mode' : 'Edit Portfolio';
}

function openAddModal() {
  editingProjectId = null;
  document.getElementById('modal-title').textContent = 'Add New Project';
  document.getElementById('project-form').reset();
  document.getElementById('delete-project-btn').hidden = true;
  openModal();
}

function openEditModal(id) {
  const project = window.PORTFOLIO_DATA.projects.find(item => item.id === id);
  if (!project) return;

  editingProjectId = id;
  document.getElementById('modal-title').textContent = 'Edit Project';
  document.getElementById('project-title-input').value = project.title || '';
  document.getElementById('project-summary-input').value = project.summary || '';
  document.getElementById('project-result-input').value = project.result || '';
  document.getElementById('project-tools-input').value = (project.tools || []).join(', ');
  document.getElementById('project-image-input').value = project.image || '';
  document.getElementById('project-github-input').value = project.github || '';
  document.getElementById('project-demo-input').value = project.demo || '';
  document.getElementById('delete-project-btn').hidden = false;
  openModal();
}

function openModal() {
  const modal = document.getElementById('edit-modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  setTimeout(() => document.getElementById('project-title-input').focus(), 50);
}

function closeModal() {
  const modal = document.getElementById('edit-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  editingProjectId = null;
}

function setupModalEvents() {
  const form = document.getElementById('project-form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const values = {
      title: document.getElementById('project-title-input').value.trim(),
      summary: document.getElementById('project-summary-input').value.trim(),
      result: document.getElementById('project-result-input').value.trim(),
      tools: document.getElementById('project-tools-input').value.split(',').map(item => item.trim()).filter(Boolean),
      image: document.getElementById('project-image-input').value.trim(),
      github: document.getElementById('project-github-input').value.trim(),
      demo: document.getElementById('project-demo-input').value.trim()
    };

    if (!values.title || !values.summary || !values.result) {
      alert('Please enter a project title, summary, and result.');
      return;
    }

    if (editingProjectId === null) {
      const nextId = Math.max(0, ...window.PORTFOLIO_DATA.projects.map(project => Number(project.id) || 0)) + 1;
      window.PORTFOLIO_DATA.projects.push({ id: nextId, ...values });
    } else {
      const index = window.PORTFOLIO_DATA.projects.findIndex(project => project.id === editingProjectId);
      if (index !== -1) window.PORTFOLIO_DATA.projects[index] = { id: editingProjectId, ...values };
    }

    closeModal();
    refreshPortfolio();
  });

  document.getElementById('delete-project-btn').addEventListener('click', () => {
    if (editingProjectId === null) return;
    const project = window.PORTFOLIO_DATA.projects.find(item => item.id === editingProjectId);
    if (!project || !confirm(`Delete “${project.title}”?`)) return;
    window.PORTFOLIO_DATA.projects = window.PORTFOLIO_DATA.projects.filter(item => item.id !== editingProjectId);
    closeModal();
    refreshPortfolio();
  });

  document.getElementById('edit-modal').addEventListener('click', event => {
    if (event.target.id === 'edit-modal') closeModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });
}

function toggleMobileNav() {
  const menu = document.getElementById('nav-links');
  const isOpen = menu.classList.toggle('mobile-open');
  document.getElementById('nav-hamburger').setAttribute('aria-expanded', String(isOpen));
}

function closeMobileNav() {
  document.getElementById('nav-links').classList.remove('mobile-open');
  document.getElementById('nav-hamburger').setAttribute('aria-expanded', 'false');
}

async function exportUpdatedPortfolio() {
  const exportButton = document.getElementById('export-btn');
  const originalLabel = exportButton.innerHTML;
  exportButton.innerHTML = 'Preparing export…';
  exportButton.disabled = true;

  try {
    const [css, renderScript, appScript] = await Promise.all([
      fetch('styles.css').then(response => response.ok ? response.text() : Promise.reject(new Error('styles.css could not be read'))),
      fetch('js/render.js').then(response => response.ok ? response.text() : Promise.reject(new Error('render.js could not be read'))),
      fetch('js/app.js').then(response => response.ok ? response.text() : Promise.reject(new Error('app.js could not be read')))
    ]);

    const documentCopy = document.documentElement.cloneNode(true);
    const closingScriptTag = '</scr' + 'ipt>';
    const escapeEmbeddedScript = source => source.replace(/<\/script/gi, '<\\/script');
    documentCopy.querySelector('link[href="styles.css"]').outerHTML = `<style>${css}</style>`;
    documentCopy.querySelector('script[src="js/data.js"]').outerHTML = '<script>window.PORTFOLIO_DATA = ' + JSON.stringify(window.PORTFOLIO_DATA, null, 2) + ';' + closingScriptTag;
    documentCopy.querySelector('script[src="js/render.js"]').outerHTML = '<script>' + escapeEmbeddedScript(renderScript) + closingScriptTag;
    documentCopy.querySelector('script[src="js/app.js"]').outerHTML = '<script>' + escapeEmbeddedScript(appScript) + closingScriptTag;

    const file = new Blob(['<!doctype html>\n', documentCopy.outerHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ahmed-tarek-portfolio-updated.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    alert('The export needs to run from your published GitHub Pages site or a local web server. Your edits are still visible—do not refresh before exporting.');
    console.error(error);
  } finally {
    exportButton.innerHTML = originalLabel;
    exportButton.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', initPortfolio);
