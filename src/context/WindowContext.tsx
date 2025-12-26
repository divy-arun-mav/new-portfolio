/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface WindowData {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
  gameState?: any;
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
    updateWindowGameState: (id: string, gameState: any) => void;
  maxZIndex: number;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

const loadFromLocalStorage = () => {
    try {
        const savedWindows = localStorage.getItem('xp-windows');
        const savedActiveWindow = localStorage.getItem('xp-active-window');
        const savedMaxZIndex = localStorage.getItem('xp-max-zindex');

        return {
            windows: savedWindows ? JSON.parse(savedWindows) : [],
            activeWindowId: savedActiveWindow || null,
            maxZIndex: savedMaxZIndex ? parseInt(savedMaxZIndex) : 1000,
        };
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return {
            windows: [],
            activeWindowId: null,
            maxZIndex: 1000,
        };
    }
};

const saveToLocalStorage = (
    windows: WindowData[],
    activeWindowId: string | null,
    maxZIndex: number
) => {
    try {
        localStorage.setItem('xp-windows', JSON.stringify(windows));
        localStorage.setItem('xp-active-window', activeWindowId || '');
        localStorage.setItem('xp-max-zindex', maxZIndex.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const WindowProvider = ({ children }: { children: ReactNode }) => {
    const initialState = loadFromLocalStorage();

    const [windows, setWindows] = useState<WindowData[]>(initialState.windows);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(initialState.activeWindowId);
    const [maxZIndex, setMaxZIndex] = useState(initialState.maxZIndex);

    useEffect(() => {
        saveToLocalStorage(windows, activeWindowId, maxZIndex);
    }, [windows, activeWindowId, maxZIndex]);

  const openWindow = (title: string) => {
      const existingWindow = windows.find(w => w.title === title);
      if (existingWindow) {
          setActiveWindow(existingWindow.id);
          return;
      }

    const id = `window-${Date.now()}`;
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    const offset = windows.length * 30;
    setWindows(prev => [...prev, { 
      id, 
      title, 
      isMinimized: false,
      isMaximized: false,
      position: { x: 80 + offset, y: 40 + offset },
        zIndex: newZIndex,
        gameState: undefined,
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

    const updateWindowGameState = (id: string, gameState: any) => {
        setWindows(prev =>
            prev.map(w => w.id === id ? { ...w, gameState } : w)
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
              updateWindowGameState,
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