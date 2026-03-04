# YouTube Live Chat Summarizer

- Author: Kimiya Kitani
- Latest version: 1.0.0

## Overview (概要)

This extension uses the Google Gemini API to summarize YouTube Live chats and Archives in real-time. It is designed as a Multi-Channel Monitor—summaries are strictly delivered to the side panel of the same window, preventing data from mixing between multiple open streams.

Additionally, you can freely customize both "Simplified" and "Detailed" prompt versions through the settings menu.

---

Google Gemini APIを使用してYouTubeライブチャット（アーカイブのリプレイ含む）をリアルタイムで要約するChrome拡張機能です。
**「マルチチャンネル・モニター」**として設計されており、複数のウィンドウで別々の配信を開いても、それぞれのサイドパネルが独立して動作します。他の配信のデータが混ざることはありません。

さらに、設定メニューから「簡易」および「詳細」の両方のプロンプトバージョンを自由にカスタマイズできます。

## 🔒 Data Privacy & Security (データプライバシーとセキュリティ)

**Your data stays yours.** This extension communicates strictly between your browser and the Google Gemini API.
* **No Third-Party Tracking:** Chat data and API keys are NEVER sent to the developer or any external servers.
* **Local Storage:** Your API key and settings are stored securely in your browser's local storage.

---

**データは安全に保護されます。** 本拡張機能は、お使いのブラウザとGoogle Gemini APIとの間でのみ通信を行います。
* **外部送信なし:** 取得したチャットデータやAPIキーが、開発者や第三者のサーバーに送信されることは一切ありません。
* **ローカル保存:** APIキーや各種設定は、ブラウザ内のローカルストレージに安全に保存されます。

## 💰 API Savings & Optimization (API節約・コスト最適化)

To minimize API quota usage and costs, this extension includes several intelligent saving features:

* **Playback Auto-Sleep:** Summarization stops automatically when the video is paused. No data is sent to the API until playback resumes and new chat flows.
* **Window-Based Control:** The summary process completely shuts down for any window where the side panel is closed.
* **Threshold Buffering:** Only sends requests when the "Min Chat Count" (default: 5) is met within the interval, preventing empty or low-value requests.
* **Character Filtering:** Optional "Max Input Characters" setting prevents excessive token consumption during high-traffic moments.

---

APIのクォータ（回数制限）とコストを最小限に抑えるため、以下の節約機能を搭載しています。

* **再生停止時のオートスリープ:** 動画を停止するとチャットの監視も止まります。新しいチャットが流れない限り、APIリクエストは一切発生しません。
* **ウィンドウ単位の通信制御:** サイドパネルが閉じているウィンドウでは、要約処理が完全に停止し、無駄なバックグラウンド通信を防ぎます。
* **送信閾値（バッファ）:** 設定した「最小チャット数」が溜まるまで送信を待機し、中身のないリクエスト連投を防ぎます。
* **文字数制限フィルタ:** オプションで「送信上限文字数」を指定でき、激流チャット時でも過度なトークン消費を抑えられます。

## ✨ Features (主な機能)

* **Window Isolation Sync:** Summaries are strictly delivered to the side panel of the same window.
* **Automatic Title Tagging:** Each summary is automatically prefixed with the `【Video Title】` for easy identification.
* **Visual Highlights:** Important topics like `[Main Topic]` are highlighted in **Bold Red**, and titles are displayed in **Blue Labels**.
* **Instant Initial Trigger:** Starts summarizing from the very first message the moment you play a video or open the panel.

---

* **ウィンドウ分離同期:** 要約データは、その配信を開いているウィンドウのサイドパネルだけに届きます。複数窓での同時監視に最適です。
* **配信タイトルの自動付与:** 要約の冒頭に `【動画タイトル】` を自動でタグ付け。どの配信の要約か一目でわかります。
* **視覚的強調:** `[主な話題]` などの項目は**赤色太字**、配信タイトルは**青色ラベル**で整理されます。
* **初回クイック起動:** 再生開始やパネルを開いた直後、最初の1通目が届いた瞬間に待機時間なしで要約を開始します。

## 1. Installation (インストール)

