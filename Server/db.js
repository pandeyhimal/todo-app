const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo_app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Todo = mongoose.model('Todo', todoSchema);


module.exports = Todo;