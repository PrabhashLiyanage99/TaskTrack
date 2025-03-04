import React, { useState } from "react";

interface TodoCardProps {
  todo: { id: number; title: string; completed: boolean } | null;
  taskAssignments: { [key: number]: number | null };
  setTaskAssignments: React.Dispatch<React.SetStateAction<{ [key: number]: number | null }>>;
  taskDates: { [key: number]: Date };
  setTaskDates: React.Dispatch<React.SetStateAction<{ [key: number]: Date }>>;
  taskLists: string[];
  onClose: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ 
  todo,
  taskLists,
  taskAssignments,
  setTaskAssignments,
  taskDates,
  setTaskDates,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    todo ? taskAssignments[todo.id] ?? null : null
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    todo && taskDates[todo.id] ? taskDates[todo.id].toISOString().split('T')[0] : ""
  );

  if (!todo) return null;

  const handleAdd = () => {
    if (todo) {
      setTaskAssignments((prev) => ({
        ...prev,
        [todo.id]: selectedCategory
      }));
      setTaskDates((prev) => ({
        ...prev,
        [todo.id]: new Date(selectedDate)
      }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-gray-500 p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in text-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold mb-4 text-white">ToDo Details</h3>
          <button type="button" onClick={onClose} className="text-white hover:text-red-500 text-xl">
            ✖
          </button>
        </div>
        <p className="text-white"><span className="font-semibold">ID:</span> {todo.id}</p>
        <p className="text-white"><span className="font-semibold">Title:</span> {todo.title}</p>
        <p className="text-white">
          <span className="font-semibold">Completed:</span> {todo.completed ? "✅ Yes" : "❌ No"}
        </p> 

        <label className="block mt-4 text-white font-semibold">Task Category</label>
        <select
          value={selectedCategory ?? ""}
          onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
          className="p-2 w-full border rounded mt-1 bg-slate-500"
        >
          <option value="">Uncategorized</option>
          {taskLists.map((list, index) => (
            <option key={index} value={index}>
              {list}
            </option>
          ))}
        </select>

        <label className="block mt-4 text-white font-semibold">Task Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 w-full border rounded mt-1 bg-slate-500"
        />

        <button 
          className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
          onClick={handleAdd} 
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
