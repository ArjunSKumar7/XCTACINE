
import {TheatreNavBar} from "../../components/theater/TheatreNavBar"
import {TheatreSideBar} from "../../components/theater/TheatreSideBar"
import {TheatreMovieList} from "../../components/theater/TheatreMovieList"
function TheatreMovieDetails() {
  return (
    <div>
        <TheatreNavBar/>
        <TheatreSideBar/>
        <div className='ms-[18.1rem] w-[calc(100vw-18.1rem)] h-[calc(98.9vh-56px)]'>
        <TheatreMovieList/>
        </div>
    </div>
  )
}

export default TheatreMovieDetails