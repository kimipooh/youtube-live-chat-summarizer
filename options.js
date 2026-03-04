/* options.js - Author: Kimiya Kitani */

const DEFAULT_PROMPTS = {
  simple: "Analyze the chat data and output EXACTLY 5 lines in {{LANG}}.\nSTRICT FORMATTING RULES:\n- Every line MUST start with a number (1. to 5.).\n- The label MUST be enclosed in brackets [].\n- NO Markdown, NO bold, NO hashtags.\n\nRequired Format:\n1. [Main Topic]: (Your analysis here)\n2. [Energy Level]: (Your analysis here)\n3. [Recent Key Comments]: (Your analysis here)\n4. [Potential Next Developments]: (Your analysis here)\n5. [One-line Summary]: (Your analysis here)\n\n* CRITICAL NOTE: Translate the labels inside the brackets into {{LANG}}, but YOU MUST KEEP the numbers (1. to 5.) and brackets [] exactly as shown in the format.\n\nChat Data:\n",
  detailed: "STRICT RULE: Output in {{LANG}} only. Analyze the chat in detail.\nSTRICT RULE: DO NOT use bolding (**) or italics (*). You may use Markdown headers (## or ###) ONLY for section titles, NEVER within paragraphs or lists.\n\nChat Data:\n"
};

const UI_TEXT = {
  ja: {
    title: "Gemini 設定マネージャー",
    labelApiKey: "Gemini API キー", labelModel: "使用モデルの選択", labelSummaryMode: "要約モード", labelSummaryLang: "要約の出力言語", labelInterval: "要約の間隔（秒）（デフォルト: 30）", labelUiLang: "UI表示言語", btnSave: "設定を保存して適用", statusOk: "✅ 保存完了！YouTubeをリロードしてください。", statusNg: "❌ APIキーを入力してください。",labelBuffer: "送信に必要な最小チャット数（デフォルト: 5）",labelMaxChars: "送信上限文字数 (0で無制限, 必要なら1000や2000あたりから試用おすすめ)",
    modes: { simple: "簡易版 (トピック・熱量・変化を凝縮)", detailed: "詳細版 (熟練モデレーターによる深い分析)" },
    models: {
      // Gemini 3.1 / 3.0 Series (Latest Preview Models)
    　"gemini-3.1-pro-preview": "Gemini 3.1 Pro (最高知能 / 遅い / 専門分析)",
      "gemini-3.1-flash-lite-preview": "Gemini 3.1 Flash-Lite (高い知能 / 高速 / 最新バランス)",
      "gemini-3-flash-preview": "Gemini 3 Flash (中程度の知能 / 高速 / 汎用高速)",
      // Gemini 2.5 Series (Stable Legacy Models)
      "gemini-2.5-pro": "Gemini 2.5 Pro (高知能 / 遅い / 安定・高精度)",
      "gemini-2.5-flash": "Gemini 2.5 Flash (中程度の知能 / 高速 / 安定高速)",
      "gemini-2.5-flash-lite": "Gemini 2.5 Flash-Lite (標準知能 / 最速 / 推奨・最安)"
    },
    promptTitle: "カスタムプロンプト ({{LANG}} = 要約の出力言語に自動置換)",
    labelPromptSimple: "簡易版プロンプト",
    labelPromptDetailed: "詳細版プロンプト",
    btnReset: "プロンプトをデフォルトに戻す"
  },
  en: {
    title: "Gemini Settings Manager",
    labelApiKey: "Gemini API Key", labelModel: "Select AI Model", labelSummaryMode: "Summary Mode", labelSummaryLang: "Output Language", labelInterval: "Interval (sec) (Default: 30)", labelUiLang: "UI Language", btnSave: "Save Settings", statusOk: "✅ Saved! Please reload YouTube.", statusNg: "❌ API Key required.",labelBuffer: "Min Chat Count(Default: 5)",labelMaxChars: "Max Input Characters (0 = Unlimited, If necessary, try starting with 1000 or 2000.)",
    modes: { simple: "Simple (Topics/Heat/Change condensed)", detailed: "Detailed (Deep analysis by expert moderator)" },
    /* options.js - English Model List for Global Users */
    models: {
      // Gemini 3.1 / 3.0 Series (Latest Preview Models)
      "gemini-3.1-pro-preview": "Gemini 3.1 Pro (Highest IQ / Slow / Specialist)",
      "gemini-3.1-flash-lite-preview": "Gemini 3.1 Flash-Lite (High IQ / Fast / Latest Balance)",
      "gemini-3-flash-preview": "Gemini 3 Flash (Medium IQ / Fast / General High-speed)",

      // Gemini 2.5 Series (Stable Legacy Models)
      "gemini-2.5-pro": "Gemini 2.5 Pro (High IQ / Slow / Stable & Precise)",
      "gemini-2.5-flash": "Gemini 2.5 Flash (Medium IQ / Fast / Stable & Fast)",
      "gemini-2.5-flash-lite": "Gemini 2.5 Flash-Lite (Standard IQ / Fastest / Recommended)"
    },
    promptTitle: "Custom Prompts ({{LANG}} will be replaced by Language)",
    labelPromptSimple: "Simple Mode Prompt",
    labelPromptDetailed: "Detailed Mode Prompt",
    btnReset: "Reset Prompts to Default"
  }
};

