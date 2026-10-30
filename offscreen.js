let audioCtx = null;
let mediaStream = null;
let sourceNode = null;
let inputGain, subBass, bassShelf, clarity, air;
let panner, standardGain;
let surroundPanner, surroundLow, surroundLowGain, surroundGain;
let hrtfSplitter, hrtfPannerL, hrtfPannerR, hrtfBassComp, hrtfGain;
let modeSum;
let warmthLP;
let tideLP, tideLfo, tideDepth;
let charDryDelay, charDry, charHP, charLP, charPeak, charSmoothLP, charShaper, charCompGain;
let charVibDelay, charVibLfo, charVibDepth, charWet, charOut;
let charHissSrc, charHissHP, charHissLP, charHissGain, charPopSrc, charPopHP, charPopGain, charNoiseOut;
let chorusSplit, chorusDelayL, chorusDelayR;
let chorusLfoL, chorusLfoR, chorusDepthL, chorusDepthR;
let chorusMerge, chorusWet, chorusDry, chorusSum;
let echoIn, echoDelayL, echoDelayR, echoFbL, echoFbR, echoLP, echoPanL, echoPanR, echoOut;
let fxSum;
let ambSource, ambFilterA, ambFilterB, ambMod, ambLevel, ambLfo, ambLfoDepth;
let droneEnable, droneLP, droneLfo, droneLfoDepth;
let droneOscs = [];
let convolver = null, dryGain, wetGain;
let compressor, softClip, outputClamp, outputGain;
let loadedReverbType = null;
let irCache = {};
let recordingDestination;
let binauralMerger, binauralGain, binOscL, binOscR;
let hrtfTimer = null;
let lastFrameTime = 0;
let visualizerPhase = 0;
let lastPos = { x: 0, z: -1 };
let isRecording = false;
let isStopping = false;
let mediaRecorder = null;
let recordedChunks = [];
let lastRecordedBlob = null;
let lastRecordingUrl = null;
let lastFormat = null;
let lastFileExt = 'webm';
let lastCustomTitle = 'HeadSpace';
let recordEpoch = 0;
let wavProcessor = null;
let wavSink = null;
let wavChunks = [];
let wavSampleRate = 48000;

const DEFAULT_PARAMS = {
  intensity: 100, speed: 15, direction: 'cw', manualMode: false, manualX: 0, manualZ: -1,
  bass: 40, clarity: 50, reverb: 25, warmth: 0, chorus: 0, echo: 0, waves: 0,
  character: 'off', characterAmount: 100, charTone: 60, charDrive: 25, charNoise: 35,
  reverbType: 'classic', ambience: 'off', ambienceVol: 35,
  spatialMode: 'hrtf', hrtfPath: 'orbit', binaural: false, binauralPreset: 'focus',
  smartVolume: false
};
let currentParams = { ...DEFAULT_PARAMS };

const BINAURAL_FREQS = { focus: { c: 220, b: 15 }, relax: { c: 210, b: 10 }, meditate: { c: 200, b: 6 }, sleep: { c: 180, b: 3 } };
const REVERB_TYPES = { classic: { duration: 2.5, rt60: 1.8, damp: 0.78 }, hall: { duration: 4.5, rt60: 3.4, damp: 0.82 }, cathedral: { duration: 7.0, rt60: 5.5, damp: 0.86 }, space: { duration: 9.0, rt60: 7.5, damp: 0.92 } };
const AMBIENCE = {
  rain: { kind: 'noise', a: { type: 'highpass', f: 900, q: 0.5 }, b: { type: 'lowpass', f: 9000, q: 0.5 }, gain: 1.4, swell: 0.08, swellHz: 0.17 },
  ocean: { kind: 'noise', a: { type: 'lowpass', f: 700, q: 0.4 }, b: { type: 'lowpass', f: 1400, q: 0.3 }, gain: 2.4, swell: 0.85, swellHz: 0.09 },
  wind: { kind: 'noise', a: { type: 'bandpass', f: 550, q: 0.8 }, b: { type: 'lowpass', f: 2500, q: 0.3 }, gain: 3.2, swell: 0.6, swellHz: 0.13 },
  brown: { kind: 'noise', a: { type: 'lowpass', f: 380, q: 0.5 }, b: { type: 'lowpass', f: 600, q: 0.3 }, gain: 2.5, swell: 0, swellHz: 0.05 },
  drone: { kind: 'drone' }
};
const AMBIENCE_LEVEL = 1.6;
const DRONE_VOICES = [[55.0, 0.30], [82.41, 0.22], [110.0, 0.18], [164.81, 0.10], [220.0, 0.05], [277.18, 0.03]];
const CHARACTERS = {
  'radio': { hp: 250, lp: 4200, pf: 850, pg: 2.2, pq: 0.7, drive: 1.3, wob: 0, wobHz: 0.4, hiss: 0.02, pops: 0 },
  'radio-noise': { hp: 270, lp: 3900, pf: 820, pg: 2.0, pq: 0.7, drive: 1.4, wob: 0.0003, wobHz: 0.35, hiss: 0.14, pops: 0.20 },
  'radio-am': { hp: 330, lp: 2800, pf: 750, pg: 2.4, pq: 0.8, drive: 1.5, wob: 0.0004, wobHz: 0.3, hiss: 0.16, pops: 0.15 },
  'walkman': { hp: 65, lp: 7800, pf: 140, pg: 2.4, pq: 0.7, drive: 1.2, wob: 0.0011, wobHz: 0.55, hiss: 0.06, pops: 0.02 },
  'vinyl': { hp: 55, lp: 9500, pf: 380, pg: 1.5, pq: 0.6, drive: 1.1, wob: 0.0005, wobHz: 0.55, hiss: 0.06, pops: 0.45 },
  'phone': { hp: 380, lp: 3400, pf: 920, pg: 2.5, pq: 0.8, drive: 1.5, wob: 0, wobHz: 0.4, hiss: 0.02, pops: 0 },
  'tape': { hp: 50, lp: 6800, pf: 120, pg: 2.0, pq: 0.7, drive: 1.4, wob: 0.0018, wobHz: 0.6, hiss: 0.06, pops: 0.03 },
  'vhs': { hp: 80, lp: 5200, pf: 300, pg: 1.8, pq: 0.7, drive: 1.4, wob: 0.0022, wobHz: 0.45, hiss: 0.09, pops: 0.08 },
  'gramophone': { hp: 400, lp: 2500, pf: 900, pg: 2.6, pq: 0.9, drive: 1.6, wob: 0.0015, wobHz: 0.7, hiss: 0.12, pops: 0.45 },
  'underwater': { hp: 20, lp: 420, pf: 180, pg: 2.5, pq: 0.8, drive: 1.0, wob: 0.0008, wobHz: 0.25, hiss: 0, pops: 0 },
  'muffled': { hp: 40, lp: 350, pf: 100, pg: 0, pq: 1, drive: 0.01, wob: 0, wobHz: 0, hiss: 0, pops: 0 },
  'bathroom': { hp: 100, lp: 250, pf: 100, pg: 0, pq: 1, drive: 0.01, wob: 0, wobHz: 0, hiss: 0, pops: 0 },
  'hallway': { hp: 60, lp: 450, pf: 100, pg: 0, pq: 1, drive: 0.01, wob: 0, wobHz: 0, hiss: 0, pops: 0 }
};
const HRTF_TRIM = 1.35;
const HRTF_SPREAD_RAD = 0.32;

