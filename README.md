<p align="center">
  <img src="assets/badges.svg" alt="Chrome extension, Manifest V3, MIT" height="28">
</p>

<h1 align="center">ChatGPT Code Preview</h1>

<p align="center"><strong>See what ChatGPT wrote before you paste it into an editor.</strong><br>
A Chrome extension that turns HTML, CSS and JavaScript code blocks into resizable live previews, right beside the reply.</p>

<p align="center">
  <a href="#install"><strong>Install</strong></a> &nbsp;·&nbsp;
  <a href="#how-it-works">How it works</a> &nbsp;·&nbsp;
  <a href="#csp-note">CSP note</a> &nbsp;·&nbsp;
  <a href="#credits">Credits</a>
</p>

![The preview panel running alongside a ChatGPT reply](preview.png)

> **Built in July 2024, before ChatGPT Canvas.** 100+ stars. This repository is a snapshot of that gap, not a maintained competitor to Canvas, and ChatGPT's DOM has moved on since.

## Why this exists

In July 2024 ChatGPT would show you a code block and let you copy it, but there was no way to *render* what the model had written. Ask for a layout, a chart or a small interactive widget and you got a wall of text that you then had to paste somewhere else to find out whether it worked.

[Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) had shipped Artifacts on 20 June 2024, which made the gap obvious. I started this on 1 July and had v1.3 out the following day: a `MutationObserver` watching ChatGPT's DOM for newly injected code blocks, and a resizable preview panel injected beside each one.

OpenAI shipped [Canvas](https://openai.com/index/introducing-canvas/), its own version of the idea, on 3 October 2024 — roughly three months later.

## What you get

- **Preview and Code tabs** on every supported code block, so you can switch between the rendered output and the source.
- **Live HTML, CSS and JavaScript** rendered in an iframe beside the conversation.
- **Copy** the whole snippet, or **download** it with the right file extension.
- **Resizable panels**, so a dashboard or long page has room to breathe.
- **Terminal-style blocks stay clean**: the preview button is hidden when a block has no visual output (contributed in [PR #3](https://github.com/ykyritsis/ChatGPT-code-preview/pull/3)).
- **No build step and no background service.** It is one content script, one stylesheet and a manifest.

## Install

The extension is just `manifest.json`, `content.js` and `styles.css`; there is nothing to compile.

1. Clone this repository or download the ZIP and unpack it.
2. Open `chrome://extensions/`.
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the folder containing `manifest.json`.

## Using it

1. Open [ChatGPT](https://chatgpt.com/).
2. A **Preview** button appears next to supported code blocks.
3. Click it to open the panel beside the reply.
4. Use the **Preview** and **Code** tabs to switch views.
5. Use **Copy Code** and **Download Code** as needed.

## How it works

A `MutationObserver` watches the conversation for new code blocks. For each one, the content script injects a small toolbar and a preview panel, then writes the block's contents into an iframe with `srcdoc`. The panel is plain DOM, resized by a drag handle; there is no framework, build pipeline or remote service involved.

Because the preview is a real same-page iframe, scripts inside a generated snippet can run when the page's Content Security Policy allows it. That is the point of the extension, and also the reason for the CSP note below.

## CSP note

Some ChatGPT pages send a Content Security Policy that blocks inline scripts or remote resources inside the preview. If a snippet renders as unstyled markup or its JavaScript does not run, install [CSP Unblock](https://chromewebstore.google.com/detail/csp-unblock/lkbelpgpclajeekijjffllhigbhobd), enable it for the ChatGPT tab, and reload.

CSP Unblock removes these response headers for that tab:

- `content-security-policy`
- `content-security-policy-report-only`
- `x-webkit-csp`
- `x-content-security-policy`

Only use it on sites you trust, and turn it off when you are done. Removing CSP weakens a page's defences against script injection.

## Security

Treat generated code like code from a stranger: it can make network requests, read what the preview can read, and render anything a web page can render. Run previews of untrusted snippets with CSP Unblock disabled, and keep the extension limited to ChatGPT tabs.

The extension itself has no network code, no analytics, no storage and no `chrome.*` API calls. It matches `chatgpt.com` and `chat.openai.com` and asks only for `activeTab` in the manifest.

## Status and compatibility

ChatGPT's markup changes regularly. This was written against the July 2024 interface; newer layouts may need selector updates. It is published as a working reference implementation, not a promise of long-term compatibility.

Pull requests and issues are welcome.

## Credits

Built by [Yiannis Kyritsis](https://github.com/ykyritsis) — 17 of the 18 commits, including the original design and implementation.

One contribution from [@SapirKro](https://github.com/SapirKro) ([PR #3](https://github.com/ykyritsis/ChatGPT-code-preview/pull/3), August 2024), which hides the preview button for terminal-style code blocks that have no visual output to show.

## License

MIT — see [LICENSE](LICENSE).
