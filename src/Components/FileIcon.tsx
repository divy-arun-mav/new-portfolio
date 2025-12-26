
import { useWindows } from '../context/WindowContext';

const FileIcon = ({ folderName, icon }: { folderName: string; icon: string }) => {
    const { openWindow } = useWindows();
    return (
        <div
            className='flex flex-col justify-center items-center cursor-pointer mb-3 hover:bg-blue-500/30 hover:border hover:border-blue-300/50 p-1 rounded transition-all'
            onDoubleClick={() => openWindow(folderName)}
        >
            <img className='w-12 h-12' src={icon} alt="Folder Icon" />
            <div className='w-16 text-gray-100 text-wrap text-shadow text-xs mt-1'>{folderName}</div>
        </div>
    )
}

export default FileIcon