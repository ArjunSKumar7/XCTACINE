
import {TheatreNavBar} from "../../components/theater/TheatreNavBar"
import {TheatreSideBar} from "../../components/theater/TheatreSideBar"
import {TheatreMovieList} from "../../components/theater/TheatreMovieList"
function TheatreMovieDetails() {
  return (
    <div>
        <TheatreNavBar/>
        <TheatreSideBar/>
        <TheatreMovieList/>
    </div>
  )
}

export default TheatreMovieDetails