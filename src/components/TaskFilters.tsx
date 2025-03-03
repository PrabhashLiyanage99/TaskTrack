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
    setSortBy
 }) => {

    const handleTodayFilter = () => {
        const today = new Date();
        setSelectedDate(today);
    };

    const resetFilters = () => {
        setSelectedStatus("");
        setSelectedCategory(null);
        setSelectedDate(null);
        setSortOrder("asc");
    }
    
    return (
        <div className="flex p-2 bg-gray-800 rounded-lg flex-row items-center justify-center mt-20 gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border rounded bg-gray-900 text-white"
          >
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
    
          {/* Category Filter */}
          <select
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
            className="p-2 border rounded bg-gray-900 text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""} 
            onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)} 
            className="p-2 border rounded bg-gray-900 text-white"
          />

          <TaskSorter 
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            setSortBy={setSortBy} 
          />

          <button 
            onClick={handleTodayFilter}
            className="p-2 ml-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Today
          </button>

          {/* Reset Filters */}
          <button 
            onClick={resetFilters}
            className="p-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Filters
          </button>
        </div>
      );
};

export default TaskFilter;