function createSoftClipCurve(threshold = 0.85, ceiling = 0.87, drive = 2.5, n = 2048) {
  const curve = new Float32Array(n), denom = Math.tanh(drive);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1, ax = Math.abs(x);
    if (ax <= threshold) curve[i] = x;
    else { const over = (ax - threshold) / (1 - threshold); curve[i] = Math.sign(x) * (threshold + (ceiling - threshold) * (Math.tanh(over * drive) / denom)); }
  }
  return curve;
}

function createHardClipCurve(ceiling = 0.87, n = 2048) {
  const curve = new Float32Array(n); for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; curve[i] = Math.max(-ceiling, Math.min(ceiling, x)); }
  return curve;
}

function createDriveCurve(drive, n = 1024) {
  const curve = new Float32Array(n), k = Math.max(drive, 0.01), denom = Math.tanh(k);
  for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; curve[i] = drive <= 1.02 ? x : (Math.tanh(k * x) / denom) * 0.92; }
  return curve;
}

function makeReverbIR(ctx, duration = 2.5, rt60 = 1.8, damp = 0.78) {
  const length = Math.floor(ctx.sampleRate * duration); const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  const taps = [[11, 0.62], [17, 0.55], [23, 0.47], [31, 0.40], [41, 0.33], [53, 0.27]];
  const tailStart = 0.055;
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < taps.length; index++) { const [ms, amp] = taps[index]; const sample = Math.floor((ms / 1000) * ctx.sampleRate); if (sample < data.length) data[sample] += amp * (index % 2 === channel ? 1 : 0.28); }
    let lowpass = 0;
    for (let sample = Math.floor(tailStart * ctx.sampleRate); sample < data.length; sample++) {
      const time = sample / ctx.sampleRate, envelope = Math.exp((-6.91 * (time - tailStart)) / rt60);
      lowpass = lowpass * damp + (Math.random() * 2 - 1) * (1 - damp); data[sample] += lowpass * envelope * 0.32;
    }
  }
  return buffer;
}

function getReverbIR(type) {
  const key = REVERB_TYPES[type] ? type : 'classic';
  if (!irCache[key]) { const c = REVERB_TYPES[key]; irCache[key] = makeReverbIR(audioCtx, c.duration, c.rt60, c.damp); }
  return irCache[key];
}

function makeNoiseBuffer(ctx, seconds = 8) {
  const L = Math.floor(ctx.sampleRate * seconds), N = Math.floor(ctx.sampleRate * 0.25); const buffer = ctx.createBuffer(2, L, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const raw = new Float32Array(L + N); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < raw.length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179; b1 = 0.99332 * b1 + white * 0.0750759; b2 = 0.96900 * b2 + white * 0.1538520; b3 = 0.86650 * b3 + white * 0.3104856; b4 = 0.55000 * b4 + white * 0.5329522; b5 = -0.7616 * b5 - white * 0.0168980; raw[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08; b6 = white * 0.115926;
    }
    const out = buffer.getChannelData(ch);
    for (let i = 0; i < L; i++) { if (i < N) { const t = i / N; out[i] = raw[i] * Math.sqrt(t) + raw[L + i] * Math.sqrt(1 - t); } else out[i] = raw[i]; }
  }
  return buffer;
}

function makeHissBuffer(ctx, seconds = 4) {
  const L = Math.floor(ctx.sampleRate * seconds); const buffer = ctx.createBuffer(2, L, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = buffer.getChannelData(ch); let prev = 0; for (let i = 0; i < L; i++) { const w = (Math.random() * 2 - 1) * 0.5; prev = prev * 0.70 + w * 0.30; d[i] = prev; } }
  return buffer;
}

