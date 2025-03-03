import { useState } from "react";

interface AddTaskFormProps {
  taskLists: string[];
  onAddTask: (title: string, category: string, dueDate: Date) => void;
  onClose: () => void; 
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ taskLists, onAddTask, onClose }) => {
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
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-md rounded-lg w-80"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">Add New Task</h3>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
            ✖
          </button>
        </div>
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
    </div>
  );
};

export default AddTaskForm;
