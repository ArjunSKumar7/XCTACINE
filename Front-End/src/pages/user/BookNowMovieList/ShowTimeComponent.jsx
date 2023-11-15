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
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const showDate = useSelector((store) => store.user.selectedDate);
  async function showTimeClickHandle(time) {
    const data = JSON.parse(localStorage.getItem("bookingOperation"));
   
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
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const filteredTimes = Object.keys(props?.time).filter((key) => {
    const timeString = props?.time[key];
    return isTimeAfterCurrent(timeString, currentTime);
  });

  function isTimeAfterCurrent(timeString, currentTimeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const [currentHours, currentMinutes] = currentTimeString.split(':').map(Number);
    return hours > currentHours || (hours === currentHours && minutes > currentMinutes);
  }


  return (
    <div>
      {filteredTimes.map((key, index) => (
        <Button
          key={index}
          size="sm"
          color={""}
          className="me-1 bg-black"
          variant="outlined"
          onClick={() => {
            showTimeClickHandle(props?.time[key]);
          }}
        >
          {props?.time[key]}
        </Button>
      ))}
    </div>
  );




}

export default ShowMapComponent;
