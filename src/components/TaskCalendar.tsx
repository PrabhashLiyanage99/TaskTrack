import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface TaskCalendarProps {
  dueDates: Date[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ dueDates }) => {
  const taskDateSet = new Set(dueDates.map((date) => new Date(date).toDateString()));

  const isTaskDate = (date: Date) => taskDateSet.has(date.toDateString());

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md mt-2 max-w-xs mx-auto">
      <h2 className="text-lg font-semibold mb-1 text-orange-500 text-center">Task Calendar</h2> 
      {/* Reduced mb-1 to decrease the gap */}
      <div className="scale-75 calendar-container"> 
        <Calendar 
          tileClassName={({ date, view }) =>
            view === 'month' && isTaskDate(date) ? 'task-date' : ''
          }
        />
      </div>
      <style>
        {`
          .calendar-container .react-calendar {
            background-color: #1f2937;
            color: white;
            border-radius: 10px;
            padding: 5px; 
            border: none;
            margin-top: -30px; 
          }

          .react-calendar__month-view__days__day {
            color: white !important;
          }

          .task-date {
            background-color: orange !important;
            border-radius: 50%;
            color: white !important;
            font-weight: bold;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            margin: auto;
          }

          .react-calendar__tile {
            border-radius: 5px;
          }

          .react-calendar__navigation button {
            color: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default TaskCalendar;
