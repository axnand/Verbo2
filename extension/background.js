let selectedText = '';

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.sync.set({
      theme: 'dark',
      autoDetect: false,
      notificationsEnabled: true
    });

    // Open welcome page
    chrome.tabs.create({
      url: 'https://verbo-ai.vercel.app/'
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.action) {
    case 'setSelectedText':
      selectedText = request.text;
      break;
      
    case 'getSelectedText':
      sendResponse({ text: selectedText });
      break;
      
    case 'contentScriptReady':
      console.log('Content script ready in tab:', sender.tab.id);
      break;
      
    case 'openOptionsPage':
      chrome.runtime.openOptionsPage();
      break;
      
    case 'notification':
      showNotification(request.title, request.message);
      break;
  }
});

// Create context menu items
chrome.contextMenus.create({
  id: 'ai-insight-detect',
  title: '🤖 Detect AI Content',
  contexts: ['selection']
});

chrome.contextMenus.create({
  id: 'ai-insight-rephrase',
  title: '✨ Rephrase Text',
  contexts: ['selection']
});

chrome.contextMenus.create({
  id: 'ai-insight-grammar',
  title: '📝 Fix Grammar',
  contexts: ['selection']
});

chrome.contextMenus.create({
  id: 'ai-insight-separator',
  type: 'separator',
  contexts: ['selection']
});

chrome.contextMenus.create({
  id: 'ai-insight-open',
  title: '🚀 Open AI Insight',
  contexts: ['selection']
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText;
  
  switch(info.menuItemId) {
    case 'ai-insight-detect':
      handleContextMenuAction('detect', selectedText, tab);
      break;
      
    case 'ai-insight-rephrase':
      handleContextMenuAction('rephrase', selectedText, tab);
      break;
      
    case 'ai-insight-grammar':
      handleContextMenuAction('grammar', selectedText, tab);
      break;
      
    case 'ai-insight-open':
      chrome.action.openPopup();
      break;
  }
});

// Handle context menu actions
async function handleContextMenuAction(action, text, tab) {
  if (!text || text.trim().length === 0) {
    showNotification('AI Insight', 'Please select some text first');
    return;
  }

  try {
    // Store the selected text for the popup
    selectedText = text;
    
    // Show notification
    const actionNames = {
      detect: 'Analyzing',
      rephrase: 'Rephrasing',
      grammar: 'Fixing grammar'
    };
    
    showNotification('AI Insight', `${actionNames[action]} selected text...`);
    
    // Open popup to show results
    chrome.action.openPopup();
    
  } catch (error) {
    console.error(`Error in ${action}:`, error);
    showNotification('AI Insight Error', `Failed to ${action} text`);
  }
}

// Show system notification
function showNotification(title, message) {
  chrome.storage.sync.get(['notificationsEnabled'], (result) => {
    if (result.notificationsEnabled !== false) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: title,
        message: message
      });
    }
  });
}

// Handle browser action click (when popup can't be shown)
chrome.action.onClicked.addListener((tab) => {
  // This will only be called if popup can't be shown
  // Inject content script if needed
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  switch(command) {
    case 'open-popup':
      chrome.action.openPopup();
      break;
      
    case 'detect-ai':
      handleShortcutAction('detect');
      break;
      
    case 'rephrase-text':
      handleShortcutAction('rephrase');
      break;
  }
});

// Handle shortcut actions
async function handleShortcutAction(action) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Get selected text from content script
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'getSelectedText' });
    
    if (response && response.text) {
      handleContextMenuAction(action, response.text, tab);
    } else {
      showNotification('AI Insight', 'Please select some text first');
    }
  } catch (error) {
    console.error('Error handling shortcut:', error);
    showNotification('AI Insight', 'Please select some text on the page');
  }
}

// Handle extension icon badge
function updateBadge(tabId, text = '', color = '#8B5CF6') {
  chrome.action.setBadgeText({
    tabId: tabId,
    text: text
  });
  
  chrome.action.setBadgeBackgroundColor({
    tabId: tabId,
    color: color
  });
}

// Clear badge when tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateBadge(tabId, '');
  }
});

// Analytics and usage tracking (privacy-friendly)
function trackUsage(action, details = {}) {
  // Only track basic usage patterns, no personal data
  chrome.storage.local.get(['usage'], (result) => {
    const usage = result.usage || {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!usage[today]) {
      usage[today] = {};
    }
    
    usage[today][action] = (usage[today][action] || 0) + 1;
    
    // Keep only last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    Object.keys(usage).forEach(date => {
      if (new Date(date) < thirtyDaysAgo) {
        delete usage[date];
      }
    });
    
    chrome.storage.local.set({ usage });
  });
}
