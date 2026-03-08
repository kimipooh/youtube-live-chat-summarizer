# Changelog

All notable changes to this project will be documented in this file.

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