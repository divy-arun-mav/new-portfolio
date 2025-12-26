import React, { useState } from "react";

interface ToastProps {
  toastMessage?: string;
  timeout?: number;
}

const Toast: React.FC<ToastProps> = ({ toastMessage, timeout }) => {
    const [display,setDisplay] = useState(true);

    setTimeout(() => {
        setDisplay(false);
    }, timeout);
  return (
    <div className={`p-2 absolute top-10 left-1/3 bg-yellow-50 ${display ? 'opacity-100': 'opacity-0'} transition-opacity duration-1000 rounded w-96`}>
        <div className="flex justify-between items-center text-sm">
        <p className="text-black font-medium">{toastMessage}</p>
            <div className="font-semibold text-xl rotate-45 text-center flex justify-center items-center ml-2 cursor-pointer">
            +
            </div>
          </div>
    </div>
  )
}

export default Toast