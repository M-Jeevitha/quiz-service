const express = require('express');
const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({status: 'ok', service: 'quiz-service'}));
app.listen(process.env.PORT||3002, ()=> console.log('quiz-service running'));
