import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import {
//   setChoosenShowDate,
//   setuserOperationsData,
// } from "../../../redux/userSlice";
import {setBookingOperation,setSelectedDate} from "../../../redux/userReducer"

function ShowMapComponent(props) {
    console.log("props", props.theatreName);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const showDate = useSelector((store) => store.user.selectedDate);
  async function showTimeClickHandle(time) {
    console.log("time", time);
    const data = JSON.parse(localStorage.getItem("bookingOperation"));
    console.log("dataaaaa", data);

    data.theatreId=props.theatreId
    data.showDate = showDate;
    data.selectedtheatre = props.theatreName;
    data.selectedScreen = props.screen;
    data.selectedShow = time;
    data.screenId = props.screenObj._id;
    data.screenRows = props.screenObj.rows;
    data.screenCols = props.screenObj.columns;
    data.movieName = props.screenObj.movieTitle;
    data.ticketPrice = props.screenObj.ticketPrice;
    
    if (showDate !== "") {
      localStorage.setItem("bookingOperation", JSON.stringify(data));
console.log("data1",data)
      dispatch(setBookingOperation(data));
      navigate("/seatbooking");
      dispatch(setSelectedDate(""));
    } else {
      toast.error(`please select show date to continue..`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
//   return (
//     <Button
//       size="sm"
//       color={""}
//       className="me-1 bg-black"
//       key={props.index}
//       variant="outlined"
//       onClick={() => {
//         showTimeClickHandle(props.time[`show${props.index + 1}`]);
//       }}
//     >
//       {props.time[`show${props.index + 1}`]}
//     </Button>
//   );

  return (
    <div>
      {Object.keys(props.time).map((key, index) => (
        <Button
          key={index}
          size="sm"
          color={""}
          className="me-1 bg-black"
          variant="outlined"
          onClick={() => {
            showTimeClickHandle(props.time[key]);
          }}
        >
          {props.time[key]}
        </Button>
      ))}
    </div>
  );




}

export default ShowMapComponent;