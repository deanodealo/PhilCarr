// Import Firebase modules (if using modules, else add script tags in HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyAZxLjMZTYTOLBunk56HqyHkLyPJsQUtjA",
  authDomain: "philcarr-20ac0.firebaseapp.com",
  projectId: "philcarr-20ac0",
  storageBucket: "philcarr-20ac0.firebasestorage.app",
  messagingSenderId: "770728636073",
  appId: "1:770728636073:web:d2bddbee786446c37d03b8",
  measurementId: "G-XRCH682RNE"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Player and game state
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
    btn.style.backgroundColor = ''; // reset
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
      btn.style.backgroundColor = '#4caf50'; // green correct
      score++;
    } else {
      btn.style.backgroundColor = '#f44336'; // red wrong
      answerButtons[q.correct].style.backgroundColor = '#4caf50'; // correct shown
    }

    answerButtons.forEach(b => b.disabled = true);
    continueBtn.style.display = 'inline-block';
  });
});

continueBtn.addEventListener('click', async () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem('score', score);

    try {
      const playerDoc = doc(db, 'players', playerName);

      // Update player score and current round
      await updateDoc(playerDoc, {
        score: score,
        currentRound: 1
      });
    } catch (error) {
      console.error('Error updating score:', error);
      alert('Failed to update score in database.');
    }

    window.location.href = 'leaderboard.html';
  }
});

loadQuestion();
