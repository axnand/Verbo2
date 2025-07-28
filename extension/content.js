(function() {
  'use strict';

  let isEnabled = true;
  let selectedText = '';
  let selectionTooltip = null;

  // Create and inject CSS for content script
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-insight-tooltip {
        position: absolute;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-family: 'Inter', sans-serif;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(139, 92, 246, 0.3);
        backdrop-filter: blur(10px);
        pointer-events: none;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
      }

      .ai-insight-tooltip.show {
        opacity: 1;
        transform: translateY(0);
      }

      .ai-insight-tooltip::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #1a1a2e;
      }

      .ai-insight-highlight {
        background: linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
        border-radius: 3px;
        padding: 1px 2px;
        transition: all 0.3s ease;
      }

      .ai-insight-highlight:hover {
        background: linear-gradient(90deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
      }
    `;
    document.head.appendChild(style);
  }

  // Create selection tooltip
  function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'ai-insight-tooltip';
    tooltip.textContent = '🤖 AI Insight: Right-click to analyze selected text';
    document.body.appendChild(tooltip);
    return tooltip;
  }

  // Show tooltip near selection
  function showTooltip(x, y) {
    if (!selectionTooltip) {
      selectionTooltip = createTooltip();
    }

    selectionTooltip.style.left = `${x - 100}px`;
    selectionTooltip.style.top = `${y - 40}px`;
    selectionTooltip.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
      hideTooltip();
    }, 3000);
  }

  // Hide tooltip
  function hideTooltip() {
    if (selectionTooltip) {
      selectionTooltip.classList.remove('show');
    }
  }

  // Handle text selection
  function handleTextSelection() {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 10) { // Only show for meaningful selections
      selectedText = text;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      showTooltip(
        rect.left + rect.width / 2 + window.scrollX,
        rect.top + window.scrollY
      );
    } else {
      hideTooltip();
      selectedText = '';
    }
  }

  // Add context menu integration
  function addContextMenuListener() {
    document.addEventListener('contextmenu', (e) => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text.length > 0) {
        // Store selected text for context menu
        chrome.runtime.sendMessage({
          action: 'setSelectedText',
          text: text
        });
      }
    });
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.action) {
      case 'getSelectedText':
        sendResponse({ text: selectedText });
        break;
      
      case 'highlightText':
        highlightSuspiciousText(request.highlights);
        break;
      
      case 'clearHighlights':
        clearHighlights();
        break;
        
      case 'isEnabled':
        sendResponse({ enabled: isEnabled });
        break;
        
      case 'toggle':
        isEnabled = !isEnabled;
        if (!isEnabled) {
          clearHighlights();
          hideTooltip();
        }
        sendResponse({ enabled: isEnabled });
        break;
    }
  });

  // Highlight suspicious text sections
  function highlightSuspiciousText(highlights) {
    if (!isEnabled || !highlights || highlights.length === 0) return;

    clearHighlights();

    highlights.forEach(highlight => {
      const { text, confidence } = highlight;
      highlightTextInPage(text, confidence);
    });
  }

  // Helper function to highlight text in page
  function highlightTextInPage(searchText, confidence) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.trim() && 
          node.parentElement.tagName !== 'SCRIPT' && 
          node.parentElement.tagName !== 'STYLE') {
        textNodes.push(node);
      }
    }

    textNodes.forEach(textNode => {
      const text = textNode.nodeValue;
      const index = text.toLowerCase().indexOf(searchText.toLowerCase());
      
      if (index !== -1) {
        const beforeText = text.substring(0, index);
        const matchText = text.substring(index, index + searchText.length);
        const afterText = text.substring(index + searchText.length);

        const span = document.createElement('span');
        span.className = 'ai-insight-highlight';
        span.title = `AI Confidence: ${Math.round(confidence * 100)}%`;
        span.textContent = matchText;

        const parent = textNode.parentNode;
        parent.insertBefore(document.createTextNode(beforeText), textNode);
        parent.insertBefore(span, textNode);
        parent.insertBefore(document.createTextNode(afterText), textNode);
        parent.removeChild(textNode);
      }
    });
  }

  // Clear all highlights
  function clearHighlights() {
    const highlights = document.querySelectorAll('.ai-insight-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
  }

  // Initialize content script
  function init() {
    // Only run on HTML pages
    if (document.contentType !== 'text/html') return;

    injectStyles();
    
    // Handle text selection
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('keyup', handleTextSelection);
    
    // Hide tooltip when clicking elsewhere
    document.addEventListener('click', hideTooltip);
    
    // Add context menu listener
    addContextMenuListener();

    // Notify that content script is ready
    chrome.runtime.sendMessage({ action: 'contentScriptReady' });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();