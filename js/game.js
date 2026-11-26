
const stages = [
  {
    title: "مواد اولیه را بشناس",
    icon: "🧱",
    description: "هر محصول از چه چیزی ساخته می‌شود؟",
    questions: [
      { icon: "⛏️", q: "برای تولید پارچه نخی، کدام ماده اولیه لازم است؟", a: ["پنبه", "سنگ آهن", "نفت خام", "شن"], correct: 0, explain: "پنبه یکی از مواد اولیه مهم برای تولید پارچه نخی است." },
      { icon: "🛢️", q: "نفت خام می‌تواند ماده اولیه کدام صنعت باشد؟", a: ["کفاشی سنتی", "پتروشیمی", "نجاری", "قالی‌بافی"], correct: 1, explain: "صنایع پتروشیمی از نفت و گاز برای تولید مواد مختلف استفاده می‌کنند." },
      { icon: "🪨", q: "برای تولید آهن و فولاد، کدام ماده معدنی اهمیت دارد؟", a: ["نمک", "سنگ آهن", "گچ", "زغال چوب"], correct: 1, explain: "سنگ آهن یکی از مواد اولیه اصلی تولید آهن است." }
    ]
  },
  {
    title: "کارخانه را آماده کن",
    icon: "⚙️",
    description: "برای تولید به چه چیزهایی نیاز داریم؟",
    questions: [
      { icon: "👷", q: "کدام مورد یکی از عوامل تولید در کارخانه است؟", a: ["کارگر", "رنگ آسمان", "باران", "ابر"], correct: 0, explain: "نیروی انسانی و کارگران از عوامل مهم تولید هستند." },
      { icon: "🏗️", q: "ماشین‌آلات کارخانه چه نقشی دارند؟", a: ["توقف تولید", "کمک به ساخت محصولات", "تغییر آب‌وهوا", "حمل مسافر"], correct: 1, explain: "ماشین‌آلات به تبدیل مواد اولیه به محصول کمک می‌کنند." },
      { icon: "💡", q: "برای کار کردن بسیاری از دستگاه‌های کارخانه به چه چیزی نیاز است؟", a: ["انرژی", "کاغذ رنگی", "اسباب‌بازی", "گل"], correct: 0, explain: "انرژی برق و سوخت برای فعالیت بسیاری از کارخانه‌ها لازم است." }
    ]
  },
  {
    title: "مادر یا مصرفی؟",
    icon: "🏭",
    description: "صنایع مادر و مصرفی را تشخیص بده.",
    questions: [
      { icon: "🔩", q: "کدام مورد نمونه‌ای از صنعت مادر است؟", a: ["تولید فولاد", "تولید کفش", "دوخت لباس", "ساخت کیف"], correct: 0, explain: "فولاد ماده اولیه بسیاری از صنایع دیگر است." },
      { icon: "👟", q: "کدام محصول معمولاً کالای مصرفی به شمار می‌رود؟", a: ["شمش فولاد", "مواد پتروشیمی پایه", "کفش", "ماشین‌آلات صنعتی"], correct: 2, explain: "کفش محصولی است که مصرف‌کننده مستقیماً از آن استفاده می‌کند." },
      { icon: "🚗", q: "چرا به بعضی صنایع، صنایع مادر می‌گویند؟", a: ["چون فقط کالاهای تزئینی می‌سازند", "چون مواد اولیه صنایع دیگر را تولید می‌کنند", "چون فقط در روستا هستند", "چون کوچک هستند"], correct: 1, explain: "صنایع مادر مواد اولیه و محصولات پایه موردنیاز صنایع دیگر را تولید می‌کنند." }
    ]
  },
  {
    title: "سفر به صنعت ایران",
    icon: "🗺️",
    description: "مراکز مهم صنعتی ایران را بشناس.",
    questions: [
      { icon: "🏭", q: "صنعت فولاد و ذوب‌آهن در کدام شهر ایران شناخته‌شده است؟", a: ["اصفهان", "ساری", "بندرعباس", "اردبیل"], correct: 0, explain: "اصفهان یکی از مراکز مهم صنعت فولاد ایران است." },
      { icon: "⚙️", q: "شهر اراک به داشتن چه نوع صنعتی معروف است؟", a: ["ماشین‌سازی", "ماهیگیری", "چای‌کاری", "ابریشم‌بافی"], correct: 0, explain: "اراک از مراکز مهم صنایع ماشین‌سازی و تجهیزات صنعتی است." },
      { icon: "⛏️", q: "معدن بزرگ مس سرچشمه در کدام استان قرار دارد؟", a: ["گیلان", "کرمان", "گلستان", "همدان"], correct: 1, explain: "معدن مس سرچشمه در استان کرمان قرار دارد." }
    ]
  }
];