/* options.js - Author: Kimiya Kitani (Full Language Support Update) */
const LANGUAGE_LIST = [
  { group: "Standard", langs: [["Japanese", "日本語"], ["English", "English"], ["Both Japanese and English", "日本語 & 英語"]] },
  { group: "Asia & Pacific", langs: [
    ["Chinese (Simplified)", "中国語(簡体字)"], ["Chinese (Traditional)", "中国語(繁体字)"], ["Chinese (Hong Kong)", "中国語(香港)"], 
    ["Korean", "韓国語"], ["Thai", "タイ語"], ["Vietnamese", "ベトナム語"], ["Indonesian", "インドネシア語"], ["Malay", "マレー語"], ["Filipino", "フィリピン語"],
    ["Hindi", "ヒンディー語"], ["Bengali", "ベンガル語"], ["Marathi", "マラーティー語"], ["Telugu", "テルグ語"], ["Tamil", "タミル語"], ["Gujarati", "グジャラート語"], 
    ["Kannada", "カンナダ語"], ["Malayalam", "マラヤーラム語"], ["Punjabi", "パンジャブ語"], ["Urdu", "ウルドゥー語"], ["Assamese", "アッサム語"], 
    ["Odia", "オディア語"], ["Khmer", "クメール語"], ["Lao", "ラオ語"]
  ] },
  { group: "Europe & Americas", langs: [
    ["Spanish", "スペイン語"], ["Spanish (Latin America)", "スペイン語(中南米)"], ["French", "フランス語"], ["French (Canada)", "フランス語(カナダ)"], 
    ["German", "ドイツ語"], ["Italian", "イタリア語"], ["Russian", "ロシア語"], ["Portuguese", "ポルトガル語"], ["Portuguese (Brazil)", "ポルトガル語(ブラジル)"], 
    ["Dutch", "オランダ語"], ["Swedish", "スウェーデン語"], ["Finnish", "フィンランド語"], ["Danish", "デンマーク語"], ["Norwegian", "ノルウェー語"], 
    ["Polish", "ポーランド語"], ["Ukrainian", "ウクライナ語"], ["Greek", "ギリシャ語"], ["Czech", "チェコ語"], ["Hungarian", "ハンガリー語"], 
    ["Romanian", "ルーマニア語"], ["Turkish", "トルコ語"], ["Icelandic", "アイスランド語"], ["Estonian", "エストニア語"], ["Latvian", "ラトビア語"], 
    ["Lithuanian", "リトアニア語"], ["Slovak", "スロバキア語"], ["Slovenian", "スロベニア語"], ["Croatian", "クロアチア語"], ["Bosnian", "ボスニア語"], 
    ["Serbian", "セルビア語"], ["Bulgarian", "ブルガリア語"], ["Macedonian", "マケドニア語"], ["Albanian", "アルバニア語"], ["Belarusian", "ベラルーシ語"],
    ["Catalan", "カタルーニャ語"], ["Basque", "バスク語"], ["Galician", "ガリシア語"]
  ] },
  { group: "Middle East, Africa & Others", langs: [
    ["Arabic", "アラビア語"], ["Hebrew", "ヘブライ語"], ["Farsi", "ペルシア語"], ["Swahili", "スワヒリ語"], ["Afrikaans", "アフリカーンス語"], 
    ["Amharic", "アムハラ語"], ["Kazakh", "カザフ語"], ["Uzbek", "ウズベク語"], ["Armenian", "アルメニア語"], ["Azerbaijani", "アゼルバイジャン語"], 
    ["Georgian", "ジョージア語"], ["Mongolian", "モンゴル語"], ["Nepali", "ネパール語"], ["Zulu", "ズールー語"]
  ] }
];

