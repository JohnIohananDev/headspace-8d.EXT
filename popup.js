document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);

  const I18N = {
    pt: {
      powerTitle: 'Ligar / desligar o motor', unlockOrbit: '↻ Voltar a girar',
      moveText: 'O efeito está em outra aba.', moveBtn: 'Usar nesta aba',
      preset: 'Preset', grpClassic: 'Clássicos', grpRelax: 'Relaxantes', grpRetro: 'Retrô & Rádio',
      p_8d: '8D Clássico', p_slowedReverb: 'Slowed + Reverb 🐌', p_nightcore: 'Speed Up / Nightcore ⚡', p_slow: 'Ambiente Lento', p_fast: 'Rotação Rápida',
      p_stadium: 'Show em Estádio 360°', p_stage: 'Palco Ao Vivo', p_vortex: 'Vórtice 3D',
      p_center: 'Foco Central (Fixo)', p_bounce: 'Bounce Dinâmico', p_bass: 'Bass Boosted',
      p_concert: 'Sala de Concerto', p_studio: 'Monitor de Estúdio',
      p_cosmic: 'Deriva Cósmica', p_nebula: 'Nebulosa', p_ocean: 'Oceano Profundo', p_rain: 'Chuva Noturna', p_sleep: 'Sono Profundo',
      p_walkman: 'Walkman Anos 90 8D', p_radio: 'Rádio Velho 8D (com chiado)', p_radioClean: 'Rádio Velho 8D (limpo)',
      p_amRadio: 'Rádio AM Anos 50', p_vinyl: 'Noite de Vinil', p_vhs: 'Fita VHS Nostálgica',
      p_tape: 'Lo-fi Fita Cassete', p_underwater: 'Submerso (Debaixo d\'água)', p_muffled: 'Festa ao Lado (Abafado)', p_phone: 'Telefone 8D', p_custom: 'Personalizado...',
      tabSpace: 'Espaço', tabTone: 'Tom', tabFx: 'Efeitos', tabMind: 'Mente', tabRec: 'Gravar',
      engine3d: 'Engine 3D', modeHrtf: 'Binaural HRTF (Imersão Total)', modeSurround: 'Surround 3-Bandas', modeStereo: 'Estéreo Simples',
      path: 'Trajetória', pathOrbit: 'Órbita Circular', pathFig8: 'Figura em 8', pathDrift: 'Wander (Aleatório)',
      pathZigzag: 'Zigue-zague', pathChaos: 'Caos Total', pathSpiral: 'Espiral (aproxima e afasta)',
      pathVortex: 'Vórtice 3D (sobe e desce)', pathStage: 'Palco Frontal (ao vivo)', pathStadium: 'Arena / Estádio 360°',
      pathHeartbeat: 'Pulso Cardíaco', pathPendulum: 'Pêndulo (balanço suave)', pathHalo: 'Halo (acima da cabeça)',
      spinDir: 'Lado / Direção do Giro 8D', dirCw: '↻ Direita (Horário)', dirCcw: '↺ Esquerda (Anti-hor.)', dirPing: '⇄ Vai e Volta',
      depth: 'Profundidade', speed: 'Velocidade (Giro)', playbackSpeed: 'Música: Slowed / Speed Up', bass: 'Graves', treble: 'Agudos', warmth: 'Calor (som aveludado)', room: 'Reverb (Tamanho da sala)', reverbType: 'Tipo de reverb',
      rvClassic: 'Sala (clássico)', rvHall: 'Salão', rvCathedral: 'Catedral', rvSpace: 'Espaço profundo',
      character: 'Efeito de Rádio / Época (junto com 8D)', chOff: 'Desligado', chWalkman: 'Walkman Anos 90', chRadio: 'Rádio velho (limpo)', chRadioNoise: 'Rádio velho (com chiado)',
      chRadioAm: 'Rádio AM Anos 50', chVinyl: 'Vinil antigo (chiado e estalos)', chTape: 'Fita cassete Lo-Fi', chVhs: 'Fita VHS antiga', chGramophone: 'Gramofone clássico', chPhone: 'Telefone suave',
      chUnderwater: 'Submerso (debaixo d\'água)', chMuffled: 'Abafado (festa ao lado)',
      charAmount: 'Intensidade do efeito', charTone: 'Filtro do Rádio (Abafado ↔ Aberto)', charDrive: 'Saturação / Válvula', charNoise: 'Chiado e Estalos',
      ethereal: 'Etéreo (chorus)', echo: 'Eco ping-pong', tide: 'Maré (filtro respirando)',
      ambience: 'Som ambiente', ambRain: 'Chuva', ambOcean: 'Ondas do mar', ambWind: 'Vento', ambBrown: 'Ruído marrom (calmante)', ambDrone: 'Drone cósmico', ambVol: 'Volume do ambiente',
      binaural: 'Ondas binaurais', mentalState: 'Estado mental', bFocus: 'Foco Extremo (Beta)', bRelax: 'Relaxamento (Alfa)', bMeditate: 'Meditação (Teta)', bSleep: 'Sono Profundo (Delta)',
      binauralHint: 'Use fones de ouvido: as ondas binaurais só funcionam com um som diferente em cada ouvido.',
      outFormat: 'Formato de saída (Sem Vídeo)',
      fmtWav: 'WAV Áudio (sem compressão)', fmtWebm: 'Áudio Leve (M4A / WebM)',
      saveBtn: 'Salvar no computador', kofi: 'Apoie no Ko-fi', reset: 'Restaurar padrões',
      stOff: 'Bypass', stOn: 'Processando', stRec: 'Gravando', stManual: 'Posição Fixa', wait: 'Aguarde...',
      needEngine: 'Ligue o motor primeiro', recDone: 'Gravação concluída! Clique em Salvar', recFail: 'Erro ao finalizar a gravação',
      saving: 'Salvando...', binOn: 'Ondas ativas — use fones de ouvido', binOff: 'Frequências cerebrais de fundo', moved: 'Efeito movido para esta aba', errPrefix: 'Erro: ',
      e_NO_TAB: 'Nenhuma aba ativa encontrada.', e_RESTRICTED_PAGE: 'O Chrome não permite capturar o áudio desta página.',
      e_NO_STREAM_ID: 'Não foi possível obter o áudio. Tente recarregar a página.', e_ENGINE_TIMEOUT: 'O motor de áudio não respondeu. Tente novamente.',
      e_ENGINE_NOT_READY: 'O motor de áudio não está ligado.', e_ALREADY_RECORDING: 'Já existe uma gravação em andamento.', e_NO_RECORDING: 'Nenhuma gravação disponível.',
      e_NO_ENGINE: 'O motor de áudio não respondeu. Desligue e ligue de novo.'
    },
    en: {
      powerTitle: 'Turn the engine on / off', unlockOrbit: '↻ Resume spin',
      moveText: 'The effect is running on another tab.', moveBtn: 'Use this tab',
      preset: 'Preset', grpClassic: 'Classics', grpRelax: 'Relaxing', grpRetro: 'Retro & Radio',
      p_8d: 'Classic 8D', p_slowedReverb: 'Slowed + Reverb 🐌', p_nightcore: 'Speed Up / Nightcore ⚡', p_slow: 'Slow Ambient', p_fast: 'Fast Spin',
      p_stadium: '360° Live Stadium', p_stage: 'Front Live Stage', p_vortex: '3D Vortex',
      p_center: 'Center Focus (Fixed)', p_bounce: 'Dynamic Bounce', p_bass: 'Bass Boosted',
      p_concert: 'Concert Hall', p_studio: 'Studio Monitor',
      p_cosmic: 'Cosmic Drift', p_nebula: 'Nebula', p_ocean: 'Deep Ocean', p_rain: 'Night Rain', p_sleep: 'Deep Sleep',
      p_walkman: '90s Walkman 8D', p_radio: 'Old Radio 8D (noisy)', p_radioClean: 'Old Radio 8D (clean)',
      p_amRadio: '50s AM Radio', p_vinyl: 'Vinyl Night', p_vhs: 'Nostalgic VHS Tape',
      p_tape: 'Lo-fi Cassette Tape', p_underwater: 'Underwater 8D', p_muffled: 'Party Next Door (Muffled)', p_phone: 'Telephone 8D', p_custom: 'Custom...',
      tabSpace: 'Space', tabTone: 'Tone', tabFx: 'Effects', tabMind: 'Mind', tabRec: 'Record',
      engine3d: '3D Engine', modeHrtf: 'Binaural HRTF (Full Immersion)', modeSurround: '3-Band Surround', modeStereo: 'Simple Stereo',
      path: 'Path', pathOrbit: 'Circular Orbit', pathFig8: 'Figure 8', pathDrift: 'Wander (Random)',
      pathZigzag: 'Zigzag', pathChaos: 'Total Chaos', pathSpiral: 'Spiral (closer and farther)',
      pathVortex: '3D Vortex (up and down)', pathStage: 'Front Stage (live)', pathStadium: '360° Arena / Stadium',
      pathHeartbeat: 'Heartbeat Pulse', pathPendulum: 'Pendulum (gentle sway)', pathHalo: 'Halo (above the head)',
      spinDir: '8D Rotation Direction', dirCw: '↻ Right (Clockwise)', dirCcw: '↺ Left (Counter-CW)', dirPing: '⇄ Ping-Pong',
      depth: 'Depth', speed: 'Speed (Spin)', playbackSpeed: 'Music: Slowed / Speed Up', bass: 'Bass', treble: 'Treble', warmth: 'Warmth (velvety sound)', room: 'Reverb (Room size)', reverbType: 'Reverb type',
      rvClassic: 'Room (classic)', rvHall: 'Hall', rvCathedral: 'Cathedral', rvSpace: 'Deep space',
      character: 'Vintage / Radio effect (works with 8D)', chOff: 'Off', chWalkman: '90s Walkman', chRadio: 'Old radio (clean)', chRadioNoise: 'Old radio (with static)',
      chRadioAm: '50s AM Radio', chVinyl: 'Old vinyl (hiss and crackle)', chTape: 'Lo-Fi Cassette tape', chVhs: 'Old VHS tape', chGramophone: 'Classic Gramophone', chPhone: 'Smooth Telephone',
      chUnderwater: 'Underwater (submerged)', chMuffled: 'Muffled (party next door)',
      charAmount: 'Effect amount', charTone: 'Radio Filter (Dark ↔ Bright)', charDrive: 'Tube Warmth / Drive', charNoise: 'Static & Crackle',
      ethereal: 'Ethereal (chorus)', echo: 'Ping-pong echo', tide: 'Tide (breathing filter)',
      ambience: 'Ambient sound', ambRain: 'Rain', ambOcean: 'Ocean waves', ambWind: 'Wind', ambBrown: 'Brown noise (calming)', ambDrone: 'Cosmic drone', ambVol: 'Ambient volume',
      binaural: 'Binaural beats', mentalState: 'Mental state', bFocus: 'Extreme Focus (Beta)', bRelax: 'Relaxation (Alpha)', bMeditate: 'Meditation (Theta)', bSleep: 'Deep Sleep (Delta)',
      binauralHint: 'Use headphones: binaural beats only work with a different tone in each ear.',
      outFormat: 'Output format',
      fmtWav: 'WAV Audio (uncompressed)', fmtWebm: 'Compact Audio (M4A / WebM)',
      saveBtn: 'Save to computer', kofi: 'Support on Ko-fi', reset: 'Reset parameters',
      stOff: 'Bypass', stOn: 'Processing', stRec: 'Recording', stManual: 'Locked Pos', wait: 'Please wait...',
      needEngine: 'Turn the engine on first', recDone: 'Recording finished! Click Save', recFail: 'Could not finish the recording',
      saving: 'Saving...', binOn: 'Beats on — use headphones', binOff: 'Background brainwave frequencies', moved: 'Effect moved to this tab', errPrefix: 'Error: ',
      e_NO_TAB: 'No active tab found.', e_RESTRICTED_PAGE: 'Chrome does not allow capturing audio from this page.',
      e_NO_STREAM_ID: 'Could not get the audio. Try reloading the page.', e_ENGINE_TIMEOUT: 'The audio engine did not respond. Please try again.',
      e_ENGINE_NOT_READY: 'The audio engine is not running.', e_ALREADY_RECORDING: 'A recording is already in progress.', e_NO_RECORDING: 'No recording available.',
      e_NO_ENGINE: 'The audio engine did not respond. Turn it off and on again.'
    }
  };

  let lang = 'pt';
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.pt[key] || key;
  const errText = (code) => { if (!code) return t('e_NO_ENGINE'); const key = 'e_' + code; return (I18N[lang] && I18N[lang][key]) || code; };

  function detectLanguage() {
    let ui = 'pt';
    try { ui = chrome.i18n.getUILanguage() || navigator.language || 'pt'; } catch (e) { ui = navigator.language || 'pt'; }
    return String(ui).toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  const toggleBtn = $('toggleBtn'), statusText = $('statusText'), statusIndicator = $('statusIndicator');
  const hero = $('hero'), orbit = $('orbit'), sat = $('sat'), unlockOrbitBtn = $('unlockOrbitBtn');
  const moveBar = $('moveBar'), moveBtn = $('moveBtn'), presetSelect = $('presetSelect'), resetBtn = $('resetBtn');
  const spatialModeSelect = $('spatialMode'), hrtfPathContainer = $('hrtfPathContainer');
  const radioCustomBox = $('radioCustomBox'), dirPills = document.querySelectorAll('.dir-pill');

  const SLIDER_KEYS = ['intensity', 'speed', 'playbackSpeed', 'bass', 'clarity', 'reverb', 'warmth', 'chorus', 'echo', 'waves', 'characterAmount', 'charTone', 'charDrive', 'charNoise', 'ambienceVol'];
  const SELECT_KEYS = ['spatialMode', 'hrtfPath', 'direction', 'reverbType', 'character', 'ambience', 'binauralPreset'];
  const sliders = {}; SLIDER_KEYS.forEach((k) => { sliders[k] = $(k); });
  const selects = {}; SELECT_KEYS.forEach((k) => { selects[k] = $(k); });

  const binauralToggle = $('binauralToggle'), binauralStatus = $('binauralStatus');
  const recordFormat = $('recordFormat');
  const recordBtn = $('recordBtn'), recordBtnText = $('recordBtnText'), recordTimer = $('recordTimer'), downloadBtn = $('downloadBtn');

  const DEFAULTS = {
    intensity: 100, speed: 15, playbackSpeed: 100, direction: 'cw', manualMode: false, manualX: 0, manualZ: -1,
    bass: 40, clarity: 50, reverb: 25, warmth: 0, chorus: 0, echo: 0, waves: 0,
    character: 'off', characterAmount: 100, charTone: 60, charDrive: 25, charNoise: 35,
    reverbType: 'classic', ambience: 'off', ambienceVol: 35, spatialMode: 'hrtf', hrtfPath: 'orbit'
  };

  const CHAR_PRESET_TUNING = {
    'walkman': { charTone: 75, charDrive: 20, charNoise: 25 }, 'radio': { charTone: 65, charDrive: 22, charNoise: 10 },
    'radio-noise': { charTone: 60, charDrive: 25, charNoise: 45 }, 'radio-am': { charTone: 45, charDrive: 30, charNoise: 40 },
    'vinyl': { charTone: 80, charDrive: 18, charNoise: 50 }, 'tape': { charTone: 70, charDrive: 25, charNoise: 25 },
    'vhs': { charTone: 55, charDrive: 30, charNoise: 35 }, 'gramophone': { charTone: 40, charDrive: 35, charNoise: 50 },
    'phone': { charTone: 55, charDrive: 25, charNoise: 10 }, 'underwater': { charTone: 20, charDrive: 10, charNoise: 0 },
    'muffled': { charTone: 30, charDrive: 12, charNoise: 0 }
  };

  const PRESETS = {
    '8d-rotation': { ...DEFAULTS },
    'slowed-reverb': { ...DEFAULTS, playbackSpeed: 82, intensity: 40, speed: 5, bass: 55, clarity: 30, reverb: 65, reverbType: 'hall', warmth: 15 },
    'nightcore': { ...DEFAULTS, playbackSpeed: 125, intensity: 60, speed: 20, bass: 45, clarity: 60, reverb: 15 },
    'slow-ambient': { ...DEFAULTS, intensity: 60, speed: 5, bass: 30, clarity: 30, reverb: 50 },
    'fast-spin': { ...DEFAULTS, intensity: 100, speed: 80, bass: 50, clarity: 50, reverb: 15 },
    'live-stadium': { ...DEFAULTS, intensity: 95, speed: 12, bass: 65, clarity: 60, reverb: 65, hrtfPath: 'stadium', reverbType: 'hall', echo: 20 },
    'front-stage': { ...DEFAULTS, intensity: 80, speed: 10, bass: 45, clarity: 60, reverb: 35, hrtfPath: 'stage', reverbType: 'hall' },
    'vortex-3d': { ...DEFAULTS, intensity: 100, speed: 22, bass: 50, clarity: 55, reverb: 45, hrtfPath: 'vortex', reverbType: 'space', chorus: 25 },
    'center-focus': { ...DEFAULTS, intensity: 0, speed: 0, bass: 0, clarity: 0, reverb: 0, spatialMode: 'standard' },
    'bounce': { ...DEFAULTS, intensity: 80, speed: 30, bass: 40, clarity: 40, reverb: 20, hrtfPath: 'figure8', direction: 'pingpong' },
    'bass-boost': { ...DEFAULTS, intensity: 70, speed: 10, bass: 85, clarity: 30, reverb: 15, spatialMode: 'surround' },
    'concert-hall': { ...DEFAULTS, intensity: 50, speed: 8, bass: 30, clarity: 60, reverb: 70, reverbType: 'hall' },
    'studio': { ...DEFAULTS, intensity: 0, speed: 0, bass: 20, clarity: 70, reverb: 10, spatialMode: 'standard' },
    'cosmic-drift': { ...DEFAULTS, intensity: 85, speed: 6, bass: 35, clarity: 45, reverb: 55, hrtfPath: 'spiral', reverbType: 'space', chorus: 35, echo: 25, warmth: 30, waves: 20, ambience: 'drone', ambienceVol: 25 },
    'nebula': { ...DEFAULTS, intensity: 70, speed: 8, bass: 30, clarity: 55, reverb: 60, hrtfPath: 'halo', reverbType: 'space', chorus: 55, echo: 40, warmth: 20 },
    'deep-ocean': { ...DEFAULTS, intensity: 60, speed: 5, bass: 45, clarity: 25, reverb: 45, hrtfPath: 'pendulum', reverbType: 'hall', chorus: 25, echo: 15, warmth: 55, waves: 60, ambience: 'ocean', ambienceVol: 40 },
    'night-rain': { ...DEFAULTS, intensity: 50, speed: 4, bass: 30, clarity: 30, reverb: 40, hrtfPath: 'drift', reverbType: 'hall', chorus: 20, echo: 10, warmth: 45, waves: 10, ambience: 'rain', ambienceVol: 45 },
    'deep-sleep': { ...DEFAULTS, intensity: 40, speed: 3, bass: 35, clarity: 10, reverb: 50, hrtfPath: 'pendulum', reverbType: 'cathedral', chorus: 30, echo: 20, warmth: 80, waves: 30, ambience: 'brown', ambienceVol: 35 },
    'walkman-90s': { ...DEFAULTS, intensity: 80, speed: 12, bass: 50, clarity: 45, reverb: 20, character: 'walkman', characterAmount: 90, charTone: 75, charDrive: 20, charNoise: 25 },
    'old-radio': { ...DEFAULTS, intensity: 90, speed: 10, bass: 30, clarity: 40, reverb: 20, character: 'radio-noise', characterAmount: 90, charTone: 60, charDrive: 25, charNoise: 45 },
    'old-radio-clean': { ...DEFAULTS, intensity: 90, speed: 10, bass: 30, clarity: 40, reverb: 20, character: 'radio', characterAmount: 90, charTone: 65, charDrive: 22, charNoise: 10 },
    'am-radio': { ...DEFAULTS, intensity: 80, speed: 9, bass: 30, clarity: 35, reverb: 22, character: 'radio-am', characterAmount: 90, charTone: 45, charDrive: 30, charNoise: 40 },
    'vinyl-night': { ...DEFAULTS, intensity: 60, speed: 6, bass: 45, clarity: 25, reverb: 35, hrtfPath: 'drift', reverbType: 'hall', chorus: 15, warmth: 35, character: 'vinyl', characterAmount: 90, charTone: 80, charDrive: 18, charNoise: 50 },
    'vhs-tape': { ...DEFAULTS, intensity: 70, speed: 8, bass: 45, clarity: 30, reverb: 30, chorus: 25, character: 'vhs', characterAmount: 90, charTone: 55, charDrive: 30, charNoise: 35 },
    'lofi-tape': { ...DEFAULTS, intensity: 55, speed: 5, bass: 50, clarity: 30, reverb: 30, hrtfPath: 'pendulum', reverbType: 'hall', warmth: 25, character: 'tape', characterAmount: 90, charTone: 70, charDrive: 25, charNoise: 25, ambience: 'rain', ambienceVol: 25 },
    'underwater-8d': { ...DEFAULTS, intensity: 75, speed: 6, bass: 60, clarity: 15, reverb: 55, hrtfPath: 'spiral', reverbType: 'space', waves: 45, character: 'underwater', characterAmount: 95, charTone: 20, charDrive: 10, charNoise: 0 },
    'party-next-door': { ...DEFAULTS, intensity: 65, speed: 5, bass: 75, clarity: 15, reverb: 45, reverbType: 'hall', character: 'muffled', characterAmount: 95, charTone: 30, charDrive: 12, charNoise: 0 },
    'phone-8d': { ...DEFAULTS, intensity: 100, speed: 20, bass: 20, clarity: 50, reverb: 10, hrtfPath: 'figure8', character: 'phone', characterAmount: 90, charTone: 55, charDrive: 25, charNoise: 10 }
  };

  let isCapturing = false, isRecording = false, hasRecording = false, busy = false;
  let timerInterval = null, messageTimeout = null, port = null, engineTabId = null;
  let manualMode = false, manualX = 0, manualZ = -1, isDraggingOrbit = false;

  function send(message, timeoutMs = 4000) {
    const call = chrome.runtime.sendMessage(message).catch((err) => ({ error: err.message }));
    const timeout = new Promise((resolve) => setTimeout(() => resolve({ error: 'ENGINE_TIMEOUT' }), timeoutMs));
    return Promise.race([call, timeout]);
  }

  function createStars() {
    const box = $('stars'); if (!box) return;
    for (let i = 0; i < 46; i++) {
      const s = document.createElement('span'); s.className = 'star';
      const size = Math.random() < 0.85 ? 1 : 2;
      s.style.width = s.style.height = size + 'px'; s.style.left = Math.random() * 100 + '%'; s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's'; s.style.animationDuration = (3 + Math.random() * 4).toFixed(2) + 's';
      box.appendChild(s);
    }
  }

  function applyLanguage(newLang) {
    lang = newLang === 'pt' ? 'pt' : 'en';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-label]').forEach((el) => { el.label = t(el.dataset.i18nLabel); });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = t(el.dataset.i18nTitle); });
    $('langPt').classList.toggle('active', lang === 'pt'); $('langEn').classList.toggle('active', lang === 'en');
    updateBinauralUI(); updateRecordUI(); refreshStatusText();
  }

  function readParams() {
    const params = {};
    SLIDER_KEYS.forEach((k) => { params[k] = parseFloat(sliders[k].value); });
    SELECT_KEYS.forEach((k) => { params[k] = selects[k].value; });
    params.binaural = binauralToggle.checked; params.manualMode = manualMode; params.manualX = manualX; params.manualZ = manualZ;
    return params;
  }

  function setSliderFill(input) {
    if (!input) return;
    const min = parseFloat(input.min) || 0, max = parseFloat(input.max) || 100, pct = ((parseFloat(input.value) - min) / (max - min)) * 100;
    input.style.setProperty('--fill', pct + '%');
  }

  function syncDirPills(dirVal) { dirPills.forEach((btn) => { btn.classList.toggle('active', btn.dataset.dir === dirVal); }); }
  function updateRadioBoxVisibility() { if (radioCustomBox) radioCustomBox.style.display = selects.character.value === 'off' ? 'none' : 'block'; }

  function updateManualOrbitUI() {
    unlockOrbitBtn.style.display = manualMode ? 'inline-block' : 'none';
    sat.classList.toggle('is-manual', manualMode);
    if (manualMode) moveSat(manualX, manualZ);
  }

  function writeParamsToUI(params) {
    SLIDER_KEYS.forEach((k) => {
      if (params[k] === undefined || !sliders[k]) return;
      sliders[k].value = params[k]; setSliderFill(sliders[k]);
      const display = $(`val_${k}`); 
      if (display) {
        if (k === 'playbackSpeed') {
          display.textContent = (params[k] / 100).toFixed(2) + 'x';
        } else {
          display.textContent = Math.round(params[k]) + '%';
        }
      }
    });
    SELECT_KEYS.forEach((k) => {
      const v = params[k]; if (v === undefined || !selects[k]) return;
      if (Array.from(selects[k].options).some((o) => o.value === v)) selects[k].value = v;
    });
    if (params.direction) syncDirPills(params.direction);
    if (params.manualMode !== undefined) manualMode = !!params.manualMode;
    if (params.manualX !== undefined) manualX = params.manualX; if (params.manualZ !== undefined) manualZ = params.manualZ;
    if (params.binaural !== undefined) binauralToggle.checked = !!params.binaural;
    updateHrtfVisibility(); updateRadioBoxVisibility(); updateManualOrbitUI(); updateBinauralUI(); updateRecordUI();
    
    if (params.playbackSpeed !== undefined) {
       chrome.runtime.sendMessage({ action: 'SET_PLAYBACK_SPEED', speed: params.playbackSpeed / 100 }).catch(()=>{});
    }
  }

  function updateHrtfVisibility() { hrtfPathContainer.style.display = spatialModeSelect.value === 'hrtf' ? 'block' : 'none'; }
  function updateBinauralUI() { selects.binauralPreset.disabled = !binauralToggle.checked; binauralStatus.textContent = binauralToggle.checked ? t('binOn') : t('binOff'); }
  function setStatus(text, cls) { statusText.textContent = text; statusText.className = cls; }

  function refreshStatusText() {
    if (isCapturing) {
      if (isRecording) setStatus(t('stRec'), 'status-on');
      else if (manualMode) setStatus(t('stManual'), 'status-on');
      else setStatus(t('stOn'), 'status-on');
    } else setStatus(t('stOff'), 'status-off');
  }

  function setUIActive(active) {
    isCapturing = active; toggleBtn.classList.toggle('active', active); statusIndicator.classList.toggle('led-on', active); hero.classList.toggle('is-on', active);
    if (!active && !manualMode) { moveSat(0, -1); updateMoveBar(); }
    refreshStatusText();
  }

  function showMessage(msg, isError = false) {
    setStatus(msg, isError ? 'status-error' : 'status-on'); clearTimeout(messageTimeout); messageTimeout = setTimeout(refreshStatusText, 3500);
  }

  const ORBIT_W = 186, ORBIT_H = 68;
  function moveSat(x, z) {
    const px = ORBIT_W / 2 + Math.max(-1, Math.min(1, x)) * (ORBIT_W / 2), py = ORBIT_H / 2 + Math.max(-1, Math.min(1, z)) * (ORBIT_H / 2);
    sat.style.left = px + 'px'; sat.style.top = py + 'px'; sat.style.transform = `scale(${(0.8 + 0.4 * ((z + 1) / 2)).toFixed(2)})`;
  }

  function handleOrbitPointer(e) {
    const rect = orbit.getBoundingClientRect(), rx = rect.width / 2, rz = rect.height / 2;
    let nx = (e.clientX - rect.left - rx) / rx, nz = (e.clientY - rect.top - rz) / rz;
    const mag = Math.hypot(nx, nz);
    if (mag > 1) { nx /= mag; nz /= mag; }
    manualMode = true; manualX = Number(nx.toFixed(2)); manualZ = Number(nz.toFixed(2));
    moveSat(manualX, manualZ); updateManualOrbitUI(); refreshStatusText(); markCustom(); pushParams();
  }

  orbit.addEventListener('pointerdown', (e) => { isDraggingOrbit = true; orbit.setPointerCapture(e.pointerId); handleOrbitPointer(e); });
  orbit.addEventListener('pointermove', (e) => { if (isDraggingOrbit) handleOrbitPointer(e); });
  orbit.addEventListener('pointerup', () => { isDraggingOrbit = false; });
  unlockOrbitBtn.addEventListener('click', () => { manualMode = false; updateManualOrbitUI(); refreshStatusText(); pushParams(); });

  function connectPort() {
    if (port) return;
    try { port = chrome.runtime.connect({ name: 'headspace-ui' }); } catch (e) { port = null; return; }
    port.onMessage.addListener((m) => {
      if (m.capturing) {
        if (!isCapturing && !busy) { setUIActive(true); syncStatus(); }
        if (!isDraggingOrbit) moveSat(m.x, m.z);
      } else if (isCapturing && !busy) syncStatus();
    });
    port.onDisconnect.addListener(() => { void chrome.runtime.lastError; port = null; if (isCapturing && !busy) syncStatus(); });
  }

  async function updateMoveBar() {
    let show = false;
    if (isCapturing && engineTabId != null) {
      try { const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); show = !!tab && tab.id !== engineTabId; } catch (e) { show = false; }
    }
    moveBar.style.display = show ? 'flex' : 'none';
  }

  function pushParams() {
    const params = readParams(); chrome.storage.local.set({ headspace_params: params });
    send({ action: 'UPDATE_PARAMS', target: 'offscreen', params }, 2500);
  }

  function markCustom() { presetSelect.value = 'custom'; chrome.storage.local.set({ headspace_preset: 'custom' }); }

  const fmtTime = (total) => `${String(Math.floor(total / 3600)).padStart(2, '0')}:${String(Math.floor((total % 3600) / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  
  function startTimer(epoch) {
    stopTimer(); const tick = () => { recordTimer.textContent = fmtTime(Math.max(0, Math.floor((Date.now() - epoch) / 1000))); };
    tick(); timerInterval = setInterval(tick, 250); recordTimer.style.color = 'var(--danger)';
  }

  function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } recordTimer.style.color = ''; }

  function updateRecordUI() {
    recordBtn.classList.toggle('recording', isRecording);
    recordBtnText.textContent = isRecording ? 'STOP' : 'REC';
    downloadBtn.style.display = hasRecording && !isRecording ? 'block' : 'none';
    if (!isRecording) stopTimer();
  }

  async function startRecordingProcess() {
    const res = await send({ action: 'START_RECORDING', target: 'offscreen', format: recordFormat.value });
    if (!res || res.error) { showMessage(t('errPrefix') + errText(res && res.error), true); return; }
    isRecording = true; hasRecording = false; updateRecordUI(); startTimer(res.startedAt || Date.now()); refreshStatusText();
  }

  async function stopRecordingProcess() {
    recordBtn.disabled = true; recordBtnText.textContent = t('saving'); stopTimer();
    const res = await send({ action: 'STOP_RECORDING', target: 'offscreen' }, 20000);
    recordBtn.disabled = false; isRecording = false;
    if (res && res.success) { hasRecording = !!res.hasRecording; showMessage(t('recDone')); } else showMessage(t('recFail'), true);
    updateRecordUI(); refreshStatusText();
  }

  async function syncStatus() {
    const st = await chrome.runtime.sendMessage({ action: 'GET_STATUS' }).catch(() => null);
    const capturing = !!(st && st.isCapturing); engineTabId = capturing && st.activeTabId != null ? st.activeTabId : null;
    isRecording = !!(st && st.isRecording); hasRecording = !!(st && st.hasRecording);
    setUIActive(capturing); updateRecordUI(); if (isRecording) startTimer(st.recordStartedAt || Date.now());
    updateMoveBar(); connectPort();
  }

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active'); const target = $(tab.getAttribute('data-target')); if (target) target.classList.add('active');
    });
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => { btn.addEventListener('click', () => { applyLanguage(btn.dataset.lang); chrome.storage.local.set({ headspace_lang: lang }); }); });

  dirPills.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.dir; selects.direction.value = dir; syncDirPills(dir);
      if (manualMode) { manualMode = false; updateManualOrbitUI(); }
      markCustom(); pushParams();
    });
  });

  toggleBtn.addEventListener('click', async () => {
    if (busy) return; busy = true; toggleBtn.disabled = true; setStatus(t('wait'), 'status-on');
    try {
      if (isCapturing) {
        if (isRecording) await stopRecordingProcess();
        const res = await send({ action: 'STOP_CAPTURE' }, 10000);
        if (res && res.error) throw new Error(errText(res.error));
        hasRecording = !!(res && res.hasRecording) || hasRecording; engineTabId = null; setUIActive(false); updateRecordUI();
      } else {
        const res = await send({ action: 'START_CAPTURE' }, 10000);
        if (!res || res.error) throw new Error(errText(res && res.error));
        setUIActive(true); pushParams(); await syncStatus();
      }
    } catch (err) { showMessage(t('errPrefix') + err.message, true); await syncStatus(); } finally { toggleBtn.disabled = false; busy = false; }
  });

  moveBtn.addEventListener('click', async () => {
    if (busy) return; busy = true; moveBtn.disabled = true;
    try {
      const res = await send({ action: 'START_CAPTURE' }, 10000);
      if (!res || res.error) throw new Error(errText(res && res.error));
      pushParams(); await syncStatus(); showMessage(t('moved'));
    } catch (err) { showMessage(t('errPrefix') + err.message, true); await syncStatus(); } finally { moveBtn.disabled = false; busy = false; }
  });

  presetSelect.addEventListener('change', () => {
    const name = presetSelect.value; chrome.storage.local.set({ headspace_preset: name });
    if (!PRESETS[name]) return; manualMode = false; writeParamsToUI(PRESETS[name]); pushParams();
  });

  SLIDER_KEYS.forEach((k) => { 
    sliders[k].addEventListener('input', () => { 
      const display = $(`val_${k}`); 
      const val = sliders[k].value;
      if (display) {
        if (k === 'playbackSpeed') {
          display.textContent = (val / 100).toFixed(2) + 'x';
        } else {
          display.textContent = val + '%'; 
        }
      }
      setSliderFill(sliders[k]); 
      markCustom(); 
      pushParams(); 
      
      if (k === 'playbackSpeed') {
        chrome.runtime.sendMessage({ action: 'SET_PLAYBACK_SPEED', speed: val / 100 }).catch(()=>{});
      }
    }); 
  });
  
  spatialModeSelect.addEventListener('change', () => { updateHrtfVisibility(); markCustom(); pushParams(); });
  selects.hrtfPath.addEventListener('change', () => { manualMode = false; updateManualOrbitUI(); markCustom(); pushParams(); });
  selects.character.addEventListener('change', () => { const ch = selects.character.value; if (CHAR_PRESET_TUNING[ch]) writeParamsToUI(CHAR_PRESET_TUNING[ch]); updateRadioBoxVisibility(); markCustom(); pushParams(); });
  ['reverbType', 'ambience'].forEach((k) => { selects[k].addEventListener('change', () => { markCustom(); pushParams(); }); });
  recordFormat.addEventListener('change', updateRecordUI);
  binauralToggle.addEventListener('change', () => { updateBinauralUI(); pushParams(); });
  selects.binauralPreset.addEventListener('change', pushParams);

  resetBtn.addEventListener('click', () => {
    presetSelect.value = '8d-rotation'; binauralToggle.checked = false; selects.binauralPreset.value = 'focus'; manualMode = false;
    chrome.storage.local.set({ headspace_preset: '8d-rotation' }); writeParamsToUI(PRESETS['8d-rotation']); pushParams();
  });

  recordBtn.addEventListener('click', async () => {
    if (busy) return;
    if (!isCapturing && !isRecording) { await syncStatus(); if (!isCapturing) { showMessage(t('needEngine'), true); return; } }
    busy = true; try { if (isRecording) await stopRecordingProcess(); else await startRecordingProcess(); } finally { busy = false; }
  });

  downloadBtn.addEventListener('click', async () => {
    const res = await send({ action: 'GET_RECORDING', target: 'offscreen' });
    if (!res || res.error) { showMessage(errText(res && res.error), true); return; }
    const a = document.createElement('a'); a.href = res.url; a.download = res.filename; document.body.appendChild(a); a.click(); a.remove(); chrome.action.setBadgeText({ text: '' }).catch(() => {});
  });

  setInterval(() => { if (!port) connectPort(); }, 1500);

  createStars(); moveSat(0, -1); applyLanguage(detectLanguage()); SLIDER_KEYS.forEach((k) => setSliderFill(sliders[k]));

  (async () => {
    const stored = await chrome.storage.local.get(['headspace_params', 'headspace_preset', 'headspace_extras', 'headspace_lang']);
    if (stored.headspace_lang) applyLanguage(stored.headspace_lang);
    const saved = { ...DEFAULTS, ...(stored.headspace_params || {}) };
    if (stored.headspace_extras) {
      if (saved.binaural === undefined) saved.binaural = !!stored.headspace_extras.binaural;
      if (!stored.headspace_params || !stored.headspace_params.binauralPreset) saved.binauralPreset = stored.headspace_extras.binauralPreset || 'focus';
    }
    writeParamsToUI(saved);
    const savedPreset = stored.headspace_preset;
    if (savedPreset && Array.from(presetSelect.options).some((o) => o.value === savedPreset)) presetSelect.value = savedPreset;
    await syncStatus();
  })();
});