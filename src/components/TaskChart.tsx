import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend);

interface TasksChartProps {
    totalTaskCount? : number;
    doneTaskCount? : number;
}

const TaskCard: React.FC<TasksChartProps> = ({
    totalTaskCount = 0,
    doneTaskCount = 0,
}) => {
    const todoTaskCount = totalTaskCount > 0 ? (totalTaskCount - doneTaskCount) : 0;

    const pieChartData = {
        labels: ["Done Tasks", "ToDo Tasks"],
        datasets: [
            {
                data: [todoTaskCount, doneTaskCount],
                backgroundColor: ["#FF6384", "#4BC0C0"],
                borderColor: ["#FF6384", "#4BC0C0"],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        maintainAspectRatio: true,
        cutout: "60%" as const,
    }

    return (
        <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-12 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between">
          <div className="flex justify-between sm:flex-col md:flex-row">
            <div>
              <p className="text-sm uppercase text-gray-300 mb-1">Total Tasks</p>
              <h2 className="text-white font-bold text-2xl">{totalTaskCount}</h2>
              <p className="text-sm text-gray-300 mt-9">
                <span>Done Tasks</span>
                <span style={{ fontSize: "18px", color:"#4BC0C0" }} className={`flex items-center `}>
                  <span className="pt-6" /> {doneTaskCount}
                </span>
                <span>Todo Tasks</span>
                <span style={{ fontSize: "18px", color:"#FF6384" }} className={`flex items-center `}>
                  <span className="pt-6" /> {todoTaskCount}
                </span>
              </p>
            </div>
            <div className="col-span-1 xs:h-[20px] xs:w-[20px] sm:w-[80px] sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[120px] lg:h-[120px]">
              <h2 className="text-base text-gray-300 mb-2">Task Status</h2>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      );
};

export default TaskCard;