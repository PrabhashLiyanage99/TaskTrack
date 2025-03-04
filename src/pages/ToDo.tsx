import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import axios from "axios";
import Layout from "../layout/Layout";
import TaskChart from "../components/TaskChart";
import LeftSidebar from "../components/LeftSideBar";
import AddTaskForm from "../components/AddTaskForm";
import AddTaskButton from "../components/AddTaskButton";
import TaskFilter from "../components/TaskFilters";
import Popup from "../components/Popup";
import bin from "../assets/bin.svg";
import arrow from "../assets/left-arrow.svg"

const ToDo = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [taskLists, setTaskLists] = useState<string[]>(["Life", "Work", "Workout"]);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [taskAssignments, setTaskAssignments] = useState<{ [key: number]: number | null }>({});
  const [taskDates, setTaskDates] = useState<{ [key: number]: Date }>({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate ] = useState<Date | null>(null);
  const [sortOrder, setSortOrder ]  = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"date" | "index">("index");
  const [selectedTask, setSelectedTask] = useState<{ id: number; completed: boolean } | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 10

  // Fetch tasks
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const todosWithDates = response.data.map((todo: any) => ({
          ...todo,
          taskDate: generateRandomDate(),
        }));

        setTodos(todosWithDates);
        setTaskDates(
          todosWithDates.reduce(
            (acc: { [key: number]: Date }, todo: any) => ({
              ...acc,
              [todo.id]: todo.taskDate,
            }),
            {}
          )
        );
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // Add new task
  const handleAddTask = (title: string, category: string, dueDate: Date) => {
    const newTask = {
      id: todos.length + 1,
      title,
      completed: false,
      category,
      taskDate: dueDate,
    };
    setTodos([...todos, newTask]);
  };

  // Generate random date for all tasks
  const generateRandomDate = () => {
    const start = new Date(2024, 11, 27);
    const end = new Date(2025, 4, 30);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Get task length for chart drawing in small screens
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;

  // Filter tasks based on list selection
  const filteredTasks = todos
  .filter((todo) => {
    // Apply category filter
    if (selectedList !== null && selectedList !== -1) {
      return taskAssignments[todo.id] === selectedList;
    }
    return true;
  })
  .filter((todo) => {
    // Apply status filter
    if (selectedStatus === "completed") return todo.completed;
    if (selectedStatus === "pending") return !todo.completed;
    return true;
  })
  .filter((todo) => {
    if (!selectedDate) return true;

    const taskDate = taskDates[todo.id]
        ? new Date(taskDates[todo.id]).toLocaleDateString("en-CA") 
        : null;

    const selectedFormattedDate = selectedDate.toLocaleDateString("en-CA");

    return taskDate === selectedFormattedDate;
});

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === "date") {
    return sortOrder === "asc"
      ? new Date(taskDates[a.id]).getTime() - new Date(taskDates[b.id]).getTime()
      : new Date(taskDates[b.id]).getTime() - new Date(taskDates[a.id]).getTime();
  }
  return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
});

  // Task delete handler
  const handleConfirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== taskToDelete));
    setTaskToDelete(null);
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleShowPopup = (taskId: number) => {
    const task = todos.find((todo) => todo.id === taskId);
    if (task) setSelectedTask(task);
  };

  const handleConfirmChange = () => {
    if (selectedTask) {
      setTodos(
        todos.map((todo) => todo.id === selectedTask.id ?{...todo, completed: !todo.completed } : todo)
      );
    }
    setSelectedTask(null);
  };

  const handleCancel = () => {
    setSelectedTask(null);
  };

  //pagination logic
  const indexOfLastTask = currentPage * taskPerPage;
  const indexOfFirstTask = indexOfLastTask - taskPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout todos={todos}>

      <TaskFilter 
      selectedStatus={selectedStatus} 
      setSelectedStatus={setSelectedStatus}
      selectedCategory={selectedList}
      setSelectedCategory={setSelectedList}
      categories={taskLists.map((name, index) => ({ id: index, name }))} 
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      sortBy={sortBy}
      setSortBy={setSortBy}/>

      <LeftSidebar
        items={taskLists}
        addItem={(newList: string) => setTaskLists([...taskLists, newList])}
        removeItem={(index: number) => {
          setTaskLists(taskLists.filter((_, i) => i !== index));
          if (selectedList === index) {
            setSelectedList(null);
          }
        }}
        selectedIndex={selectedList}
        setSelectedIndex={setSelectedList}
      />

      <div className="flex flex-col items-center  min-h-screen max-w-10xl bg-gray-800 p-4 lg:mt-0 md:mt-20 sm:mt-10">
        <h2 className="text-2xl font-bold mb-4">ToDo List</h2>
        {loading ? (
          <p className="text-lg font-medium text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto w-full max-w-4xl bg-white shadow-xl rounded-lg lg:p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-500 text-white w-full">
                  <th className="p-2 hidden md:table-cell">No.</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Status</th>
                  <th className="p-2 hidden md:table-cell">Category</th>
                  <th className="p-2 hidden md:table-cell">Due Date</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-600 font-bold">
                      No tasks in this category
                    </td>
                  </tr>
                )}
                {currentTasks.map((todo)  =>(
                  <tr
                    key={todo.id}
                    className="cursor-pointer hover:bg-blue-100 transition-all"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <td className="p-2 hidden md:table-cell text-center">{todo.id}</td>
                    <td className="p-2">{todo.title}</td>
                    <td className="p-2 text-center">
                      <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowPopup(todo.id);
                      }}
                      className="text-xl">
                        {todo.completed ?  "✅" : "❌"}
                      </button>
                    </td>
                    <td className="p-2 hidden md:table-cell">
                      <select
                        value={taskAssignments[todo.id] ?? ""}
                        onChange={(e) => setTaskAssignments((prev) => ({ ...prev, [todo.id]: e.target.value ? Number(e.target.value) : null }))}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded border w-auto"
                      >
                        <option value="">Uncategorized</option>
                        {taskLists.map((list, index) => (
                          <option key={index} value={index}>
                            {list}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 text-center hidden md:table-cell">
                      {formatDate(taskDates[todo.id])}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTaskToDelete(todo.id);
                        }}
                      >
                        <img src={bin} alt="delete" className="w-6 h-6 hidden md:table-cell brightness-75 hover:brightness-100" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedTask && (
              <Popup
                message={`Are you sure you want to mark this task as ${
                  selectedTask.completed ? "Pending ❌" : "Completed ✅"
                }?`}
                onConfirm={handleConfirmChange}
                onCancel={handleCancel}
              />
            )}
            {taskToDelete && (
              <Popup
              message="Are you sure you want to delete this task?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
            )}
            <AddTaskButton onClick={() => setIsFormVisible(true)} />
            {isFormVisible && <AddTaskForm taskLists={taskLists} onAddTask={handleAddTask} onClose={() => setIsFormVisible(false)} />}
          </div>
        )}
        {selectedTodo && 
          <TodoCard 
            todo={selectedTodo}
            taskLists={taskLists}
            taskAssignments={taskAssignments}
            setTaskAssignments={setTaskAssignments}
            taskDates={taskDates}
            setTaskDates={setTaskDates}
            onClose={() => setSelectedTodo(null)}

            />}
          <div className=" bottom-0 left-0 right-0 py-4 shadow-lg ">
          <div className="flex justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-orange-500 text-white rounded disabled:bg-gray-300 w-28 flex items-center justify-center space-x-1" 
            >
              <img src={arrow} alt="arrow" className="w-5 h-5 inline-block mr-2" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastTask >= sortedTasks.length}
              className="px-4 py-2 mx-1 bg-orange-500 text-white rounded disabled:bg-gray-300 w-28 flex items-center justify-center space-x-1" 
            >
              <span>Next</span>
              <img src={arrow} alt="arrow" className="w-5 h-5 rotate-180 inline-block ml-2" />
            </button>
          </div>
        </div>
        <div className="block lg:hidden mt-10">
          <TaskChart totalTaskCount={totalTasks} doneTaskCount={completedTasks} />
        </div>
      </div>
    </Layout>
  );
};

export default ToDo;