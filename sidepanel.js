/* sidepanel.js - ウィンドウ特定受信版 */
let port = null;

function getThinkingFamily(model) {
  const normalized = (model || '').toLowerCase().trim();
  if (normalized.startsWith('gemini-3')) return 'gemini3';
  if (normalized.startsWith('gemini-2.5-pro')) return 'gemini25pro';
  if (normalized.startsWith('gemini-2.5-flash')) return 'gemini25flash';
  return 'none';
}

function isThinkingDisplaySupported(model) {
  return getThinkingFamily(model) !== 'none';
}

// background.js との接続を確立し、メッセージを待機
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    port = chrome.runtime.connect({ name: "sidepanel" });
    
    // 全体放送ではなく、このウィンドウの専用ポートに届くメッセージを処理
    port.onMessage.addListener((msg) => {
      handleUiUpdate(msg);
    });
  }
});

function handleUiUpdate(msg) {
  if (msg.type === "UPDATE_UI") {
    if (msg.status) document.getElementById("status-bar").innerText = msg.status;
    if (msg.summary) {
      const container = document.getElementById("history-container");
      const card = document.createElement("div");
      card.className = "summary-card";

      // 配信タイトルとラベル（簡易版の項目）を装飾
      const formatted = msg.summary
        .replace(/【(.*?)】/g, '<div class="video-source">📺 $1</div>') 
        .replace(/\[(.*?)\]/g, '<strong class="label">[$1]</strong>');

      card.innerHTML = `<span class="timestamp">${new Date().toLocaleTimeString()}</span><div class="content">${formatted}</div>`;
      container.prepend(card);
      if (container.childNodes.length > 50) container.removeChild(container.lastChild);
    }
    updateHeader();
  }
}

function updateHeader() {
  // manualModel と thinkingLevel を追加取得
  chrome.storage.local.get(['summaryInterval', 'uiLanguage', 'geminiModel', 'manualModel', 'thinkingLevel'], (d) => {
    const lang = d.uiLanguage || 'ja';
    const interval = d.summaryInterval || 30;
    
    // 手動入力モデルがあればそれを優先表示 (background.js と同じロジック)
    const model = d.manualModel || d.geminiModel || 'gemini-2.5-flash-lite';
    const modelShortName = model.replace('gemini-', '').replace('-preview', '');
    
    document.getElementById('header-interval').innerText = (lang === 'ja' ? '間隔: ' : 'Int: ') + interval + 's';
    document.getElementById('header-model').innerText = 'Model: ' + modelShortName;
    
    // 思考レベルの判定と表示用のテキスト生成
    const isThinkingSupported = isThinkingDisplaySupported(model);
    const storedThinkingLevel = Number(d.thinkingLevel);
    const tLevel = Number.isFinite(storedThinkingLevel) ? storedThinkingLevel : 0;
    let thinkingText = "";
    
    if (isThinkingSupported) {
        const levelMapJa = { 0: "API既定", 1: "最小", 2: "低", 3: "中", 4: "高" };
        const levelMapEn = { 0: "Default", 1: "Min", 2: "Low", 3: "Med", 4: "High" };
        const levelStr = lang === 'ja' ? (levelMapJa[tLevel] || tLevel) : (levelMapEn[tLevel] || tLevel);
        thinkingText = (lang === 'ja' ? '思考: ' : 'Think: ') + levelStr;
    }
    
    const thElement = document.getElementById('header-thinking');
    if (thElement) {
        thElement.innerText = thinkingText;
    }

    document.getElementById('open-options').innerText = lang === 'ja' ? '設定 ⚙️' : 'Options ⚙️';
  });
}

updateHeader();
document.getElementById('open-options').addEventListener('click', () => chrome.runtime.openOptionsPage());