function makePopBuffer(ctx, seconds = 6) {
  const L = Math.floor(ctx.sampleRate * seconds); const buffer = ctx.createBuffer(2, L, ctx.sampleRate);
  const burst = Math.floor(ctx.sampleRate * 0.005), tau = ctx.sampleRate * 0.0007;
  for (let ch = 0; ch < 2; ch++) {
    const d = buffer.getChannelData(ch);
    for (let i = 0; i < L; i++) {
      if (Math.random() < 0.00015) {
        const amp = (0.15 + 0.55 * Math.pow(Math.random(), 2)) * (Math.random() < 0.5 ? -1 : 1);
        for (let k = 0; k < burst && i + k < L; k++) d[i + k] += amp * Math.exp(-k / tau) * (Math.random() * 2 - 1);
      }
    }
  }
  return buffer;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen') return false;
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  const reply = (promise) => promise.then((r) => sendResponse(r === undefined ? { success: true } : r)).catch((err) => sendResponse({ error: err.message }));
  switch (message.action) {
    case 'PROCESS_STREAM': reply(startProcessing(message.streamId).then(() => ({ success: true }))); return true;
    case 'STOP_STREAM': reply(stopProcessing().then(() => ({ success: true, hasRecording: !!lastRecordedBlob }))); return true;
    case 'UPDATE_PARAMS': try { applyParams(message.params); sendResponse({ success: true }); } catch (err) { sendResponse({ error: err.message }); } return false;
    case 'GET_STATE': sendResponse({ capturing: !!audioCtx, recording: isRecording, recordStartedAt: isRecording ? recordEpoch : 0, hasRecording: !!lastRecordedBlob }); return false;
    case 'START_RECORDING': reply(startRecording(message.format, message.customTitle).then(() => ({ success: true, startedAt: recordEpoch }))); return true;
    case 'STOP_RECORDING': reply(stopRecording().then(() => ({ success: true, hasRecording: !!lastRecordedBlob }))); return true;
    case 'GET_RECORDING': sendResponse(getRecording()); return false;
  }
  return false;
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'headspace-ui') return;
  const push = () => { try { port.postMessage({ capturing: !!audioCtx, recording: isRecording, x: lastPos.x, z: lastPos.z, manualMode: !!currentParams.manualMode }); } catch (e) {} };
  const timer = setInterval(push, 40);
  port.onDisconnect.addListener(() => { clearInterval(timer); void chrome.runtime.lastError; });
  push();
});

async function startProcessing(streamId) {
  if (audioCtx) await stopProcessing();
  audioCtx = new AudioContext({ latencyHint: 'playback' });
  lastFrameTime = performance.now(); visualizerPhase = 0;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { mandatory: { chromeMediaSource: 'tab', chromeMediaSourceId: streamId } } });
    mediaStream = stream;
    stream.getAudioTracks().forEach((track) => { track.addEventListener('ended', () => { if (mediaStream === stream) stopProcessing(); }); });
    buildGraph();
    if (audioCtx.state === 'suspended') await audioCtx.resume();
  } catch (err) { await stopProcessing(); throw err; }
}

