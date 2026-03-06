/* manual.js - Author: Kimiya Kitani */
const MANUAL_CONTENT = {
  ja: `
      <div class="guide-box">
        <h3>🛠️ 【準備】APIキーの取得と設定</h3>
        <ol>
          <li><strong><a href="https://aistudio.google.com/" target="_blank">Google AI Studio</a></strong> にアクセスしログイン。</li>
          <li>左メニューの <strong>「Get API key」</strong> ＞ <strong>「Create API key in new project」</strong> を実行。</li>
          <li>発行されたキーをコピーし、上の入力欄に貼り付けて <strong>「設定を保存」</strong> を押してください。</li>
        </ol>
      </div>
      <div class="guide-box" style="border-left-color: #34a853; background: #eafff0;">
        <h3>📺 【利用】ピン留めと開始の手順</h3>
        <ol>
          <li>Chrome右上のパズルアイコンから、本ツールを<strong>ピン留め（固定）</strong>します。</li>
          <li>YouTubeライブを開き、ツールバーの<strong>アイコン</strong>をクリック。</li>
          <li><strong>「サイドパネルを開く」</strong>を選択すると要約が始まります。</li>
        </ol>
        <p>ウィンドウごとに分離しており、各ウィンドウの全タブを対象にチェックします</p>
      </div>
    <h3>💰 モデル別：コストと回数制限の徹底比較</h3>
    <p><span class="important">推奨設定：</span> 支払い登録をして <strong>2.5 Flash-Lite</strong> を使うのが、プライバシーも守られ、最も安価で快適です。</p>
    <ul>
      <li><strong>フェーズ1：完全無料 (未登録)</strong><br>支払い情報を登録しない状態。<strong>学習あり⚠️</strong>。回数制限が非常に厳しく、すぐに止まります。</li>
      <li><strong>フェーズ2：無料枠 (支払い登録あり)</strong><br>カードを登録し、月間の無料枠内で使う状態。<strong>学習なし🔒</strong>。制限が緩和され、実用的になります。</li>
      <li><strong>フェーズ3：有料枠 (支払い登録あり)</strong><br>無料枠を超えて使う状態。<strong>学習なし🔒</strong>。制限がなくなり、激しいチャットでも安定します。</li>
    </ul>

    <h3>🤖 選択できる6つのモデル</h3>
    <p>各情報は、<a target="_blank" href="https://ai.google.dev/gemini-api/docs/pricing">Gemini APIドキュメント</a>を参考にしてください</p>
    <p>より詳細ドキュメントは、<a target="_blank" href="https://github.com/kimipooh/youtube-live-chat-summarizer">GitHUBで公開</a>しています</p>
    <table class="sim-table">
        <tr><th>モデル名</th><th>知能 (IQ)</th><th>速度</th><th>特徴</th></tr>
        <tr><td><strong>3.1 Pro</strong></td><td>最高</td><td>遅い</td><td>専門的な深い分析に</td></tr>
        <tr><td><strong>3.1 Flash-Lite</strong></td><td>高い</td><td>速い</td><td>最新の高速バランス型</td></tr>
        <tr><td><strong>3 Flash</strong></td><td>中</td><td>速い</td><td>汎用的な高速モデル</td></tr>
        <tr><td><strong>2.5 Pro</strong></td><td>最高</td><td>遅い</td><td>安定した高精度な分析</td></tr>
        <tr><td><strong>2.5 Flash</strong></td><td>中</td><td>速い</td><td>実績のある安定高速版</td></tr>
        <tr><td><strong>2.5 Flash-Lite</strong></td><td>標準</td><td>最速</td><td><strong>推奨：</strong>最速・最安</td></tr>
    </table>
    <h3>🤖 推定コスト</h3>
    <p>確定した料金（課金額）の反映は、数時間から１日程度のタイムラグがあるので注意してください。</p>
    <p>以下は、2026年3月5日時点の<a target="_blank" href="https://ai.google.dev/gemini-api/docs/pricing">各モデルのコスト</a>と、下記の条件をもとにした推定価格です。あくまで推定であり、実際に消費したトークンや設定、複数のタグやウィンドウで利用するなどすると価格は変わってきます</p>
    <p>実行間隔: 30秒に1回（1日 2,880回）<br>1回あたりの推定量: 入力 2,000トークン / 出力 200トークン<br>為替レート: 1ドル = 158円（想定）</p>
    <table class="sim-table">
        <tr><th>モデル名</th><th>通常入力 ($/1M)</th><th>通常出力 ($/1M)</th><th>1時間 (推測/円)</th><th>備考</th></tr>
        <tr><td><strong>3.1 Pro</strong></td><td>$2.00</td><td>$12.00</td><td>約 121.3 円</td><td>1回のリクエストが 200kトークンを超えると単価が変動します</td></tr>
        <tr><td><strong>3.1 Flash-Lite</strong></td><td>$0.25</td><td>$1.50</td><td>約 15.2 円</td><td>-</td></tr>
        <tr><td><strong>3 Flash</strong></td><td>$0.50</td><td>$3.00</td><td>約 30.3 円</td><td>-</td></tr>
        <tr><td><strong>2.5 Pro</strong></td><td>$1.25</td><td>$10.00</td><td>約 85.3 円</td><td>1回のリクエストが 200kトークンを超えると単価が変動します</td></tr>
        <tr><td><strong>2.5 Flash</strong></td><td>$0.30</td><td>$2.50</td><td>約 20.9 円</td><td>-</td></tr>
        <tr><td><strong>2.5 Flash-Lite</strong></td><td>$0.10</td><td>$0.40</td><td>約 5.3 円</td><td>-</td></tr>
    </table>

    <h3>🧠 思考レベル (Thinking Level) を有効にした場合の推定コスト</h3>
    <p>Gemini 3.x系モデルで「思考レベル」を有効にすると、最終的な回答を出す前にAIが「思考プロセス」を生成します。<strong>この思考プロセスは「出力トークン」として課金される</strong>ため、レベルを上げるほどコストが増加します。</p>
    <p>※以下の表は、通常の出力(200トークン)に加えて、思考レベルごとに以下の追加トークンが発生したと仮定した1時間あたりの推定値です。<br>（Low: +200, Medium: +500, High: +1,000 トークン）</p>
    <table class="sim-table">
        <tr><th>モデル名 (3.x系のみ)</th><th>None (標準)</th><th>Low (軽い推論)</th><th>Medium (バランス)</th><th>High (深い分析)</th></tr>
        <tr><td><strong>3.1 Pro</strong></td><td>約 121.3 円</td><td>約 166.8 円</td><td>約 235.1 円</td><td>約 348.9 円</td></tr>
        <tr><td><strong>3.1 Flash-Lite</strong></td><td>約 15.2 円</td><td>約 20.9 円</td><td>約 29.4 円</td><td>約 43.6 円</td></tr>
        <tr><td><strong>3 Flash</strong></td><td>約 30.3 円</td><td>約 41.7 円</td><td>約 58.8 円</td><td>約 87.2 円</td></tr>
    </table>
    <p>※Gemini 2.5シリーズは思考機能に非対応のため、設定を変更してもコストは変わりません。</p>
  `,
  en: `
      <div class="guide-box">
        <h3>🛠️ 【Setup】API Key Configuration</h3>
        <ol>
          <li>Visit <strong><a href="https://aistudio.google.com/" target="_blank">Google AI Studio</a></strong> and sign in.</li>
          <li>Click <strong>"Get API key"</strong> -> <strong>"Create API key in new project"</strong>.</li>
          <li>Copy your key and paste it into the "Gemini API Key" field above, then click <strong>"Save Settings"</strong>.</li>
        </ol>
      </div>
      <div class="guide-box" style="border-left-color: #34a853; background: #eafff0;">
        <h3>📺 【Usage】Pinning & Starting</h3>
        <ol>
          <li>Click the <strong>Puzzle icon</strong> in Chrome and <strong>Pin</strong> this extension.</li>
          <li>Open a YouTube Live stream and click the <strong>Extension Icon</strong> in your toolbar.</li>
          <li>Select <strong>"Open Side Panel"</strong> to start real-time summarization.</li>
        </ol>
        <p>It is separate for each window and checks all tabs in each window</p>
      </div>
      <h3>💰 Model Comparison: Costs & Limits</h3>
      <p><span class="important">Recommended:</span> Registering your billing information and using <strong>2.5 Flash-Lite</strong> is the best choice—it protects your privacy while being the most cost-effective and smooth experience.</p>

      <ul>
        <li><strong>Phase 1: Unbilled (Free)</strong><br>No billing info registered. <strong>Training: Enabled⚠️</strong>. Very strict limits; the service will stop quickly.</li>
        <li><strong>Phase 2: Billed (Free Quota)</strong><br>Billing info registered, used within the monthly free tier. <strong>Training: Disabled🔒</strong>. Limits are relaxed, making it practical for daily use.</li>
        <li><strong>Phase 3: Billed (Paid)</strong><br>Usage beyond the free quota. <strong>Training: Disabled🔒</strong>. No limits; remains stable even with heavy chat traffic.</li>
      </ul>
      <h3>🤖 Six Available Models</h3>
      <p>For more details, please refer to the <a target="_blank" href="https://ai.google.dev/gemini-api/docs/pricing">Gemini API Documentation</a>.</p>
      <p>More detailed documentation is available on <a target="_blank" href="https://github.com/kimipooh/youtube-live-chat-summarizer">GitHub</a></p>
      <p>Please note that there may be a time lag of several hours to one day before the finalized charges are reflected in your account.</p>
      <table class="sim-table">
        <tr><th>Model Name</th><th>IQ (Intelligence)</th><th>Speed</th><th>Feature</th></tr>
        <tr><td><strong>3.1 Pro</strong></td><td>Highest</td><td>Slow</td><td>Best for deep professional analysis</td></tr>
        <tr><td><strong>3.1 Flash-Lite</strong></td><td>High</td><td>Fast</td><td>Latest balanced high-speed model</td></tr>
        <tr><td><strong>3 Flash</strong></td><td>Medium</td><td>Fast</td><td>General-purpose high-speed model</td></tr>
        <tr><td><strong>2.5 Pro</strong></td><td>Highest</td><td>Slow</td><td>Stable and high-precision analysis</td></tr>
        <tr><td><strong>2.5 Flash</strong></td><td>Medium</td><td>Fast</td><td>Reliable and stable legacy version</td></tr>
        <tr><td><strong>2.5 Flash-Lite</strong></td><td>Standard</td><td>Fastest</td><td><strong>Recommended:</strong> Fastest & Cheapest</td></tr>
      </table>
      <h3>🤖 Estimated Costs</h3>
      <p>Please note that there may be a time lag of several hours to one day before the finalized charges are reflected in your account.</p>
      <p>The following are estimated prices based on the <a target="_blank" href="https://ai.google.dev/gemini-api/docs/pricing">costs for each model</a> as of March 5, 2026, and the conditions below. These are only estimates; actual costs may vary depending on token consumption, settings, or use across multiple tags/windows.</p>
      <p>Execution Interval: Once every 30 seconds (2,880 times per day)<br>Estimated Volume per Request: 2,000 Input Tokens / 200 Output Tokens<br>Exchange Rate: 1 USD = 150 JPY (Estimated)</p>
      <table class="sim-table">
        <tr><th>Model Name</th><th>Input ($/1M)</th><th>Output ($/1M)</th><th>Per Hour (Est. USD)</th><th>Notes</th></tr>
        <tr><td><strong>3.1 Pro</strong></td><td>$2.00</td><td>$12.00</td><td>Approx. $0.768</td><td>Pricing changes to $4.00 (In) / $18.00 (Out) if a single request exceeds 200k tokens.</td></tr>
        <tr><td><strong>3.1 Flash-Lite</strong></td><td>$0.25</td><td>$1.50</td><td>Approx. $0.096</td><td>-</td></tr>
        <tr><td><strong>3 Flash</strong></td><td>$0.50</td><td>$3.00</td><td>Approx. $0.192</td><td>-</td></tr>
        <tr><td><strong>2.5 Pro</strong></td><td>$1.25</td><td>$10.00</td><td>Approx. $0.540</td><td>Pricing changes to $2.50 (In) / $15.00 (Out) if a single request exceeds 200k tokens.</td></tr>
        <tr><td><strong>2.5 Flash</strong></td><td>$0.30</td><td>$2.50</td><td>Approx. $0.132</td><td>-</td></tr>
        <tr><td><strong>2.5 Flash-Lite</strong></td><td>$0.10</td><td>$0.40</td><td>Approx. $0.033</td><td>-</td></tr>
     </table>

      <h3>🧠 Estimated Costs with Thinking Level Enabled</h3>
      <p>When you enable the "Thinking Level" for Gemini 3.x models, the AI generates a "thought process" before outputting the final answer. <strong>These thought processes are billed as Output Tokens</strong>, meaning higher levels will increase your costs.</p>
      <p>*The table below estimates the hourly cost assuming the following additional output tokens per request on top of the base 200 tokens:<br>(Low: +200, Medium: +500, High: +1,000 tokens)</p>
      <table class="sim-table">
        <tr><th>Model Name (3.x only)</th><th>None (Standard)</th><th>Low (Light)</th><th>Medium (Balanced)</th><th>High (Deep)</th></tr>
        <tr><td><strong>3.1 Pro</strong></td><td>~$0.768 /hr</td><td>~$1.056 /hr</td><td>~$1.488 /hr</td><td>~$2.208 /hr</td></tr>
        <tr><td><strong>3.1 Flash-Lite</strong></td><td>~$0.096 /hr</td><td>~$0.132 /hr</td><td>~$0.186 /hr</td><td>~$0.276 /hr</td></tr>
        <tr><td><strong>3 Flash</strong></td><td>~$0.192 /hr</td><td>~$0.264 /hr</td><td>~$0.372 /hr</td><td>~$0.552 /hr</td></tr>
      </table>
      <p>*Gemini 2.5 series models do not support the Thinking feature, so their costs remain unchanged regardless of this setting.</p>
  `
};