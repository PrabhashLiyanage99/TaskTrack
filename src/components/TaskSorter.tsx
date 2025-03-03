import React from "react";

interface TaskSorterProps {
    sortBy: "date" | "index";
    sortOrder: "asc" | "desc";
    setSortBy: (by: "date" | "index") => void;
    setSortOrder: (order: "asc" | "desc") => void;
}

const TaskSorter: React.FC<TaskSorterProps> = ({ sortBy, sortOrder, setSortBy, setSortOrder }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-2 p-3 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700">
            <div className="flex flex-col items-start">
                <label className="text-sm font-medium mb-1">Sort By</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "date" | "index")}
                    className="p-2 border rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                >
                    <option value="date">Date</option>
                    <option value="index">Index</option>
                </select>
            </div>

            <div className="flex flex-col items-start">
                <label className="text-sm font-medium mb-1">Order</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                    className="p-2 border rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    );
};

export default TaskSorter;
