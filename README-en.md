# YouTube Live Chat Summarizer

**English** | [日本語](README.md)

- Author: Kimiya Kitani
- Latest version: 1.1.0

## Overview

This extension uses the Google Gemini API to summarize YouTube Live chats and Archives in real-time. It is designed as a Multi-Channel Monitor—summaries are strictly delivered to the side panel of the same window, preventing data from mixing between multiple open streams.

Additionally, you can freely customize both "Simplified" and "Detailed" prompt versions through the settings menu. It also supports Thinking settings for supported models and manual model code entry.

## 🔒 Data Privacy & Security

* **Your data stays yours.** This extension communicates strictly between your browser and the Google Gemini API.
* **No Third-Party Tracking:** Chat data and API keys are NEVER sent to the developer or any external servers.
* **Local Storage:** Your API key and settings are stored securely in your browser's local storage.

## 💰 API Savings & Optimization

To minimize API quota usage and costs, this extension includes several intelligent saving features:

* **Playback Auto-Sleep:** Summarization stops automatically when the video is paused. No data is sent to the API until playback resumes and new chat flows.
* **Window-Based Control:** The summary process completely shuts down for any window where the side panel is closed.
* **Threshold Buffering:** Only sends requests when the "Min Chat Count to Trigger" (default: 5) is met within the interval, preventing empty or low-value requests.
* **Character Filtering:** Optional "Max Input Characters per Request" setting prevents excessive token consumption during high-traffic moments (Setting it to 0 allows unlimited characters).

## ✨ Features

* **Window Isolation Sync:** Summaries are strictly delivered to the side panel of the same window.
* **Automatic Title Tagging:** Each summary is automatically prefixed with the `【Video Title】` for easy identification.
* **Visual Highlights:** Important topics like `[Main Topic]` are highlighted in **Bold Red**, and titles are displayed in **Blue Labels**.
* **Instant Initial Trigger:** Starts summarizing from the very first message the moment you play a video or open the panel.

## 1. Installation (via GitHub)

This step is not required if you have already installed the application via the Chrome Web Store.

