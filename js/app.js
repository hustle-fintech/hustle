// app.js

// Ripple effect for buttons
document.querySelectorAll('.main-button, .sub-button').forEach(button => {
  button.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "silverBulletChecklist";
  const DARK_MODE_KEY = "darkMode";

  const checklist = document.querySelectorAll('input[type="checkbox"][data-section]');
  const allDetails = document.querySelectorAll('details[data-section]');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');
  const accuracyContainer = document.getElementById('accuracyContainer');

  // === Load and Apply Saved State ===
  function loadState() {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    checklist.forEach(cb => {
      const section = cb.dataset.section;
      const labelText = cb.parentElement.textContent.trim();
      if (savedState[section] && typeof savedState[section][labelText] === 'boolean') {
        cb.checked = savedState[section][labelText];
      }
    });
  }

  // === Save Current State ===
  function saveState() {
    const state = {};
    checklist.forEach(cb => {
      const section = cb.dataset.section;
      const labelText = cb.parentElement.textContent.trim();
      state[section] = state[section] || {};
      state[section][labelText] = cb.checked;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // === Style checked labels ===
  function updateStyles() {
    checklist.forEach(cb => {
      const label = cb.closest('label');
      if (cb.checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    });
  }

  // === Calculate Section-wise and Total Accuracy ===
  function calculateAccuracy() {
    let totalChecked = 0;
    let totalCount = 0;

    allDetails.forEach(detail => {
      const checkboxes = detail.querySelectorAll('input[type="checkbox"]');
      const checked = [...checkboxes].filter(cb => cb.checked).length;
      const accuracySpan = detail.querySelector('.accuracy');

      if (accuracySpan) {
        const percent = Math.round((checked / checkboxes.length) * 100);
        accuracySpan.textContent = `Accuracy: ${percent}%`;
      }

      totalChecked += checked;
      totalCount += checkboxes.length;
    });

    const totalPercent = totalCount ? Math.round((totalChecked / totalCount) * 100) : 0;
    accuracyContainer.textContent = `Total Accuracy: ${totalPercent}%`;
  }

  // === Attach checkbox event handlers ===
  checklist.forEach(cb => {
    cb.addEventListener('change', () => {
      updateStyles();
      saveState();
      calculateAccuracy();
    });
  });

  // === Check All / Clear Section ===
  allDetails.forEach(detail => {
    const checkboxes = detail.querySelectorAll('input[type="checkbox"]');

    const clearBtn = detail.querySelector('.clearSectionBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = false);
        updateStyles();
        saveState();
        calculateAccuracy();
      });
    }

    const checkAllBtn = detail.querySelector('.checkAllBtn');
    if (checkAllBtn) {
      checkAllBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = true);
        updateStyles();
        saveState();
        calculateAccuracy();
      });
    }
  });

  // === Clear Entire Checklist ===
  clearAllBtn?.addEventListener('click', () => {
    checklist.forEach(cb => cb.checked = false);
    updateStyles();
    saveState();
    calculateAccuracy();
  });

  // === Dark Mode Toggle ===
  if (localStorage.getItem(DARK_MODE_KEY) === 'true') {
    document.body.classList.add('dark');
  }

  toggleDarkModeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(DARK_MODE_KEY, document.body.classList.contains('dark'));
  });

  // === Init ===
  loadState();
  updateStyles();
  calculateAccuracy();
});
