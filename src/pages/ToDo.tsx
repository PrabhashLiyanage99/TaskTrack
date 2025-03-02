import { useEffect, useState, FC } from "react";
import TodoCard from "../components/TodoCard";
import axios from "axios";
import Layout from "../layout/Layout";
import TaskChart from '../components/TaskChart'
import LeftSidebar from "../components/LeftSideBar";

const ToDo = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [taskLists, setTaskLists] = useState<string[]>(["Life", "Work", "Workout"]);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [taskAssignments, setTaskAssignments] = useState<{ [key: number]: number | null }>({});

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(response => setTodos(response.data))
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;

  const addTaskList = (newList: string) => {
    setTaskLists([...taskLists, newList]);
  };

  const removeTaskList = (index: number) => {
    setTaskLists(taskLists.filter((_, i) => i !== index));
  };

  const assignTaskToList = (taskId: number, listIndex: number | null) => {
    setTaskAssignments((prev) => ({ ...prev, [taskId]: listIndex }));
  };


  return (
    <Layout todos={todos}>
    <LeftSidebar 
        items={taskLists} 
        addItem={addTaskList} 
        removeItem={removeTaskList} 
        selectedIndex={selectedList} 
        setSelectedIndex={setSelectedList} 
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
        <h2 className="text-2xl font-bold mb-4">ToDo List</h2>
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
                      <td className="p-2">
                      <select 
                        value={taskAssignments[todo.id] ?? ""}
                        onChange={(e) => assignTaskToList(todo.id, e.target.value ? Number(e.target.value) : null)}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded border"
                      >
                        <option value="">Select</option>
                        {taskLists.map((list, index) => (
                          <option key={index} value={index}>{list}</option>
                        ))}
                      </select>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="block lg:hidden">
                <TaskChart
                totalTaskCount = {totalTasks}
                doneTaskCount = {completedTasks} />
             </div>
          </div>
        )}
        {selectedTodo && <TodoCard todo={selectedTodo} onClose={() => setSelectedTodo(null)} />}
      </div>
    </Layout>
  );
};

export default ToDo;