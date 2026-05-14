const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const Todo = require('./db');

app.use(cors());
app.use(express.json());

// create todo
app.post('/todos', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

// get todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find().sort({ timestamp: -1 });
  res.json(todos);
});

// delete todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// update todo
app.put('/todos/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});