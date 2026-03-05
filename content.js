/* content.js - リアルタイム設定反映・堅牢化・SPA対応版 */
const CHAT_SELECTOR = '#message';
const IGNORE_LIST = ["チャットのリプレイ", "Messages shown during", "Live Chat replay"]; 
let isPanelOpen = false; 
let isFirstRun = true; 

// 設定のデフォルト値
let currentSettings = {
  summaryInterval: 30,
  bufferThreshold: 5,
  maxChars: 0
};

// YouTubeのSPA（画面遷移）対応用
let currentUrl = location.href;

// 1. 起動時にパネル状態を確認
chrome.runtime.sendMessage({ type: "CHECK_PANEL_STATE" }, (res) => {
  if (chrome.runtime.lastError) return;
  if (res && res.isPanelOpen) isPanelOpen = true;
});

// 2. 設定の初期読み込み
chrome.storage.local.get(['summaryInterval', 'bufferThreshold', 'maxChars'], (data) => {
  currentSettings.summaryInterval = Number(data.summaryInterval) || 30;
  currentSettings.bufferThreshold = Number(data.bufferThreshold) || 5;
  // data.maxChars が undefined の時だけ 2000 を代入。0 は 0 として維持される。
  currentSettings.maxChars = Number(data.maxChars ?? 2000);
});

// 3. 設定のリアルタイム更新監視
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.summaryInterval) currentSettings.summaryInterval = Number(changes.summaryInterval.newValue) || 30;
    if (changes.bufferThreshold) currentSettings.bufferThreshold = Number(changes.bufferThreshold.newValue) || 5;
    // ここも ?? を使うことで 0 への変更を正しく受け取れます
    currentSettings.maxChars = Number(changes.maxChars.newValue ?? 2000);
    
  }
});

// 4. パネルの開閉通知
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "PANEL_OPENED") { 
    isPanelOpen = true; 
    isFirstRun = true; 
  }
  else if (request.action === "PANEL_CLOSED") { 
    isPanelOpen = false; 
  }
});

let buffer = [];
let lastSendTime = 0;

// 5. チャット監視（MutationObserver）
const observer = new MutationObserver((mutations) => {
  if (!isPanelOpen) return; 
  let added = false;
  for (const m of mutations) {
    for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue;
      const msgEl = n.matches(CHAT_SELECTOR) ? n : n.querySelector(CHAT_SELECTOR);
      if (msgEl) {
        const text = msgEl.innerText.trim();
        if (!text || IGNORE_LIST.some(i => text.includes(i))) continue;
        buffer.push(text);
        added = true;
      }
    }
  }
  if (added) checkAndSend();
});

observer.observe(document.body, { childList: true, subtree: true });

// 6. 送信判定ロジック
function checkAndSend() {
  if (!chrome.runtime?.id || buffer.length === 0 || !isPanelOpen) return;
  
  const timeSinceLast = (Date.now() - lastSendTime) / 1000;
  const { summaryInterval, bufferThreshold, maxChars } = currentSettings;

  const shouldSend = (isFirstRun && buffer.length >= 1) || 
                     (!isFirstRun && buffer.length >= bufferThreshold && timeSinceLast >= summaryInterval);

  if (shouldSend) {
      const dataToSend = [...buffer];
      buffer = [];
      lastSendTime = Date.now();
      isFirstRun = false;
      
      const rawTitle = (window.parent !== window) ? window.parent.document.title : document.title;
      const videoTitle = rawTitle.replace(/ - YouTube$/, "").replace(/^\(\d+\)\s/, "").trim();

      let joinedData = dataToSend.join("\n");
      if (maxChars > 0 && joinedData.length > maxChars) {
          joinedData = joinedData.substring(0, maxChars) + "...";
      }
      
      chrome.runtime.sendMessage({ type: "CHAT_BATCH", data: joinedData, title: videoTitle });
  }
}

// 7. 定期チェックとURL変更検知
setInterval(() => { 
  // URLが変わったかチェック（別の配信へ移動した時のリセット処理）
  if (currentUrl !== location.href) {
    currentUrl = location.href;
    buffer = [];
    isFirstRun = true;
  }

  if (isPanelOpen && !isFirstRun && buffer.length >= currentSettings.bufferThreshold) {
    checkAndSend(); 
  }
}, 2000);