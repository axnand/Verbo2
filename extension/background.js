chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "verboDetect",
    title: "Detect AI with Verbo",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "verboRephrase",
    title: "Rephrase with Verbo",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "verboFix",
    title: "Grammar Fix with Verbo",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleSelection,
    args: [info.menuItemId]
  });
});

async function handleSelection(action) {
  const selection = window.getSelection().toString();
  if (!selection) return alert("No text selected.");

  const url = "https://axnand-verbo-backend.hf.space/api/";
  let endpoint = "", payload = {};

  if (action === "verboDetect") {
    endpoint = "detect";
    payload = { text: selection };
  } else if (action === "verboRephrase") {
    endpoint = "rephrase";
    payload = { text: selection, tone: "casual" };
  } else if (action === "verboFix") {
    endpoint = "grammar";
    payload = { text: selection };
  }

  try {
    const res = await fetch(url + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    alert(data.result || data.rephrased || data.corrected || "Success");
  } catch (err) {
    console.error("API Error:", err);
    alert("Failed to call Verbo backend.");
  }
}