/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
  toastMessage: string | null;
  isVisible: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (message: string, duration: number = 3000) => {
    setToastMessage(message);
    setIsVisible(true);
    
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setToastMessage(null), 1000); 
    }, duration+1000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, isVisible }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
