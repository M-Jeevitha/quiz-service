const express = require('express');
const app = express();
app.use(express.json());

// Temporary in-memory DB
let quizzes = [
  { id: 1, title: "Basic Math Quiz", questions: ["2+2=?", "5*3=?"], attempts: [] }
];

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'quiz-service' }));

// Get all quizzes
app.get('/quizzes', (req, res) => {
  res.json(quizzes);
});

// Create a new quiz
app.post('/quizzes', (req, res) => {
  const { title, questions } = req.body;
  if (!title || !questions) {
    return res.status(400).json({ error: "Quiz title and questions are required" });
  }
  const newQuiz = { id: quizzes.length + 1, title, questions, attempts: [] };
  quizzes.push(newQuiz);
  res.status(201).json(newQuiz);
});

// Attempt a quiz (simulated integration with student-service)
app.post('/quizzes/:id/attempt', (req, res) => {
  const { studentId, answers } = req.body;
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  // Record attempt (just saving studentId + answers for now)
  const attempt = { studentId, answers, score: `${answers.length}/${quiz.questions.length}` };
  quiz.attempts.push(attempt);

  res.status(201).json({ message: "Attempt recorded", attempt });
});

app.listen(process.env.PORT || 3002, () => {
  console.log('quiz-service running on port', process.env.PORT || 3002);
});
