const express = require('express');
const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({status: 'ok', service: 'student-service'}));
app.get('/students', (req, res) => res.json([{id:1, name:'Gokul'}]));
app.listen(process.env.PORT||3001, ()=> console.log('student-service running'));
