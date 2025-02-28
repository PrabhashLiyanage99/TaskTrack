import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import axios from "axios";
import TaskChart from "../components/TaskChart";

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

  const totalTasks = todos.length;

  const completedTasks = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">ToDo List</h2>
      <div className="mb-4 text-lg font-medium">
        <p>Total Tasks: <span className="font-bold">{totalTasks}</span></p>
        <p>Completed Tasks: <span className="font-bold text-green-600">{completedTasks}</span></p>
      </div>
      {loading ? (
        <p className="text-lg font-medium text-gray-600">Loading...</p> ): (
          <div className="overflow-x-auto w-full max-w-2xl bg-white shadow-xl rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Completed</th>
                </tr>
              </thead>
              <tbody>
                {todos.slice(0, 10).map(todo => (
                  <tr 
                  key={todo.id} 
                  className="cursor-pointer hover:bg-blue-100 transition-all"
                  onClick={() => setSelectedTodo(todo)}>
                    <td className="p-2 text-center">{todo.id}</td>
                    <td className="p-2">{todo.title}</td>
                    <td className="p-2 text-center">{todo.completed ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}
       {/* <TaskChart
           totalTaskCount = {totalTasks}
           doneTaskCount = {completedTasks} /> */}
      {selectedTodo && <TodoCard todo={selectedTodo} onClose={() => setSelectedTodo(null)} />}
    </div>
  );
};

export default ToDo;