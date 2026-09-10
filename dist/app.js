import { config, authAdapter } from './config.js';
import { rainfallStory, animateRainfallStory } from './story.js';
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
  replay: '<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  play: '<path d="m8 5 11 7-11 7Z"/>',
  down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
const logo = () => '<a class="wordmark" href="#/" aria-label="GENBI, accueil">GEN<span>BI</span><span class="wordmark-period">.</span></a>';
const platformLogo = () => '<a class="wordmark platform-wordmark" href="#/" aria-label="GenBI Platform, accueil">GenBI <span class="platform-label">Platform</span></a>';
const ocp = () => '<div class="client-brand"><span>Une plateforme pour</span><img src="./assets/ocp-logo.png" alt="OCP" width="160" height="50" /></div>';

function lineChart(id = 'hero') {
  return `<div class="line-chart"><div class="y-axis"><span>160</span><span>120</span><span>80</span><span>40</span></div><svg viewBox="0 0 460 165" preserveAspectRatio="none" role="img" aria-label="Volumes mensuels de démonstration, de 80 à 156 milliers de tonnes de janvier à juin"><defs><linearGradient id="area-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b7d47d" stop-opacity=".28"/><stop offset="100%" stop-color="#b7d47d" stop-opacity="0"/></linearGradient></defs><g class="chart-grid"><path d="M0 12H460M0 58H460M0 104H460M0 150H460"/></g><path class="comparison-line" d="M0 122C40 123 55 83 92 105S147 143 184 107 240 92 276 108 330 77 368 89 425 63 460 70"/><path d="M0 105C40 110 60 68 92 79S148 98 184 70 235 97 276 54 324 72 368 43 421 53 460 17V165H0Z" fill="url(#area-${id})"/><path class="volume-line" d="M0 105C40 110 60 68 92 79S148 98 184 70 235 97 276 54 324 72 368 43 421 53 460 17"/><circle cx="368" cy="43" r="5" fill="#c4d87f" stroke="#26372a" stroke-width="4"/></svg><div class="x-axis"><span>Jan.</span><span>Fév.</span><span>Mars</span><span>Avr.</span><span>Mai</span><span>Juin</span></div></div>`;
}

function reportCard(id = 'hero') {
  return `<article class="report-card glass-panel"><div class="report-heading"><div class="report-title"><span class="report-symbol">${icon('report')}</span><div><h3>Évolution des volumes</h3><p>Janvier – Juin 2026</p></div></div><span class="report-dots" aria-hidden="true">•••</span></div><div class="report-metric"><strong>742<span>kt</span></strong><span class="trend">${icon('diagonal')} 12,8 %</span></div><p class="metric-caption">Volume total · par rapport au semestre précédent</p>${lineChart(id)}<div class="chart-legend"><span><i></i>2026</span><span><i class="previous"></i>2025</span><span class="unit">Volumes en kt</span></div></article>`;
}

function salesReport() {
  return `<article class="sales-report glass-panel" aria-label="Exemple de rapport de ventes"><div class="report-skeleton" aria-hidden="true"><span></span><span></span><div></div><p>Votre rapport se prépare</p></div><div class="sales-content"><div class="report-heading"><div class="report-title"><span class="report-symbol">${icon('report')}</span><div><h3>Évolution des ventes</h3><p>Janvier – Juin 2026</p></div></div><span class="generated-badge">${icon('check')} Généré</span></div><div class="sales-kpis"><div><span>Ventes cumulées</span><strong><span data-sales-total>10,35</span><small>M MAD</small></strong></div><div><span>Janvier → Juin</span><strong class="sales-growth">+100<small>%</small></strong></div></div><div class="sales-chart" role="img" aria-label="Ventes mensuelles fictives en millions de dirhams : janvier 1,2 ; février 1,5 ; mars 1,35 ; avril 1,8 ; mai 2,1 ; juin 2,4. Total : 10,35 millions de dirhams."><div class="sales-y-axis"><span>2,4</span><span>1,8</span><span>1,2</span></div><svg viewBox="0 0 460 165" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="sales-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c4d87f" stop-opacity=".3"/><stop offset="100%" stop-color="#c4d87f" stop-opacity="0"/></linearGradient><clipPath id="sales-reveal"><rect class="chart-reveal" x="0" y="0" width="460" height="165"/></clipPath></defs><g class="chart-grid"><path d="M0 12H460M0 76H460M0 140H460"/></g><g clip-path="url(#sales-reveal)"><path d="M0 140L92 108L184 124L276 76L368 44L460 12V165H0Z" fill="url(#sales-area)"/><path class="sales-line" d="M0 140L92 108L184 124L276 76L368 44L460 12"/><g class="sales-points"><circle cx="0" cy="140" r="3"/><circle cx="92" cy="108" r="3"/><circle cx="184" cy="124" r="3"/><circle cx="276" cy="76" r="3"/><circle cx="368" cy="44" r="3"/><circle cx="460" cy="12" r="4"/></g></g></svg><div class="x-axis"><span>Jan.</span><span>Fév.</span><span>Mars</span><span>Avr.</span><span>Mai</span><span>Juin</span></div></div><div class="sales-chart-footer"><span><i></i>Ventes mensuelles</span><span>En millions de MAD</span></div></div></article>`;
}

