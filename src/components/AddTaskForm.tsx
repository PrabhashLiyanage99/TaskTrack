import { useState } from "react";

interface AddTaskFormProps {
  taskLists: string[];
  onAddTask: (title: string, category: string, dueDate: Date) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ taskLists, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !dueDate) return;
    onAddTask(title, category, new Date(dueDate));
    setTitle("");
    setCategory("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-2">Add New Task</h3>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Select Category</option>
        {taskLists.map((list, index) => (
          <option key={index} value={list}>
            {list}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
