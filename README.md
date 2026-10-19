# ChatGPT Code Preview

A Chrome extension that renders HTML, CSS and JavaScript code blocks from ChatGPT in a resizable live preview panel — so you can see what the model wrote instead of pasting it into an editor to find out.

**117 stars · 10 forks.** Built in July 2024, roughly three months before ChatGPT gained a comparable capability.

**Note:** previews may require a CSP-relaxing extension — see [Using CSP Unblock](#using-csp-unblock-extension) below.

![The preview panel running alongside a ChatGPT reply](preview.png)

## Why this exists

In July 2024 ChatGPT would show you a code block and let you copy it, but there was no way to *render* what the model had written. Ask for a layout, a chart or a small interactive widget and you got a wall of text that you then had to paste somewhere else to find out whether it worked.

[Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) had shipped Artifacts on 20 June 2024, which made the gap obvious. I started this on 1 July and had v1.3 out the following day: a `MutationObserver` watching ChatGPT's DOM for newly injected code blocks, and a resizable preview panel injected beside each one that renders its HTML, CSS and JavaScript.

OpenAI shipped [Canvas](https://openai.com/index/introducing-canvas/), its own version of the idea, on 3 October 2024 — roughly three months later. This repository is a snapshot of that gap rather than a maintained competitor to it, and ChatGPT's DOM has moved on considerably since.

## What it does

Each code block gains a **Preview** tab that renders the output inline, with **Code**, **Copy** and **Download** controls alongside. The panel is resizable.

## Features

1. **Live Code Preview**: Instantly see the output of HTML, CSS, and JavaScript code.
2. **Syntax Highlighting**: View code with proper syntax highlighting for better readability.
3. **Copy Code**: Easily copy the entire code snippet to your clipboard.
4. **Download Code**: Download the code snippet as a file with the appropriate extension.
5. **Resizable Preview**: Adjust the size of the preview panel to your liking.

## Installation

1. Clone this repository or download the ZIP and unpack it — the extension is just `manifest.json`, `content.js` and `styles.css`, with no build step.
2. Open your Chrome browser and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.

## Usage

1. Visit ChatGPT (https://chat.openai.com/).
2. When you see a code snippet, a "Preview" button will appear next to it.
3. Click the "Preview" button to open the preview panel.
4. Use the "Preview" and "Code" tabs to switch between the output and the source code.
5. Use the "Copy Code" and "Download Code" buttons as needed.

## Using CSP Unblock Extension

To fully utilize the ChatGPT Code Preview Extension, you may need to use the CSP Unblock extension to bypass Content Security Policy restrictions. Here's how to set it up:

1. Install the CSP Unblock extension from the Chrome Web Store:
   [CSP Unblock](https://chromewebstore.google.com/detail/csp-unblock/lkbelpgpclajeekijigjffllhigbhobd)

2. Once installed, click on the extension icon in your browser toolbar to activate it for chat.openai.com.

3. The CSP Unblock extension will remove the following CSP-related response headers:
   - "content-security-policy"
   - "content-security-policy-report-only"
   - "x-webkit-csp"
   - "x-content-security-policy"

4. With CSP restrictions removed, the ChatGPT Code Preview Extension should now work without any limitations, allowing you to run scripts and load resources that would otherwise be blocked.

## Important Security Note

Remember to disable the CSP Unblock extension when you're not using ChatGPT or testing your extension. Removing CSP can significantly reduce a website's protection against certain types of attacks, so it should only be used when necessary and on trusted sites.

## Contributors

Built by [Yiannis Kyritsis](https://github.com/ykyritsis) — 17 of the 18 commits, including all of the original design and implementation.

One contribution from [@SapirKro](https://github.com/SapirKro) ([PR #3](https://github.com/ykyritsis/ChatGPT-code-preview/pull/3), August 2024), which hides the preview button for terminal-style code blocks that have no visual output to show.

Pull requests and issues are welcome.

## License

MIT — see [LICENSE](LICENSE).

