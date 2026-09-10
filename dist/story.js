const question = 'Quelles données disponibles sur la pluviométrie du dernier semestre ?';
const sql = `SELECT region, SUM(pluie_mm) AS cumul_mm
FROM pluviometrie
WHERE date_mesure >= '2026-01-01'
  AND date_mesure < '2026-07-01'
GROUP BY region
ORDER BY cumul_mm DESC;`;
const response = 'Les données couvrent janvier à juin 2026. Le dernier semestre a été marqué par une pluviométrie élevée, notamment dans les régions Tanger-Tétouan-Al Hoceïma et Fès-Meknès.';
const replayIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/></svg>';
const pinIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 3 5 5-4 2-3 6-2-2-6 6m6-6-4-4 6-3Z"/></svg>';
const replay = label => `<button class="story-replay" type="button" aria-label="Rejouer ${label}">${replayIcon}<span>Rejouer</span></button>`;

function rainfallMap() {
  const outline = 'M318.8,41.2L320.4,43.9L326.6,48.3L325.6,51.3L327.7,54.1L326.7,56.1L328.2,60.0L328.1,68.0L329.6,72.4L328.7,77.4L333.0,88.3L339.2,93.0L340.0,94.7L336.8,97.3L336.4,98.7L337.1,102.0L314.6,101.6L307.0,102.7L305.7,103.3L304.1,107.6L296.3,110.2L290.3,110.5L288.9,111.9L289.9,117.2L289.1,120.5L292.9,123.2L292.9,124.5L292.2,125.2L286.3,126.3L280.1,130.6L268.2,135.4L264.3,141.4L259.4,145.7L249.2,148.2L240.4,148.4L239.7,151.7L237.5,153.6L228.2,152.5L221.9,157.1L218.2,158.0L207.6,165.5L200.0,171.4L199.9,192.4L197.4,192.4L198.2,196.4L197.8,199.4L198.6,201.8L197.8,203.2L186.4,203.9L180.5,208.5L179.0,208.7L177.5,208.7L175.0,207.5L171.0,208.5L165.5,205.9L161.7,205.3L158.7,205.5L150.0,208.1L151.4,210.9L151.0,213.1L147.8,216.5L144.6,221.7L144.0,223.9L138.3,225.4L137.7,226.2L133.1,244.0L130.9,249.7L120.6,257.1L114.7,267.0L106.3,270.9L104.0,272.9L101.7,278.6L100.2,284.9L98.0,300.9L90.4,310.0L90.8,312.3L88.2,317.3L86.6,318.3L84.2,318.5L64.5,317.3L51.8,318.0L46.8,319.0L48.1,309.2L50.6,304.0L52.7,301.6L55.8,300.4L58.6,295.1L59.6,290.3L61.5,288.0L62.1,286.3L61.4,284.9L69.1,270.8L68.9,269.8L65.6,273.3L67.1,269.8L72.9,265.1L80.2,256.9L82.9,255.5L85.4,252.0L86.3,248.9L86.5,241.8L87.4,238.1L92.4,227.5L93.4,222.7L94.4,220.8L98.9,217.6L102.9,216.1L109.8,211.1L117.2,192.4L119.7,190.1L121.4,187.1L124.2,185.8L130.2,185.2L139.1,182.8L147.1,179.1L149.3,177.6L155.8,170.9L166.7,163.8L171.9,157.4L180.4,145.6L181.8,142.6L182.6,137.6L182.0,135.7L179.8,132.6L178.3,131.7L177.9,130.2L178.7,127.6L179.2,115.9L181.6,110.1L187.6,102.4L188.8,99.3L189.5,92.6L197.1,85.5L203.0,78.8L206.9,76.3L220.5,70.9L232.7,64.2L235.3,60.9L242.7,47.8L250.6,27.3L256.2,26.5L260.3,24.4L262.5,25.0L261.4,25.9L261.4,28.2L263.0,30.8L265.7,33.8L270.6,37.6L274.5,39.1L280.0,40.0L291.7,37.6L293.6,38.7L297.2,39.0L300.6,38.4L305.0,35.0L305.3,36.9L307.4,40.7L318.8,41.2Z';
  return `<div class="rainfall-map"><svg viewBox="0 0 500 350" role="img" aria-label="Carte illustrative de la pluviométrie au Maroc, avec des valeurs fictives plus élevées au nord. Tanger-Tétouan-Al Hoceïma : 420 mm ; Fès-Meknès : 360 mm."><defs><path id="morocco-outline" d="${outline}"/><clipPath id="morocco-clip"><use href="#morocco-outline"/></clipPath><pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#c9ddb2" stroke-opacity=".045" stroke-width="1"/></pattern><radialGradient id="rain-north"><stop offset="0" stop-color="#45cfb4"/><stop offset=".5" stop-color="#65ba89"/><stop offset="1" stop-color="#a6c382" stop-opacity="0"/></radialGradient><radialGradient id="rain-center"><stop offset="0" stop-color="#b7d47d" stop-opacity=".9"/><stop offset="1" stop-color="#b7d47d" stop-opacity="0"/></radialGradient><linearGradient id="rain-base" x1="0" y1="0" x2=".1" y2="1"><stop offset="0" stop-color="#85af75"/><stop offset=".65" stop-color="#9f9d64"/><stop offset="1" stop-color="#b8a374"/></linearGradient></defs><rect width="500" height="350" fill="url(#map-grid)"/><text x="33" y="123" class="ocean-label" transform="rotate(-56 33 123)">OCÉAN ATLANTIQUE</text><g clip-path="url(#morocco-clip)"><rect width="500" height="350" fill="#344536"/><g class="map-heat"><rect width="500" height="350" fill="url(#rain-base)"/><ellipse cx="253" cy="42" rx="82" ry="79" fill="url(#rain-north)"/><ellipse cx="275" cy="68" rx="69" ry="62" fill="url(#rain-north)"/><ellipse cx="185" cy="143" rx="62" ry="58" fill="url(#rain-center)"/><ellipse cx="136" cy="178" rx="55" ry="55" fill="url(#rain-center)"/></g></g><use href="#morocco-outline" class="map-outline"/><g class="map-annotations"><circle cx="253" cy="28" r="4"/><path d="M260 28H345"/><text x="355" y="27" class="map-region">Tanger-Tétouan</text><text x="355" y="42" class="map-region">Al Hoceïma</text><text x="355" y="64" class="map-value">420 mm</text><circle cx="267" cy="63" r="4"/><path d="M274 63 324 103H345"/><text x="355" y="106" class="map-region">Fès-Meknès</text><text x="355" y="129" class="map-value">360 mm</text></g><g class="map-compass"><path d="m457 276 5-12 5 12-5-3Z"/><text x="459" y="253">N</text></g></svg><div class="rainfall-legend"><span>Cumul du semestre · mm</span><div class="rainfall-scale"></div><div><span>0</span><span>100</span><span>200</span><span>300</span><span>420</span></div></div></div>`;
}

