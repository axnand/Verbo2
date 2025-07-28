let inputBox = document.getElementById("inputText");

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "openPopup") {
    inputBox.value = msg.text;
  }
});

async function detect() {
  const text = inputBox.value;
  const res = await fetch("https://axnand-verbo-backend.hf.space/api/detect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  document.getElementById("result").innerText = data.result || JSON.stringify(data);
}

async function rephrase() {
  const text = inputBox.value;
  const res = await fetch("https://axnand-verbo-backend.hf.space/api/rephrase", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, tone: "casual" }) // or let user select tone
  });
  const data = await res.json();
  document.getElementById("result").innerText = data.rephrased || JSON.stringify(data);
}

async function fix() {
  const text = inputBox.value;
  const res = await fetch("https://axnand-verbo-backend.hf.space/api/grammar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  document.getElementById("result").innerText = data.corrected || JSON.stringify(data);
}