import {TheatreNavBar} from "../../components/theater/TheatreNavBar"
import {ApprovalBox} from "../../components/theater/ApprovalBox"
import {TheatreSideBar} from '../../components/theater/TheatreSideBar'


const TheatreHome = (props) => {
  console.log("props", props);
  console.log("props", props.data.approvalStatus); 
  return (
    <div>
<TheatreNavBar/>
if(props.data.approvalStatus){
  <ApprovalBox data={props}/>
}

<TheatreSideBar/>
    </div>
  )
}

export default TheatreHome