//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    question.choices.forEach(choice => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore saved answers if any
      const savedAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};
      if (savedAnswers[`question-${i}`] === choice) {
        choiceElement.checked = true;
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br")); // Add line break for better readability
    });

    questionsElement.appendChild(questionElement);
  });
}

// Save progress to session storage
function saveProgress() {
  const savedAnswers = {};
  questions.forEach((_, i) => {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    if (selectedOption) {
      savedAnswers[`question-${i}`] = selectedOption.value;
    }
  });
  sessionStorage.setItem("progress", JSON.stringify(savedAnswers));
}

// Calculate the score
function calculateScore() {
  const savedAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((question, i) => {
    if (savedAnswers[`question-${i}`] === question.answer) {
      score++;
    }
  });

  return score;
}

// Display the score
function displayScore(score) {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save score to local storage
  localStorage.setItem("score", score);
}

// Handle submit button click
document.getElementById("submit").addEventListener("click", () => {
  saveProgress();
  const score = calculateScore();
  displayScore(score);
});

// Initialize the quiz on page load
window.addEventListener("load", () => {
  renderQuestions();
});