function generationPreview() {
  return `<div class="generation-stage" data-phase="question" style="--chart-progress:0"><div class="stage-orbit" aria-hidden="true"></div><div class="generation-question glass-panel"><div class="question-label">${icon('layers')} VOTRE QUESTION</div><p><span class="sr-only">Comment ont évolué les ventes sur les six derniers mois ?</span><span class="typed-question" aria-hidden="true"></span><span class="typing-caret" aria-hidden="true"></span></p><span class="generation-send" aria-hidden="true">${icon('arrow')}</span></div><div class="generation-pipeline" aria-hidden="true"><span data-step="question"><i></i>Question</span><span data-step="sql"><i></i>Requête SQL</span><span data-step="execution"><i></i>Analyse</span><span data-step="report"><i></i>Rapport</span></div><p class="generation-status" role="status" aria-atomic="true">Posez votre question en langage naturel.</p>${salesReport()}<div class="sales-insight glass-panel"><span class="insight-check">${icon('check')}</span><p>Les ventes ont doublé<span>entre janvier et juin.</span></p><span class="insight-value">×2</span></div><div class="generation-controls"><p>Exemple animé · Données de démonstration</p><button type="button" class="animation-control" aria-label="Mettre l’animation en pause">${icon('pause')}<span>Pause</span></button></div></div>`;
}

