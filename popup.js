document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const I18N = {
    pt: {
      powerTitle: 'Ligar / desligar o motor', unlockOrbit: 'Voltar a girar',
      moveText: 'O efeito está em outra aba.', moveBtn: 'Usar nesta aba',
      preset: 'Preset', grpClassic: 'Clássicos', grpRelax: 'Relaxantes', grpRetro: 'Retrô e Rádio',
      grpCustom: 'Meus Efeitos', btnSavePre: 'Salvar', btnExportPre: 'Exportar', btnImportPre: 'Importar',
      mdlSaveTitle: 'Nome do seu Efeito', mdlCancel: 'Cancelar', mdlSave: 'Salvar', mdlClose: 'Fechar', mdlCopy: 'Copiar',
      mdlImportTitle: 'Importar Código', mdlImportBtn: 'Carregar', mdlExportTitle: 'Seu Código Mágico',
      grpParty: 'Festa / Cômodo',
      smartVol: 'Volume Inteligente', smartVolSub: 'Protege contra distorção',
      p_8d: '8D Clássico', p_8dExt: '8D Extremo', p_8dWide: '8D Super Largo', p_echoChamber: 'Câmara de Eco', p_binPan: 'Panner Binaural',
      p_slowedReverb: 'Slowed + Reverb', p_nightcore: 'Speed Up / Nightcore', 
      p_slow: 'Ambiente Lento', p_fast: 'Rotação Rápida', p_stadium: 'Show em Estádio', p_stage: 'Palco Ao Vivo', 
      p_cinematic: 'Cinemático', p_vortex: 'Vórtice 3D', p_center: 'Foco Central', p_bounce: 'Bounce Dinâmico', 
      p_bass: 'Bass Boosted', p_concert: 'Sala de Concerto', p_studio: 'Monitor de Estúdio', p_asmr: 'ASMR (Sussurro)', 
      p_cosmic: 'Deriva Cósmica', p_nebula: 'Nebulosa', p_ocean: 'Oceano Profundo', p_rain: 'Chuva Noturna', 
      p_sleep: 'Sono Profundo', p_forest: 'Caminhada na Floresta', p_zen: 'Templo Zen', p_campfire: 'Fogueira Noturna', 
      p_floating: 'Flutuando no Espaço', p_lullaby: 'Canção de Ninar', p_astral: 'Viagem Astral', p_cave: 'Caverna de Cristal', 
      p_stream: 'Riacho Sereno', p_chimes: 'Sinos de Vento', p_mountain: 'Topo da Montanha',
      p_muffled: 'Festa ao Lado', p_bathroom: 'Banheiro da Festa', p_hallway: 'Corredor do Evento', p_clubOut: 'Fila da Balada', 
      p_neighbor: 'Vizinho Barulhento', p_basement: 'Festa no Porão', p_trunk: 'Som no Porta-Malas', p_emptyClub: 'Balada Vazia',
      p_distClub: 'Balada Distante', p_muffBass: 'Grave Abafado', p_emptyHall: 'Salão Vazio', p_outParty: 'Festa na Rua', p_backstage: 'Bastidores',
      p_walkman: 'Walkman Anos 90', p_radio: 'Rádio (Limpo)', p_radioClean: 'Rádio Velho (Limpo)', p_amRadio: 'Rádio AM', 
      p_vinyl: 'Vinil Antigo', p_vhs: 'Fita VHS Nostálgica', p_tape: 'Lo-fi Fita Cassete', p_underwater: 'Submerso', 
      p_phone: 'Telefone 8D', p_oldTv: 'TV de Tubo', p_megaphone: 'Megafone Distorcido', p_spaceComms: 'Comunicação Espacial',
      p_brokSpeak: 'Alto-falante Quebrado', p_oldTape: 'Fita Desgastada', p_vinTv: 'TV Vintage',
      p_custom: 'Personalizado...',
      tabSpace: 'Espaço', tabTone: 'Tom', tabFx: 'Efeitos', tabMind: 'Mente', tabRec: 'Gravar',
      engine3d: 'Engine 3D', modeHrtf: 'Binaural HRTF', modeSurround: 'Surround 3-Bandas', modeStereo: 'Estéreo Simples',
      path: 'Trajetória', pathOrbit: 'Órbita Circular', pathFig8: 'Figura em 8', pathDrift: 'Wander',
      pathZigzag: 'Zigue-zague', pathChaos: 'Caos Total', pathSpiral: 'Espiral',
      pathVortex: 'Vórtice 3D', pathStage: 'Palco Frontal', pathStadium: 'Estádio 360',
      pathHeartbeat: 'Pulso Cardíaco', pathPendulum: 'Pêndulo', pathHalo: 'Halo',
      spinDir: 'Lado / Direção', dirCw: 'Direita', dirCcw: 'Esquerda', dirPing: 'Vai e Volta',
      depth: 'Profundidade', speed: 'Velocidade', playbackSpeed: 'Música: Velocidade', bass: 'Graves', treble: 'Agudos', warmth: 'Calor', room: 'Reverb', reverbType: 'Tipo de reverb',
      rvClassic: 'Sala Clássica', rvHall: 'Salão', rvCathedral: 'Catedral', rvSpace: 'Espaço Profundo',
      character: 'Filtro Acústico', chOff: 'Desligado', chWalkman: 'Walkman Anos 90', chRadio: 'Rádio (Limpo)', chRadioNoise: 'Rádio (Chiado)',
      chRadioAm: 'Rádio AM', chVinyl: 'Vinil Antigo', chTape: 'Fita Cassete', chVhs: 'Fita VHS', chGramophone: 'Gramofone', chPhone: 'Telefone',
      chUnderwater: 'Submerso', chMuffled: 'Abafado (Festa)', chBathroom: 'Banheiro', chHallway: 'Corredor',
      chOldTv: 'TV de Tubo', chMegaphone: 'Megafone',
      charAmount: 'Intensidade do filtro', charTone: 'Ajuste de Tom', charDrive: 'Distorção / Válvula', charNoise: 'Ruídos e Estalos',
      ethereal: 'Etéreo (Chorus)', echo: 'Eco Ping-Pong', tide: 'Maré (Filtro)',
      ambience: 'Som Ambiente', ambRain: 'Chuva', ambOcean: 'Ondas do Mar', ambWind: 'Vento', ambBrown: 'Ruído Marrom', ambDrone: 'Drone Cósmico', ambVol: 'Volume do Ambiente',
      binaural: 'Ondas Binaurais', mentalState: 'Estado Mental', bFocus: 'Foco Extremo (Beta)', bRelax: 'Relaxamento (Alfa)', bMeditate: 'Meditação (Teta)', bSleep: 'Sono Profundo (Delta)',
      binauralHint: 'Use fones de ouvido para as ondas binaurais.',
      outFormat: 'Formato de Saída',
      fmtWav: 'WAV (Sem Compressão)', fmtWebm: 'Áudio Leve (M4A / WebM)',
      saveBtn: 'Salvar no computador', kofi: 'Apoie no Ko-fi', reset: 'Restaurar padrões',
      stOff: 'Bypass', stOn: 'Processando', stRec: 'Gravando', stManual: 'Posição Fixa', wait: 'Aguarde...',
      needEngine: 'Ligue o motor primeiro', recDone: 'Gravação concluída! Clique em Salvar', recFail: 'Erro ao gravar',
      saving: 'Salvando...', binOn: 'Ondas ativas', binOff: 'Frequências de fundo', moved: 'Efeito movido para esta aba', errPrefix: 'Erro: ',
      e_NO_TAB: 'Nenhuma aba ativa encontrada.', e_RESTRICTED_PAGE: 'O Chrome não permite capturar o áudio desta página.',
      e_NO_STREAM_ID: 'Não foi possível obter o áudio. Tente recarregar a página.', e_ENGINE_TIMEOUT: 'O motor não respondeu. Tente novamente.',
      e_ENGINE_NOT_READY: 'O motor de áudio não está ligado.', e_ALREADY_RECORDING: 'Já existe uma gravação em andamento.', e_NO_RECORDING: 'Nenhuma gravação disponível.',
      e_NO_ENGINE: 'O motor não respondeu. Desligue e ligue de novo.',
      updateAvail: 'Nova versão ({v}) disponível! Clique aqui.'
    },
    en: {
      powerTitle: 'Turn the engine on / off', unlockOrbit: 'Resume spin',
      moveText: 'Effect is running on another tab.', moveBtn: 'Use this tab',
      preset: 'Preset', grpClassic: 'Classics', grpRelax: 'Relaxing', grpRetro: 'Retro & Radio',
      grpCustom: 'My Saved Presets', btnSavePre: 'Save', btnExportPre: 'Export', btnImportPre: 'Import',
      mdlSaveTitle: 'Name your Preset', mdlCancel: 'Cancel', mdlSave: 'Save', mdlClose: 'Close', mdlCopy: 'Copy',
      mdlImportTitle: 'Import Code', mdlImportBtn: 'Load', mdlExportTitle: 'Your Magic Code',
      grpParty: 'Party / Room',
      smartVol: 'Smart Volume', smartVolSub: 'Protects against distortion',
      p_8d: 'Classic 8D', p_8dExt: 'Extreme 8D', p_8dWide: 'Super Wide 8D', p_echoChamber: 'Echo Chamber', p_binPan: 'Binaural Panner',
      p_slowedReverb: 'Slowed + Reverb', p_nightcore: 'Speed Up / Nightcore', 
      p_slow: 'Slow Ambient', p_fast: 'Fast Spin', p_stadium: '360 Live Stadium', p_stage: 'Front Live Stage', 
      p_cinematic: 'Cinematic', p_vortex: '3D Vortex', p_center: 'Center Focus', p_bounce: 'Dynamic Bounce', 
      p_bass: 'Bass Boosted', p_concert: 'Concert Hall', p_studio: 'Studio Monitor', p_asmr: 'ASMR (Whisper)', 
      p_cosmic: 'Cosmic Drift', p_nebula: 'Nebula', p_ocean: 'Deep Ocean', p_rain: 'Night Rain', 
      p_sleep: 'Deep Sleep', p_forest: 'Forest Walk', p_zen: 'Zen Temple', p_campfire: 'Night Campfire', 
      p_floating: 'Floating in Space', p_lullaby: 'Soft Lullaby', p_astral: 'Astral Projection', p_cave: 'Crystal Cave',
      p_stream: 'Serene Stream', p_chimes: 'Wind Chimes', p_mountain: 'Mountain Top',
      p_muffled: 'Party Next Door', p_bathroom: 'Party Bathroom', p_hallway: 'Event Hallway', p_clubOut: 'Club Line', 
      p_neighbor: 'Loud Neighbor', p_basement: 'Basement Party', p_trunk: 'Trunk Music', p_emptyClub: 'Empty Club',
      p_distClub: 'Distant Club', p_muffBass: 'Muffled Bass', p_emptyHall: 'Empty Hall', p_outParty: 'Outside Party', p_backstage: 'Backstage',
      p_walkman: '90s Walkman', p_radio: 'Old Radio (noisy)', p_radioClean: 'Old Radio (clean)', p_amRadio: '50s AM Radio', 
      p_vinyl: 'Vinyl Night', p_vhs: 'Nostalgic VHS Tape', p_tape: 'Lo-fi Cassette Tape', p_underwater: 'Underwater', 
      p_phone: 'Telephone 8D', p_oldTv: 'Analog Tube TV', p_megaphone: 'Distorted Megaphone', p_spaceComms: 'Space Communications',
      p_brokSpeak: 'Broken Speaker', p_oldTape: 'Worn Out Tape', p_vinTv: 'Vintage TV',
      p_custom: 'Custom...',
      tabSpace: 'Space', tabTone: 'Tone', tabFx: 'Effects', tabMind: 'Mind', tabRec: 'Record',
      engine3d: '3D Engine', modeHrtf: 'Binaural HRTF', modeSurround: '3-Band Surround', modeStereo: 'Simple Stereo',
      path: 'Path', pathOrbit: 'Circular Orbit', pathFig8: 'Figure 8', pathDrift: 'Wander',
      pathZigzag: 'Zigzag', pathChaos: 'Total Chaos', pathSpiral: 'Spiral',
      pathVortex: '3D Vortex', pathStage: 'Front Stage', pathStadium: '360 Arena',
      pathHeartbeat: 'Heartbeat Pulse', pathPendulum: 'Pendulum', pathHalo: 'Halo',
      spinDir: 'Direction', dirCw: 'Right', dirCcw: 'Left', dirPing: 'Ping-Pong',
      depth: 'Depth', speed: 'Speed', playbackSpeed: 'Music Speed', bass: 'Bass', treble: 'Treble', warmth: 'Warmth', room: 'Reverb', reverbType: 'Reverb type',
      rvClassic: 'Classic Room', rvHall: 'Hall', rvCathedral: 'Cathedral', rvSpace: 'Deep Space',
      character: 'Acoustic Filter', chOff: 'Off', chWalkman: '90s Walkman', chRadio: 'Old Radio (clean)', chRadioNoise: 'Old Radio (static)',
      chRadioAm: '50s AM Radio', chVinyl: 'Old Vinyl', chTape: 'Cassette Tape', chVhs: 'Old VHS Tape', chGramophone: 'Classic Gramophone', chPhone: 'Smooth Telephone',
      chUnderwater: 'Underwater', chMuffled: 'Muffled (Party)', chBathroom: 'Bathroom', chHallway: 'Hallway',
      chOldTv: 'Analog Tube TV', chMegaphone: 'Distorted Megaphone',
      charAmount: 'Filter intensity', charTone: 'Tone Adjust', charDrive: 'Tube Drive', charNoise: 'Static & Crackle',
      ethereal: 'Ethereal (Chorus)', echo: 'Ping-Pong Echo', tide: 'Tide (Filter)',
      ambience: 'Ambient Sound', ambRain: 'Rain', ambOcean: 'Ocean Waves', ambWind: 'Wind', ambBrown: 'Brown Noise', ambDrone: 'Cosmic Drone', ambVol: 'Ambient Volume',
      binaural: 'Binaural Beats', mentalState: 'Mental State', bFocus: 'Extreme Focus (Beta)', bRelax: 'Relaxation (Alpha)', bMeditate: 'Meditation (Theta)', bSleep: 'Deep Sleep (Delta)',
      binauralHint: 'Use headphones for binaural beats.',
      outFormat: 'Output Format',
      fmtWav: 'WAV (Uncompressed)', fmtWebm: 'Compact Audio (WebM)',
      saveBtn: 'Save to computer', kofi: 'Support on Ko-fi', reset: 'Reset parameters',
      stOff: 'Bypass', stOn: 'Processing', stRec: 'Recording', stManual: 'Locked Pos', wait: 'Please wait...',
      needEngine: 'Turn the engine on first', recDone: 'Recording finished! Click Save', recFail: 'Recording error',
      saving: 'Saving...', binOn: 'Beats active', binOff: 'Background brainwaves', moved: 'Effect moved to this tab', errPrefix: 'Error: ',
      e_NO_TAB: 'No active tab found.', e_RESTRICTED_PAGE: 'Chrome does not allow capturing audio from this page.',
      e_NO_STREAM_ID: 'Could not get the audio. Try reloading the page.', e_ENGINE_TIMEOUT: 'The audio engine did not respond.',
      e_ENGINE_NOT_READY: 'The audio engine is not running.', e_ALREADY_RECORDING: 'A recording is already in progress.', e_NO_RECORDING: 'No recording available.',
      e_NO_ENGINE: 'The audio engine did not respond. Turn it off and on again.',
      updateAvail: 'New version ({v}) available! Click here.'
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
  const smartVolumeToggle = $('smartVolumeToggle');
  const recordFormat = $('recordFormat');
  const recordBtn = $('recordBtn'), recordBtnText = $('recordBtnText'), recordTimer = $('recordTimer'), downloadBtn = $('downloadBtn');
  let customPresets = {};
  const DEFAULTS = {
    intensity: 100, speed: 15, playbackSpeed: 100, direction: 'cw', manualMode: false, manualX: 0, manualZ: -1,
    bass: 40, clarity: 50, reverb: 25, warmth: 0, chorus: 0, echo: 0, waves: 0,
    character: 'off', characterAmount: 100, charTone: 60, charDrive: 25, charNoise: 35,
    reverbType: 'classic', ambience: 'off', ambienceVol: 35, spatialMode: 'hrtf', hrtfPath: 'orbit', smartVolume: false
  };
  const CHAR_PRESET_TUNING = {
    'walkman': { charTone: 75, charDrive: 20, charNoise: 25 }, 'radio': { charTone: 65, charDrive: 22, charNoise: 10 },
    'radio-noise': { charTone: 60, charDrive: 25, charNoise: 45 }, 'radio-am': { charTone: 45, charDrive: 30, charNoise: 40 },
    'vinyl': { charTone: 80, charDrive: 18, charNoise: 50 }, 'tape': { charTone: 70, charDrive: 25, charNoise: 25 },
    'vhs': { charTone: 55, charDrive: 30, charNoise: 35 }, 'gramophone': { charTone: 40, charDrive: 35, charNoise: 50 },
    'phone': { charTone: 55, charDrive: 25, charNoise: 10 }, 'underwater': { charTone: 20, charDrive: 10, charNoise: 0 },
    'muffled': { charTone: 30, charDrive: 5, charNoise: 0 }, 'bathroom': { charTone: 15, charDrive: 5, charNoise: 0 },
    'hallway': { charTone: 25, charDrive: 5, charNoise: 0 },
    'old-tv': { charTone: 50, charDrive: 20, charNoise: 20 }, 'megaphone': { charTone: 80, charDrive: 40, charNoise: 15 }
  };
  const PRESETS = {
    '8d-rotation': { ...DEFAULTS },
    '8d-extreme': { ...DEFAULTS, intensity: 100, speed: 25, reverb: 30, bass: 50, clarity: 60, hrtfPath: 'figure8' },
    '8d-wide': { ...DEFAULTS, intensity: 100, speed: 12, hrtfPath: 'figure8', chorus: 15, reverb: 20 },
    'echo-chamber': { ...DEFAULTS, echo: 60, reverb: 80, reverbType: 'cathedral', intensity: 30 },
    'binaural-pan': { ...DEFAULTS, spatialMode: 'standard', intensity: 100, speed: 15 },
    'slowed-reverb': { ...DEFAULTS, playbackSpeed: 82, intensity: 40, speed: 5, bass: 55, clarity: 30, reverb: 65, reverbType: 'hall', warmth: 15 },
    'nightcore': { ...DEFAULTS, playbackSpeed: 125, intensity: 60, speed: 20, bass: 45, clarity: 60, reverb: 15 },
    'slow-ambient': { ...DEFAULTS, intensity: 60, speed: 5, bass: 30, clarity: 30, reverb: 50 },
    'fast-spin': { ...DEFAULTS, intensity: 100, speed: 80, bass: 50, clarity: 50, reverb: 15 },
    'live-stadium': { ...DEFAULTS, intensity: 95, speed: 12, bass: 65, clarity: 60, reverb: 65, hrtfPath: 'stadium', reverbType: 'hall', echo: 20 },
    'front-stage': { ...DEFAULTS, intensity: 80, speed: 10, bass: 45, clarity: 60, reverb: 35, hrtfPath: 'stage', reverbType: 'hall' },
    'cinematic': { ...DEFAULTS, intensity: 60, speed: 4, bass: 70, clarity: 50, reverb: 85, reverbType: 'cathedral', echo: 10 },
    'vortex-3d': { ...DEFAULTS, intensity: 100, speed: 22, bass: 50, clarity: 55, reverb: 45, hrtfPath: 'vortex', reverbType: 'space', chorus: 25 },
    'center-focus': { ...DEFAULTS, intensity: 0, speed: 0, bass: 0, clarity: 0, reverb: 0, spatialMode: 'standard' },
    'bounce': { ...DEFAULTS, intensity: 80, speed: 30, bass: 40, clarity: 40, reverb: 20, hrtfPath: 'figure8', direction: 'pingpong' },
    'bass-boost': { ...DEFAULTS, intensity: 70, speed: 10, bass: 85, clarity: 30, reverb: 15, spatialMode: 'surround', smartVolume: true },
    'concert-hall': { ...DEFAULTS, intensity: 50, speed: 8, bass: 30, clarity: 60, reverb: 70, reverbType: 'hall' },
    'studio': { ...DEFAULTS, intensity: 0, speed: 0, bass: 20, clarity: 70, reverb: 10, spatialMode: 'standard' },
    'asmr-whisper': { ...DEFAULTS, intensity: 80, speed: 5, bass: 20, clarity: 80, reverb: 5, spatialMode: 'hrtf', hrtfPath: 'orbit', smartVolume: true },
    
    'cosmic-drift': { ...DEFAULTS, intensity: 85, speed: 6, bass: 35, clarity: 45, reverb: 55, hrtfPath: 'spiral', reverbType: 'space', chorus: 35, echo: 25, warmth: 30, waves: 20, ambience: 'drone', ambienceVol: 25 },
    'nebula': { ...DEFAULTS, intensity: 70, speed: 8, bass: 30, clarity: 55, reverb: 60, hrtfPath: 'halo', reverbType: 'space', chorus: 55, echo: 40, warmth: 20 },
    'deep-ocean': { ...DEFAULTS, intensity: 60, speed: 5, bass: 45, clarity: 25, reverb: 45, hrtfPath: 'pendulum', reverbType: 'hall', chorus: 25, echo: 15, warmth: 55, waves: 60, ambience: 'ocean', ambienceVol: 40 },
    'night-rain': { ...DEFAULTS, intensity: 50, speed: 4, bass: 30, clarity: 30, reverb: 40, hrtfPath: 'drift', reverbType: 'hall', chorus: 20, echo: 10, warmth: 45, waves: 10, ambience: 'rain', ambienceVol: 45 },
    'deep-sleep': { ...DEFAULTS, intensity: 40, speed: 3, bass: 35, clarity: 10, reverb: 50, hrtfPath: 'pendulum', reverbType: 'cathedral', chorus: 30, echo: 20, warmth: 80, waves: 30, ambience: 'brown', ambienceVol: 35 },
    'forest-walk': { ...DEFAULTS, ambience: 'wind', ambienceVol: 30, warmth: 20, reverb: 40, hrtfPath: 'drift', speed: 2 },
    'zen-temple': { ...DEFAULTS, ambience: 'drone', ambienceVol: 40, warmth: 60, reverb: 75, reverbType: 'cathedral', bass: 50, clarity: 30 },
    'campfire': { ...DEFAULTS, ambience: 'brown', ambienceVol: 50, warmth: 70, reverb: 15, hrtfPath: 'pendulum' },
    'floating': { ...DEFAULTS, chorus: 60, reverb: 70, reverbType: 'space', echo: 30, intensity: 100, speed: 3 },
    'soft-lullaby': { ...DEFAULTS, warmth: 85, bass: 40, clarity: 10, reverb: 50, hrtfPath: 'halo', speed: 2 },
    'astral': { ...DEFAULTS, reverb: 90, reverbType: 'space', chorus: 50, echo: 40, warmth: 20, intensity: 80, speed: 5 },
    'cave': { ...DEFAULTS, reverb: 85, reverbType: 'cathedral', bass: 60, clarity: 20, warmth: 50, intensity: 40, speed: 4 },
    'stream': { ...DEFAULTS, ambience: 'ocean', ambienceVol: 30, warmth: 30, reverb: 40 },
    'chimes': { ...DEFAULTS, ambience: 'wind', ambienceVol: 20, clarity: 70, reverb: 50, echo: 10 },
    'mountain': { ...DEFAULTS, ambience: 'wind', ambienceVol: 45, reverb: 60, reverbType: 'hall', clarity: 60 },

    'party-next-door': { ...DEFAULTS, intensity: 50, speed: 4, bass: 75, clarity: 10, reverb: 35, reverbType: 'hall', character: 'muffled', characterAmount: 100, charTone: 20, charDrive: 5, charNoise: 0, smartVolume: true },
    'party-bathroom': { ...DEFAULTS, intensity: 40, speed: 3, bass: 60, clarity: 15, reverb: 85, reverbType: 'classic', character: 'bathroom', characterAmount: 100, charTone: 15, charDrive: 5, charNoise: 0, smartVolume: true },
    'party-hallway': { ...DEFAULTS, intensity: 60, speed: 5, bass: 65, clarity: 20, reverb: 50, reverbType: 'hall', character: 'hallway', characterAmount: 100, charTone: 25, charDrive: 5, charNoise: 0, smartVolume: true },
    'club-outside': { ...DEFAULTS, character: 'muffled', characterAmount: 100, charTone: 10, bass: 90, clarity: 0, reverb: 40, reverbType: 'hall', smartVolume: true },
    'neighbor-bass': { ...DEFAULTS, character: 'muffled', characterAmount: 100, charTone: 5, bass: 100, clarity: 0, reverb: 10, smartVolume: true },
    'basement-party': { ...DEFAULTS, character: 'bathroom', characterAmount: 100, charTone: 20, bass: 80, clarity: 10, reverb: 60, reverbType: 'classic', smartVolume: true },
    'trunk-music': { ...DEFAULTS, character: 'muffled', characterAmount: 100, charTone: 10, charDrive: 60, bass: 95, clarity: 0, reverb: 15, smartVolume: true },
    'empty-club': { ...DEFAULTS, character: 'hallway', characterAmount: 100, charTone: 40, bass: 70, clarity: 25, reverb: 90, reverbType: 'hall' },
    'distant-club': { ...DEFAULTS, character: 'muffled', characterAmount: 100, charTone: 15, bass: 85, clarity: 5, reverb: 45, smartVolume: true },
    'muffled-bass': { ...DEFAULTS, character: 'hallway', characterAmount: 100, charTone: 5, bass: 100, clarity: 0, smartVolume: true },
    'empty-hall': { ...DEFAULTS, character: 'bathroom', characterAmount: 100, charTone: 30, reverb: 95, reverbType: 'hall', bass: 70, clarity: 30 },
    'outside-party': { ...DEFAULTS, character: 'muffled', characterAmount: 80, charTone: 20, bass: 80, clarity: 15, reverb: 30, smartVolume: true },
    'backstage': { ...DEFAULTS, character: 'hallway', characterAmount: 90, charTone: 25, bass: 75, clarity: 10, reverb: 40, smartVolume: true },

    'walkman-90s': { ...DEFAULTS, intensity: 80, speed: 12, bass: 50, clarity: 45, reverb: 20, character: 'walkman', characterAmount: 90, charTone: 75, charDrive: 20, charNoise: 25 },
    'old-radio': { ...DEFAULTS, intensity: 90, speed: 10, bass: 30, clarity: 40, reverb: 20, character: 'radio-noise', characterAmount: 90, charTone: 60, charDrive: 25, charNoise: 45 },
    'old-radio-clean': { ...DEFAULTS, intensity: 90, speed: 10, bass: 30, clarity: 40, reverb: 20, character: 'radio', characterAmount: 90, charTone: 65, charDrive: 22, charNoise: 10 },
    'am-radio': { ...DEFAULTS, intensity: 80, speed: 9, bass: 30, clarity: 35, reverb: 22, character: 'radio-am', characterAmount: 90, charTone: 45, charDrive: 30, charNoise: 40 },
    'vinyl-night': { ...DEFAULTS, intensity: 60, speed: 6, bass: 45, clarity: 25, reverb: 35, hrtfPath: 'drift', reverbType: 'hall', chorus: 15, warmth: 35, character: 'vinyl', characterAmount: 90, charTone: 80, charDrive: 18, charNoise: 50 },
    'vhs-tape': { ...DEFAULTS, intensity: 70, speed: 8, bass: 45, clarity: 30, reverb: 30, chorus: 25, character: 'vhs', characterAmount: 90, charTone: 55, charDrive: 30, charNoise: 35 },
    'lofi-tape': { ...DEFAULTS, intensity: 55, speed: 5, bass: 50, clarity: 30, reverb: 30, hrtfPath: 'pendulum', reverbType: 'hall', warmth: 25, character: 'tape', characterAmount: 90, charTone: 70, charDrive: 25, charNoise: 25, ambience: 'rain', ambienceVol: 25 },
    'underwater-8d': { ...DEFAULTS, intensity: 75, speed: 6, bass: 60, clarity: 15, reverb: 55, hrtfPath: 'spiral', reverbType: 'space', waves: 45, character: 'underwater', characterAmount: 95, charTone: 20, charDrive: 10, charNoise: 0 },
    'phone-8d': { ...DEFAULTS, intensity: 100, speed: 20, bass: 20, clarity: 50, reverb: 10, hrtfPath: 'figure8', character: 'phone', characterAmount: 90, charTone: 55, charDrive: 25, charNoise: 10 },
    'old-tv': { ...DEFAULTS, character: 'old-tv', characterAmount: 95, charTone: 50, charDrive: 20, charNoise: 20 },
    'megaphone': { ...DEFAULTS, character: 'megaphone', characterAmount: 100, charTone: 80, charDrive: 40, charNoise: 15 },
    'space-comms': { ...DEFAULTS, character: 'radio-noise', characterAmount: 100, charTone: 70, charDrive: 30, charNoise: 60, echo: 40, reverb: 50 },
    'broken-speaker': { ...DEFAULTS, character: 'megaphone', characterAmount: 100, charTone: 70, charDrive: 60, charNoise: 30 },
    'old-tape': { ...DEFAULTS, character: 'tape', characterAmount: 100, charTone: 50, charDrive: 40, charNoise: 60 },
    'vintage-tv': { ...DEFAULTS, character: 'old-tv', characterAmount: 100, charTone: 45, charDrive: 25, charNoise: 35 }
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
    params.binaural = binauralToggle.checked; params.smartVolume = smartVolumeToggle.checked; params.manualMode = manualMode; params.manualX = manualX; params.manualZ = manualZ;
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
    if (params.smartVolume !== undefined) smartVolumeToggle.checked = !!params.smartVolume;
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
  function updateCustomPresetsDropdown() {
    const group = $('myPresetsGroup');
    group.innerHTML = '';
    const keys = Object.keys(customPresets);
    if (keys.length === 0) {
      group.style.display = 'none';
    } else {
      group.style.display = 'block';
      keys.forEach(name => {
        const opt = document.createElement('option');
        opt.value = 'my_' + name;
        opt.textContent = name;
        group.appendChild(opt);
      });
    }
  }
  function showModal(id) {
    $('modalOverlay').classList.add('show');
    document.querySelectorAll('.modal-box').forEach(m => m.classList.remove('show'));
    $(id).classList.add('show');
  }
  function hideModals() {
    $('modalOverlay').classList.remove('show');
  }
  document.querySelectorAll('.modal-close').forEach(btn => { btn.addEventListener('click', hideModals); });
  $('btnSavePreset').addEventListener('click', () => { $('presetNameInput').value = ''; showModal('modalSave'); });
  $('btnConfirmSave').addEventListener('click', () => {
    const name = $('presetNameInput').value.trim();
    if (!name) return;
    customPresets[name] = readParams();
    chrome.storage.local.set({ headspace_custom: customPresets });
    updateCustomPresetsDropdown();
    presetSelect.value = 'my_' + name;
    chrome.storage.local.set({ headspace_preset: presetSelect.value });
    hideModals();
  });
  $('btnExportPreset').addEventListener('click', () => {
    const params = readParams();
    const jsonStr = JSON.stringify(params);
    const code = 'HSP_' + btoa(jsonStr);
    $('exportCodeOutput').value = code;
    showModal('modalExport');
  });
  $('btnCopyExport').addEventListener('click', () => {
    const area = $('exportCodeOutput');
    area.select(); document.execCommand('copy');
    $('btnCopyExport').textContent = 'OK';
    setTimeout(() => { $('btnCopyExport').textContent = t('mdlCopy'); }, 2000);
  });
  $('btnImportPreset').addEventListener('click', () => { $('importCodeInput').value = ''; showModal('modalImport'); });
  $('btnConfirmImport').addEventListener('click', () => {
    const code = $('importCodeInput').value.trim();
    if (code.startsWith('HSP_')) {
      try {
        const jsonStr = atob(code.replace('HSP_', ''));
        const params = JSON.parse(jsonStr);
        const randomName = "Importado " + Math.floor(Math.random() * 1000);
        customPresets[randomName] = params;
        chrome.storage.local.set({ headspace_custom: customPresets });
        updateCustomPresetsDropdown();
        presetSelect.value = 'my_' + randomName;
        chrome.storage.local.set({ headspace_preset: presetSelect.value });
        writeParamsToUI(params);
        pushParams();
        hideModals();
      } catch (e) { $('importCodeInput').value = 'ERRO!'; }
    } else { $('importCodeInput').value = 'ERRO!'; }
  });
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
    const val = presetSelect.value; 
    chrome.storage.local.set({ headspace_preset: val });
    manualMode = false;
    if (val.startsWith('my_')) {
      const name = val.replace('my_', '');
      if (customPresets[name]) { writeParamsToUI(customPresets[name]); pushParams(); }
    } else if (PRESETS[val]) {
      writeParamsToUI(PRESETS[val]); pushParams();
    }
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
  binauralToggle.addEventListener('change', () => { updateBinauralUI(); markCustom(); pushParams(); });
  smartVolumeToggle.addEventListener('change', () => { markCustom(); pushParams(); });
  selects.binauralPreset.addEventListener('change', pushParams);
  resetBtn.addEventListener('click', () => {
    presetSelect.value = '8d-rotation'; binauralToggle.checked = false; smartVolumeToggle.checked = false; selects.binauralPreset.value = 'focus'; manualMode = false;
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
    const stored = await chrome.storage.local.get(['headspace_params', 'headspace_preset', 'headspace_extras', 'headspace_lang', 'headspace_custom']);
    if (stored.headspace_custom) {
      customPresets = stored.headspace_custom;
      updateCustomPresetsDropdown();
    }
    if (stored.headspace_lang) applyLanguage(stored.headspace_lang);
    const saved = { ...DEFAULTS, ...(stored.headspace_params || {}) };
    if (stored.headspace_extras) {
      if (saved.binaural === undefined) saved.binaural = !!stored.headspace_extras.binaural;
      if (!stored.headspace_params || !stored.headspace_params.binauralPreset) saved.binauralPreset = stored.headspace_extras.binauralPreset || 'focus';
    }
    writeParamsToUI(saved);
    const savedPreset = stored.headspace_preset;
    if (savedPreset) {
      if (savedPreset.startsWith('my_') && customPresets[savedPreset.replace('my_', '')]) {
        presetSelect.value = savedPreset;
      } else if (Array.from(presetSelect.options).some((o) => o.value === savedPreset)) {
        presetSelect.value = savedPreset;
      }
    }
    await syncStatus();
    const localVer = chrome.runtime.getManifest().version;
    const vDisp = $('versionDisplay');
    if (vDisp) vDisp.textContent = 'v' + localVer;
    fetch('https://raw.githubusercontent.com/JohnIohananDev/headspace-8d.EXT/main/manifest.json', { cache: 'no-store' })
      .then((r) => r.json())
      .then((rem) => {
        const rv = rem.version.split('.').map(Number);
        const lv = localVer.split('.').map(Number);
        let newer = false;
        for (let i = 0; i < Math.max(rv.length, lv.length); i++) {
          const a = rv[i] || 0, b = lv[i] || 0;
          if (a > b) { newer = true; break; }
          if (a < b) break;
        }
        if (newer) {
          const banner = $('updateBanner');
          if (banner) {
            banner.textContent = t('updateAvail').replace('{v}', rem.version);
            banner.href = 'https://github.com/JohnIohananDev/headspace-8d.EXT';
            banner.style.display = 'block';
          }
        }
      }).catch(() => {});
  })();
});
