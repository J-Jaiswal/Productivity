import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(
    () => Number(localStorage.getItem("seconds")) || 0
  );
  const [sessionSeconds, setSessionSeconds] = useState(
    () => Number(localStorage.getItem("sessionSeconds")) || 0
  );
  const [running, setRunning] = useState(
    () => JSON.parse(localStorage.getItem("running")) || false
  );
  const [intervals, setIntervals] = useState(
    () => JSON.parse(localStorage.getItem("intervals")) || []
  );
  const [startTime, setStartTime] = useState(() => {
    const storedTime = localStorage.getItem("startTime");
    return storedTime ? new Date(storedTime) : null;
  });
  const [showIntervals, setShowIntervals] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Persist to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("seconds", seconds);
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("sessionSeconds", sessionSeconds);
  }, [sessionSeconds]);

  useEffect(() => {
    localStorage.setItem("running", JSON.stringify(running));
  }, [running]);

  useEffect(() => {
    localStorage.setItem("intervals", JSON.stringify(intervals));
  }, [intervals]);

  useEffect(() => {
    if (startTime) {
      localStorage.setItem("startTime", startTime.toISOString());
    } else {
      localStorage.removeItem("startTime");
    }
  }, [startTime]);

  const handleStartPause = () => {
    if (running) {
      const end = new Date();
      setIntervals((prev) => [
        ...prev,
        {
          start: startTime,
          end: end,
          duration: Math.floor((end - startTime) / 1000),
        },
      ]);
      setStartTime(null);
    } else {
      setStartTime(new Date());
      setSessionSeconds(0);
    }
    setRunning((prev) => !prev);
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6 font-sans">
      <div className="w-full max-w-lg bg-white bg-opacity-30 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30">
        <div className="text-center text-5xl font-mono font-bold text-purple-600 bg-clip-text mb-6 ">
          {formatTime(seconds)}
        </div>

        <div className="text-center mb-4">
          <span className="inline-block bg-purple-200 text-purple-800 px-4 py-1 rounded-full text-sm font-semibold shadow">
            Session: {formatTime(sessionSeconds)}
          </span>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleStartPause}
            className={`px-6 py-2 rounded-full text-white font-semibold shadow transition-all duration-300 ${
              running
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {running ? "Pause" : "Start"}
          </button>
        </div>

        <div className="flex justify-between items-center mb-6 px-3">
          <span className="text-sm text-gray-700 font-medium">
            Show Intervals
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showIntervals}
              onChange={(e) => setShowIntervals(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-md"></div>
          </label>
        </div>

        {showIntervals && intervals.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              🕒 Intervals:
            </h3>
            <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {intervals.map((intv, index) => (
                <li
                  key={index}
                  className="border border-gray-300 bg-white bg-opacity-80 rounded-lg p-3 shadow-sm hover:shadow-md hover:border-blue-400 transition"
                >
                  <p className="text-sm text-gray-700">
                    <strong>Start:</strong> {formatClock(new Date(intv.start))}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Stop:</strong> {formatClock(new Date(intv.end))}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Duration:</strong> {formatTime(intv.duration)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
