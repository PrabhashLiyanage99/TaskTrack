import React from 'react';
import add from "../assets/add-plus.svg";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-10 lg:right-72">
      <button
        onClick={onClick}
        className="bg-orange-500 p-2 rounded-full shadow-lg hover:bg-orange-600 flex items-center justify-center z-50"
        title="Add Task"
      >
        <img src={add} alt="Add Task" className="w-10 h-10" />
      </button>
    </div>
  );
};

export default AddTaskButton;
