import React from "react";

interface PopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-500 p-6 pt-2 rounded shadow-lg text-end">
      <button type="button" onClick={onCancel} className="text-white hover:text-red-500 text-xl text-end mb-2 ">
            ✖
          </button>
        <p className="mb-4">{message}</p>
        <div className="text-center">
        <button className="bg-orange-500 text-white px-4 py-2 rounded mr-2" onClick={onConfirm}>
          Yes
        </button>
        <button className="hover:bg-red-500 text-white px-4 py-2 rounded" onClick={onCancel}>
          No
        </button>
        </div>
      </div>
    </div>
    );
};

export default Popup;