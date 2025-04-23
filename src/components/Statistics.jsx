import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  startOfWeek,
  endOfWeek,
  format,
  isSameWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

// ✅ Dummy interval data across 3+ weeks
const dummyIntervals = [
  // Week 1
  {
    start: new Date("2025-04-01T09:00:00"),
    end: new Date("2025-04-01T10:00:00"),
  },
  {
    start: new Date("2025-04-01T11:00:00"),
    end: new Date("2025-04-01T12:30:00"),
  },
  {
    start: new Date("2025-04-02T09:30:00"),
    end: new Date("2025-04-02T10:15:00"),
  },
  {
    start: new Date("2025-04-03T13:00:00"),
    end: new Date("2025-04-03T14:00:00"),
  },
  {
    start: new Date("2025-04-05T15:00:00"),
    end: new Date("2025-04-05T16:30:00"),
  },

  // Week 2
  {
    start: new Date("2025-04-08T10:00:00"),
    end: new Date("2025-04-08T11:00:00"),
  },
  {
    start: new Date("2025-04-09T11:30:00"),
    end: new Date("2025-04-09T12:45:00"),
  },
  {
    start: new Date("2025-04-10T13:00:00"),
    end: new Date("2025-04-10T14:30:00"),
  },
  {
    start: new Date("2025-04-11T09:15:00"),
    end: new Date("2025-04-11T10:15:00"),
  },

  // Week 3
  {
    start: new Date("2025-04-15T08:45:00"),
    end: new Date("2025-04-15T10:00:00"),
  },
  {
    start: new Date("2025-04-17T14:00:00"),
    end: new Date("2025-04-17T15:45:00"),
  },
];

const getWeekRangeLabel = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return `${format(start, "dd MMM")} - ${format(end, "dd MMM")}`;
};

const getWeekOptions = (intervals) => {
  const weeksMap = new Map();

  intervals.forEach(({ start }) => {
    const weekStart = startOfWeek(start, { weekStartsOn: 1 });
    const label = getWeekRangeLabel(weekStart);
    weeksMap.set(label, weekStart);
  });

  return Array.from(weeksMap.entries()).map(([label, value]) => ({
    label,
    date: value,
  }));
};

// ✅ Step 2: Group 7 days of selected week, even if no entries
const groupDailyForWeek = (intervals, selectedWeekStart) => {
  const weekStart = startOfWeek(selectedWeekStart, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });

  const fullWeekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const grouped = fullWeekDays.map((day) => {
    const dayLabel = format(day, "EEE dd MMM"); // e.g. Tue 02 Apr
    let totalHours = 0;

    intervals.forEach(({ start, end }) => {
      if (
        isSameWeek(start, weekStart, { weekStartsOn: 1 }) &&
        isSameDay(start, day)
      ) {
        totalHours += (end - start) / 3600000;
      }
    });

    return { day: dayLabel, hours: parseFloat(totalHours.toFixed(2)) };
  });

  return grouped;
};

const Statistics = () => {
  const weekOptions = getWeekOptions(dummyIntervals);
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]);

  const dailyStats = groupDailyForWeek(dummyIntervals, selectedWeek.date);

  return (
    <div className="p-6 rounded-xl bg-white shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        📅 Daily Work Stats (per week)
      </h2>

      {/* 🔽 Week Filter Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Week:
        </label>
        <select
          className="w-full max-w-sm border border-gray-300 rounded px-3 py-2"
          value={selectedWeek.label}
          onChange={(e) => {
            const selected = weekOptions.find(
              (w) => w.label === e.target.value
            );
            setSelectedWeek(selected);
          }}
        >
          {weekOptions.map((week, i) => (
            <option key={i} value={week.label}>
              {week.label}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Bar Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={dailyStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} interval={0} />
          <YAxis
            label={{ value: "Hours", angle: -90, position: "insideLeft" }}
            allowDecimals={false}
          />
          <Tooltip />
          <Bar dataKey="hours" fill="#4F46E5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