function buildGraph() {
  const hz = (target) => Math.min(target, audioCtx.sampleRate * 0.49);
  sourceNode = audioCtx.createMediaStreamSource(mediaStream);
  inputGain = audioCtx.createGain();
  subBass = audioCtx.createBiquadFilter(); subBass.type = 'peaking'; subBass.frequency.value = hz(70); subBass.Q.value = 0.7;
  bassShelf = audioCtx.createBiquadFilter(); bassShelf.type = 'lowshelf'; bassShelf.frequency.value = hz(140);
  clarity = audioCtx.createBiquadFilter(); clarity.type = 'peaking'; clarity.frequency.value = hz(3500); clarity.Q.value = 1.1;
  air = audioCtx.createBiquadFilter(); air.type = 'highshelf'; air.frequency.value = hz(10000);
  panner = audioCtx.createStereoPanner(); standardGain = audioCtx.createGain();
  surroundPanner = audioCtx.createStereoPanner(); surroundLow = audioCtx.createBiquadFilter(); surroundLow.type = 'lowpass'; surroundLow.frequency.value = hz(240);
  surroundLowGain = audioCtx.createGain(); surroundLowGain.gain.value = 0.25; surroundGain = audioCtx.createGain();
  hrtfSplitter = audioCtx.createChannelSplitter(2);
  const mkHrtfPanner = () => new PannerNode(audioCtx, { panningModel: 'HRTF', distanceModel: 'linear', rolloffFactor: 0, positionX: 0, positionY: 0, positionZ: -1, channelCount: 1, channelCountMode: 'explicit' });
  hrtfPannerL = mkHrtfPanner(); hrtfPannerR = mkHrtfPanner();
  hrtfBassComp = audioCtx.createBiquadFilter(); hrtfBassComp.type = 'peaking'; hrtfBassComp.frequency.value = hz(180); hrtfBassComp.Q.value = 0.7; hrtfBassComp.gain.value = -8;
  hrtfGain = audioCtx.createGain(); modeSum = audioCtx.createGain();
  warmthLP = audioCtx.createBiquadFilter(); warmthLP.type = 'lowpass'; warmthLP.Q.value = 0.5; warmthLP.frequency.value = hz(20000);
  tideLP = audioCtx.createBiquadFilter(); tideLP.type = 'lowpass'; tideLP.Q.value = 0.6; tideLP.frequency.value = hz(20000);
  tideLfo = audioCtx.createOscillator(); tideLfo.frequency.value = 0.08; tideDepth = audioCtx.createGain(); tideDepth.gain.value = 0; tideLfo.connect(tideDepth); tideDepth.connect(tideLP.detune);
  charDryDelay = audioCtx.createDelay(0.05); charDryDelay.delayTime.value = 0.01; charDry = audioCtx.createGain(); charDry.gain.value = 1;
  charHP = audioCtx.createBiquadFilter(); charHP.type = 'highpass'; charHP.frequency.value = 20; charHP.Q.value = 0.65;
  charLP = audioCtx.createBiquadFilter(); charLP.type = 'lowpass'; charLP.frequency.value = hz(20000); charLP.Q.value = 0.65;
  charSmoothLP = audioCtx.createBiquadFilter(); charSmoothLP.type = 'lowpass'; charSmoothLP.frequency.value = hz(12000); charSmoothLP.Q.value = 0.5;
  charPeak = audioCtx.createBiquadFilter(); charPeak.type = 'peaking'; charPeak.frequency.value = 850; charPeak.Q.value = 0.7; charPeak.gain.value = 0;
  charShaper = audioCtx.createWaveShaper(); charShaper.curve = createDriveCurve(1); charShaper.oversample = '2x'; charCompGain = audioCtx.createGain(); charCompGain.gain.value = 0.9;
  charVibDelay = audioCtx.createDelay(0.05); charVibDelay.delayTime.value = 0.01; charVibLfo = audioCtx.createOscillator(); charVibLfo.frequency.value = 0.5;
  charVibDepth = audioCtx.createGain(); charVibDepth.gain.value = 0; charVibLfo.connect(charVibDepth); charVibDepth.connect(charVibDelay.delayTime);
  charWet = audioCtx.createGain(); charWet.gain.value = 0; charOut = audioCtx.createGain();
  charHissSrc = audioCtx.createBufferSource(); charHissSrc.buffer = makeHissBuffer(audioCtx); charHissSrc.loop = true;
  charHissHP = audioCtx.createBiquadFilter(); charHissHP.type = 'highpass'; charHissHP.frequency.value = 700;
  charHissLP = audioCtx.createBiquadFilter(); charHissLP.type = 'lowpass'; charHissLP.frequency.value = hz(3400); charHissGain = audioCtx.createGain(); charHissGain.gain.value = 0;
  charPopSrc = audioCtx.createBufferSource(); charPopSrc.buffer = makePopBuffer(audioCtx); charPopSrc.loop = true;
  charPopHP = audioCtx.createBiquadFilter(); charPopHP.type = 'bandpass'; charPopHP.frequency.value = 1100; charPopHP.Q.value = 0.8;
  charPopGain = audioCtx.createGain(); charPopGain.gain.value = 0; charNoiseOut = audioCtx.createGain();
  chorusSplit = audioCtx.createChannelSplitter(2); chorusMerge = audioCtx.createChannelMerger(2);
  chorusDelayL = audioCtx.createDelay(0.1); chorusDelayL.delayTime.value = 0.020; chorusDelayR = audioCtx.createDelay(0.1); chorusDelayR.delayTime.value = 0.027;
  chorusLfoL = audioCtx.createOscillator(); chorusLfoL.frequency.value = 0.21; chorusLfoR = audioCtx.createOscillator(); chorusLfoR.frequency.value = 0.29;
  chorusDepthL = audioCtx.createGain(); chorusDepthL.gain.value = 0.0035; chorusDepthR = audioCtx.createGain(); chorusDepthR.gain.value = 0.0042;
  chorusLfoL.connect(chorusDepthL); chorusDepthL.connect(chorusDelayL.delayTime); chorusLfoR.connect(chorusDepthR); chorusDepthR.connect(chorusDelayR.delayTime);
  chorusWet = audioCtx.createGain(); chorusDry = audioCtx.createGain(); chorusSum = audioCtx.createGain();
  echoIn = audioCtx.createGain(); echoIn.channelCount = 1; echoIn.channelCountMode = 'explicit';
  echoDelayL = audioCtx.createDelay(2); echoDelayL.delayTime.value = 0.375; echoDelayR = audioCtx.createDelay(2); echoDelayR.delayTime.value = 0.375;
  echoFbL = audioCtx.createGain(); echoFbL.gain.value = 0.66; echoFbR = audioCtx.createGain(); echoFbR.gain.value = 0.66;
  echoLP = audioCtx.createBiquadFilter(); echoLP.type = 'lowpass'; echoLP.frequency.value = hz(2800); echoLP.Q.value = 0.5;
  echoPanL = audioCtx.createStereoPanner(); echoPanL.pan.value = -0.8; echoPanR = audioCtx.createStereoPanner(); echoPanR.pan.value = 0.8;
  echoOut = audioCtx.createGain(); fxSum = audioCtx.createGain();
  ambSource = audioCtx.createBufferSource(); ambSource.buffer = makeNoiseBuffer(audioCtx); ambSource.loop = true;
  ambFilterA = audioCtx.createBiquadFilter(); ambFilterB = audioCtx.createBiquadFilter();
  ambMod = audioCtx.createGain(); ambMod.gain.value = 0; ambLfo = audioCtx.createOscillator(); ambLfo.frequency.value = 0.1;
  ambLfoDepth = audioCtx.createGain(); ambLfoDepth.gain.value = 0; ambLevel = audioCtx.createGain(); ambLevel.gain.value = 0;
  droneEnable = audioCtx.createGain(); droneEnable.gain.value = 0; droneLP = audioCtx.createBiquadFilter(); droneLP.type = 'lowpass'; droneLP.frequency.value = hz(900); droneLP.Q.value = 0.5;
  droneLfo = audioCtx.createOscillator(); droneLfo.frequency.value = 0.05; droneLfoDepth = audioCtx.createGain(); droneLfoDepth.gain.value = 0;
  droneLfo.connect(droneLfoDepth); droneLfoDepth.connect(droneEnable.gain);
  droneOscs = [];
  for (const [freq, amp] of DRONE_VOICES) {
    for (const cents of [-5, 5]) {
      const osc = audioCtx.createOscillator(); osc.type = 'sine'; osc.frequency.value = freq; osc.detune.value = cents;
      const g = audioCtx.createGain(); g.gain.value = amp * 0.5; osc.connect(g); g.connect(droneLP); droneOscs.push(osc);
    }
  }
  convolver = null; dryGain = audioCtx.createGain(); wetGain = audioCtx.createGain();
  compressor = audioCtx.createDynamicsCompressor(); outputGain = audioCtx.createGain();
  softClip = audioCtx.createWaveShaper(); softClip.curve = createSoftClipCurve(); softClip.oversample = '4x';
  outputClamp = audioCtx.createWaveShaper(); outputClamp.curve = createHardClipCurve(); outputClamp.oversample = 'none';
  recordingDestination = audioCtx.createMediaStreamDestination();
  binauralMerger = audioCtx.createChannelMerger(2); binauralGain = audioCtx.createGain(); binauralGain.gain.value = 0;
  binOscL = audioCtx.createOscillator(); binOscR = audioCtx.createOscillator();
  sourceNode.connect(inputGain); inputGain.connect(subBass); subBass.connect(bassShelf); bassShelf.connect(clarity); clarity.connect(air);
  air.connect(panner); panner.connect(standardGain); air.connect(surroundPanner); surroundPanner.connect(surroundGain);
  air.connect(surroundLow); surroundLow.connect(surroundLowGain); surroundLowGain.connect(surroundGain);
  air.connect(hrtfSplitter); hrtfSplitter.connect(hrtfPannerL, 0); hrtfSplitter.connect(hrtfPannerR, 1); hrtfPannerL.connect(hrtfBassComp); hrtfPannerR.connect(hrtfBassComp); hrtfBassComp.connect(hrtfGain);
  standardGain.connect(modeSum); surroundGain.connect(modeSum); hrtfGain.connect(modeSum);
  modeSum.connect(warmthLP); warmthLP.connect(tideLP);
  tideLP.connect(charDryDelay); charDryDelay.connect(charDry); charDry.connect(charOut); tideLP.connect(charHP); charHP.connect(charLP); charLP.connect(charPeak);
  charPeak.connect(charShaper); charShaper.connect(charSmoothLP); charSmoothLP.connect(charCompGain); charCompGain.connect(charVibDelay); charVibDelay.connect(charWet); charWet.connect(charOut);
  charHissSrc.connect(charHissHP); charHissHP.connect(charHissLP); charHissLP.connect(charHissGain); charHissGain.connect(charNoiseOut);
  charPopSrc.connect(charPopHP); charPopHP.connect(charPopGain); charPopGain.connect(charNoiseOut); charNoiseOut.connect(compressor);
  charOut.connect(chorusDry); chorusDry.connect(chorusSum); charOut.connect(chorusSplit); chorusSplit.connect(chorusDelayL, 0); chorusSplit.connect(chorusDelayR, 1);
  chorusDelayL.connect(chorusMerge, 0, 0); chorusDelayR.connect(chorusMerge, 0, 1); chorusMerge.connect(chorusWet); chorusWet.connect(chorusSum);
  chorusSum.connect(fxSum); chorusSum.connect(echoIn); echoIn.connect(echoDelayL); echoDelayL.connect(echoPanL); echoPanL.connect(echoOut);
  echoDelayL.connect(echoFbL); echoFbL.connect(echoDelayR); echoDelayR.connect(echoPanR); echoPanR.connect(echoOut); echoDelayR.connect(echoFbR); echoFbR.connect(echoLP); echoLP.connect(echoDelayL); echoOut.connect(fxSum);
  ambSource.connect(ambFilterA); ambFilterA.connect(ambFilterB); ambFilterB.connect(ambMod); ambLfo.connect(ambLfoDepth); ambLfoDepth.connect(ambMod.gain); ambMod.connect(ambLevel);
  droneLP.connect(droneEnable); droneEnable.connect(ambLevel); ambLevel.connect(fxSum);
  fxSum.connect(dryGain); dryGain.connect(compressor); wetGain.connect(compressor);
  compressor.connect(softClip); softClip.connect(outputClamp); outputClamp.connect(outputGain);
  outputGain.connect(audioCtx.destination); outputGain.connect(recordingDestination);
  binOscL.connect(binauralMerger, 0, 0); binOscR.connect(binauralMerger, 0, 1); binauralMerger.connect(binauralGain); binauralGain.connect(outputGain);
  binOscL.start(); binOscR.start(); tideLfo.start(); chorusLfoL.start(); chorusLfoR.start();
  ambSource.start(); ambLfo.start(); droneLfo.start(); charHissSrc.start(); charPopSrc.start(); charVibLfo.start(); droneOscs.forEach((o) => o.start());
  loadedReverbType = null; applyParams(currentParams, true); hrtfTimer = setInterval(updateHrtfPosition, 33);
}

