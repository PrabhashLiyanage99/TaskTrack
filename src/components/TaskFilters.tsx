import React from "react";

interface TaskFilterProps {
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    selectedCategory: number | null;
    setSelectedCategory: (category: number | null) => void;
    categories: {id: number; name: string}[];
    selectedDate:  Date | null ;
    setSelectedDate: (key: Date) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ 
    selectedStatus, 
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedDate,
    setSelectedDate
 }) => {
    return (
        <div className="flex gap-4 p-4 bg-gray-100 rounded-lg  flex-row items-center justify-center mt-20">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
    
          {/* Category Filter */}
          <select
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""} 
            onChange={(e) => setSelectedDate(new Date(e.target.value))} 
            className="p-2 border rounded"
            />
        </div>
      );
};

export default TaskFilter;