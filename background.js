/* background.js - ウィンドウ特定通信・エラー修正・セーフティ対応版 */
let sidePanelPorts = new Map(); // windowId => port

const STATUS_MAP = {
  ja: { think: "🤔 解析中...", ready: "✨ 更新完了", err: "❌ エラー：", quota: "回数制限超過。間隔を広げるか有料枠をご検討ください。" },
  en: { think: "🤔 Analyzing...", ready: "✨ Updated", err: "❌ Error: ", quota: "Quota exceeded. Please increase interval or switch to Paid Tier." }
};

const DEFAULT_PROMPTS = {
  simple: "Analyze the chat data and output EXACTLY 5 lines in {{LANG}}.\nSTRICT FORMATTING RULES:\n- Every line MUST start with a number (1. to 5.).\n- The label MUST be enclosed in brackets [].\n- NO Markdown, NO bold, NO hashtags.\n\nRequired Format:\n1. [Main Topic]: (Your analysis here)\n2. [Energy Level]: (Your analysis here)\n3. [Recent Key Comments]: (Your analysis here)\n4. [Potential Next Developments]: (Your analysis here)\n5. [One-line Summary]: (Your analysis here)\n\nChat Data:\n",
  detailed: "STRICT RULE: Output in {{LANG}} only. Analyze the chat in detail.\nSTRICT RULE: DO NOT use bolding (**) or italics (*). You may use Markdown headers (## or ###) ONLY for section titles, NEVER within paragraphs or lists.\n\nChat Data:\n"
};

// サイドパネルとの接続管理
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "sidepanel") {
    chrome.windows.getCurrent({populate: false}, (win) => {
      const windowId = win.id;
      sidePanelPorts.set(windowId, port);
      
      chrome.tabs.query({ windowId: windowId }, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { action: "PANEL_OPENED" }).catch(() => {});
        });
      });

      port.onDisconnect.addListener(() => {
        sidePanelPorts.delete(windowId);
        chrome.tabs.query({ windowId: windowId }, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { action: "PANEL_CLOSED" }).catch(() => {});
          });
        });
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const windowId = sender.tab?.windowId;

  if (request.type === "CHECK_PANEL_STATE") {
    sendResponse({ isPanelOpen: sidePanelPorts.has(windowId) });
    return true;
  }

  if (request.type === "CHAT_BATCH") {
    const targetPort = sidePanelPorts.get(windowId);
    if (!targetPort) return; 

    chrome.storage.local.get(null, async (data) => {
      if (!data.geminiApiKey) return;
      const ui = data.uiLanguage || 'ja';
      
      targetPort.postMessage({ type: "UPDATE_UI", status: STATUS_MAP[ui].think });

      const mode = data.summaryMode || 'simple';
      const promptTemplate = (mode === 'simple') ? (data.promptSimple || DEFAULT_PROMPTS.simple) : (data.promptDetailed || DEFAULT_PROMPTS.detailed);
      const prompt = promptTemplate.replace(/{{LANG}}/g, data.summaryLanguage || 'English') + request.data;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${data.geminiModel || 'gemini-2.5-flash-lite'}:generateContent?key=${data.geminiApiKey}`;

      try {
        const res = await fetch(url, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const json = await res.json();
        
        if (!res.ok) {
          if (res.status === 429) throw new Error(STATUS_MAP[ui].quota);
          throw new Error(json.error?.message || "API Error");
        }
        
        // Cannot read properties of undefined 対策 (セーフティフィルター対応)
        if (!json.candidates || json.candidates.length === 0) {
          const reason = json.promptFeedback?.blockReason || "不明な理由でブロックされました";
          throw new Error(`出力ブロック (${reason})`);
        }
        
        const aiResponse = json.candidates[0].content?.parts?.[0]?.text;
        if (!aiResponse) throw new Error("テキストデータが空でした");
        
        targetPort.postMessage({ 
          type: "UPDATE_UI", 
          status: STATUS_MAP[ui].ready, 
          summary: `【${request.title}】\n${aiResponse}` 
        });
      } catch (e) {
        // "エラー：" という文字が重複しないように成形
        const errMsg = e.message.startsWith(STATUS_MAP[ui].err) ? e.message : STATUS_MAP[ui].err + e.message;
        targetPort.postMessage({ type: "UPDATE_UI", status: errMsg });
      }
    });
  }
});