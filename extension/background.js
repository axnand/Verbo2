chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "verbo_context",
    title: "Use Verbo on selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "verbo_context") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getSelectedTextAndSend
    });
  }
});

function getSelectedTextAndSend() {
  const selectedText = window.getSelection().toString();
  chrome.runtime.sendMessage({ action: "openPopup", text: selectedText });
}