export function rainfallStory() {
  return `<ol class="generation-steps story-steps"><li><span class="step-number">01</span><div class="story-step-content"><h3>Posez votre question</h3><p>Décrivez ce que vous souhaitez analyser, en langage naturel.</p><div class="story-visual story-question" data-story="question" style="--story-progress:0"><div class="story-window-top"><span class="story-window-label"><i></i>VOTRE QUESTION</span><span>01 / 04</span></div><div class="story-question-body"><span class="sr-only">${question}</span><p aria-hidden="true"><span data-typed></span><span class="story-caret"></span></p><span class="story-send" aria-hidden="true">↗</span></div><div class="story-window-bottom"><span>En langage naturel</span>${replay('la saisie de la question')}</div></div></div></li>
  <li><span class="step-number">02</span><div class="story-step-content"><h3>Votre question devient une requête SQL</h3><p>GenBI la transcrit en une requête adaptée à vos données.</p><div class="story-visual story-sql" data-story="sql" style="--story-progress:0"><div class="story-window-top"><span class="story-window-label"><i></i>REQUÊTE SQL</span><span>02 / 04</span></div><span class="sr-only">Exemple de requête SQL : total des précipitations par région entre janvier et juin 2026.</span><div class="sql-editor" aria-hidden="true"><div class="sql-lines">1<br>2<br>3<br>4<br>5<br>6</div><pre><code data-typed></code><span class="story-caret"></span></pre></div><div class="story-window-bottom"><span>Traduction de votre question</span>${replay('la requête SQL')}</div></div></div></li>
  <li><span class="step-number">03</span><div class="story-step-content"><h3>Obtenez une réponse précise</h3><p>La requête s’exécute. Vous recevez les résultats avec les précisions nécessaires à leur compréhension.</p><div class="story-visual story-answer" data-story="answer" style="--story-progress:0"><div class="story-window-top"><span class="story-window-label"><i></i>RÉPONSE DE GENBI</span><span>03 / 04</span></div><div class="story-answer-body"><div class="answer-source"><span>Pluviométrie</span><span>Jan. – Juin 2026</span></div><span class="sr-only">${response}</span><p aria-hidden="true"><span data-typed></span><span class="story-caret"></span></p><div class="answer-detail"><span>Périmètre : régions du Maroc</span><span>Unité : mm cumulés</span></div></div><div class="story-window-bottom"><span>Réponse illustrative · Valeurs fictives</span>${replay('la réponse')}</div></div></div></li>
  <li><span class="step-number">04</span><div class="story-step-content"><h3>Composez votre rapport</h3><p>La plateforme génère des visualisations éphémères. Épinglez celles que vous souhaitez conserver dans votre rapport.</p><div class="story-visual story-map" data-story="map" style="--story-progress:0"><div class="story-window-top"><span class="story-window-label"><i></i>PLUVIOMÉTRIE AU MAROC</span><span>04 / 04</span></div>${rainfallMap()}<div class="map-pin-row"><span class="pin-feedback" role="status">Visualisation de démonstration</span><button class="pin-demo" type="button" aria-pressed="false">${pinIcon}<span>Épingler au rapport</span></button></div><div class="story-window-bottom"><span>Carte illustrative · Valeurs fictives</span>${replay('la carte de pluviométrie')}</div></div></div></li></ol>`;
}