let stopHeroAnimation = () => {};
let stopRainfallStory = () => {};
function animateGeneration() {
  const stage = document.querySelector('.generation-stage');
  const typed = stage.querySelector('.typed-question');
  const status = stage.querySelector('.generation-status');
  const total = stage.querySelector('[data-sales-total]');
  const control = stage.querySelector('.animation-control');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const question = 'Comment ont évolué les ventes sur les six derniers mois ?';
  const duration = 9400;
  let elapsed = 0;
  let lastTime = null;
  let frame = 0;
  let paused = false;
  let stopped = false;
  const steps = ['question', 'sql', 'execution', 'report'];
  const messages = {
    question: 'Posez votre question en langage naturel.',
    sql: 'La question est transcrite en requête SQL.',
    execution: 'La requête s’exécute · 6 mois de ventes analysés.',
    report: 'Les résultats prennent forme dans votre rapport.',
    complete: 'Votre rapport est prêt.'
  };
  function paint() {
    const phase = elapsed < 2500 ? 'question' : elapsed < 4300 ? 'sql' : elapsed < 6100 ? 'execution' : elapsed < duration ? 'report' : 'complete';
    typed.textContent = question.slice(0, Math.floor(Math.min(1, elapsed / 1900) * question.length));
    if (stage.dataset.phase !== phase) {
      stage.dataset.phase = phase;
      status.textContent = messages[phase];
    }
    const progress = Math.max(0, Math.min(1, (elapsed - 6300) / 2500));
    stage.style.setProperty('--chart-progress', progress);
    total.textContent = (10.35 * progress).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const current = phase === 'complete' ? 4 : steps.indexOf(phase);
    stage.querySelectorAll('[data-step]').forEach((step, index) => {
      step.classList.toggle('is-active', index === current);
      step.classList.toggle('is-done', index < current);
    });
  }
  function updateControl() {
    const done = elapsed >= duration;
    control.innerHTML = `${icon(done ? 'replay' : paused ? 'play' : 'pause')}<span>${done ? 'Rejouer' : paused ? 'Reprendre' : 'Pause'}</span>`;
    control.setAttribute('aria-label', done ? 'Rejouer l’animation' : paused ? 'Reprendre l’animation' : 'Mettre l’animation en pause');
    stage.classList.toggle('is-paused', paused);
  }
  function tick(time) {
    frame = 0;
    if (stopped || paused || document.hidden) { lastTime = null; return; }
    if (lastTime !== null) elapsed = Math.min(duration, elapsed + time - lastTime);
    lastTime = time;
    paint();
    if (elapsed < duration) frame = requestAnimationFrame(tick);
    else updateControl();
  }
  function schedule() {
    lastTime = null;
    if (!frame && !stopped && !paused && !document.hidden && elapsed < duration) frame = requestAnimationFrame(tick);
  }
  function onControl() {
    if (elapsed >= duration) { elapsed = 0; paused = false; paint(); }
    else paused = !paused;
    updateControl();
    if (paused) { cancelAnimationFrame(frame); frame = 0; lastTime = null; }
    else schedule();
  }
  function onVisibility() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = null; }
    else schedule();
  }
  function onMotion() {
    if (motion.matches) {
      cancelAnimationFrame(frame); frame = 0; elapsed = duration; paused = false; paint(); updateControl();
    }
  }
  control.addEventListener('click', onControl);
  document.addEventListener('visibilitychange', onVisibility);
  motion.addEventListener('change', onMotion);
  if (motion.matches) onMotion();
  else { paint(); schedule(); }
  stopHeroAnimation = () => {
    stopped = true;
    cancelAnimationFrame(frame);
    control.removeEventListener('click', onControl);
    document.removeEventListener('visibilitychange', onVisibility);
    motion.removeEventListener('change', onMotion);
  };
}

function home() {
  document.title = 'GenBI Platform — Débloquer le potentiel de vos données';
  document.body.className = 'home-page';
  app.innerHTML = `<header class="site-header"><div class="header-inner">${platformLogo()}<nav aria-label="Navigation principale"><a class="nav-about" href="#/a-propos">À propos</a><a class="nav-login" href="#/connexion">Se connecter</a><a class="button button-glass nav-signup" href="#/inscription">S’inscrire ${icon('diagonal')}</a></nav></div></header>
  <main id="main"><section class="hero" aria-labelledby="hero-title"><div class="landscape" aria-hidden="true"></div><div class="hero-content"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-line"></span>GENBI</span><h1 id="hero-title">Débloquer le potentiel de vos <em>données.</em></h1><p class="hero-description">Générez des rapports précis<br>en toute flexibilité.</p><div class="hero-actions"><a class="button button-primary" href="#/inscription">S’inscrire ${icon('arrow')}</a><a class="button button-outline" href="#/connexion">Se connecter</a></div></div>${generationPreview()}</div>
  <div class="hero-bottom">${ocp()}<a class="discover-link" href="#/a-propos">À propos de GENBI <span>${icon('down')}</span></a><span class="hero-index">01 — 02</span></div></section>
  <section class="about-section process-section" id="a-propos" aria-labelledby="about-title"><div class="about-copy"><span class="eyebrow"><span class="eyebrow-line"></span>À PROPOS DE GENBI</span><h2 id="about-title">La Data Visualisation <em>autrement.</em></h2><p>Un rapport dédié pour chaque question que vous vous posez.</p><a class="text-link" href="#/inscription">Créer mon compte ${icon('arrow')}</a></div>${rainfallStory()}</section></main>
  <footer class="site-footer">${platformLogo()}<span>GENBI · OCP</span><a href="#/connexion">Se connecter ${icon('diagonal')}</a></footer>`;
  animateGeneration();
  stopRainfallStory = animateRainfallStory();
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
  stopHeroAnimation();
  stopRainfallStory();
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
