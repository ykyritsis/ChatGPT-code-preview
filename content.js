let isDarkMode = false;

function addButtons(codeBlock) {
  if (codeBlock.dataset.buttonsAdded) return;
  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'code-buttons';
  
  const previewBtn = createButton('Preview Code', () => togglePreview(codeBlock.textContent), 'preview-btn');
  
  buttonsDiv.append(previewBtn);
  codeBlock.parentNode.insertBefore(buttonsDiv, codeBlock.nextSibling);
  codeBlock.dataset.buttonsAdded = 'true';
}

function createButton(text, onClick, className = '') {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.addEventListener('click', onClick);
  if (className) button.className = className;
  return button;
}

function togglePreview(code) {
  let previewContainer = document.getElementById('code-preview-container');
  
  if (previewContainer) {
    previewContainer.remove();
    document.body.style.width = '100%';
    return;
  }
  
  previewContainer = document.createElement('div');
  previewContainer.id = 'code-preview-container';
  
  const previewContent = document.createElement('iframe');
  previewContent.id = 'code-preview-content';
  
  const codeContent = document.createElement('pre');
  codeContent.id = 'code-preview-code';
  codeContent.textContent = code;
  codeContent.style.display = 'none';
  
  const topControlsDiv = document.createElement('div');
  topControlsDiv.className = 'preview-controls top';
  
  const bottomControlsDiv = document.createElement('div');
  bottomControlsDiv.className = 'preview-controls bottom';
  
  const closeBtn = createButton(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 6L6 18M6 6l12 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, () => {
    previewContainer.remove();
    document.body.style.width = '100%';
  }, 'close-btn');
  closeBtn.title = 'Close';
  
  const copyBtn = createButton('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>', () => copyCode(code), 'copy-btn');
  copyBtn.title = 'Copy';
  
  const downloadBtn = createButton('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 20h14v-2H5v2zm7-18L5.33 11h3.67v6h4v-6h3.67L12 2z"/></svg>', () => downloadCode(code), 'download-btn');
  downloadBtn.title = 'Download';
  
  const reloadBtn = createButton('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.1-.22 2.14-.61 3.09l1.46 1.46C19.78 14.9 20 13.48 20 12c0-4.42-3.58-8-8-8zm-6.39 1.91L4.22 4.22C2.78 5.66 2 7.71 2 10c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.1.22-2.14.61-3.09z"/></svg>', () => {
    previewContainer.remove();
    togglePreview(code);
    pauseExecutionUntilClick(previewContainer);
  }, 'reload-btn');
  reloadBtn.title = 'Reload';
  
  const darkModeToggle = createButton(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 10.45l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM4.22 19.78l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>`, toggleDarkMode, 'dark-mode-toggle');
  darkModeToggle.title = 'Toggle Dark Mode';
  
  const titleDiv = document.createElement('div');
  titleDiv.className = 'preview-title';
  titleDiv.innerHTML = '<a href="https://github.com/ykyritsis/" target="_blank" title="Visit GitHub"><svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a> code preview';
  
  const tabsDiv = document.createElement('div');
  tabsDiv.className = 'preview-tabs';
  
  const previewTab = createButton('Preview', () => {
    previewContent.style.display = 'block';
    codeContent.style.display = 'none';
    previewTab.classList.add('active');
    codeTab.classList.remove('active');
  }, 'tab-btn active');
  
  const codeTab = createButton('Code', () => {
    previewContent.style.display = 'none';
    codeContent.style.display = 'block';
    previewTab.classList.remove('active');
    codeTab.classList.add('active');
  }, 'tab-btn');
  
  tabsDiv.append(previewTab, codeTab);
  
  topControlsDiv.append(titleDiv, tabsDiv);
  const rightControls = document.createElement('div');
  rightControls.className = 'right-controls';
  rightControls.append(darkModeToggle, closeBtn);
  topControlsDiv.append(rightControls);
  bottomControlsDiv.append(copyBtn, downloadBtn, reloadBtn);
  previewContainer.append(topControlsDiv, previewContent, codeContent, bottomControlsDiv);
  document.body.appendChild(previewContainer);
  
  // Resize main content
  document.body.style.width = '60%';
  
  updatePreview(code);
  makeResizable(previewContainer);
  applyDarkMode();
}

function pauseExecutionUntilClick(element) {
  function resumeExecution() {
    element.removeEventListener('click', resumeExecution);
    // Resume any paused execution here
  }

  element.addEventListener('click', resumeExecution);
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  applyDarkMode();
}

function applyDarkMode() {
  const previewContainer = document.getElementById('code-preview-container');
  if (previewContainer) {
    previewContainer.classList.toggle('dark-mode', isDarkMode);
    const darkModeToggle = previewContainer.querySelector('.dark-mode-toggle');
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  }
}

function updatePreview(code) {
  const previewContent = document.getElementById('code-preview-content');
  previewContent.srcdoc = code;
}

function makeResizable(element) {
  const resizer = document.createElement('div');
  resizer.className = 'resizer';
  element.appendChild(resizer);

  let startX, startWidth;

  function startResize(e) {
    startX = e.clientX;
    startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
    document.documentElement.addEventListener('mousemove', resize);
    document.documentElement.addEventListener('mouseup', stopResize);
  }

  function resize(e) {
    const width = startWidth - (e.clientX - startX);
    const mainContentWidth = 100 - (width / window.innerWidth * 100);
    element.style.width = width + 'px';
    document.body.style.width = mainContentWidth + '%';
  }

  function stopResize() {
    document.documentElement.removeEventListener('mousemove', resize);
    document.documentElement.removeEventListener('mouseup', stopResize);
  }

  resizer.addEventListener('mousedown', startResize);
}

function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn.classList.add('copied');
    setTimeout(() => copyBtn.classList.remove('copied'), 1500);
  });
}

function downloadCode(code) {
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'code.txt';
  a.click();
  URL.revokeObjectURL(url);
  
  const downloadBtn = document.querySelector('.download-btn');
  downloadBtn.classList.add('downloaded');
  setTimeout(() => downloadBtn.classList.remove('downloaded'), 1500);
}

function addButtonsToExistingCodeBlocks() {
  document.querySelectorAll('pre code').forEach(codeElement => {
    // Check if there is a span with the text "bash" inside the code element
    const hasBashSpan = Array.from(codeElement.querySelectorAll('span')).some(span => span.textContent.trim() === 'bash');

    // Add buttons if there is no "bash" span
    if (!hasBashSpan) {
      addButtons(codeElement);
    }
  });
}


// Initial run
addButtonsToExistingCodeBlocks();

// Set up a MutationObserver to watch for new code blocks
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.querySelectorAll('pre code').forEach(addButtons);
        }
      });
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });

// Periodically check for new code blocks (as a fallback)
setInterval(addButtonsToExistingCodeBlocks, 2000);