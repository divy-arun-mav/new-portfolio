import IconPlace from "../Components/IconPlace"
import TaskBar from "../Components/TaskBar"
import WindowsContainer from "../Components/WindowsContainer"
import { WindowProvider } from "../context/WindowContext"

const OS = () => {
  return (
    <WindowProvider>
      <div className="container">
          <div className="desktop-wrapper">
                <IconPlace />
                <WindowsContainer />
                <TaskBar />
          </div>
      </div>
    </WindowProvider>
  )
}

export default OS