function applyUi(lang) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  document.getElementById('ui-title').innerText = t.title;
  document.getElementById('label-api-key').innerText = t.labelApiKey;
  document.getElementById('label-model').innerText = t.labelModel;
  document.getElementById('label-summary-mode').innerText = t.labelSummaryMode;
  document.getElementById('label-summary-lang').innerText = t.labelSummaryLang;
  document.getElementById('label-interval').innerText = t.labelInterval;
  document.getElementById('label-buffer').innerText = t.labelBuffer;
  document.getElementById('label-ui-lang').innerText = t.labelUiLang;
  document.getElementById('save').innerText = t.btnSave;
  document.getElementById('label-max-chars').innerText = t.labelMaxChars;
  
  // プロンプト用UIの適用
  document.getElementById('ui-prompt-title').innerText = t.promptTitle;
  document.getElementById('label-prompt-simple').innerText = t.labelPromptSimple;
  document.getElementById('label-prompt-detailed').innerText = t.labelPromptDetailed;
  document.getElementById('resetPrompts').innerText = t.btnReset;

  // マニュアル領域の流し込み（manual.jsから）
  document.getElementById('manual-area').innerHTML = MANUAL_CONTENT[lang] || MANUAL_CONTENT.en;

  const mMode = document.getElementById('summaryMode'); 
  const currentMode = mMode.value; 
  mMode.innerHTML = "";
  for (const [id, txt] of Object.entries(t.modes)) {
    const opt = document.createElement('option'); opt.value = id; opt.innerText = txt; mMode.appendChild(opt);
  }
  mMode.value = currentMode || 'simple';

  const mName = document.getElementById('modelName');
  const currentModel = mName.value; 
  mName.innerHTML = "";
  for (const [id, txt] of Object.entries(t.models)) {
    const opt = document.createElement('option'); 
    opt.value = id; 
    opt.innerText = txt; 
    mName.appendChild(opt);
  }
  mName.value = currentModel || 'gemini-2.5-flash-lite';
  
  const lSel = document.getElementById('language'); 
  const currentLang = lSel.value;
  lSel.innerHTML = "";
  LANGUAGE_LIST.forEach(g => {
    const group = document.createElement('optgroup'); group.label = g.group;
    g.langs.forEach(l => {
      const opt = document.createElement('option'); opt.value = l[0]; opt.innerText = (lang === 'ja') ? l[1] : l[0]; group.appendChild(opt);
    });
    lSel.appendChild(group);
  });
  lSel.value = currentLang || 'English';
}

document.getElementById('uiLanguage').addEventListener('change', (e) => applyUi(e.target.value));

document.getElementById('save').addEventListener('click', () => {
  const ui = document.getElementById('uiLanguage').value;
  const key = document.getElementById('apiKey').value.trim();
  if (!key) { showStatus(UI_TEXT[ui].statusNg, "red"); return; }
  
  chrome.storage.local.set({
    uiLanguage: ui, 
    geminiApiKey: key, 
    geminiModel: document.getElementById('modelName').value,
    summaryMode: document.getElementById('summaryMode').value, 
    summaryInterval: parseInt(document.getElementById('interval').value, 10),
    bufferThreshold: parseInt(document.getElementById('bufferThreshold').value, 10),
    maxChars: parseInt(document.getElementById('maxChars').value, 10),
    summaryLanguage: document.getElementById('language').value,
    promptSimple: document.getElementById('promptSimple').value,
    promptDetailed: document.getElementById('promptDetailed').value
  }, () => showStatus(UI_TEXT[ui].statusOk, "green"));
});

document.getElementById('resetPrompts').addEventListener('click', () => {
  document.getElementById('promptSimple').value = DEFAULT_PROMPTS.simple;
  document.getElementById('promptDetailed').value = DEFAULT_PROMPTS.detailed;
});

function showStatus(txt, col) { const s = document.getElementById('status'); s.innerText = txt; s.style.color = col; setTimeout(() => s.innerText = "", 3000); }

chrome.storage.local.get(null, (d) => { 
  applyUi(d.uiLanguage || 'en'); 
  if (d.uiLanguage) document.getElementById('uiLanguage').value = d.uiLanguage;
  if (d.geminiApiKey) document.getElementById('apiKey').value = d.geminiApiKey;
  if (d.geminiModel) document.getElementById('modelName').value = d.geminiModel;
  if (d.summaryMode) document.getElementById('summaryMode').value = d.summaryMode;
  if (d.summaryLanguage) document.getElementById('language').value = d.summaryLanguage;
  if (d.summaryInterval) document.getElementById('interval').value = d.summaryInterval;
  if (d.bufferThreshold) document.getElementById('bufferThreshold').value = d.bufferThreshold;
  if (d.maxChars) document.getElementById('maxChars').value = d.maxChars;
  // プロンプトの読み込み
  document.getElementById('promptSimple').value = d.promptSimple || DEFAULT_PROMPTS.simple;
  document.getElementById('promptDetailed').value = d.promptDetailed || DEFAULT_PROMPTS.detailed;
});