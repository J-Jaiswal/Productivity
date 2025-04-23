import React, { useState } from "react";

// Utilities
const formatTime = (secs) => {
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const formatClock = (date) =>
  date?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatDate = (date) =>
  date?.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const History = () => {
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  // ✅ Dummy Intervals
  const dummyIntervals = [
    {
      start: new Date("2025-04-10T09:00:00"),
      end: new Date("2025-04-10T09:30:00"),
      duration: 1800,
    },
    {
      start: new Date("2025-04-10T10:00:00"),
      end: new Date("2025-04-10T10:45:00"),
      duration: 2700,
    },
    {
      start: new Date("2025-04-11T11:15:00"),
      end: new Date("2025-04-11T11:50:00"),
      duration: 2100,
    },
    {
      start: new Date("2025-04-11T12:30:00"),
      end: new Date("2025-04-11T13:00:00"),
      duration: 1800,
    },
  ];

  const groupedByDate = dummyIntervals.reduce((acc, interval) => {
    const dateKey = formatDate(interval.start);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(interval);
    return acc;
  }, {});

  const getTotalTime = (daily) =>
    formatTime(daily.reduce((sum, i) => sum + i.duration, 0));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        📅 Work History
      </h2>

      <table className="w-full text-left border border-gray-300 shadow-sm rounded overflow-hidden">
        <thead className="bg-blue-500 text-white text-sm">
          <tr>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Total Time Worked</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedByDate).map(([date, dayData], i) => (
            <tr
              key={i}
              className="bg-white even:bg-gray-50 border-b border-gray-200"
            >
              <td className="py-2 px-3">{date}</td>
              <td className="py-2 px-3">{getTotalTime(dayData)}</td>
              <td className="py-2 px-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setShowDetailsFor(date)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal with Day's Intervals */}
      {showDetailsFor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowDetailsFor(null)}
              className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4">
              Intervals for {showDetailsFor}
            </h3>

            <table className="w-full text-left border border-gray-200 rounded">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="py-2 px-3">Start Time</th>
                  <th className="py-2 px-3">End Time</th>
                  <th className="py-2 px-3">Duration</th>
                </tr>
              </thead>
              <tbody>
                {groupedByDate[showDetailsFor].map((intv, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 even:bg-gray-50 text-sm"
                  >
                    <td className="py-2 px-3">{formatClock(intv.start)}</td>
                    <td className="py-2 px-3">{formatClock(intv.end)}</td>
                    <td className="py-2 px-3">{formatTime(intv.duration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
