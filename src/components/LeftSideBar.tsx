import React, { useState , useEffect} from "react";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import add from "../assets/add.svg";

interface LeftSidebarProps {
    items: string[];
    addItem: (newItem: string) => void;
    removeItem: (index: number) => void;
    selectedIndex: number | null;
    setSelectedIndex: (index: number | null) => void;
}

const LeftSideBar: React.FC<LeftSidebarProps> = ({ items, addItem, removeItem, selectedIndex, setSelectedIndex }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newItem, setNewItem] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (selectedIndex === null) {
            setSelectedIndex(-1);
        }
    }, [selectedIndex, setSelectedIndex]);


    const handleAddItem = () => {
        if (newItem.trim() !== "") {
            addItem(newItem);
            setNewItem("");
        }
        setIsAdding(false);
    };

    return (
 <>
            {!isMenuOpen && (
                <button
                    className="mt-16 fixed top-4 left-4 bg-gray-800 p-2 rounded-md shadow-md z-50 lg:hidden"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <img src={menu} alt="menu" className="w-6 h-6" />
                </button>
            )}

            {isMenuOpen && (
                <button
                className="mt-16 fixed top-4 left-4 bg-gray-800 p-2 rounded-md shadow-md z-50 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
            >
                <img src={close} alt="close" className="w-6 h-6" />
            </button>
            )}

            <div
                className={`mt-16 fixed top-0 left-0 h-full w-60 bg-gray-900 text-white p-5 shadow-lg transition-transform transform 
                ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <h2 className="text-lg font-bold mb-4 mt-10 lg:mt-0 lg:hidden">Task Lists</h2>

                <ul>
                <li
                        className={`mb-3 flex justify-between items-center cursor-pointer hover:text-gray-400 pl-2
                        ${selectedIndex === -1 ? "bg-orange-500 text-white p-2 rounded-md pr-0" : ""}`}
                        onClick={() => setSelectedIndex(-1)}
                    >
                        All Tasks
                    </li>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`mb-3 flex justify-between items-center cursor-pointer hover:text-gray-400 pl-2
                            ${selectedIndex === index ? "bg-orange-500 text-white p-2 rounded-md pr-0" : ""}`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {item}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(index);
                                }}
                                className="text-gray-500 hover:text-red-700 font-bold text-lg pr-2"
                            >
                                ✖
                            </button>
                        </li>
                    ))}
                </ul>

                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="mt-4 w-auto hover:bg-orange-600 text-white p-2 rounded-md flex items-center gap-3"
                    >
                        <img src={add} alt="add" className="w-6 h-6" /> Add New Category
                    </button>
                )}
                {isAdding && (
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="New Item"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="w-full p-2 text-black rounded-md"
                        />
                        <button
                            onClick={handleAddItem}
                            className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md"
                        >
                            Add
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default LeftSideBar;
