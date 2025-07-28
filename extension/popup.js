const inputText = document.getElementById("inputText");
const toneSelect = document.getElementById("toneSelect");
const detectBtn = document.getElementById("detectBtn");
const rephraseBtn = document.getElementById("rephraseBtn");
const fixBtn = document.getElementById("fixBtn");
const resultSection = document.getElementById("resultSection");
const loadingState = document.getElementById("loadingState");
const resultText = document.getElementById("resultText");
const aiScore = document.getElementById("aiScore");
const scoreValue = document.getElementById("scoreValue");
const copyBtn = document.getElementById("copyBtn");
const themeToggle = document.getElementById("themeToggle");

// State
let currentResult = "";
let isProcessing = false;

// Theme Management
function initTheme() {
  chrome.storage.sync.get(['theme'], (result) => {
    const theme = result.theme || 'dark';
    document.body.className = theme;
  });
}

function toggleTheme() {
  const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.body.className = newTheme;
  chrome.storage.sync.set({ theme: newTheme });
}

// API Functions
async function callAPI(endpoint, payload) {
  try {
    const response = await fetch(`https://axnand-verbo-backend.hf.space/api/${endpoint}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw new Error(`Failed to ${endpoint} text. Please try again.`);
  }
}

// UI Functions
function showLoading(text = "Processing...") {
  loadingState.querySelector('.loading-text').textContent = text;
  loadingState.classList.remove('hidden');
  resultSection.classList.add('hidden');
  
  // Disable buttons
  detectBtn.disabled = true;
  rephraseBtn.disabled = true;
  fixBtn.disabled = true;
  isProcessing = true;
}

function hideLoading() {
  loadingState.classList.add('hidden');
  
  // Enable buttons
  detectBtn.disabled = false;
  rephraseBtn.disabled = false;
  fixBtn.disabled = false;
  isProcessing = false;
}

function showResult(result, type = 'text') {
  currentResult = result;
  resultText.textContent = result;
  
  if (type === 'detection') {
    // Show AI score if it's a detection result
    aiScore.classList.remove('hidden');
  } else {
    aiScore.classList.add('hidden');
  }
  
  resultSection.classList.remove('hidden');
  hideLoading();
  
  // Add success animation
  resultSection.style.animation = 'none';
  setTimeout(() => {
    resultSection.style.animation = 'fadeInUp 0.3s ease-out';
  }, 10);
}

function showHighlightedResult(html, score) {
  currentResult = html;
  resultText.innerHTML = html;

  updateAIScore(score);
  aiScore.classList.remove('hidden');
  resultSection.classList.remove('hidden');
  hideLoading();

  resultSection.style.animation = 'none';
  setTimeout(() => {
    resultSection.style.animation = 'fadeInUp 0.3s ease-out';
  }, 10);
}


function showError(message) {
  resultText.textContent = `❌ ${message}`;
  resultSection.classList.remove('hidden');
  aiScore.classList.add('hidden');
  hideLoading();
}

function updateAIScore(score) {
  scoreValue.textContent = `${score}%`;
  
  const scoreBadge = document.querySelector('.score-badge');
  // Remove existing classes
  scoreBadge.classList.remove('low', 'medium', 'high');
  
  // Add appropriate class based on score
  if (score <= 30) {
    scoreBadge.classList.add('low');
  } else if (score <= 70) {
    scoreBadge.classList.add('medium');
  } else {
    scoreBadge.classList.add('high');
  }
}

function copyToClipboard() {
  if (!currentResult) return;
  
  navigator.clipboard.writeText(currentResult).then(() => {
    // Show success feedback
    const originalText = copyBtn.textContent;
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m9 12 2 2 4-4"/>
      </svg>
      Copied!
    `;
    
    setTimeout(() => {
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        Copy
      `;
    }, 2000);
  }).catch(() => {
    showError("Failed to copy to clipboard");
  });
}

// Action Handlers
async function detectAI() {
  const text = inputText.value.trim();
  if (!text) {
    showError("Please enter some text to analyze");
    return;
  }

  showLoading("Analyzing AI patterns...");

  try {
    const res = await callAPI("detect", { text });

    const score = Math.round((res.overall_ai_score || res.ai_confidence || res.score || 0) * 100);
    updateAIScore(score);

    const flagged = res.flagged_sentences || [];

    const normalize = (str) => str.trim().replace(/[.?!]$/, "").toLowerCase();
    const sentenceMap = new Map();

    flagged.forEach(({ sentence, ai_likelihood }) => {
      let style = "";

      if (ai_likelihood > 0.7) {
        style = "background-color: rgba(255, 0, 0, 0.1); border-bottom: 2px solid red;";
      } else if (ai_likelihood > 0.4) {
        style = "background-color: rgba(255, 255, 0, 0.2); border-bottom: 2px solid gold;";
      }

      const normalized = normalize(sentence);
      const span = `<span style="${style} padding: 2px; border-radius: 4px;">${sentence}</span>`;
      sentenceMap.set(normalized, span);
    });

    const splitSentences = text.split(/(?<=[.?!])\s+/);
    const highlightedHTML = splitSentences
      .map((s) => sentenceMap.get(normalize(s)) || s)
      .join(" ");

    showHighlightedResult(highlightedHTML, score);

  } catch (error) {
    console.error("Detection Error:", error);
    showError(error.message);
  }
}


async function rephraseText() {
  const text = inputText.value.trim();
  const tone = toneSelect.value;

  if (!text) {
    showError("Please enter some text to rephrase");
    return;
  }

  showLoading(`Rephrasing in ${tone} tone...`);

  try {
    const data = await callAPI("rephrase", { text, tone });
    const rephrased = data.rephrased_text || data.result || "Rephrasing completed";

    updateAIScore(0);  // Hide AI score block
    showResult(rephrased, 'text');

  } catch (error) {
    showError(error.message);
  }
}


async function fixGrammar() {
  const text = inputText.value.trim();
  if (!text) {
    showError("Please enter some text to fix");
    return;
  }

  showLoading("Fixing grammar and style...");

  try {
    const data = await callAPI("grammar", { text });
    const corrected = data.corrected_text || data.result || "Grammar check completed";

    updateAIScore(0);  // Hide AI score block
    showResult(corrected, 'text');

  } catch (error) {
    showError(error.message);
  }
}


// Event Listeners
detectBtn.addEventListener('click', detectAI);
rephraseBtn.addEventListener('click', rephraseText);
fixBtn.addEventListener('click', fixGrammar);
copyBtn.addEventListener('click', copyToClipboard);
themeToggle.addEventListener('click', toggleTheme);

// Keyboard shortcuts
inputText.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'd':
        e.preventDefault();
        if (!isProcessing) detectAI();
        break;
      case 'r':
        e.preventDefault();
        if (!isProcessing) rephraseText();
        break;
      case 'g':
        e.preventDefault();
        if (!isProcessing) fixGrammar();
        break;
    }
  }
});

// Auto-resize textarea
inputText.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  // Add subtle entrance animation
  document.querySelector('.popup-container').style.animation = 'fadeInUp 0.4s ease-out';
  
  // Focus input on open
  setTimeout(() => {
    inputText.focus();
  }, 100);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);