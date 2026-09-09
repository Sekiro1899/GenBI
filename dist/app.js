import { config, authAdapter } from './config.js';
import { validate, authenticate, dashboardDestination } from './auth.js';

const app = document.querySelector('#app');
const icons = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="m3 3 18 18M10.5 5.1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3 3.7M6.5 6.5A23 23 0 0 0 2 12s3.5 7 10 7c2 0 3.7-.7 5.2-1.6M10 10a3 3 0 0 0 4 4"/>',
  report: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 16v-3m4 3v-5m4 5v-2"/>',
  layers: '<path d="m12 3 10 6-10 6L2 9ZM2 13l10 6 10-6M2 17l10 6 10-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
const logo = () => '<a class="wordmark" href="#/" aria-label="GENBI, accueil">GEN<span>BI</span><span class="wordmark-period">.</span></a>';
const ocp = () => '<div class="client-brand"><span>Une plateforme pour</span><img src="./assets/ocp-logo.png" alt="OCP" width="160" height="50" /></div>';

function lineChart(id = 'hero') {
  return `<div class="line-chart"><div class="y-axis"><span>160</span><span>120</span><span>80</span><span>40</span></div><svg viewBox="0 0 460 165" preserveAspectRatio="none" role="img" aria-label="Volumes mensuels de démonstration, de 80 à 156 milliers de tonnes de janvier à juin"><defs><linearGradient id="area-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b7d47d" stop-opacity=".28"/><stop offset="100%" stop-color="#b7d47d" stop-opacity="0"/></linearGradient></defs><g class="chart-grid"><path d="M0 12H460M0 58H460M0 104H460M0 150H460"/></g><path class="comparison-line" d="M0 122C40 123 55 83 92 105S147 143 184 107 240 92 276 108 330 77 368 89 425 63 460 70"/><path d="M0 105C40 110 60 68 92 79S148 98 184 70 235 97 276 54 324 72 368 43 421 53 460 17V165H0Z" fill="url(#area-${id})"/><path class="volume-line" d="M0 105C40 110 60 68 92 79S148 98 184 70 235 97 276 54 324 72 368 43 421 53 460 17"/><circle cx="368" cy="43" r="5" fill="#c4d87f" stroke="#26372a" stroke-width="4"/></svg><div class="x-axis"><span>Jan.</span><span>Fév.</span><span>Mars</span><span>Avr.</span><span>Mai</span><span>Juin</span></div></div>`;
}

function reportCard(id = 'hero') {
  return `<article class="report-card glass-panel"><div class="report-heading"><div class="report-title"><span class="report-symbol">${icon('report')}</span><div><h3>Évolution des volumes</h3><p>Janvier – Juin 2026</p></div></div><span class="report-dots" aria-hidden="true">•••</span></div><div class="report-metric"><strong>742<span>kt</span></strong><span class="trend">${icon('diagonal')} 12,8 %</span></div><p class="metric-caption">Volume total · par rapport au semestre précédent</p>${lineChart(id)}<div class="chart-legend"><span><i></i>2026</span><span><i class="previous"></i>2025</span><span class="unit">Volumes en kt</span></div></article>`;
}

function regionCard() {
  return `<article class="region-card glass-panel"><div class="small-card-heading"><span>Volumes par région</span>${icon('diagonal')}</div><div class="region-row"><span>Afrique</span><div><i style="--bar:84%"></i></div><strong>42 %</strong></div><div class="region-row"><span>Europe</span><div><i style="--bar:56%"></i></div><strong>28 %</strong></div><div class="region-row"><span>Asie</span><div><i style="--bar:40%"></i></div><strong>20 %</strong></div><div class="region-row"><span>Amériques</span><div><i style="--bar:20%"></i></div><strong>10 %</strong></div></article>`;
}

