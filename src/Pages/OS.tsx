import { useState } from "react"
import IconPlace from "../Components/IconPlace"
import TaskBar from "../Components/TaskBar"
import WindowsContainer from "../Components/WindowsContainer"
import LoadingScreen from "../Components/LoadingScreen"
import { WindowProvider } from "../context/WindowContext"

const OS = () => {
    const [isLoading, setIsLoading] = useState(true);

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
          </div>
              </div>
          </WindowProvider>
      </>
  )
}

export default OS