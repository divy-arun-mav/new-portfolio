import { useEffect } from 'react';
import loadingGif from '../assets/loading-screen.gif';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="relative w-full h-full max-w-[100vw] max-h-[100vh] aspect-[4/3] flex items-center justify-center">
        <img 
          src={loadingGif} 
          alt="Windows XP Loading" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
