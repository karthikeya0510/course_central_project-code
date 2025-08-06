const { useState } = React;

const allQuestions = {
  Easy: [
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], answer: "Paris" },
    { question: "Which is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
    { question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" },
    { question: "What color are bananas when ripe?", options: ["Red", "Yellow", "Green", "Blue"], answer: "Yellow" },
    { question: "What is 5 + 3?", options: ["5", "8", "10", "6"], answer: "8" },
    { question: "Which animal barks?", options: ["Cat", "Dog", "Cow", "Sheep"], answer: "Dog" },
    { question: "Which day comes after Friday?", options: ["Wednesday", "Thursday", "Saturday", "Sunday"], answer: "Saturday" },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "What shape is a wheel?", options: ["Square", "Circle", "Triangle", "Rectangle"], answer: "Circle" },
    { question: "Which fruit is red?", options: ["Apple", "Banana", "Pear", "Grapes"], answer: "Apple" },
  ],
  Moderate: [
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "What gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "Which element has the chemical symbol 'O'?", options: ["Osmium", "Oxygen", "Oxide", "Ore"], answer: "Oxygen" },
    { question: "What is H2O commonly known as?", options: ["Salt", "Water", "Oxygen", "Acid"], answer: "Water" },
    { question: "How many hours in a day?", options: ["20", "22", "24", "26"], answer: "24" },
    { question: "What is the boiling point of water?", options: ["90°C", "95°C", "100°C", "105°C"], answer: "100°C" },
    { question: "What is 10 x 10?", options: ["20", "100", "200", "1000"], answer: "100" },
    { question: "How many bones in the human body?", options: ["206", "208", "201", "210"], answer: "206" },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: "Pacific" },
    { question: "Which country is known for the Eiffel Tower?", options: ["Italy", "Germany", "France", "UK"], answer: "France" },
  ],
  Tough: [
    { question: "What is the derivative of sin(x)?", options: ["cos(x)", "-sin(x)", "-cos(x)", "tan(x)"], answer: "cos(x)" },
    { question: "Which year did WW1 begin?", options: ["1910", "1912", "1914", "1916"], answer: "1914" },
    { question: "What is the capital of Kazakhstan?", options: ["Astana", "Almaty", "Tashkent", "Bishkek"], answer: "Astana" },
    { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Tesla", "Darwin"], answer: "Einstein" },
    { question: "What is the square root of 256?", options: ["14", "15", "16", "17"], answer: "16" },
    { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
    { question: "Which blood type is universal donor?", options: ["A", "B", "O", "AB"], answer: "O" },
    { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: "Saturn" },
    { question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Ribonucleic Acid", "Nuclear Acid", "None"], answer: "Deoxyribonucleic Acid" },
    { question: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "CaCO3", "H2SO4"], answer: "NaCl" },
  ]
};

function QuizApp() {
  const [level, setLevel] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);

  const startQuiz = (level) => {
    setLevel(level);
    const questions = [...allQuestions[level]];
    setQuizData(questions.sort(() => 0.5 - Math.random()).slice(0, 5)); // Select random 5 questions
  };

  const handleAnswer = (option) => {
    const current = quizData[currentQuestion];
    const correct = option === current.answer;
    setAnswers([...answers, { question: current.question, selected: option, correct: current.answer }]);
    if (correct) setScore(score + 1);

    const next = currentQuestion + 1;
    if (next < quizData.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>

      {!level ? (
        <div>
          <h2>Select Difficulty</h2>
          <button onClick={() => startQuiz("Easy")}>Easy</button>
          <button onClick={() => startQuiz("Moderate")}>Moderate</button>
          <button onClick={() => startQuiz("Tough")}>Tough</button>
        </div>
      ) : showScore ? (
        <div>
          <h2>You scored {score} out of {quizData.length}</h2>
          <h3>Review:</h3>
          <ul>
            {answers.map((ans, index) => (
              <li key={index}>
                <strong>{ans.question}</strong><br />
                Your answer: <span style={{ color: ans.selected === ans.correct ? 'green' : 'red' }}>{ans.selected}</span><br />
                {ans.selected !== ans.correct && (<span>Correct answer: {ans.correct}</span>)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>{quizData[currentQuestion].question}</h2>
          {quizData[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<QuizApp />, document.getElementById("root"));
