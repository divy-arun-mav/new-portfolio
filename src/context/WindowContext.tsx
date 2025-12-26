/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

export interface WindowData {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

interface WindowContextType {
  windows: WindowData[];
  openWindow: (title: string) => void;
  closeWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  activeWindowId: string | null;
  setActiveWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  maxZIndex: number;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(1000);

  const openWindow = (title: string) => {
    const id = `window-${Date.now()}`;
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    // Cascade window positions
    const offset = windows.length * 30;
    setWindows(prev => [...prev, { 
      id, 
      title, 
      isMinimized: false,
      isMaximized: false,
      position: { x: 80 + offset, y: 40 + offset },
      zIndex: newZIndex
    }]);
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w)
    );
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    );
  };

  const setActiveWindow = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w)
    );
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, position } : w)
    );
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        toggleMinimize,
        toggleMaximize,
        activeWindowId,
        setActiveWindow,
        updateWindowPosition,
        maxZIndex,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = (): WindowContextType => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error('useWindows must be used within WindowProvider');
    }
    return context;
}