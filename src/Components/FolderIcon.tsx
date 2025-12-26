import { useState, useRef } from 'react';
import { useWindows } from '../context/WindowContext';
import { useToast } from '../context/ToastContext';

const FolderIcon = ({folderName, folderIcon}: {folderName: string, folderIcon: string}) => {
  const { openWindow } = useWindows();
  const { showToast } = useToast();
  const [isSelected, setIsSelected] = useState(false);
  const clickTimeoutRef = useRef<number | null>(null);

  const handleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      setIsSelected(false);
      openWindow(folderName);
    } else {
      setIsSelected(true);
      clickTimeoutRef.current = setTimeout(() => {
        showToast('Please double-click to open the folder.', 3000);
        setIsSelected(false);
        clickTimeoutRef.current = null;
      }, 300);
    }
  };
  
  return (
    <div 
      className={`flex flex-col justify-center items-center cursor-pointer mb-3 p-1 rounded transition-all ${isSelected ? 'bg-blue-500/30 border border-blue-300/50' : 'hover:bg-blue-500/20'
        }`}
      onClick={handleClick}
    >
        <img className='w-12 h-12' src={folderIcon} alt="Folder Icon" />
        <div className='w-16 text-gray-100 text-wrap text-shadow text-xs mt-1'>{folderName}</div>
    </div>
  )
}

export default FolderIcon