function setReverbType(type) {
  const next = audioCtx.createConvolver(); next.buffer = getReverbIR(type); fxSum.connect(next); next.connect(wetGain);
  if (convolver) { try { fxSum.disconnect(convolver); } catch (e) {} try { convolver.disconnect(); } catch (e) {} }
  convolver = next; loadedReverbType = type;
}

function normalizeParams(p) {
  const out = { ...DEFAULT_PARAMS, ...p };
  ['intensity', 'speed', 'bass', 'clarity', 'reverb', 'warmth', 'chorus', 'echo', 'waves', 'ambienceVol', 'characterAmount', 'charTone', 'charDrive', 'charNoise'].forEach((k) => {
    const v = parseFloat(out[k]); out[k] = Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : DEFAULT_PARAMS[k];
  });
  if (!['cw', 'ccw', 'pingpong'].includes(out.direction)) out.direction = 'cw';
  out.manualMode = !!out.manualMode; out.manualX = Number.isFinite(parseFloat(out.manualX)) ? Math.max(-1, Math.min(1, parseFloat(out.manualX))) : 0;
  out.manualZ = Number.isFinite(parseFloat(out.manualZ)) ? Math.max(-1, Math.min(1, parseFloat(out.manualZ))) : -1;
  if (!['hrtf', 'surround', 'standard'].includes(out.spatialMode)) out.spatialMode = 'hrtf';
  if (!REVERB_TYPES[out.reverbType]) out.reverbType = 'classic';
  if (out.ambience !== 'off' && !AMBIENCE[out.ambience]) out.ambience = 'off';
  if (out.character !== 'off' && !CHARACTERS[out.character]) out.character = 'off';
  if (!BINAURAL_FREQS[out.binauralPreset]) out.binauralPreset = 'focus';
  out.binaural = !!out.binaural; 
  out.smartVolume = !!out.smartVolume;
  return out;
}

