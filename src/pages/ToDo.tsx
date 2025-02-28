import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import axios from "axios";

const ToDo = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(response => setTodos(response.data))
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>ToDo List</h2>
      {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.slice(0, 10).map(todo => (
              <tr key={todo.id} onClick={() => setSelectedTodo(todo)}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedTodo && <TodoCard todo={selectedTodo} onclose={() => setSelectedTodo(null)} />}
    </div>
  );
};

export default ToDo;