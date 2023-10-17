  import { Button } from "@material-tailwind/react";
  import React from "react";
  import { useState } from "react";

  function SeatButton(props) {
    console.log("props", props);
    
    const [isClicked, setIsClicked] = useState(false);

    function seatSelectHandle(selSeatId) {
  console.log("selSeatId",selSeatId)
      setIsClicked(!isClicked);
      if (!isClicked) {
        
        props?.onSeatSelect(selSeatId);
      } else {
        props?.onSeatDeselect(selSeatId);
      }
    }
    // Check if the current seat is reserved based on its rowNo and colNo
    // const isReserved = (id) => {
    //   return props?.bookedArray?.includes(id);
    // };

    return (
      <div className="">
        <Button 
          key={props.seatId}
          size="sm"
          onClick={() => seatSelectHandle(props.seatId)}
          // disabled={isReserved(props.seatId)}
          // color={isClicked ? "blue" : isReserved(props.seatId) ? "red" : "white"}
          color={isClicked ? "green" : "white"}
          style={isClicked ? { color: "" }:{ color: "green" }} // Set the text color to red
        >
        
          {props.seatId }
        
        </Button>
      </div>
    );    
  }

  export default SeatButton;
