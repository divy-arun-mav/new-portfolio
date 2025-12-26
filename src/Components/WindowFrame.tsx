import { useState, useRef, useEffect } from 'react';
import { useWindows, type WindowData } from '../context/WindowContext';
import WindowContent from './WindowContent';

interface WindowFrameProps {
  windowData: WindowData;
}

const WindowFrame = ({ windowData }: WindowFrameProps) => {
  const { closeWindow, setActiveWindow, updateWindowPosition, activeWindowId, toggleMinimize, toggleMaximize } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if (windowData.isMaximized) return; // Don't allow dragging when maximized
    
    setIsDragging(true);
    setActiveWindow(windowData.id);
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const desktopWrapper = document.querySelector('.desktop-wrapper');
      if (!desktopWrapper) return;

      const desktopRect = desktopWrapper.getBoundingClientRect();
      const newX = e.clientX - desktopRect.left - dragOffset.x;
      const newY = e.clientY - desktopRect.top - dragOffset.y;

      const maxX = desktopRect.width - (windowRef.current?.offsetWidth || 0);
      const maxY = desktopRect.height - (windowRef.current?.offsetHeight || 0) - 80;

      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      updateWindowPosition(windowData.id, { x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, windowData.id, updateWindowPosition]);

  const handleWindowClick = () => {
    if (activeWindowId !== windowData.id) {
      setActiveWindow(windowData.id);
    }
  };

  const handleDoubleClick = () => {
    toggleMaximize(windowData.id);
  };

  return (
    <div
      ref={windowRef}
      className={`bg-gradient-to-b from-blue-500 to-blue-900 p-1 absolute shadow-2xl ${
        windowData.isMaximized ? 'rounded-none' : 'rounded w-96 max-w-3xl'
      }`}
      style={{
        left: windowData.isMaximized ? '0' : `${windowData.position.x}px`,
        top: windowData.isMaximized ? '0' : `${windowData.position.y}px`,
        right: windowData.isMaximized ? '0' : 'auto',
        bottom: windowData.isMaximized ? '40px' : 'auto',
        width: windowData.isMaximized ? '100%' : undefined,
        height: windowData.isMaximized ? 'calc(100% - 60px)' : 'auto',
        zIndex: windowData.zIndex,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onClick={handleWindowClick}
    >
      <div
        className={`w-full h-6 text-white text-sm font-semibold text-left px-2 flex justify-between items-center select-none ${
          windowData.isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div>{windowData.title}</div>
        <div className="window-controls flex items-center gap-1">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimize(windowData.id);
            }}
            className="w-5 h-5 bg-blue-400 hover:bg-blue-300 border border-white rounded flex items-center justify-center transition-colors"
            title="Minimize"
          >
            <span className="text-white text-xs font-bold pb-2">_</span>
          </button>
          
          {/* Maximize/Restore Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(windowData.id);
            }}
            className="w-5 h-5 bg-blue-400 hover:bg-blue-300 border border-white rounded flex items-center justify-center transition-colors"
            title={windowData.isMaximized ? 'Restore' : 'Maximize'}
          >
            {windowData.isMaximized ? (
              <span className="text-white text-xs">❐</span>
            ) : (
              <span className="text-white text-xs">□</span>
            )}
          </button>
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowData.id);
            }}
            className="w-5 h-5 bg-red-500 hover:bg-red-400 border border-white rounded flex items-center justify-center transition-colors"
            title="Close"
          >
            <span className="text-white text-xs font-bold">×</span>
          </button>
        </div>
      </div>
      <div className={`bg-gray-200 overflow-y-auto ${
        windowData.isMaximized ? 'h-full' : 'h-96'
      }`}>
        <WindowContent title={windowData.title} />
      </div>
    </div>
  );
};

export default WindowFrame;