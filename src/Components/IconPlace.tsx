import FileIcon from './FileIcon'
import FolderIcon from './FolderIcon'
import fileIcon from '../Assets/Notepad_WinXP.png';
import minesweeper from '../assets/minesweeper.png';
import folderIcon from '../Assets/Closed folder.ico';
import myComputer from '../assets/my-computer.webp';

const IconPlace = () => {
  return (
      <div className="absolute top-0 left-0 flex flex-col gap-0 p-4">
        <FolderIcon folderIcon={myComputer} folderName='My Computer' />
        <FileIcon icon={fileIcon} folderName='About Divy' />
        <FolderIcon folderIcon={folderIcon} folderName='Skills' />
        <FolderIcon folderIcon={folderIcon} folderName='Internships' />
        <FolderIcon folderIcon={folderIcon} folderName='Projects' />
        <FolderIcon folderIcon={folderIcon} folderName='Acheivements' />
        <FolderIcon folderIcon={folderIcon} folderName='Contact' />
        <FileIcon icon={minesweeper} folderName='Minesweeper' />
    </div>
  )
}

export default IconPlace