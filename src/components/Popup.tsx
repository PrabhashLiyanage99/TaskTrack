import React from "react";

interface PopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <p className="mb-4">{message}</p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded mr-2" onClick={onConfirm}>
          Yes
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
    );
};

export default Popup;