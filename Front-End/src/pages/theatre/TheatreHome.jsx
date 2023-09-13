import {TheatreNavBar} from "../../components/theater/TheatreNavBar"
import {ApprovalBox} from "../../components/theater/ApprovalBox"
import {TheatreSideBar} from '../../components/theater/TheatreSideBar'


const TheatreHome = (props) => {
  console.log("props", props);

  return (
    <div>
<TheatreNavBar/>

 <div className="flex  justify-center items-center h-screen">
  
  {props.data.theatreApprovalStatus ? null : <ApprovalBox/>}
  </div>
  


<TheatreSideBar/>
    </div>
  )
}

export default TheatreHome