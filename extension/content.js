chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "showResult") {
    const resultBox = document.createElement("div");
    resultBox.style.cssText = `
      position: fixed;
      top: 10%;
      left: 10%;
      background: white;
      padding: 1em;
      border: 2px solid black;
      z-index: 99999;
      max-width: 400px;
      font-family: sans-serif;
    `;
    resultBox.innerText = message.result;
    document.body.appendChild(resultBox);
  }
});