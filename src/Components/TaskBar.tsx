import { useEffect, useState } from 'react';
import windowsIcon from "../assets/System-Windows-icon.png";
import { useWindows } from '../context/WindowContext';

const TaskBar = () => {
  const { windows, closeWindow, setActiveWindow, activeWindowId, toggleMinimize } = useWindows();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-blue-400 to-blue-600 border-t-2 border-blue-800 shadow-lg flex items-center pr-1 gap-1">
      <button className="h-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-r shadow-md flex items-center px-2 gap-1 transition-all active:shadow-inner">
        <img src={windowsIcon} alt="Start" className="w-5 h-5" />
        <span className="text-white font-bold text-sm">Start</span>
      </button>
      <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {windows.map((window) => (
          <div
            key={window.id}
            className={`h-8 min-w-32 max-w-40 flex items-center justify-between px-2 rounded border transition-all cursor-pointer ${
              activeWindowId === window.id && !window.isMinimized
                ? 'bg-gradient-to-b from-blue-300 to-blue-400 border-blue-200 shadow-inner'
                : 'bg-gradient-to-b from-blue-500 to-blue-700 border-blue-800 shadow-md hover:from-blue-400 hover:to-blue-600'
            }`}
            onClick={() => {
              if (window.isMinimized) {
                toggleMinimize(window.id);
              }
              setActiveWindow(window.id);
            }}
          >
            <span className="text-white text-xs font-semibold truncate flex-1">
              {window.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              className="ml-1 text-white hover:text-red-300 font-bold text-sm w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="h-8 bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-400 rounded px-3 flex items-center shadow-inner">
        <span className="text-white text-xs font-semibold">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default TaskBar;