const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const healthController = require('./controllers/healthController');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/user-service');

app.post('/users/register', userController.register);
app.post('/users/login', userController.login);
app.get('/users/:id', userController.getUser);
app.get('/health', healthController.check);

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});