(function () {
  const valentineCard = document.getElementById("valentine-card");
  const valentineWeek = document.getElementById("valentine-week");
  const celebration = document.getElementById("celebration");
  const displayName = document.getElementById("display-name");
  const daySlides = document.querySelectorAll(".day-slide");
  const btnNextAll = document.querySelectorAll(".btn-next");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const floatingRomantic = document.getElementById("floating-romantic");

  var noClickCount = 0;
  var noMessages = [
    "No",
    "Really sure?",
    "Think again?",
    "Last chance",
    "Surely not",
    "You might regret this",
    "Give it another thought",
    "Are you absolutely certain?",
    "This could be a mistake",
    "Have a heart",
  ];
  var noScale = 1;
  var yesScale = 1;
  var scaleStepNo = 0.85;
  var scaleStepYes = 1.28;
  var minNoScale = 0.35;
  var maxYesScale = 15;

  function getNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name") || "";
  }

  function showScreen(screenEl) {
    [valentineCard, valentineWeek, celebration].forEach(function (el) {
      if (el) el.classList.add("hidden");
    });
    if (screenEl) screenEl.classList.remove("hidden");
    if (floatingRomantic) {
      if (screenEl === valentineWeek || screenEl === celebration) {
        floatingRomantic.classList.add("visible");
      } else {
        floatingRomantic.classList.remove("visible");
      }
    }
  }

  var valentineDayAudio = document.getElementById("valentine-day-audio");

  function showDaySlide(index) {
    var i = Math.max(0, Math.min(index, daySlides.length - 1));
    daySlides.forEach(function (slide, idx) {
      slide.classList.toggle("active", idx === i);
      slide.classList.remove("just-opened");
    });
    if (daySlides[i]) {
      daySlides[i].classList.add("just-opened");
      setTimeout(function () {
        daySlides[i].classList.remove("just-opened");
      }, 2200);
    }
    if (i === 6 && valentineDayAudio) {
      valentineDayAudio.play().catch(function () {});
    } else if (valentineDayAudio) {
      valentineDayAudio.pause();
      valentineDayAudio.currentTime = 0;
    }
  }

  function setDisplayName(name) {
    const n = (name || "Rakhu").trim() || "Rakhu";
    displayName.textContent = n;
  }

  function openValentineCard(name) {
    setDisplayName(name);
    noClickCount = 0;
    noScale = 1;
    yesScale = 1;
    applyButtonSizes();
    if (btnNo) btnNo.textContent = noMessages[0];
    showScreen(valentineCard);
  }

  function applyButtonSizes() {
    if (btnNo) btnNo.style.transform = "scale(" + noScale + ")";
    if (btnYes) btnYes.style.transform = "scale(" + yesScale + ")";
  }

  if (btnNo) {
    btnNo.addEventListener("click", function () {
      noClickCount++;
      var msgIndex = Math.min(noClickCount, noMessages.length - 1);
      btnNo.textContent = noMessages[msgIndex];
      noScale = Math.max(minNoScale, noScale * scaleStepNo);
      yesScale = Math.min(maxYesScale, yesScale * scaleStepYes);
      applyButtonSizes();
    });
  }

  var currentDayIndex = 0;
  if (btnYes) {
    btnYes.addEventListener("click", function () {
      currentDayIndex = 0;
      showScreen(valentineWeek);
      showDaySlide(0);
    });
  }

  btnNextAll.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentDayIndex++;
      if (currentDayIndex >= daySlides.length) {
        currentDayIndex = 0;
        showScreen(celebration);
      } else {
        showDaySlide(currentDayIndex);
      }
    });
  });

  // On load: start with Valentine ask card (name from URL or "Cutie")
  (function init() {
    const name = getNameFromUrl() || "Rakhu";
    openValentineCard(name);
  })();
})();