function applyParams(newParams, immediate = false) {
  currentParams = normalizeParams({ ...currentParams, ...newParams });
  if (!audioCtx || !inputGain) return;
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  const p = currentParams, now = audioCtx.currentTime, hz = (target) => Math.min(target, audioCtx.sampleRate * 0.49);
  const setParam = (nodeParam, val) => { nodeParam.cancelScheduledValues(now); if (immediate) nodeParam.value = val; else nodeParam.setTargetAtTime(val, now, 0.05); };
  const bassNorm = p.bass / 100; setParam(inputGain.gain, Math.pow(10, -(bassNorm * 3) / 20)); setParam(subBass.gain, bassNorm * 3); setParam(bassShelf.gain, bassNorm * 9);
  const clarNorm = p.clarity / 100; setParam(clarity.gain, clarNorm * 5); setParam(air.gain, clarNorm * 3);
  const revNorm = p.reverb / 100; setParam(dryGain.gain, 1 - revNorm * 0.4); setParam(wetGain.gain, revNorm * 0.6);
  if (p.reverbType !== loadedReverbType) setReverbType(p.reverbType);
  setParam(standardGain.gain, p.spatialMode === 'standard' ? 1 : 0); setParam(surroundGain.gain, p.spatialMode === 'surround' ? 1 : 0); setParam(hrtfGain.gain, p.spatialMode === 'hrtf' ? HRTF_TRIM : 0);
  setParam(warmthLP.frequency, hz(20000 * Math.pow(0.2, p.warmth / 100)));
  const tide = p.waves / 100; setParam(tideLP.frequency, hz(20000 * Math.pow(0.15, tide))); setParam(tideDepth.gain, tide * 1500);
  const ch = CHARACTERS[p.character], amt = ch ? p.characterAmount / 100 : 0;
  if (ch) {
    const toneScale = 0.35 + (p.charTone / 100) * 1.35, effectiveLP = Math.max(320, Math.min(14000, ch.lp * toneScale)), userDrive = 1 + (p.charDrive / 100) * 1.7, noiseFactor = (p.charNoise / 100) * 1.5;
    setParam(charHP.frequency, hz(ch.hp)); setParam(charLP.frequency, hz(effectiveLP)); setParam(charSmoothLP.frequency, hz(Math.min(effectiveLP * 1.25, 9500)));
    setParam(charPeak.frequency, hz(ch.pf)); setParam(charPeak.gain, Math.min(3.0, ch.pg)); setParam(charPeak.Q, ch.pq); setParam(charVibLfo.frequency, ch.wobHz);
    charShaper.curve = createDriveCurve(ch.drive > 0.1 ? userDrive : ch.drive); setParam(charCompGain.gain, 0.90 - (p.charDrive / 100) * 0.16);
    setParam(charHissGain.gain, ch.hiss * noiseFactor * amt * 0.55); setParam(charPopGain.gain, ch.pops * noiseFactor * amt * 0.65);
  } else { setParam(charHissGain.gain, 0); setParam(charPopGain.gain, 0); }
  setParam(charWet.gain, amt); setParam(charDry.gain, 1 - amt); setParam(charVibDepth.gain, ch ? ch.wob * amt : 0);
  const cho = p.chorus / 100; setParam(chorusWet.gain, cho * 0.65); setParam(chorusDry.gain, 1 - cho * 0.25);
  setParam(echoIn.gain, (p.echo / 100) * 0.55);
  const amb = AMBIENCE[p.ambience];
  if (amb && amb.kind === 'noise') {
    ambFilterA.type = amb.a.type; setParam(ambFilterA.frequency, amb.a.f); setParam(ambFilterA.Q, amb.a.q);
    ambFilterB.type = amb.b.type; setParam(ambFilterB.frequency, amb.b.f); setParam(ambFilterB.Q, amb.b.q);
    setParam(ambMod.gain, amb.gain * (1 - amb.swell * 0.5)); setParam(ambLfoDepth.gain, amb.gain * amb.swell * 0.5); setParam(ambLfo.frequency, amb.swellHz);
    setParam(droneEnable.gain, 0); setParam(droneLfoDepth.gain, 0);
  } else if (amb && amb.kind === 'drone') {
    setParam(ambMod.gain, 0); setParam(ambLfoDepth.gain, 0); setParam(droneEnable.gain, 0.4); setParam(droneLfoDepth.gain, 0.12);
  } else { setParam(ambMod.gain, 0); setParam(ambLfoDepth.gain, 0); setParam(droneEnable.gain, 0); setParam(droneLfoDepth.gain, 0); }
  setParam(ambLevel.gain, (p.ambienceVol / 100) * AMBIENCE_LEVEL);
  const bp = BINAURAL_FREQS[p.binauralPreset]; setParam(binOscL.frequency, bp.c); setParam(binOscR.frequency, bp.c + bp.b); setParam(binauralGain.gain, p.binaural ? 0.07 : 0);
  const compSettings = p.smartVolume ? { t: -22, r: 5, k: 15, a: 0.003, m: 1.4 } : { t: -1, r: 20, k: 0, a: 0.001, m: 1.0 };
  setParam(compressor.threshold, compSettings.t); setParam(compressor.ratio, compSettings.r); setParam(compressor.knee, compSettings.k); setParam(compressor.attack, compSettings.a); setParam(outputGain.gain, compSettings.m);
}

