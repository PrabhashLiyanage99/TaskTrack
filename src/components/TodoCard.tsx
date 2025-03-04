import React, {useState} from "react";

interface TodoCardProps {
  todo: { id: number; title: string; completed: boolean } | null;
  taskAssignments: { [ key: number]: number | null};
  setTaskAssignments: React.Dispatch<React.SetStateAction<{ [key: number]: number | null}>>;
  taskDates: { [key: number]: Date};
  setTaskDates: React.Dispatch<React.SetStateAction<{ [key: number]: Date}>>;
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
  onClose }) => {
  if (!todo) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">

        <h3 className="text-xl font-bold mb-4 text-gray-800">ToDo Details</h3>
        <p className="text-gray-700"><span className="font-semibold">ID:</span> {todo.id}</p>
        <p className="text-gray-700"><span className="font-semibold">Title:</span> {todo.title}</p>
        <p className="text-gray-700">
          <span className="font-semibold">Completed:</span> {todo.completed ? "✅ Yes" : "❌ No"}
        </p> 
        <label className="block mt-4 text-gray-700 font-semibold">Task Category</label>
          <select
            value={taskAssignments[todo.id] ?? ""}
            onChange={(e) => setTaskAssignments((prev) => ({
              ...prev,
              [todo.id]: e.target.value ? Number(e.target.value) : null
            }))}
            onClick={(e) => e.stopPropagation()}
            className="p-2 w-full border rounded mt-1"
            >
              <option value="">Uncategorized</option>
              {taskLists.map((list, index) => (
                <option key={index} value={index}>
                  {list}
                </option>
              ))}
          </select>

            <label className="block mt-4 text-gray-700 font-semibold">Task Date</label>
            <input
              type="date"
              value={taskDates[todo.id] ? taskDates[todo.id]!.toISOString().split('T')[0] : ""}
              onChange={(e) => setTaskDates((prev) => ({
                ...prev,
                [todo.id]: new Date(e.target.value)
              }))}
              className="p-2 w-full border rounded mt-1"
              />

        <button 
          className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
