const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function withTimeout(promise, ms, fallback) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve(fallback), ms))]);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target === 'offscreen') return false;

  if (message.action === 'START_CAPTURE') {
    startCapture().then(sendResponse).catch((err) => sendResponse({ error: err.message }));
    return true;
  }

  if (message.action === 'STOP_CAPTURE') {
    stopCapture().then(sendResponse).catch((err) => sendResponse({ error: err.message }));
    return true;
  }

  if (message.action === 'GET_STATUS') {
    getStatus().then(sendResponse).catch(() => sendResponse({
      isCapturing: false,
      isRecording: false,
      hasRecording: false,
      recordStartedAt: 0,
      activeTabId: null
    }));
    return true;
  }

  if (message.action === 'SET_PLAYBACK_SPEED') {
    chrome.storage.session.get(['activeTabId']).then(({ activeTabId }) => {
      if (activeTabId) {
        chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          func: (speed) => {
            document.querySelectorAll('video, audio').forEach(media => {
              media.preservesPitch = false;
              media.mozPreservesPitch = false;
              media.webkitPreservesPitch = false;
              media.playbackRate = speed;
            });
          },
          args: [message.speed]
        }).catch(() => {});
      }
    });
    sendResponse({ success: true });
    return true;
  }

  return false;
});

async function hasOffscreen() {
  const contexts = await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] });
  return contexts.length > 0;
}

async function closeOffscreen() {
  try {
    await chrome.offscreen.closeDocument();
  } catch (e) {}
}

async function sendToOffscreen(message, retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await chrome.runtime.sendMessage({ ...message, target: 'offscreen' });
      if (res !== undefined) return res;
    } catch (e) {}
    await sleep(100);
  }
  throw new Error('ENGINE_TIMEOUT');
}

async function getStatus() {
  const base = { isCapturing: false, isRecording: false, hasRecording: false, recordStartedAt: 0, activeTabId: null, unresponsive: false };
  if (!(await hasOffscreen())) return base;

  const { activeTabId } = await chrome.storage.session.get(['activeTabId']);
  const st = await withTimeout(
    chrome.runtime.sendMessage({ action: 'GET_STATE', target: 'offscreen' }).catch(() => null),
    4000, null
  );

  if (st && !st.error) {
    return {
      isCapturing: !!st.capturing,
      isRecording: !!st.recording,
      hasRecording: !!st.hasRecording,
      recordStartedAt: st.recordStartedAt || 0,
      activeTabId: st.capturing ? (activeTabId ?? null) : null,
      unresponsive: false
    };
  }
  return { ...base, unresponsive: true };
}

function getStreamId(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, (streamId) => {
      if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
      if (!streamId) return reject(new Error('NO_STREAM_ID'));
      resolve(streamId);
    });
  });
}

async function setupOffscreenDocument() {
  if (await hasOffscreen()) return;
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['USER_MEDIA', 'BLOBS'],
    justification: 'Processamento de áudio espacial 8D em tempo real e exportação.'
  });
}

async function startCapture() {
  const status = await getStatus();
  if (status.isCapturing) return { success: true };
  if (status.unresponsive) await closeOffscreen();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) throw new Error('NO_TAB');
  if (tab.url && /^(chrome|chrome-extension|edge|about):/i.test(tab.url)) throw new Error('RESTRICTED_PAGE');

  let streamId;
  try {
    streamId = await getStreamId(tab.id);
  } catch (err) {
    if (/active stream/i.test(err.message) && !status.isCapturing) {
      await closeOffscreen(); await sleep(150); streamId = await getStreamId(tab.id);
    } else throw err;
  }

  await setupOffscreenDocument();
  const res = await sendToOffscreen({ action: 'PROCESS_STREAM', streamId });
  if (res && res.error) throw new Error(res.error);

  await chrome.storage.session.set({ activeTabId: tab.id });
  
  const stored = await chrome.storage.local.get('headspace_params');
  if (stored.headspace_params && stored.headspace_params.playbackSpeed) {
    const speed = stored.headspace_params.playbackSpeed / 100;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (s) => {
        document.querySelectorAll('video, audio').forEach(m => {
          m.preservesPitch = false;
          m.mozPreservesPitch = false;
          m.webkitPreservesPitch = false;
          m.playbackRate = s;
        });
      },
      args: [speed]
    }).catch(() => {});
  }

  return { success: true };
}

async function stopCapture() {
  let hasRecording = false;
  if (await hasOffscreen()) {
    try {
      const res = await withTimeout(chrome.runtime.sendMessage({ action: 'STOP_STREAM', target: 'offscreen' }), 4000, null);
      hasRecording = !!(res && res.hasRecording);
    } catch (e) {}
    if (!hasRecording) await closeOffscreen();
  }
  await chrome.storage.session.remove('activeTabId');
  chrome.action.setBadgeText({ text: '' }).catch(() => {});
  return { success: true, hasRecording };
}

chrome.tabs.onRemoved.addListener(async (tabId) => {
  try {
    const { activeTabId } = await chrome.storage.session.get('activeTabId');
    if (activeTabId === tabId) await stopCapture();
  } catch (e) {}
});

let watchdogRunning = false;
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (!changeInfo.url) return;
  if (watchdogRunning) return;
  try {
    const { activeTabId } = await chrome.storage.session.get('activeTabId');
    if (activeTabId !== tabId) return;
    watchdogRunning = true; await sleep(600);
    const status = await getStatus();
    if (status.isCapturing) return;

    await startCapture();
    const stored = await chrome.storage.local.get('headspace_params');
    if (stored.headspace_params) {
      await sendToOffscreen({ action: 'UPDATE_PARAMS', params: stored.headspace_params });
    }
  } catch (e) {} finally { watchdogRunning = false; }
});

const REPO_MANIFEST_URL = 'https://raw.githubusercontent.com/JohnIohananDev/headspace-8d/main/manifest.json';
const REPO_URL = 'https://github.com/JohnIohananDev/headspace-8d';

async function checkForUpdates() {
  try {
    const { lastUpdateCheck } = await chrome.storage.local.get('lastUpdateCheck');
    const now = Date.now();
    if (lastUpdateCheck && (now - lastUpdateCheck < 43200000)) return;

    const res = await fetch(REPO_MANIFEST_URL, { cache: 'no-store' });
    if (!res.ok) return;
    
    const remoteManifest = await res.json();
    const localVersion = chrome.runtime.getManifest().version;
    const remoteVersion = remoteManifest.version;

    if (remoteVersion !== localVersion && isNewerVersion(remoteVersion, localVersion)) {
      chrome.notifications.create('headspace-update', {
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'HeadSpace 8D',
        message: `Nova versão (${remoteVersion}) disponível no GitHub! Clique aqui para baixar.`,
        priority: 2
      });
    }
    await chrome.storage.local.set({ lastUpdateCheck: now });
  } catch (e) {}
}

function isNewerVersion(remote, local) {
  const r = remote.split('.').map(Number);
  const l = local.split('.').map(Number);
  for (let i = 0; i < Math.max(r.length, l.length); i++) {
    const rv = r[i] || 0;
    const lv = l[i] || 0;
    if (rv > lv) return true;
    if (rv < lv) return false;
  }
  return false;
}

chrome.notifications.onClicked.addListener((id) => {
  if (id === 'headspace-update') {
    chrome.tabs.create({ url: REPO_URL });
    chrome.notifications.clear('headspace-update');
  }
});

checkForUpdates();