1. Click the **Code** button and either select **Download ZIP** or use the `git clone` command to download the repository.
2. If you downloaded the ZIP version, open and extract it.
3. Move the `youtube-live-chat-summarizer` folder to a permanent location, such as your Documents folder. (Note: If you delete this folder, the extension will be removed from Chrome.)
4. Open the Extensions page in Chrome (you can also type `chrome://extensions/` in the address bar).
5. Select **Load unpacked** and choose the `youtube-live-chat-summarizer` folder you just moved.
6. Once **YouTube Live Chat Summarizer** appears in your extensions, open the **Options** menu. Follow the instructions provided to create and set your API Key.
7. Complete the required initial settings:
   - **UI Language:** Japanese is set by default, but English is also fully supported.
   - **AI Model:** Gemini 2.5 Flash-Lite is set by default. Gemini 3.1 Pro Preview is available, but higher-performance models cost more. You can also manually specify model codes to use newer or preview models.
   - **Thinking Level:** Supported models can use "Thinking Level" to tune the balance between cost and response quality.
   - **Output Mode:** Choose between "Simplified" and "Detailed" versions. Each can be customized in the options. The `{{LANG}}` placeholder will automatically insert your selected output language.
   - **Output Language:** Based on [languages supported by Gemini](https://support.google.com/gemini/answer/13575153) (as of late February 2026). The default is set to Japanese; please change it to English or your preferred language as needed.

### Initial Setup: API Key Configuration

1. Visit Google AI Studio (https://aistudio.google.com/) and sign in.
2. Click "Get API key" on the left sidebar and select "Create API key in new project".
3. Copy the key and paste it into the "Gemini API Key" field in the options, then click "Save Settings".

Using Google AI Studio is a convenient option, though Google Cloud Console is also perfectly fine.
If you choose to use the Google Cloud Console, I recommend restricting the API key specifically to the Gemini API. Furthermore, **never share your API key with others**. It is strictly forbidden to share screenshots that include your API key. If a key is leaked, it would allow unauthorized parties to use the Gemini API through your account at your expense.

I also highly recommend that you regularly check your usage metrics in both Google AI Studio and Google Cloud Console.
If you are concerned about potential costs—for instance, when running the extension for an extended period—I recommend creating your API key through the Google Cloud Console. The Google Cloud Console provides a notification feature to help you monitor and manage your expenses.

### Highly Recommended: Register Billing for Free Tier

As of February 2026, the free tier of the Gemini API without billing enabled is highly restrictive, making it practically unusable for consistent performance.

Without billing, the [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) are strict, which often causes the service to halt quickly during testing. By enabling billing, the limits are relaxed, making it easier to avoid interruptions. This allows you to primarily stay within the free quota while using the paid tier only when needed for stability.

Furthermore, in the standard free tier, your input and output data may be used by Google to improve their models (training). Once you enable billing, this concern is removed. For more information, please refer to the [Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms).

Even after registering for billing, a free monthly quota still applies. Gemini 2.5 Flash-Lite is the lowest-cost baseline model and is well suited for long-running stream monitoring.

## 2. Usage: Pinning & Starting

1. Click the Puzzle icon in Chrome and Pin this extension to your toolbar.
2. Open a YouTube Live stream and click the Extension Icon in your toolbar.
3. Select "Open Side Panel" to start real-time summarization.
4. **Multi-Channel Monitoring:** Open a new Chrome Window, navigate to a different stream, and open its side panel. Each window operates entirely independently.

## 💰 API Usage Phases & Costs

To ensure privacy and stable performance, we recommend **registering a billing account** at Google AI Studio.

| Phase | Billing Info | Privacy | Limits |
| :--- | :--- | :--- | :--- |
| **1: Unbilled (Free)** | **None** | Training: **Enabled⚠️** | Very strict (Stops quickly) |
| **2: Billed (Free Quota)** | **Registered** | Training: **Disabled🔒** | Relaxed (Practical for use) |
| **3: Billed (Paid)** | **Registered** | Training: **Disabled🔒** | No limits (Stable for heavy traffic) |

## 🤖 Model Comparison

Choose the best model based on your needs. **Gemini 2.5 Flash-Lite** is recommended for its balance of speed and cost.
For pricing details, see the Gemini API documentation: https://ai.google.dev/gemini-api/docs/pricing.

| Model Name | IQ (Intelligence) | Speed | Feature |
| :--- | :--- | :--- | :--- |
| **Gemini 2.5 Flash-Lite** | **Standard** | **Fastest** | **Recommended:** fastest and lowest cost |
| **Gemini 2.5 Flash** | **Medium** | **Fast** | Stable fast model |
| **Gemini 2.5 Pro** | **High** | **Slow** | Stable, high-accuracy analysis |
| **Gemini 3.1 Flash-Lite** | **High** | **Fast** | Stable fast model |
| **Gemini 3.5 Flash** | **High** | **Fast** | Stable. Note its default thinking behavior when unspecified |
| **Gemini 3.1 Pro Preview** | **Highest** | **Slow** | Preview. Best for advanced analysis, but high cost |

**About Thinking Level:**
Gemini 3 models use `thinkingLevel`, while Gemini 2.5 models use `thinkingBudget` to control reasoning effort. Thinking tokens are treated as output-side tokens, so higher thinking levels can increase cost. `None` / API default does not always mean "no thinking"; in particular, Gemini 3.5 Flash may default to medium when unspecified. If cost is the top priority, use `Minimal`. Gemini 2.5 Pro cannot receive `thinkingBudget: 0`, so `None` is treated as API default and `Minimal` uses the minimum budget.

**Understanding Token Consumption:**
Because prices can change, it is safer to compare models by relative multipliers using Gemini 2.5 Flash-Lite as 1.0x. Always check the latest Gemini API Pricing page: https://ai.google.dev/gemini-api/docs/pricing.

| Model Name | Input multiplier | Output / thinking multiplier |
| :--- | :---: | :---: |
| **Gemini 2.5 Flash-Lite** | 1.0x | 1.0x |
| **Gemini 2.5 Flash** | 3.0x | 6.25x |
| **Gemini 2.5 Pro** | 12.5x | 25.0x |
| **Gemini 3.1 Flash-Lite** | 2.5x | 3.75x |
| **Gemini 3.5 Flash** | 15.0x | 22.5x |
| **Gemini 3.1 Pro Preview** | 20.0x | 30.0x |

Actual cost depends strongly on `summaryInterval`, `bufferThreshold`, `maxChars`, `summaryMode`, and `thinkingLevel`. Start with 2.5 Flash-Lite and short output, then move to heavier models or higher thinking levels only when needed.

## ⚠️ Troubleshooting

### 🔴 The summary stops or doesn't appear. Why?

1. **Service Worker Sleep:** The background script may go to sleep. Reopening the side panel wakes it up.
2. **Orphaned Script:** After an extension update, you **MUST refresh the YouTube page (F5)** to re-connect the monitoring script.
3. **Double Condition Logic:** Except for the first run, it waits for BOTH the time interval and chat count. If chat is slow, it takes time.
4. **Window Isolation:** A YouTube tab only sends data to the side panel in its **SAME window**. It won't work across different windows.

#### 🏆 The Golden Fix

If it feels stuck: **Refresh the YouTube page (F5) AND re-open the side panel.**

### How to verify API saving features

1. Open `chrome://extensions/` and click **"service worker"** on this extension.
2. Select the **"Network"** tab in the developer tools window that opens.
3. **When Panel is Open:** You will see requests to `generativelanguage...` based on your interval.
4. **When Panel is Closed (or video paused):** The requests will stop completely. This confirms your API quota is being saved.

## License

MIT License.

Copyright (c) 2026 Kimiya Kitani
