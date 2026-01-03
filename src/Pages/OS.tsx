import { useState } from "react"
import IconPlace from "../Components/IconPlace"
import TaskBar from "../Components/TaskBar"
import WindowsContainer from "../Components/WindowsContainer"
import LoadingScreen from "../Components/LoadingScreen"
import { WindowProvider } from "../context/WindowContext"
import { ToastProvider, useToast } from "../context/ToastContext"
import Toast from "../Components/Toast"

const OSContent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { toastMessage, isVisible } = useToast();

    return (
        <>
            {isLoading && (
                <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
            )}
            <WindowProvider>
                <div className="container">
                    <div className="desktop-wrapper">
                        <IconPlace />
                        <WindowsContainer />
                        <TaskBar />
                        <Toast
                            toastMessage="For better experience, please view on a desktop/laptop with fullscreen."
                            timeout={8000}
                        />
                    </div>
                </div>
            </WindowProvider>
            {isVisible && toastMessage && (
                <Toast
                    toastMessage={toastMessage}
                    timeout={3000}
                />
            )}
        </>
    )
}

const OS = () => {
    return (
        <ToastProvider>
            <OSContent />
        </ToastProvider>
    )
}

export default OS