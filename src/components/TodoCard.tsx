import { FaTimesCircle } from "react-icons/fa";

interface TodoCardProps {
  todo: { id: number; title: string; completed: boolean };
  onClose: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
        {/* Close Button */}
    

        {/* Modal Content */}
        <h3 className="text-xl font-bold mb-4 text-gray-800">ToDo Details</h3>
        <p className="text-gray-700"><span className="font-semibold">ID:</span> {todo.id}</p>
        <p className="text-gray-700"><span className="font-semibold">Title:</span> {todo.title}</p>
        <p className="text-gray-700">
          <span className="font-semibold">Completed:</span> {todo.completed ? "✅ Yes" : "❌ No"}
        </p>

        {/* Close Button */}
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
