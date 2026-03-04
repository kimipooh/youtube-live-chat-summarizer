/* sidepanel.js - ウィンドウ特定受信版 */
let port = null;

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
  chrome.storage.local.get(['summaryInterval', 'uiLanguage', 'geminiModel'], (d) => {
    const lang = d.uiLanguage || 'ja';
    const interval = d.summaryInterval || 30;
    const model = d.geminiModel || 'gemini-2.5-flash-lite';
    const modelShortName = model.replace('gemini-', '').replace('-preview', '');
    document.getElementById('header-interval').innerText = (lang === 'ja' ? '間隔: ' : 'Int: ') + interval + 's';
    document.getElementById('header-model').innerText = 'Model: ' + modelShortName;
    document.getElementById('open-options').innerText = lang === 'ja' ? '設定 ⚙️' : 'Options ⚙️';
  });
}

updateHeader();
document.getElementById('open-options').addEventListener('click', () => chrome.runtime.openOptionsPage());