// آدرس اتصال گوگل‌شیت
const SHEET_URL = "https://script.google.com/macros/s/AKfycbwOS2LSp_iqUFDiJ_VLQRv7gMYVupp9OMxy6tp0CwVJTol4a3pmIFJlFevMV89mprKBRg/exec";

// متغیرهای بازی
let currentStage = 0;
let questionIndex = 0;
let roundScore = 0;
let answered = false;

let student = { firstName: "", lastName: "" };

let playQueue = [];
let queuePosition = 0;

let sessionScore = 0;
let sessionCorrect = 0;
let sessionWrong = 0;
let sessionTotalQuestions = 0;

let totalScore = Number(localStorage.getItem("factoryScore") || 0);

const $ = id => document.getElementById(id);
const fa = n => Number(n).toLocaleString("fa-IR");

// ==================================
// موسیقی و افکت‌های صوتی بازی
// ==================================

const GameAudio = (() => {
  let audioContext = null;
  let masterGain = null;
  let musicTimer = null;
  let playing = false;
  let noteIndex = 0;

  const melody = [
    392, 440, 523, 440,
    392, 330, 349, 392,
    440, 523, 587, 523,
    440, 392, 349, 330
  ];

  function initialize() {
    if (audioContext) return true;

    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioClass) return false;

    audioContext = new AudioClass();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.18;
    masterGain.connect(audioContext.destination);

    return true;
  }

  function tone(frequency, duration = 0.25, volume = 0.2) {
    if (!initialize()) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.connect(gain);
    gain.connect(masterGain);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  }

  function startMusic() {
    if (!initialize() || playing) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    playing = true;
    updateButton();

    musicTimer = setInterval(() => {
      tone(melody[noteIndex], 0.3, 0.08);

      if (noteIndex % 4 === 0) {
        tone(melody[noteIndex] / 2, 0.4, 0.04);
      }

      noteIndex = (noteIndex + 1) % melody.length;
    }, 360);
  }

  function stopMusic() {
    playing = false;

    if (musicTimer !== null) {
      clearInterval(musicTimer);
    }

    musicTimer = null;
    updateButton();
  }

  function toggleMusic() {
    if (playing) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function playCorrect() {
    tone(523, 0.15);
    setTimeout(() => tone(659, 0.17), 130);
    setTimeout(() => tone(784, 0.22), 260);
  }

  function playWrong() {
    tone(220, 0.22);
    setTimeout(() => tone(196, 0.25), 180);
  }

  function playVictory() {
    [523, 659, 784, 1047].forEach((frequency, index) => {
      setTimeout(() => tone(frequency, 0.3), index * 160);
    });
  }

  function updateButton() {
    const button = $("musicToggle");
    if (!button) return;

    button.textContent = playing
      ? "🔊 خاموش کردن موسیقی"
      : "🎵 پخش موسیقی";
  }

  function addControls() {
    const topbar = document.querySelector(".topbar");
    if (!topbar || $("musicToggle")) return;

    const button = document.createElement("button");
    button.id = "musicToggle";
    button.type = "button";
    button.textContent = "🎵 پخش موسیقی";
    button.addEventListener("click", toggleMusic);

    button.style.cssText = `
      background: rgba(255,255,255,.12);
      color: white;
      border: 1px solid rgba(255,255,255,.3);
      padding: 9px 13px;
      border-radius: 12px;
      cursor: pointer;
      font-family: inherit;
      margin: 5px;
    `;

    const score = topbar.querySelector(".player-score");

    if (score) {
      topbar.insertBefore(button, score);
    } else {
      topbar.appendChild(button);
    }
  }

  return {
    addControls,
    playCorrect,
    playWrong,
    playVictory
  };
})();

