const toggleOptions = document.querySelectorAll(".toggle-option");
let selectedAttr = "name";
let isEnabled = false;

// Load previous choice (if any)
chrome.storage.local.get(
  ["tooltipAttr", "tooltipsEnabled"],
  ({ tooltipAttr, tooltipsEnabled }) => {
    if (tooltipAttr) {
      selectedAttr = tooltipAttr;
      toggleOptions.forEach((el) => {
        el.classList.toggle("active", el.dataset.attr === selectedAttr);
      });
    }

    isEnabled = tooltipsEnabled || false;
    updateUI();
  }
);

function updateUI() {
  const button = document.getElementById("inject");
  const status = document.getElementById("status");
  button.textContent = isEnabled ? "Disable Tooltips" : "Enable Tooltips";
  status.textContent = isEnabled
    ? "Tooltips are currently enabled"
    : "Tooltips are currently disabled";

  // Update button classes
  button.classList.remove("enabled", "disabled");
  button.classList.add(isEnabled ? "enabled" : "disabled");
}

toggleOptions.forEach((el) => {
  el.addEventListener("click", () => {
    selectedAttr = el.dataset.attr;
    toggleOptions.forEach((opt) => opt.classList.remove("active"));
    el.classList.add("active");
  });
});

document.getElementById("inject").addEventListener("click", async () => {
  isEnabled = !isEnabled;
  await chrome.storage.local.set({
    tooltipAttr: selectedAttr,
    tooltipsEnabled: isEnabled,
  });
  updateUI();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});
