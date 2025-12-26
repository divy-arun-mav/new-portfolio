import { useWindows } from '../context/WindowContext';
import WindowFrame from './WindowFrame';

const WindowsContainer = () => {
  const { windows } = useWindows();

  return (
    <>
      {windows.map((window) => (
        !window.isMinimized && (
          <WindowFrame
            key={window.id}
            windowData={window}
          />
        )
      ))}
    </>
  );
};

export default WindowsContainer;