function getCoords(phase, path, rad) {
  let x = 0, y = 0, z = -rad;
  switch (path) {
    case 'figure8': x = Math.sin(phase) * rad; z = Math.sin(phase * 2) * rad * 0.65; break;
    case 'drift': x = (Math.sin(phase * 0.7) + 0.4 * Math.sin(phase * 1.9)) * rad * 0.7; z = (Math.cos(phase * 0.5) + 0.4 * Math.sin(phase * 1.3)) * rad * 0.7; y = Math.sin(phase * 0.9) * rad * 0.3; break;
    case 'zigzag': x = Math.asin(Math.sin(phase)) * (2 / Math.PI) * rad; z = Math.asin(Math.sin(phase * 1.5)) * (2 / Math.PI) * rad; break;
    case 'chaos': x = (Math.sin(phase * 2.1) * Math.cos(phase * 0.8)) * rad; z = (Math.sin(phase * 1.7) * Math.cos(phase * 1.3)) * rad; y = Math.sin(phase * 3.5) * rad * 0.5; break;
    case 'spiral': { const r = rad * (0.4 + 0.6 * Math.abs(Math.sin(phase * 0.2))); x = Math.sin(phase) * r; z = -Math.cos(phase) * r; y = Math.sin(phase * 0.5) * rad * 0.2; break; }
    case 'vortex': { const r = rad * (0.45 + 0.55 * Math.cos(phase * 0.35)); x = Math.sin(phase * 1.2) * r; z = -Math.cos(phase * 1.2) * r; y = Math.sin(phase * 0.6) * rad * 0.85; break; }
    case 'stage': { const a = Math.sin(phase * 0.85) * 1.1; x = Math.sin(a) * rad; z = -Math.abs(Math.cos(a)) * rad * 0.85 - 0.15; break; }
    case 'stadium': { x = Math.sin(phase) * rad * 1.15; z = -Math.cos(phase) * rad * 0.9; y = Math.abs(Math.sin(phase * 2)) * rad * 0.4; break; }
    case 'heartbeat': { const pulse = 0.5 + 0.5 * Math.pow(Math.abs(Math.sin(phase * 1.5)), 4); x = Math.sin(phase * 0.5) * rad * pulse; z = -Math.cos(phase * 0.5) * rad * pulse; break; }
    case 'pendulum': { const a = Math.sin(phase) * 1.25; x = Math.sin(a) * rad; z = -Math.cos(a) * rad; break; }
    case 'halo': x = Math.sin(phase) * rad; z = -Math.cos(phase) * rad; y = rad * 0.75; break;
    default: x = Math.sin(phase) * rad; z = -Math.cos(phase) * rad;
  }
  return { x, y, z };
}

function updateHrtfPosition() {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  if (mediaStream) { const tracks = mediaStream.getAudioTracks(); if (tracks.length === 0 || tracks.every((tr) => tr.readyState === 'ended')) { stopProcessing(); return; } }
  const nowPerf = performance.now(), dt = Math.min(0.15, Math.max(0, (nowPerf - lastFrameTime) / 1000));
  lastFrameTime = nowPerf;
  const p = currentParams, radius = 1 + (p.intensity / 100) * 2.5, now = audioCtx.currentTime;
  if (p.manualMode) {
    lastPos = { x: p.manualX, z: p.manualZ };
    const panVal = Math.max(-1, Math.min(1, p.manualX));
    if (panner && surroundPanner) { panner.pan.setTargetAtTime(panVal, now, 0.04); surroundPanner.pan.setTargetAtTime(panVal, now, 0.04); }
    const wx = p.manualX * radius, wz = p.manualZ * radius;
    for (const [ang, pannerNode] of [[-HRTF_SPREAD_RAD, hrtfPannerL], [HRTF_SPREAD_RAD, hrtfPannerR]]) {
      const c = Math.cos(ang), sn = Math.sin(ang);
      pannerNode.positionX.setTargetAtTime(wx * c - wz * sn, now, 0.04); pannerNode.positionY.setTargetAtTime(0, now, 0.04); pannerNode.positionZ.setTargetAtTime(wx * sn + wz * c, now, 0.04);
    }
    return;
  }
  const speedHz = Math.max(p.speed / 100, 0.001), dirSign = p.direction === 'ccw' ? -1 : 1;
  visualizerPhase += dt * speedHz * Math.PI * 2 * dirSign;
  const effectivePhase = p.direction === 'pingpong' ? Math.sin(visualizerPhase * 0.5) * Math.PI : visualizerPhase;
  const coords = p.intensity > 0 ? getCoords(effectivePhase, p.hrtfPath, radius) : { x: 0, y: 0, z: -radius };
  lastPos = { x: Math.max(-1, Math.min(1, coords.x / radius)), z: Math.max(-1, Math.min(1, coords.z / radius)) };
  const panVal = Math.max(-1, Math.min(1, lastPos.x * (p.intensity / 100)));
  if (panner && surroundPanner) { panner.pan.setTargetAtTime(panVal, now, 0.04); surroundPanner.pan.setTargetAtTime(panVal, now, 0.04); }
  for (const [ang, pannerNode] of [[-HRTF_SPREAD_RAD, hrtfPannerL], [HRTF_SPREAD_RAD, hrtfPannerR]]) {
    const c = Math.cos(ang), sn = Math.sin(ang);
    pannerNode.positionX.setTargetAtTime(coords.x * c - coords.z * sn, now, 0.05); pannerNode.positionY.setTargetAtTime(coords.y, now, 0.05); pannerNode.positionZ.setTargetAtTime(coords.x * sn + coords.z * c, now, 0.05);
  }
}