function home() {
  document.title = 'GENBI — Prenez possession de vos données';
  document.body.className = 'home-page';
  app.innerHTML = `<header class="site-header"><div class="header-inner">${logo()}<nav aria-label="Navigation principale"><a class="nav-about" href="#/a-propos">À propos</a><a class="nav-login" href="#/connexion">Se connecter</a><a class="button button-glass nav-signup" href="#/inscription">S’inscrire ${icon('diagonal')}</a></nav></div></header>
  <main id="main"><section class="hero" aria-labelledby="hero-title"><div class="landscape" aria-hidden="true"></div><div class="hero-content"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-line"></span>GENBI</span><h1 id="hero-title">Prenez possession<br>de vos <em>données.</em></h1><p class="hero-description">Générez vos rapports<br>avec flexibilité.</p><div class="hero-actions"><a class="button button-primary" href="#/inscription">S’inscrire ${icon('arrow')}</a><a class="button button-outline" href="#/connexion">Se connecter</a></div></div>
  <div class="report-stage" aria-label="Aperçus de rapports, données de démonstration"><div class="stage-orbit" aria-hidden="true"></div><div class="floating-main">${reportCard()}</div><div class="floating-region">${regionCard()}</div><div class="question-card glass-panel"><span class="question-symbol">${icon('layers')}</span><span>Quelle est l’évolution des volumes ?</span><span class="question-send">${icon('arrow')}</span></div><p class="demo-caption">Aperçu de rapport · Données de démonstration</p></div></div>
  <div class="hero-bottom">${ocp()}<a class="discover-link" href="#/a-propos">À propos de GENBI <span>${icon('down')}</span></a><span class="hero-index">01 — 02</span></div></section>
  <section class="about-section" id="a-propos" aria-labelledby="about-title"><div class="about-copy"><span class="eyebrow"><span class="eyebrow-line"></span>À PROPOS DE GENBI</span><h2 id="about-title">Un rapport dédié pour chaque question que vous vous posez.</h2><p>Posez vos questions en langage naturel et générez des rapports adaptés à vos besoins.</p><a class="text-link" href="#/inscription">Créer mon compte ${icon('arrow')}</a></div><div class="about-report"><div class="about-question">${icon('report')}<span>Quelle est la répartition des volumes par région ?</span></div><div class="about-chart"><div class="donut" role="img" aria-label="Données de démonstration : Afrique 42 %, Europe 28 %, Asie 20 %, Amériques 10 %"><div><strong>742<span>kt</span></strong><span>Volume total</span></div></div><div class="donut-legend"><div><i></i><span>Afrique</span><strong>42 %</strong></div><div><i></i><span>Europe</span><strong>28 %</strong></div><div><i></i><span>Asie</span><strong>20 %</strong></div><div><i></i><span>Amériques</span><strong>10 %</strong></div></div></div><div class="about-report-footer"><span>Janvier – Juin 2026</span><span>Données de démonstration</span></div></div></section></main>
  <footer class="site-footer">${logo()}<span>GENBI · OCP</span><a href="#/connexion">Se connecter ${icon('diagonal')}</a></footer>`;
}

function field(name, label, type, autocomplete, placeholder, hint = '') {
  const password = type === 'password';
  return `<div class="field" data-field="${name}"><label for="${name}">${label}</label><div class="input-wrap"><input id="${name}" name="${name}" type="${type}" autocomplete="${autocomplete}" placeholder="${placeholder}" required ${name === 'password' && autocomplete === 'new-password' ? 'minlength="8"' : ''} ${name === 'email' ? 'inputmode="email" autocapitalize="none" spellcheck="false"' : ''} aria-describedby="${name}-hint ${name}-error">${password ? `<button class="password-toggle" type="button" data-toggle="${name}" aria-label="Afficher ${name === 'confirmation' ? 'la confirmation du mot de passe' : 'le mot de passe'}" aria-pressed="false">${icon('eye')}</button>` : ''}</div><span class="field-hint" id="${name}-hint">${hint}</span><span class="field-error" id="${name}-error"></span></div>`;
}

let renderVersion = 0;
function authScreen(mode) {
  const signup = mode === 'signup';
  document.title = `${signup ? 'Créer mon compte' : 'Se connecter'} — GENBI`;
  document.body.className = 'auth-page';
  app.innerHTML = `<main id="main" class="auth-shell"><aside class="auth-visual"><div class="landscape" aria-hidden="true"></div><div class="auth-visual-top">${logo()}<a class="back-link" href="#/">${icon('back')} Retour à l’accueil</a></div><div class="auth-visual-content"><span class="eyebrow"><span class="eyebrow-line"></span>GENBI</span><h1>Prenez possession<br>de vos <em>données.</em></h1><div class="auth-report">${reportCard('auth')}</div></div><div class="auth-visual-bottom">${ocp()}<span>Données de démonstration</span></div></aside><section class="auth-form-side" aria-labelledby="auth-title"><div class="auth-mobile-top">${logo()}<a class="back-link" href="#/">${icon('back')} Accueil</a></div><div class="auth-form-container"><div class="auth-switch" aria-label="Choix du formulaire"><a href="#/connexion" ${!signup ? 'aria-current="page"' : ''}>Se connecter</a><a href="#/inscription" ${signup ? 'aria-current="page"' : ''}>S’inscrire</a></div><h2 id="auth-title">${signup ? 'Créer mon compte' : 'Se connecter'}</h2><p class="auth-subtitle">${signup ? 'Un rapport dédié pour chaque question.' : 'Retrouvez votre espace GENBI.'}</p><form id="auth-form" novalidate>${signup ? field('name', 'Nom complet', 'text', 'name', 'Votre nom') : ''}${field('email', 'Adresse e-mail', 'email', 'email', 'vous@entreprise.ma')}${field('password', 'Mot de passe', 'password', signup ? 'new-password' : 'current-password', 'Votre mot de passe', signup ? '8 caractères minimum' : '')}${signup ? field('confirmation', 'Confirmer le mot de passe', 'password', 'new-password', 'Saisissez à nouveau votre mot de passe') : ''}<p class="form-status" id="form-status" role="alert"></p><button class="button button-primary submit-button" type="submit"><span>${signup ? 'Créer mon compte' : 'Se connecter'}</span>${icon('arrow')}</button></form><p class="auth-other">${signup ? 'Déjà un compte ? <a href="#/connexion">Se connecter</a>' : 'Pas encore de compte ? <a href="#/inscription">S’inscrire</a>'}</p>${config.mode === 'demo' ? '<div class="demo-notice"><span class="demo-label">MODE DÉMONSTRATION</span><p>Utilisez des informations fictives.<br>Aucun compte ne sera créé.</p><button class="demo-fill" type="button">Remplir avec un exemple</button></div>' : ''}</div><span class="auth-bottom-label">GENBI · OCP</span></section></main><dialog class="success-dialog" aria-labelledby="success-title" aria-describedby="success-description"><button class="dialog-close" type="button" aria-label="Fermer">${icon('close')}</button><div class="success-icon">${icon('check')}</div><span class="eyebrow">${config.mode === 'demo' ? 'MODE DÉMONSTRATION' : 'GENBI'}</span><h2 id="success-title"></h2><p id="success-description"></p><a class="button button-primary" href="#/">Retour à l’accueil ${icon('arrow')}</a></dialog>`;
  bindAuth(mode);
}