1. Click the **Code** button and either select **Download ZIP** or use the `git clone` command to download the repository.
2. If you downloaded the ZIP version, open and extract it.
3. Move the `youtube-live-chat-summarizer` folder to a permanent location, such as your Documents folder. (Note: If you delete this folder, the extension will be removed from Chrome.)
4. Open the Extensions page in Chrome (you can also type `chrome://extensions/` in the address bar).
5. Select **Load unpacked** and choose the `youtube-live-chat-summarizer` folder you just moved.
6. Once **YouTube Live Chat Summarizer** appears in your extensions, open the **Options** menu. Follow the instructions provided to create and set your API Key.
7. Complete the required initial settings:
   - **UI Language:** Supports both English and Japanese.
   - **AI Model:** Gemini 2.5 Flash Lite is set by default. While Gemini 3.1 Pro is available, please note it is significantly more expensive.
   - **Output Mode:** Choose between "Simplified" and "Detailed" versions. Each can be customized in the options. The `{{LANG}}` placeholder will automatically insert your selected output language.
   - **Output Language:** Based on [languages supported by Gemini](https://support.google.com/gemini/answer/13575153) (as of late February 2026). The default is set to Japanese; please change it as needed.

---

1. Codeボタンから、 Download ZIP を使うか、git clone コマンドでダウンロードします。
2. ZIP圧縮版をダウンロードした場合には、これを開いて展開します。
3. `youtube-live-chat-summarizer` フォルダを、書類など消さない場所に移動します（このフォルダを消すと拡張機能も消えます）。
4. Chromeで拡張機能を開きます（アドレス欄に `chrome://extensions/` と入力しても開けます）。
5. 「パッケージ化されていない拡張機能を読み込む」を選択し、先程移動した `youtube-live-chat-summarizer` フォルダを選択します。
6. Chromeの拡張機能に、YouTube Live Chat Summarizer が追加されるので、「オプション」を開きます。下記を参考に、API Key を作成した上でセットします。
7. 必要な初期設定をします。
  - UI Language は、English 以外に日本語を選択できます。
  - AI Model は Gemini 2.5 Flash Lite がデフォルトです。Gemini 3.1 Pro まで選択可能ですが、料金がかなりかかります。
  - 出力モードとして、簡易版と詳細版を用意しています。それぞれオプションからカスタマイズできます。`{{LANG}}` には、出力言語が自動的に入力されます。
  - 出力言語は、[Gemini のサポートする言語](https://support.google.com/gemini/answer/13575153)（2026年2月末時点）を設定しています。デフォルトは英語にしているので適宜変更してください。

### Initial Setup: API Key Configuration (初期設定: APIキーの取得と設定)

1. Visit Google AI Studio (https://aistudio.google.com/) and sign in.
2. Click "Get API key" on the left sidebar and select "Create API key in new project".
3. Copy the key and paste it into the "Gemini API Key" field in the options, then click "Save Settings".

Using Google AI Studio is a convenient option, though Google Cloud Console is also perfectly fine.
If you choose to use the Google Cloud Console, I recommend restricting the API key specifically to the Gemini API. Furthermore, **never share your API key with others**. It is strictly forbidden to share screenshots that include your API key. If a key is leaked, it would allow unauthorized parties to use the Gemini API through your account at your expense.

I also highly recommend that you regularly check your usage metrics in both Google AI Studio and Google Cloud Console.
If you are concerned about potential costs—for instance, when running the extension for an extended period—I recommend creating your API key through the Google Cloud Console. The Google Cloud Console provides a notification feature to help you monitor and manage your expenses.

---

1. Google AI Studio (https://aistudio.google.com/) にアクセスしログインします。
2. 左メニューの 「Get API key」 から 「Create API key in new project」 を実行しキーを発行します。
3. 発行されたキーをコピーし、本拡張機能の設定画面に貼り付けて 「設定を保存」 を押してください。

Google AI Studio を利用するのが手軽ですが、Google Cloud Console でも構いません。
Google Cloud Consoleを利用する場合には、Gemini APIのみの制限をしておくことを推奨します。また**APIキーは他人には絶対に公開しないでください**。APIキーが映り込んでいるスクリーンショットの共有も厳禁です。APIキーが漏洩すると、悪意のある第三者があなたのアカウントでGemini APIを使用し、予期せぬ請求が発生する恐れがあります。

また、Google AI Studio やGoogle Cloud Consoleで使用量などを定期的に確認しておくことをオススメします。
長時間動作させる場合など、課金が気になるようであれば、予算超過時のアラート通知機能が充実しているGoogle Cloud ConsoleでAPIキーを作成してください。

### Highly Recommended: Register Billing for Free Tier (推奨: 支払い登録をして無料枠で使う)

As of February 2026, the free tier of the Gemini API without billing enabled is highly restrictive, making it practically unusable for consistent performance.

Without billing, you are limited to approximately 20 requests per day ([Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)), which often causes the service to halt quickly during testing. By enabling billing, this limit jumps to several thousand RPM (Requests Per Minute), effectively eliminating most constraints. This allows you to adopt a strategy of "primarily staying within the free quota (with a registered billing account) while paying just a few cents to keep it running if the limit is exceeded."

Furthermore, in the standard free tier, your input and output data may be used by Google to improve their models (training). Once you enable billing, this concern is removed. For more information, please refer to the [Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms).

Even after registering for billing, a free monthly quota (approximately 1 to 1.5 million tokens) still applies. In particular, Gemini 2.5 Flash Lite is exceptionally affordable; even if you exceed the free tier, the rates are as low as $0.10 for input and $0.40 for output per 1 million tokens.

---

2026年2月現在、Gemini API で支払い設定をしていない状態での利用制限は非常に厳しく、実用的ではありません。

未登録の無料枠のままだと1日数十回程度の[制限](https://ai.google.dev/gemini-api/docs/rate-limits)があり、テスト中にすぐ止まってしまいます。支払い設定をすると、この制限が数千RPMまで跳ね上がるため、リミットによる停止はほぼなくなります。
「基本は無料枠内で使い、超過した分だけ数十円払ってでも安定して動かし続ける」というスタンスが取れるようになります。

さらに重要な点として、未登録状態では入出力データがGoogleのモデル改善（学習）に使用される可能性がありますが、**支払い設定（クレジットカード登録等）をした場合にはデータ学習に利用されなくなります。** 詳細は[Gemini API 追加利用規約](https://ai.google.dev/gemini-api/terms)をご覧ください。

支払い登録をしても、毎月の無料枠（約100万〜150万トークン）はそのまま適用されます。特に Gemini 2.5 Flash Lite は極めて安価で、無料枠を超えても「入力 $0.10 / 出力 $0.40 (100万トークンあたり)」と非常にリーズナブルです。

## 2. Usage: Pinning & Starting (利用方法: ピン留めと開始の手順)

1. Click the Puzzle icon in Chrome and Pin this extension to your toolbar.
2. Open a YouTube Live stream and click the Extension Icon in your toolbar.
3. Select "Open Side Panel" to start real-time summarization.
4. **Multi-Channel Monitoring:** Open a new Chrome Window, navigate to a different stream, and open its side panel. Each window operates entirely independently.
   
---

1. Chrome右上のパズルアイコンから、本ツールを「ピン留め（固定）」します。
2. YouTubeライブを開き、ツールバーに固定されたアイコンをクリックします。
3. 「サイドパネルを表示」を選択すると、リアルタイム要約が始まります。
4. **マルチチャンネル監視:** 別のChromeウィンドウを開き、違う配信でサイドパネルを開いてみてください。それぞれのウィンドウが完全に独立して要約を行います。

## 💰 API Usage Phases & Costs (API利用のフェーズとコスト)

To ensure privacy and stable performance, we recommend **registering a billing account** at Google AI Studio.

| Phase | Billing Info | Privacy | Limits |
| :--- | :--- | :--- | :--- |
| **1: Unbilled (Free)** | **None** | Training: **Enabled⚠️** | Very strict (Stops quickly) |
| **2: Billed (Free Quota)** | **Registered** | Training: **Disabled🔒** | Relaxed (Practical for use) |
| **3: Billed (Paid)** | **Registered** | Training: **Disabled🔒** | No limits (Stable for heavy traffic) |

---

プライバシーと安定したパフォーマンスを確保するため、Google AI Studio で**請求先アカウントを登録**することをおすすめします。

| フェーズ | 支払い登録 | プライバシー | 制限の強さ |
| :--- | :--- | :--- | :--- |
| **1: 完全無料 (未登録)** | **なし** | 学習：**あり⚠️** | 非常に厳しい（すぐ止まります） |
| **2: 無料枠 (登録あり)** | **あり** | 学習：**なし🔒** | 緩和（実用的なレベル） |
| **3: 有料枠 (登録あり)** | **あり** | 学習：**なし🔒** | 制限なし（激しいチャットも安定） |

## 🤖 Model Comparison (モデル比較)

Choose the best model based on your needs. **Gemini 2.5 Flash-Lite** is recommended for its balance of speed and cost.
For pricing details, see the Gemini API documentation: https://ai.google.dev/gemini-api/docs/pricing.

| Model Name | IQ (Intelligence) | Speed | Feature |
| :--- | :--- | :--- | :--- |
| **3.1 Pro** | **Highest** | **Slow** | Best for deep professional analysis |
| **3.1 Flash-Lite** | **High** | **Fast** | Latest balanced high-speed model |
| **3 Flash** | **Medium** | **Fast** | General-purpose high-speed model |
| **2.5 Pro** | **Highest** | **Slow** | Stable and high-precision analysis |
| **2.5 Flash** | **Medium** | **Fast** | Reliable and stable legacy version |
| **2.5 Flash-Lite** | **Standard** | **Fastest** | **Recommended:** Fastest & Cheapest |

**Understanding Token Consumption:**
Looking at Google AI Studio usage, 99 requests using 2.5 Flash-Lite cost about 7.09 JPY. This represents roughly 100,000 tokens (input + output). Since the stream had heavy chat traffic, the input tokens were high, while the output tokens remained low due to using the "Simplified" prompt.
For example, a 30-second interval translates to a maximum of 120 requests per hour. 
However, even with exactly 120 requests, token consumption varies drastically based on:
* **Sparsely populated broadcasts:** Fewer chat messages mean fewer input tokens, keeping costs very low.
* **Exciting Streams:** High-traffic streams send thousands of characters per request, consuming tokens rapidly.
* **Summary Length:** Short bullet points are cheap, but detailed reports consume expensive "output tokens".
It is recommended to test your usage with 2.5 Flash-Lite first to gauge your specific costs before switching to heavier models.

---

ニーズに合わせて最適なモデルをお選びください。速度とコストのバランスが取れたGemini 2.5 Flash-Liteがおすすめです。
料金詳細は、Gemini API ドキュメント（ https://ai.google.dev/gemini-api/docs/pricing ）を参照してください。

| モデル名 | 知能 (IQ) | 速度 | 特徴 |
| :--- | :--- | :--- | :--- |
| **3.1 Pro** | **最高** | **遅い** | 専門的な深い分析に |
| **3.1 Flash-Lite** | **高い** | **速い** | 最新の高速バランス型 |
| **3 Flash** | **中** | **速い** | 汎用的な高速モデル |
| **2.5 Pro** | **最高** | **遅い** | 安定した高精度な分析 |
| **2.5 Flash** | **中** | **速い** | 実績のある安定高速版 |
| **2.5 Flash-Lite** | **標準** | **最速** | **推奨：**最速・最安 |

**トークン消費量（コスト）の考え方について：**
Google AI Studioの使用量をみると、2.5 Flash-Lite で99回リクエストし、7.09円でした。これは合計で約10万トークン分（入力＋出力）を使った計算になります。かなりチャットの量が多かったため入力トークンが多く、出力は簡易版を使っていたので抑えられていた状態です。
例えば、30秒間隔に設定した場合、1時間で最大120回リクエストが実行されます。
しかし、同じ「1時間・120回」の運用でも、以下の条件で消費トークン量は激変します。
* **過疎な配信:** チャットが少ないため、送るデータ量（入力トークン）が少なく、安く済みます。
* **大盛り上がりの配信:** 1回のリクエストに数千文字のチャットが含まれるため、トークン消費が激しくなります。
* **要約の長さ:** 短い箇条書きなら安いですが、詳細なレポートを出力させると単価の高い「出力トークン」を多く消費します。
まずは 2.5 Flash-Lite で実際に運用してみて、どの程度コストがかかるか感覚を掴んでからモデルを選ぶことをお勧めします。

## ⚠️ Troubleshooting (トラブルシューティング)

### 🔴 The summary stops or doesn't appear. Why? (要約が出ない、または止まるのはなぜ？)

1. **Service Worker Sleep:** The background script may go to sleep. Reopening the side panel wakes it up.
2. **Orphaned Script:** After an extension update, you **MUST refresh the YouTube page (F5)** to re-connect the monitoring script.
3. **Double Condition Logic:** Except for the first run, it waits for BOTH the time interval and chat count. If chat is slow, it takes time.
4. **Window Isolation:** A YouTube tab only sends data to the side panel in its **SAME window**. It won't work across different windows.

---

1. **サービスワーカーの休止:** 背景プログラムがChromeの仕様により休止することがあります。パネルの開き直しで復帰します。
2. **接続の瞬断:** 拡張機能を更新した直後は、**開いているYouTubeのページを必ず再読み込み（F5）**してください。
3. **二重の条件待ち:** **初回を除き**、「指定秒数の経過」と「最小チャット数の到達」の**両方**を満たした瞬間にのみ送信されます。
4. **ウィンドウ分離:** 要約データは、同じウィンドウ内のサイドパネルにのみ届きます。別ウィンドウ間での連動はしません。

#### 🏆 The Golden Fix (おまじない)

If it feels stuck: **Refresh the YouTube page (F5) AND re-open the side panel.**
動かないと感じたら、**「YouTubeをF5リロード」＋「サイドパネルを開き直す」**をセットで行ってください。

### How to verify API saving features (節約機能が動いているか確認する手順)

1. Open `chrome://extensions/` and click **"service worker"** on this extension.
2. Select the **"Network"** tab in the developer tools window that opens.
3. **When Panel is Open:** You will see requests to `generativelanguage...` based on your interval.
4. **When Panel is Closed (or video paused):** The requests will stop completely. This confirms your API quota is being saved.

---

1. `chrome://extensions/` を開き、本ツールの「サービス ワーカー」をクリックします。
2. 開いたデベロッパーツールの「Network」タブを選択します。
3. **パネルを開いている時:** 設定した秒数ごとに `generativelanguage...` への通信が発生します。
4. **パネルを閉じた時（または動画停止時）:** 通信がピタリと止まります。これで節約機能が正常に働いていることを確認できます。

## License (ライセンス)

MIT License.

Copyright (c) 2026 Kimiya Kitani
