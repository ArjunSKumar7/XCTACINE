import {TheatreNavBar} from "../../components/theater/TheatreNavBar"
import {TheatreSideBar} from "../../components/theater/TheatreSideBar"
import {TheatreBookingList} from "../../components/theater/TheatreBookingList"

function TheatreBookingDetails() {
  return (
    <div>
    <TheatreNavBar/>
    <TheatreSideBar/>
    <div className='ms-[18.1rem] mt-20 '>
    <TheatreBookingList/>
    </div>
</div>
  )
}

export default TheatreBookingDetails