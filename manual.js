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
      <table class="sim-table">
        <tr><th>Model Name</th><th>IQ (Intelligence)</th><th>Speed</th><th>Feature</th></tr>
        <tr><td><strong>3.1 Pro</strong></td><td>Highest</td><td>Slow</td><td>Best for deep professional analysis</td></tr>
        <tr><td><strong>3.1 Flash-Lite</strong></td><td>High</td><td>Fast</td><td>Latest balanced high-speed model</td></tr>
        <tr><td><strong>3 Flash</strong></td><td>Medium</td><td>Fast</td><td>General-purpose high-speed model</td></tr>
        <tr><td><strong>2.5 Pro</strong></td><td>Highest</td><td>Slow</td><td>Stable and high-precision analysis</td></tr>
        <tr><td><strong>2.5 Flash</strong></td><td>Medium</td><td>Fast</td><td>Reliable and stable legacy version</td></tr>
        <tr><td><strong>2.5 Flash-Lite</strong></td><td>Standard</td><td>Fastest</td><td><strong>Recommended:</strong> Fastest & Cheapest</td></tr>
      </table>
  `
};