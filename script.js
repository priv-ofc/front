(function () {
  var REDIRECT_URL = "https://priv-ofc.github.io/my-photo-pages/public/privacy/index.html";

  document.getElementById("year").textContent = new Date().getFullYear();

  var agree = document.getElementById("agree");
  var startBtn = document.getElementById("start-btn");
  var stepIntro = document.getElementById("step-intro");
  var stepVerifying = document.getElementById("step-verifying");
  var stepDone = document.getElementById("step-done");
  var bar = document.getElementById("bar");
  var progressNum = document.getElementById("progress-num");
  var stepsList = document.getElementById("steps-list").querySelectorAll("li");

  agree.addEventListener("change", function () {
    startBtn.disabled = !agree.checked;
  });

  function show(el) {
    [stepIntro, stepVerifying, stepDone].forEach(function (s) { s.classList.remove("active"); });
    el.classList.add("active");
  }

  function updateSteps(progress) {
    var active = Math.min(Math.floor((progress / 100) * stepsList.length), stepsList.length - 1);
    stepsList.forEach(function (li, i) {
      li.classList.remove("active", "done");
      if (i < active) li.classList.add("done");
      else if (i === active) li.classList.add("active");
    });
  }

  startBtn.addEventListener("click", function () {
    if (!agree.checked) return;
    show(stepVerifying);
    var p = 0;
    updateSteps(0);
    var t = setInterval(function () {
      p += 2;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        bar.style.width = "100%";
        progressNum.textContent = "100";
        stepsList.forEach(function (li) { li.classList.remove("active"); li.classList.add("done"); });
        setTimeout(function () {
          show(stepDone);
          setTimeout(function () { window.location.href = REDIRECT_URL; }, 1200);
        }, 400);
        return;
      }
      bar.style.width = p + "%";
      progressNum.textContent = p;
      updateSteps(p);
    }, 60);
  });
})();
