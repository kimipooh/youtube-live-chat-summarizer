# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-05-22

### Added
- Added Gemini 3.5 Flash as a selectable model.
- Added Minimal to the Thinking Level selector.
- Added Thinking Budget support for Gemini 2.5 models.

### Changed
- Updated Gemini model list to use stable Gemini 3.1 Flash-Lite.
- Updated thinking configuration logic by model family:
  - Gemini 3.x uses thinkingLevel.
  - Gemini 2.5 uses thinkingBudget.
- Replaced fixed JPY/USD cost examples with relative input and output/thinking cost multipliers.
- Updated Japanese and English manuals/README files for current Gemini model and thinking behavior.

### Removed
- Removed gemini-3-flash-preview from the normal model selector.

### Migration
- Migrates saved gemini-3-flash-preview to gemini-3.5-flash.
- Migrates saved gemini-3.1-flash-lite-preview to gemini-3.1-flash-lite.
- Migrates old Thinking Level values to the new 5-level scale.

## [1.0.1] - 2026-03-08

### Fixed
- **Policy Compliance**: Removed the unnecessary `tabs` permission from `manifest.json` to comply with the Google Web Store "Minimal Permission" policy.

## [1.0.0] - 2026-03-05

### Added
- **Gemini 3.x Integration**: Full support for Gemini 3.0 and 3.1 models, including the Thinking (Chain of Thought) feature.
- **Thinking Level Support**: Added selectable Low, Medium, and High levels with real-time status display in the side panel.
- **Manual Model Entry**: Ability to specify custom model codes (e.g., preview models) directly in settings.
- **Smart Quota Saving**: Implemented an "Instant Initial Trigger" for the first message and optimized intervals for subsequent summaries.
- **Multi-Channel Monitoring**: Isolated processing per window to prevent chat data mixing between different streams.
- **Privacy First**: All data and API keys are stored securely in local storage; no external server communication except for Google Gemini API.

### Changed
- **Default Language**: Set the default UI and summary output language to Japanese for an optimized experience for the primary user base.
- **User Interface**: Improved labels for "Buffer Threshold" and "Max Characters" to provide clearer descriptions of the API saving logic.
