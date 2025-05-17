(async () => {
  const TOOLTIP_CLASS = "form-name-tooltip";
  const SELECTORS = "input, select, textarea, button";
  const BATCH_SIZE = 50;
  const DEBOUNCE_DELAY = 100;

  // Add styles for transitions
  const style = document.createElement("style");
  style.textContent = `
    .${TOOLTIP_CLASS} {
      position: absolute;
      background: #333;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 9999;
      cursor: pointer;
      pointer-events: auto;
      white-space: nowrap;
      transition: opacity 0.2s ease;
    }
    .${TOOLTIP_CLASS}.copied {
      opacity: 0.7;
    }
  `;
  document.head.appendChild(style);

  const { tooltipAttr } = await chrome.storage.local.get("tooltipAttr");
  const attribute = tooltipAttr || "name";

  // Cache DOM elements
  let formElements = null;
  let tooltips = null;

  function getFormElements() {
    if (!formElements) {
      formElements = Array.from(document.querySelectorAll(SELECTORS));
    }
    return formElements;
  }

  function getTooltips() {
    if (!tooltips) {
      tooltips = document.querySelectorAll(`.${TOOLTIP_CLASS}`);
    }
    return tooltips;
  }

  function createTooltip(el, value) {
    const tooltip = document.createElement("div");
    tooltip.innerText = value;
    tooltip.className = TOOLTIP_CLASS;

    const parent = el.offsetParent || el.parentElement;
    if (parent && window.getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }

    tooltip.style.top = `${el.offsetTop - 20}px`;
    tooltip.style.left = `${el.offsetLeft}px`;

    (parent || document.body).appendChild(tooltip);

    tooltip.addEventListener("click", () => {
      navigator.clipboard.writeText(value).then(() => {
        tooltip.classList.add("copied");
        tooltip.innerText = "Copied!";
        setTimeout(() => {
          tooltip.classList.remove("copied");
          tooltip.innerText = value;
        }, 1000);
      });
    });

    return tooltip;
  }

  function showTooltips() {
    const elements = getFormElements();
    let currentBatch = 0;

    function processBatch() {
      const start = currentBatch * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, elements.length);

      for (let i = start; i < end; i++) {
        const el = elements[i];
        const value = el.getAttribute(attribute);
        if (value) {
          createTooltip(el, value);
        }
      }

      currentBatch++;
      if (currentBatch * BATCH_SIZE < elements.length) {
        setTimeout(processBatch, DEBOUNCE_DELAY);
      }
    }

    processBatch();
  }

  function removeTooltips() {
    const tooltips = getTooltips();
    tooltips.forEach((el) => el.remove());
    tooltips = null; // Reset cache
  }

  function tooltipsExist() {
    return getTooltips().length > 0;
  }

  // Use Intersection Observer for better performance with large forms
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const value = el.getAttribute(attribute);
          if (value && !el.querySelector(`.${TOOLTIP_CLASS}`)) {
            createTooltip(el, value);
          }
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe form elements
  getFormElements().forEach((el) => observer.observe(el));

  if (tooltipsExist()) {
    removeTooltips();
  } else {
    showTooltips();
  }
})();
