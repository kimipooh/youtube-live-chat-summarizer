# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project type

Chrome 拡張機能 (Manifest V3) / Vanilla JS。`package.json`、ビルドツール、テストフレームワーク、Lint 設定は意図的に存在しない。導入を提案しない。

## Build / Run / Debug

ビルドコマンド・テストコマンドはない。

- ロード: `chrome://extensions/` → 「デベロッパー モード」ON → 「パッケージ化されていない拡張機能を読み込む」→ リポジトリルートを指定。
- 編集後の反映: 拡張機能カードの「↻」リロードボタン。content.js を変更した場合は YouTube ライブページ側もリロード。
- background (service worker) のデバッグ: 拡張機能カードの「サービス ワーカー」リンク → DevTools。
- side panel のデバッグ: パネル上で右クリック → 検証。
- content script のデバッグ: YouTube live_chat iframe 内コンソール。

## Architecture (4 コンポーネント)

```
content.js  (YouTube live_chat / live_chat_replay iframe に注入)
  └── MutationObserver で #message を監視, バッファして CHAT_BATCH を送信
       ↓ chrome.runtime.sendMessage
background.js  (service worker)
  ├── sidePanelPorts: Map<windowId, Port> でウィンドウ単位の接続管理
  ├── CHAT_BATCH 受信 → chrome.storage.local 読込 → Gemini API 直叩き
  └── 結果を targetPort.postMessage({type:"UPDATE_UI", ...})
       ↓ Port
sidepanel.js / sidepanel.html  (side panel UI)
  └── port.onMessage で要約カードを #history-container に prepend

options.js / options.html  (設定画面)
  └── chrome.storage.local に書き込み (他コンポーネントは onChanged で即時反映)
```

主要な設計要点:

- **ウィンドウ単位の port 多重化**: background.js は `sidePanelPorts: Map<windowId, Port>` を保持し、`chrome.windows.getCurrent` で送信先を特定する。サイドパネルへの送信に `chrome.runtime.sendMessage` の全体ブロードキャストを使わないこと。
- **idle 時 API 不発火**: content.js は `isPanelOpen` フラグでパネル未オープン時はバッファすら作らない (これがコスト節約の核)。background.js は `PANEL_OPENED` / `PANEL_CLOSED` を当該ウィンドウの全タブへ送って同期する。
- **SPA 対応**: content.js が `setInterval` で `location.href` の変化を監視し、別配信へ遷移したらバッファと `isFirstRun` をリセットする。
- **設定リアルタイム反映**: content.js は `chrome.storage.onChanged` を購読しており、options 保存後にページリロードは不要。
- **モデル選択の優先順位**: `manualModel` (テキスト入力) が `geminiModel` (select) より優先。`background.js` と `sidepanel.js` の両方に同じ優先ロジックがあるため、片方だけ変更しないこと。
- **Thinking Level**: モデル名に `gemini-3` を含む時のみ `generationConfig.thinkingConfig` を付与する。判定は `background.js` (API 送信時) と `sidepanel.js` (ヘッダ表示) の両方にあり、こちらも同期して変更する。
- **content script の注入対象**: `manifest.json` の matches は `live_chat*` / `live_chat_replay*` のみ。視聴ページ本体には注入しない設計。

## Storage schema (`chrome.storage.local`)

フラットキー (`get(null)` で全取得):

- 認証/モデル: `geminiApiKey`, `geminiModel`, `manualModel`, `thinkingLevel`
- 言語: `uiLanguage` (`'ja'` | `'en'`), `summaryLanguage` (自由文字列 例: `'Japanese'`)
- 要約: `summaryMode` (`'simple'` | `'detailed'`), `promptSimple`, `promptDetailed`
- 送信制御: `summaryInterval` (秒), `bufferThreshold` (件数), `maxChars` (0 = 無制限)

## ファイル別責務

- `manifest.json` — MV3。`permissions: ["sidePanel","storage"]`、host: youtube/google/generativelanguage。
- `background.js` — service worker。ポート管理 + Gemini API 呼び出し + プロンプト合成。
- `content.js` — live_chat iframe に注入。チャット収集とバッファ送出。
- `sidepanel.js` / `sidepanel.html` — 要約カード表示 UI。
- `options.js` / `options.html` — 設定画面。`UI_TEXT` で ja/en 切替。
- `manual.js` — options 画面下部に注入する利用ガイド HTML 文字列 (ja/en)。
- `README.md` / `README-en.md` — 日英ユーザードキュメント (二本立て)。
- `CHANGELOG.md` — Keep a Changelog 風。
- `icons/` — 16/32/48/128 px。

## プロジェクト固有の作業ルール

- **最小変更を維持**: ビルドツール導入、TypeScript 化、フレームワーク化、構造の刷新は行わない・提案しない。
- **バイリンガル必須**: UI 文言、エラーメッセージ、マニュアル、README を追加・変更する時は `ja` と `en` の両方を更新する。`UI_TEXT` (options.js), `MANUAL_CONTENT` (manual.js), `STATUS_MAP` (background.js), `README.md` / `README-en.md` のいずれも対象。
- **二重実装の同期**: `manualModel || geminiModel` の優先順位と `gemini-3` 判定は `background.js` と `sidepanel.js` の両方に存在する。片方だけ変更しない。
- **ウィンドウ分離の維持**: 新規メッセージを追加する時は `sidePanelPorts.get(windowId)` を踏襲し、ウィンドウ間で要約が混在しないようにする。
- **ドキュメント同期**: 設定キー、デフォルト値、フロー、対応モデルを変更したら `README.md` / `README-en.md` と `CHANGELOG.md` を実装の一部として更新する。本文全体の書き換えは行わず、必要箇所のみ追記・修正する。