// Each illustration runs once when it enters the viewport. A replay is explicit.
export function animateRainfallStory() {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const content = { question, sql, answer: response };
  const durations = { question: 2900, sql: 4300, answer: 4000, map: 3200 };
  const scenes = [...document.querySelectorAll('[data-story]')].map(element => ({ element, kind: element.dataset.story, elapsed: 0, visible: false, started: false, duration: durations[element.dataset.story] }));
  let frame = 0;
  let lastTime = null;
  let stopped = false;
  const listeners = [];
  function paint(scene) {
    const progress = Math.min(1, scene.elapsed / scene.duration);
    scene.element.style.setProperty('--story-progress', progress);
    scene.element.classList.toggle('story-complete', progress === 1);
    scene.element.classList.toggle('story-playing', scene.started && scene.visible && progress < 1);
    const typed = scene.element.querySelector('[data-typed]');
    if (typed) typed.textContent = content[scene.kind].slice(0, Math.ceil(content[scene.kind].length * progress));
    scene.element.querySelector('.story-replay').disabled = scene.started && progress < 1;
  }
  function tick(time) {
    frame = 0;
    if (stopped || document.hidden) { lastTime = null; return; }
    const delta = lastTime === null ? 0 : time - lastTime;
    lastTime = time;
    for (const scene of scenes) {
      if (scene.visible && scene.started && scene.elapsed < scene.duration) {
        scene.elapsed = Math.min(scene.duration, scene.elapsed + delta);
        paint(scene);
      }
    }
    if (scenes.some(scene => scene.visible && scene.elapsed < scene.duration)) frame = requestAnimationFrame(tick);
    else lastTime = null;
  }
  function schedule() {
    if (!frame && !stopped && !document.hidden) { lastTime = null; frame = requestAnimationFrame(tick); }
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const scene = scenes.find(item => item.element === entry.target);
      scene.visible = entry.isIntersecting && entry.intersectionRatio >= .2;
      if (scene.visible) {
        scene.started = true;
        if (motion.matches) scene.elapsed = scene.duration;
      }
      paint(scene);
    }
    schedule();
  }, { threshold: [0, .2], rootMargin: '0px 0px -5% 0px' });
  for (const scene of scenes) {
    if (motion.matches) { scene.elapsed = scene.duration; scene.started = true; }
    paint(scene);
    observer.observe(scene.element);
    const button = scene.element.querySelector('.story-replay');
    const onReplay = () => { scene.elapsed = 0; scene.started = true; scene.visible = true; paint(scene); schedule(); };
    button.addEventListener('click', onReplay);
    listeners.push(() => button.removeEventListener('click', onReplay));
  }
  const pin = document.querySelector('.pin-demo');
  const onPin = () => {
    const pinned = pin.getAttribute('aria-pressed') !== 'true';
    pin.setAttribute('aria-pressed', String(pinned));
    pin.querySelector('span').textContent = pinned ? 'Épinglé au rapport' : 'Épingler au rapport';
    document.querySelector('.pin-feedback').textContent = pinned ? '1 visualisation dans votre rapport de démonstration' : 'Visualisation de démonstration';
  };
  pin.addEventListener('click', onPin);
  const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = null; } else schedule(); };
  const onMotion = () => { if (motion.matches) { for (const scene of scenes) { scene.elapsed = scene.duration; paint(scene); } cancelAnimationFrame(frame); frame = 0; } };
  document.addEventListener('visibilitychange', onVisibility);
  motion.addEventListener('change', onMotion);
  return () => { stopped = true; cancelAnimationFrame(frame); observer.disconnect(); listeners.forEach(remove => remove()); pin.removeEventListener('click', onPin); document.removeEventListener('visibilitychange', onVisibility); motion.removeEventListener('change', onMotion); };
}
