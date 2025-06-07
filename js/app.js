function clearChecklist(id) {
  const form = document.getElementById(id);
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(box => box.checked = false);
}


// Ripple effect for .main-button and .sub-button

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

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const checklist = document.querySelectorAll('input[type="checkbox"]');
  const mainChecks = document.querySelectorAll(".main-check");
  const confluenceChecks = document.querySelectorAll(".confluence-check");
  const confluenceCountEl = document.getElementById("confluenceCount");
  const aPlusEl = document.getElementById("aPlus");

  function updateConfluence() {
    let mainCount = 0;
    let confluenceCount = 0;

    mainChecks.forEach(cb => cb.checked && mainCount++);
    confluenceChecks.forEach(cb => cb.checked && confluenceCount++);

    confluenceCountEl.textContent = `${mainCount}${confluenceCount > 0 ? ` (+${confluenceCount})` : ''}`;
    aPlusEl.style.display = mainCount === 6 ? 'inline-block' : 'none';
  }

  function toggleStyle(e) {
    const label = e.target.closest('label');
    if (e.target.checked) {
      label.classList.add('checked');
    } else {
      label.classList.remove('checked');
    }
    updateConfluence();
  }

  checklist.forEach(box => {
    box.addEventListener('change', toggleStyle);
  });

  window.clearChecklist = function () {
    checklist.forEach(box => {
      box.checked = false;
      box.closest('label').classList.remove('checked');
    });
    updateConfluence();
  };
});
