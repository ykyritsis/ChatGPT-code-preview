let previewContainer = null;
let resizer = null;
let currentCode = '';
let currentLanguage = '';

function createPreviewContainer() {
  previewContainer = document.createElement('div');
  previewContainer.id = 'code-preview-container';
  previewContainer.innerHTML = `
    <div id="preview-header">
      <h3>Code Preview</h3>
      <div id="view-options">
        <button class="view-option active" data-view="preview">Preview</button>
        <button class="view-option" data-view="code">Code</button>
      </div>
      <button id="close-preview">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div id="preview-content"></div>
    <div id="preview-footer">
      <button id="copy-code" class="footer-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy Code
      </button>
      <button id="download-code" class="footer-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download Code
      </button>
    </div>
  `;
  resizer = document.createElement('div');
  resizer.id = 'preview-resizer';
  
  document.body.appendChild(previewContainer);
  document.body.appendChild(resizer);

  document.getElementById('close-preview').addEventListener('click', closePreview);
  document.getElementById('copy-code').addEventListener('click', copyCode);
  document.getElementById('download-code').addEventListener('click', downloadCode);

  document.querySelectorAll('.view-option').forEach(button => {
    button.addEventListener('click', (e) => changeView(e.target.dataset.view));
  });

  setupResizer();
}

function closePreview() {
  previewContainer.style.display = 'none';
  resizer.style.display = 'none';
  document.body.style.paddingRight = '0';
}

function copyCode() {
  navigator.clipboard.writeText(currentCode).then(() => {
    const button = document.getElementById('copy-code');
    button.classList.add('copied');
    setTimeout(() => button.classList.remove('copied'), 2000);
  });
}

function downloadCode() {
  let htmlContent = currentCode;
  
  // If the language is CSS or JavaScript, wrap it in appropriate HTML tags
  if (currentLanguage === 'css') {
    htmlContent = `<html><head><style>${currentCode}</style></head><body><div>CSS applied to this div</div></body></html>`;
  } else if (currentLanguage === 'javascript') {
    htmlContent = `<html><body><h4>JavaScript Output:</h4><div id="js-output"></div><script>${currentCode}</script></body></html>`;
  }

  const blob = new Blob([htmlContent], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'download.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function changeView(view) {
  document.querySelectorAll('.view-option').forEach(button => {
    button.classList.toggle('active', button.dataset.view === view);
  });
  showPreview(currentCode, currentLanguage, view);
}

function setupResizer() {
  let isResizing = false;
  let lastDownX = 0;

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    lastDownX = e.clientX;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const offsetRight = document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    const minWidth = 200;
    const maxWidth = document.body.offsetWidth - 400;
    
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      previewContainer.style.width = offsetRight + 'px';
      resizer.style.right = offsetRight + 'px';
      document.body.style.paddingRight = offsetRight + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
  });
}

function showPreview(code, language, view = 'preview') {
  if (!previewContainer) {
    createPreviewContainer();
  }

  currentCode = code;
  currentLanguage = language;

  const previewContent = document.getElementById('preview-content');
  previewContent.innerHTML = '';

  if (view === 'preview') {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    previewContent.appendChild(iframe);

    let htmlContent = '';

    if (language === 'html') {
      htmlContent = code;
    } else if (language === 'css') {
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            #css-demo { 
              padding: 20px; 
              border: 1px solid #ccc; 
              margin-top: 10px; 
            }
            .control-panel {
              margin-bottom: 20px;
            }
            .control-panel label {
              display: block;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="control-panel">
            <h4>CSS Controls:</h4>
            <label>
              Background Color:
              <input type="color" id="bgColor" value="#ffffff">
            </label>
            <label>
              Text Color:
              <input type="color" id="textColor" value="#000000">
            </label>
            <label>
              Font Size:
              <input type="range" id="fontSize" min="10" max="30" value="16">
            </label>
          </div>
          <div id="css-demo">CSS applied to this div</div>
          <style id="user-css"></style>
        </body>
        </html>
      `;
    } else if (language === 'javascript') {
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            #js-output { 
              border: 1px solid #ccc; 
              padding: 10px; 
              margin-top: 10px; 
              white-space: pre-wrap; 
            }
            #js-input { 
              width: 100%; 
              height: 100px; 
              margin-bottom: 10px; 
            }
            #run-js {
              padding: 5px 10px;
              background-color: #4CAF50;
              color: white;
              border: none;
              cursor: pointer;
            }
            #run-js:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <h4>JavaScript Playground:</h4>
          <textarea id="js-input" placeholder="Enter JavaScript code here..."></textarea>
          <button id="run-js">Run</button>
          <h4>Output:</h4>
          <div id="js-output"></div>
          <script>
            ${code}
            
            const originalLog = console.log;
            console.log = function(...args) {
              originalLog.apply(console, args);
              const output = document.getElementById('js-output');
              output.textContent += args.join(' ') + '\\n';
            };

            document.getElementById('run-js').addEventListener('click', function() {
              const input = document.getElementById('js-input').value;
              document.getElementById('js-output').textContent = '';
              try {
                eval(input);
              } catch (error) {
                console.log('Error:', error.message);
              }
            });
          </script>
        </body>
        </html>
      `;
    } else {
      htmlContent = `<pre>${code}</pre>`;
    }

    iframe.contentDocument.open();
    iframe.contentDocument.write(htmlContent);
    iframe.contentDocument.close();

    if (language === 'css') {
      const styleElement = iframe.contentDocument.getElementById('user-css');
      styleElement.textContent = code;

      const demoElement = iframe.contentDocument.getElementById('css-demo');
      
      iframe.contentDocument.getElementById('bgColor').addEventListener('input', (e) => {
        demoElement.style.backgroundColor = e.target.value;
      });

      iframe.contentDocument.getElementById('textColor').addEventListener('input', (e) => {
        demoElement.style.color = e.target.value;
      });

      iframe.contentDocument.getElementById('fontSize').addEventListener('input', (e) => {
        demoElement.style.fontSize = `${e.target.value}px`;
      });
    }
  } else if (view === 'code') {
    const pre = document.createElement('pre');
    const codeElement = document.createElement('code');
    codeElement.className = `language-${language}`;
    codeElement.textContent = code;
    pre.appendChild(codeElement);
    previewContent.appendChild(pre);
    hljs.highlightElement(codeElement);
  }

  previewContainer.style.display = 'block';
  resizer.style.display = 'block';
  document.body.style.paddingRight = previewContainer.offsetWidth + 'px';
}

function addPreviewButtons() {
  const codeBlocks = document.querySelectorAll('.markdown pre');
  codeBlocks.forEach((block) => {
    if (block.querySelector('.preview-button')) return;

    const button = document.createElement('button');
    button.textContent = 'Preview';
    button.className = 'preview-button';
    button.addEventListener('click', () => {
      const code = block.querySelector('code').textContent;
      const language = block.querySelector('code').className.replace('language-', '');
      showPreview(code, language);
    });

    block.appendChild(button);
  });
}

addPreviewButtons();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      addPreviewButtons();
    }
  });
});

const chatContainer = document.querySelector('#__next main');
if (chatContainer) {
  observer.observe(chatContainer, { childList: true, subtree: true });
}