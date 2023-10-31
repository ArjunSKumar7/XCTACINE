import {TheatreNavBar} from "../../components/theater/TheatreNavBar"
import {ApprovalBox} from "../../components/theater/ApprovalBox"
import {TheatreSideBar} from '../../components/theater/TheatreSideBar'
import TheatreDashboardTopComponent from "../../components/theater/TheatreDashboardTopComponent"
import TheatreDashboardGraph from "../../components/theater/TheatreDashboardGraph"
import TheatreDashboardPieChart from "../../components/theater/TheatreDashboardPieChart"
import {useSelector} from "react-redux"
import { useEffect,useState } from "react"


const TheatreDashBoard = (props) => {
  console.log("props", props);
 

  return (
    <div className="h-screen overflow-hidden">
    <TheatreNavBar />
    <div className="w-1/6">
      <TheatreSideBar />
    </div>
    <div className="w-[calc(100vw-18.1rem)] h-screen  mt-11 fixed right-0 overflow-scroll pt-9  ">

      <TheatreDashboardTopComponent />
      <div className="flex">
        <div className="w-5/6">
        <TheatreDashboardGraph /> 
        </div>
        <div className="w-3/6"> 
        <TheatreDashboardPieChart/>
        </div>


</div>

    </div>
  </div>
  );
}





export default TheatreDashBoard;