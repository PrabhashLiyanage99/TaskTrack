import React from "react";
import TaskChart from "./TaskChart";

interface RightSidebarProps {
    todos: any[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ todos }) => {
    const totalTaskCount = todos.length;
    const doneTaskCount = todos.filter(todo => todo.completed).length;

    return (
        <div className="fixed right-0 top-16 h-full w-80 bg-gray-900 text-white flex flex-col p-4 shadow-lg hidden lg:block">
            <h2 className="text-lg font-semibold mb-4 text-center">Task Overview</h2>
            <TaskChart totalTaskCount={totalTaskCount} doneTaskCount={doneTaskCount} />
        </div>
    );
};

export default RightSidebar;
