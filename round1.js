const playerName = localStorage.getItem('playerName') || 'Unknown Player';
let currentQuestion = 0;
let score = 0;
let answerSelected = false;

localStorage.setItem('currentRound', '1');


const questions = [
  {
    question: "Who won the FIFA World Cup in 2018?",
    answers: ["Germany", "France", "Brazil", "Argentina"],
    correct: 1
  },
  {
    question: "How many players in a basketball team?",
    answers: ["5", "6", "7", "11"],
    correct: 0
  },
  {
    question: "In which sport is the Davis Cup awarded?",
    answers: ["Tennis", "Golf", "Rugby", "Cricket"],
    correct: 0
  },
  {
    question: "What country hosts the Tour de France?",
    answers: ["Italy", "Germany", "France", "Spain"],
    correct: 2
  },
  {
    question: "Which sport uses a puck?",
    answers: ["Hockey", "Basketball", "Baseball", "Volleyball"],
    correct: 0
  }
];

const questionNumber = document.getElementById('questionNumber');
const answerButtons = document.querySelectorAll('.answer');
const continueBtn = document.getElementById('continueBtn');

function loadQuestion() {
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  const q = questions[currentQuestion];
  answerButtons.forEach((btn, index) => {
    btn.textContent = q.answers[index];
    btn.disabled = false;
    btn.style.backgroundColor = ''; // reset button style
  });

  continueBtn.style.display = 'none';
  answerSelected = false;
}

answerButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (answerSelected) return;
    answerSelected = true;

    const q = questions[currentQuestion];

    if (index === q.correct) {
      btn.style.backgroundColor = '#4caf50'; // green for correct
      score++;
    } else {
      btn.style.backgroundColor = '#f44336'; // red for wrong
      answerButtons[q.correct].style.backgroundColor = '#4caf50'; // show correct
    }

    answerButtons.forEach(b => b.disabled = true);
    continueBtn.style.display = 'inline-block';
  });
});

continueBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem('score', score);
    window.location.href = 'leaderboard.html';
  }
});

loadQuestion();
