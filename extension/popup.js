const input = document.getElementById("inputText");
const result = document.getElementById("result");

document.getElementById("detect").onclick = () => callAPI("detect");
document.getElementById("rephrase").onclick = () => callAPI("rephrase");
document.getElementById("fix").onclick = () => callAPI("grammar");

async function callAPI(type) {
  const text = input.value.trim();
  if (!text) return;

  const payload = type === "rephrase"
    ? { text, tone: "casual" }
    : { text };

  try {
    const res = await fetch(`https://axnand-verbo-backend.hf.space/api/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    result.innerText = data.result || data.rephrased || data.corrected || JSON.stringify(data);
  } catch (e) {
    result.innerText = "Error calling API.";
  }
}