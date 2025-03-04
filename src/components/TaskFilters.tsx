import React from "react";
import TaskSorter from "../components/TaskSorter";

interface TaskFilterProps {
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    selectedCategory: number | null;
    setSelectedCategory: (category: number | null) => void;
    categories: { id: number; name: string }[];
    selectedDate: Date | null;
    setSelectedDate: (key: Date | null) => void;
    sortOrder: "asc" | "desc";
    setSortOrder: (order: "asc" | "desc") => void;
    sortBy: "date" | "index";
    setSortBy: (by: "date" | "index") => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedDate,
    setSelectedDate,
    sortOrder,
    setSortOrder,
    sortBy,
    setSortBy,
}) => {
    const handleTodayFilter = () => {
        setSelectedDate(new Date());
    };

    const resetFilters = () => {
        setSelectedStatus("");
        setSelectedCategory(null);
        setSelectedDate(null);
        setSortOrder("asc");
        setSortBy("index");
    };

    return (
        <div className="flex flex-wrap gap-4 p-6 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700 justify-center items-center mt-10">
            {/* Status Filter */}
            <div className="flex flex-col items-start">
                <label className="text-sm font-medium mb-1">Status</label>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                >
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col items-start">
                <label className="text-sm font-medium mb-1">Category</label>
                <select
                    value={selectedCategory ?? ""}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value ? Number(e.target.value) : null)
                    }
                    className="p-2 border rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date Filter */}
            <div className="flex flex-col items-start">
                <label className="text-sm font-medium mb-1">Date</label>
                <input
                    type="date"
                    value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                        setSelectedDate(e.target.value ? new Date(e.target.value) : null)
                    }
                    className="p-2 border rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                />
            </div>

            {/* Sorting Component */}
            <TaskSorter sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} />

            {/* Buttons in One Row */}
            <div className="flex gap-3">
                <button
                    onClick={handleTodayFilter}
                    className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                    Today
                </button>

                <button
                    onClick={resetFilters}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default TaskFilter;
