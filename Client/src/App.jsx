import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const url = "http://localhost:5000/todos";

  const fetchTodos = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (!text) return;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchTodos();
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };

  // Edit Todo
  const editTodo = async (id) => {
    const newText = prompt("Enter new task");
    if (!newText) return;

    await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });

    fetchTodos();
  };

  return (
    <div className="px-10 py-10 w-[600px]">
      <div className="p-5 border rounded-2xl shadow-2xl shadow-gray-300">
        <h1 className="text-3xl font-bold mb-5 text-center">
          Todo App
        </h1>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Task"
            className="border p-2 flex-1"
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Add
          </button>
        </div>

        <div className="mt-5 space-y-2">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between border p-2 rounded"
            >
              <p>{todo.text}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => editTodo(todo._id)}
                  className="bg-yellow-500 text-white px-3"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="bg-red-500 text-white px-3"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;