// ==================================
// توابع اصلی بازی
// ==================================

function updateScore() {
  $("totalScore").textContent = fa(totalScore);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.add("hidden");
  });

  $(id).classList.remove("hidden");
}

function goHome() {
  showScreen("homeScreen");
  updateScore();
}

function showNameScreen(targetStage) {
  window.selectedStage = targetStage;
  $("studentForm").reset();
  showScreen("nameScreen");
}

function submitPlayerInfo(event) {
  event.preventDefault();

  const firstName = $("firstName").value.trim();
  const lastName = $("lastName").value.trim();

  if (!firstName || !lastName) {
    alert("لطفاً نام و نام خانوادگی را وارد کن.");
    return;
  }

  student = { firstName, lastName };

  playQueue = window.selectedStage === -1
    ? [0, 1, 2, 3]
    : [window.selectedStage];

  queuePosition = 0;
  sessionScore = 0;
  sessionCorrect = 0;
  sessionWrong = 0;

  sessionTotalQuestions = playQueue.reduce(
    (sum, index) => sum + stages[index].questions.length,
    0
  );

  startStage(playQueue[queuePosition]);
}

function showStages() {
  const list = $("stageList");
  list.innerHTML = "";

  stages.forEach((stage, index) => {
    const button = document.createElement("button");
    button.className = "stage-card";

    button.innerHTML = `
      <div class="stage-icon">${stage.icon}</div>
      <h3>مرحله ${fa(index + 1)}: ${stage.title}</h3>
      <p>${stage.description}</p>
      <strong>شروع مرحله ←</strong>
    `;

    button.addEventListener("click", () => {
      showNameScreen(index);
    });

    list.appendChild(button);
  });

  showScreen("stagesScreen");
}

function startStage(index) {
  currentStage = index;
  questionIndex = 0;
  roundScore = 0;

  $("stageName").textContent = stages[index].title;
  $("roundScore").textContent = fa(roundScore);

  showScreen("gameScreen");
  renderQuestion();
}

function renderQuestion() {
  const question = stages[currentStage].questions[questionIndex];

  answered = false;

  $("questionIcon").textContent = question.icon;
  $("questionText").textContent = question.q;

  $("questionNumber").textContent =
    `سؤال ${fa(questionIndex + 1)} از ${fa(stages[currentStage].questions.length)}`;

  $("progressBar").style.width =
    `${(questionIndex / stages[currentStage].questions.length) * 100}%`;

  $("feedback").className = "feedback hidden";
  $("nextBtn").classList.add("hidden");

  const answers = $("answers");
  answers.innerHTML = "";

  question.a.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-btn";
    button.textContent = `${fa(index + 1)}. ${answer}`;

    button.addEventListener("click", () => {
      chooseAnswer(index, button);
    });

    answers.appendChild(button);
  });
}

function chooseAnswer(index, selected) {
  if (answered) return;

  answered = true;

  const question = stages[currentStage].questions[questionIndex];
  const buttons = [...$("answers").children];

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === question.correct) {
      button.classList.add("correct");
    }
  });

  const feedback = $("feedback");

  if (index === question.correct) {
    GameAudio.playCorrect();

    selected.classList.add("correct");
    roundScore += 10;
    sessionCorrect++;

    feedback.textContent = "آفرین! پاسخ درست بود. " + question.explain;
    feedback.className = "feedback good";
  } else {
    GameAudio.playWrong();

    selected.classList.add("wrong");
    sessionWrong++;

    feedback.textContent = "این بار درست نبود. " + question.explain;
    feedback.className = "feedback bad";
  }

  $("roundScore").textContent = fa(roundScore);

  $("nextBtn").textContent =
    questionIndex === stages[currentStage].questions.length - 1
      ? "دیدن نتیجه 🏆"
      : "سؤال بعدی ←";

  $("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
  if (!answered) return;

  if (questionIndex < stages[currentStage].questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    finishStage();
  }
}

