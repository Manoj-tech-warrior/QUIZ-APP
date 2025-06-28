document.addEventListener('DOMContentLoaded', () => {

  const StartBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "1: what is the capital of France?",
      choices: ["A.  Paris", "B.  London", "C.   Berlin", "D.  Madrid"],
      answer: "A.  Paris"
    },
    {
      question: "2: Who is the prime minister of India?",
      choices: ["A. Rahul Gandhi", "B. Narendra Modi", "C. Amit Shah", "D. none"],
      answer: "B. Narendra Modi",
    },
    {
      question: "3: Which programming language  is mostly used in the world?",
      choices: ["A. Javascript", "B. Python", "C. PHP", "D. C++"],
      answer: "A. Javascript",
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let isAnswered = false;  // 🔧 NEW FLAG

  StartBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    startQuiz();
  });

  function startQuiz() {
    StartBtn.classList.add("hidden");
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    isAnswered = false; // 🔄 RESET FLAG
    nextBtn.classList.add('hidden');
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => selectAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice, li) {
    if (isAnswered) return;  // ✅ Block multiple answers

    isAnswered = true;

    const correctAnswer = questions[currentQuestionIndex].answer;

    if (choice === correctAnswer) {
      score++;
      li.style.backgroundColor = "lightgreen";
    } else {
      li.style.backgroundColor = "salmon";
    }

    // Optionally, disable all other options
    Array.from(choicesList.children).forEach(child => {
      child.style.pointerEvents = "none";
    });

    nextBtn.classList.remove('hidden');
  }

  function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
