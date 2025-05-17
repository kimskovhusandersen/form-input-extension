const toggleOptions = document.querySelectorAll(".toggle-option");
let selectedAttr = "name";

// Load previous choice (if any)
chrome.storage.local.get("tooltipAttr", ({ tooltipAttr }) => {
  if (tooltipAttr) {
    selectedAttr = tooltipAttr;
    toggleOptions.forEach((el) => {
      el.classList.toggle("active", el.dataset.attr === selectedAttr);
    });
  }
});

toggleOptions.forEach((el) => {
  el.addEventListener("click", () => {
    selectedAttr = el.dataset.attr;
    toggleOptions.forEach((opt) => opt.classList.remove("active"));
    el.classList.add("active");
  });
});

document.getElementById("inject").addEventListener("click", async () => {
  await chrome.storage.local.set({ tooltipAttr: selectedAttr });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});