function bindAuth(mode) {
  const form = document.querySelector('#auth-form');
  const version = renderVersion;
  const dialog = document.querySelector('dialog');
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  document.querySelectorAll('[data-toggle]').forEach(button => button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.toggle);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(show));
    button.setAttribute('aria-label', `${show ? 'Masquer' : 'Afficher'} ${input.name === 'confirmation' ? 'la confirmation du mot de passe' : 'le mot de passe'}`);
    button.innerHTML = icon(show ? 'eyeOff' : 'eye');
  }));
  form.addEventListener('input', e => {
    if (!e.target.name) return;
    e.target.removeAttribute('aria-invalid');
    document.getElementById(`${e.target.name}-error`).textContent = '';
    document.querySelector('#form-status').textContent = '';
  });
  document.querySelector('.demo-fill')?.addEventListener('click', () => {
    const example = { name: 'Alex Démo', email: 'demo@example.com', password: 'Exemple-2026', confirmation: 'Exemple-2026' };
    for (const input of form.querySelectorAll('input')) { input.value = example[input.name]; input.dispatchEvent(new Event('input', { bubbles: true })); }
    form.querySelector('[type="submit"]').focus();
  });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return;
    const values = Object.fromEntries(new FormData(form));
    const errors = validate(values, mode);
    for (const input of form.querySelectorAll('input')) {
      document.getElementById(`${input.name}-error`).textContent = errors[input.name] || '';
      if (errors[input.name]) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    }
    const status = document.querySelector('#form-status');
    if (Object.keys(errors).length) { status.textContent = 'Vérifiez les champs indiqués.'; document.getElementById(Object.keys(errors)[0]).focus(); return; }
    const submit = form.querySelector('[type="submit"]');
    const initial = submit.innerHTML;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submit.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>Veuillez patienter…</span>';
    status.textContent = '';
    try {
      const result = await authenticate(mode, values, config, authAdapter);
      if (version !== renderVersion) return;
      if (!result.demo && result.authenticated) {
        const destination = dashboardDestination(config.dashboardUrl, location.origin);
        if (destination) { location.assign(destination); return; }
      }
      document.querySelector('#success-title').textContent = result.demo ? (mode === 'signup' ? 'Inscription simulée' : 'Connexion simulée') : result.authenticated ? 'Connexion réussie' : 'Vérifiez votre messagerie';
      document.querySelector('#success-description').textContent = result.demo ? 'Le parcours est prêt à être testé. Aucun compte ni aucune session réelle n’a été créé.' : result.message || (result.authenticated ? 'Votre session est ouverte. Le dashboard sera bientôt disponible.' : 'Suivez les instructions reçues pour continuer.');
      form.reset();
      dialog.showModal();
    } catch (error) {
      if (version === renderVersion) status.textContent = error instanceof Error ? error.message : 'Une erreur est survenue. Réessayez.';
    } finally {
      values.password = ''; values.confirmation = '';
      if (version === renderVersion) { submit.disabled = false; submit.innerHTML = initial; form.removeAttribute('aria-busy'); }
    }
  });
}

function route({ initial = false } = {}) {
  const path = location.hash.slice(1) || '/';
  const isAbout = path === '/a-propos';
  if (isAbout && document.body.classList.contains('home-page')) {
    document.querySelector('#a-propos').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    return;
  }
  renderVersion++;
  if (path === '/connexion') authScreen('login');
  else if (path === '/inscription') authScreen('signup');
  else home();
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (!initial) { const main = document.querySelector('#main'); main.tabIndex = -1; main.focus({ preventScroll: true }); }
  if (isAbout) requestAnimationFrame(() => document.querySelector('#a-propos').scrollIntoView());
}
window.addEventListener('hashchange', () => route());
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  const main = document.querySelector('#main');
  main.tabIndex = -1;
  main.focus({ preventScroll: true });
  main.scrollIntoView({ behavior: 'instant' });
});
route({ initial: true });
