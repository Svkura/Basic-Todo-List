const express = require('express');
const mongoose = require('mongoose');
const tasksRouter = require('./routes/tasks');
const app = express();

app.use(express.json()); 
app.use('/tasks', tasksRouter); 

mongoose.connect('mongodb://localhost:27017/todolist')
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => console.error('MongoDB error:', err));