function startWavCapture() {
  wavSampleRate = audioCtx.sampleRate; wavChunks = [];
  wavProcessor = audioCtx.createScriptProcessor(4096, 2, 2); wavSink = audioCtx.createGain(); wavSink.gain.value = 0;
  wavProcessor.onaudioprocess = (e) => {
    if (!isRecording) return;
    const l = e.inputBuffer.getChannelData(0), r = e.inputBuffer.numberOfChannels > 1 ? e.inputBuffer.getChannelData(1) : l;
    const pcm = new Int16Array(l.length * 2);
    for (let i = 0; i < l.length; i++) { pcm[i * 2] = Math.max(-1, Math.min(1, l[i])) * 0x7fff; pcm[i * 2 + 1] = Math.max(-1, Math.min(1, r[i])) * 0x7fff; }
    wavChunks.push(pcm);
  };
  outputGain.connect(wavProcessor); wavProcessor.connect(wavSink); wavSink.connect(audioCtx.destination);
}

function finishWavCapture() {
  try { outputGain.disconnect(wavProcessor); } catch (e) {} try { wavProcessor.disconnect(); wavSink.disconnect(); } catch (e) {}
  wavProcessor.onaudioprocess = null; wavProcessor = null; wavSink = null;
  let total = 0; for (const c of wavChunks) total += c.length;
  const buffer = new ArrayBuffer(44 + total * 2), view = new DataView(buffer);
  const str = (off, s) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };
  str(0, 'RIFF'); view.setUint32(4, 36 + total * 2, true); str(8, 'WAVE');
  str(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 2, true);
  view.setUint32(24, wavSampleRate, true); view.setUint32(28, wavSampleRate * 4, true); view.setUint16(32, 4, true); view.setUint16(34, 16, true);
  str(36, 'data'); view.setUint32(40, total * 2, true);
  let offset = 44; for (const c of wavChunks) { new Int16Array(buffer, offset, c.length).set(c); offset += c.length * 2; }
  wavChunks = []; return new Blob([buffer], { type: 'audio/wav' });
}

function clearLastRecording() {
  if (lastRecordingUrl) { URL.revokeObjectURL(lastRecordingUrl); lastRecordingUrl = null; }
  lastRecordedBlob = null;
}

async function startRecording(format = 'compressed', customTitle = '') {
  if (!audioCtx) throw new Error('ENGINE_NOT_READY');
  if (isRecording) throw new Error('ALREADY_RECORDING');
  clearLastRecording(); recordedChunks = []; lastFormat = format;
  lastCustomTitle = customTitle || 'HeadSpace'; recordEpoch = Date.now(); isRecording = true;
  try {
    if (format === 'wav') { lastFileExt = 'wav'; startWavCapture(); return; }
    const stream = recordingDestination.stream; 
    const mimeType = 'audio/webm'; lastFileExt = 'webm';
    mediaRecorder = new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 256000 });
    mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) recordedChunks.push(e.data); };
    mediaRecorder.onerror = (e) => console.error(e.error || e);
    mediaRecorder.start(); 
  } catch (err) {
    isRecording = false; throw err;
  }
}

async function stopRecording() {
  if (!isRecording || isStopping) return;
  isStopping = true;
  try {
    if (lastFormat === 'wav') {
      isRecording = false; lastRecordedBlob = finishWavCapture();
    } else {
      await new Promise((resolve) => {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') { resolve(); return; }
        mediaRecorder.onstop = () => resolve();
        try { mediaRecorder.stop(); } catch (e) { resolve(); }
      });
      lastRecordedBlob = new Blob(recordedChunks.length > 0 ? recordedChunks : [], { type: 'audio/webm' });
      recordedChunks = []; isRecording = false; mediaRecorder = null;
    }
  } finally {
    isRecording = false; isStopping = false;
  }
}

function getRecording() {
  if (!lastRecordedBlob) return { error: 'NO_RECORDING' };
  if (!lastRecordingUrl) lastRecordingUrl = URL.createObjectURL(lastRecordedBlob);
  const safeTitle = (lastCustomTitle || 'HeadSpace').replace(/[<>:"/\\|?*]/g, '_');
  return { url: lastRecordingUrl, filename: `${safeTitle}_8D_${Date.now()}.${lastFileExt}` };
}

async function stopProcessing() {
  if (hrtfTimer) { clearInterval(hrtfTimer); hrtfTimer = null; }
  if (isRecording) { try { await stopRecording(); } catch (e) {} }
  const stream = mediaStream; mediaStream = null;
  if (stream) stream.getTracks().forEach((t) => t.stop());
  if (audioCtx) { const ctx = audioCtx; audioCtx = null; try { await ctx.close(); } catch (e) {} }
  sourceNode = null; convolver = null; loadedReverbType = null; irCache = {}; droneOscs = [];
  lastPos = { x: 0, z: -1 };
}