function finishStage() {
  sessionScore += roundScore;

  $("finalScore").textContent = fa(roundScore);

  $("resultTitle").textContent =
    roundScore >= 20
      ? "آفرین! عالی بود! 🎉"
      : "مرحله را به پایان رساندی!";

  $("resultMessage").textContent =
    `از ${fa(stages[currentStage].questions.length * 10)} امتیاز ممکن، ${fa(roundScore)} امتیاز گرفتی.`;

  const isLastStage = queuePosition === playQueue.length - 1;

  $("studentReport").innerHTML = "";
  $("sendStatus").textContent = "";

  if (isLastStage) {
    showFinalReport();
  } else {
    $("studentReport").textContent =
      `آفرین ${student.firstName}! مرحله بعدی هم منتظر توست.`;
  }

  showScreen("resultScreen");

  const continueButton =
    document.querySelector("#resultScreen .primary-btn");

  continueButton.textContent =
    isLastStage ? "بازی دوباره" : "مرحله بعدی ←";

  continueButton.onclick = continueAfterResult;
}

function continueAfterResult() {
  if (queuePosition < playQueue.length - 1) {
    queuePosition++;
    startStage(playQueue[queuePosition]);
  } else {
    showNameScreen(-1);
  }
}

// ==================================
// گزارش نهایی
// ==================================

function showFinalReport() {
  GameAudio.playVictory();

  const maxScore = sessionTotalQuestions * 10;

  const grade = maxScore > 0
    ? (sessionScore / maxScore) * 20
    : 0;

  const percent = maxScore > 0
    ? Math.round((sessionScore / maxScore) * 100)
    : 0;

  const roundedGrade = Math.round(grade * 100) / 100;

  $("resultTitle").textContent = "گزارش نهایی کارخانه‌دار 🏆";

  $("resultMessage").textContent =
    `دانش‌آموز: ${student.firstName} ${student.lastName}`;

  $("studentReport").innerHTML = `
    <p>✅ پاسخ درست: ${fa(sessionCorrect)}</p>
    <p>❌ پاسخ نادرست: ${fa(sessionWrong)}</p>
    <p>⭐ امتیاز کل: ${fa(sessionScore)} از ${fa(maxScore)}</p>
    <p>🎓 نمره از ۲۰: ${fa(roundedGrade)}</p>
    <p>📊 درصد موفقیت: ${fa(percent)}٪</p>
  `;

  totalScore += sessionScore;

  localStorage.setItem("factoryScore", totalScore);
  updateScore();

  sendResult({
    firstName: student.firstName,
    lastName: student.lastName,
    correct: sessionCorrect,
    wrong: sessionWrong,
    score: sessionScore,
    grade: roundedGrade,
    percent: percent
  });
}

// ==================================
// ارسال نتیجه به Google Sheets
// ==================================

async function sendResult(data) {
  if (!SHEET_URL.startsWith("https://script.google.com/")) {
    $("sendStatus").textContent =
      "آدرس اتصال Google Sheets تنظیم نشده است.";
    return;
  }

  $("sendStatus").textContent = "در حال ارسال نتیجه...";

  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    $("sendStatus").textContent =
      "درخواست ارسال شد؛ برای اطمینان از ثبت، جدول Google Sheets را بررسی کن.";
  } catch (error) {
    $("sendStatus").textContent =
      "ارسال انجام نشد. اتصال اینترنت را بررسی کن.";

    console.error("خطا در ارسال نتیجه:", error);
  }
}

// ==================================
// راه‌اندازی بازی
// ==================================

GameAudio.addControls();
updateScore();
goHome();
