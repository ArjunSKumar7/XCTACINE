import SeatButton from './SeatButton'
import {setUserSelectedSeats, setUserSeatCount  } from "../../redux/userReducer"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

function SeatColumn(props) {
  const dispatch = useDispatch()
  const priorSelectedSeats= useSelector((store)=>store.user.userSelectedSeats)
  const priorSeatcount= useSelector((store)=>store.user.userSeatCount)
  const [sCount, setScount] = useState(0);

const handleSeatSelect =(seatId)=>{
  setScount((prevState) => prevState + 1);
  dispatch(setUserSelectedSeats([...priorSelectedSeats,seatId]))
  dispatch(setUserSeatCount(+1))


}
const handleSeatDeselect =(seatId)=>{
  const seatDeSelect=priorSelectedSeats.filter((item)=>item!==seatId)
  setScount((prevState) => prevState - 1);
  dispatch(setUserSelectedSeats(seatDeSelect))
  dispatch(setUserSeatCount(-1))
}



  return (
    <div className="grid grid-flow-col gap-1 p-1">
      {props?.seatColumnArray
        ? props?.seatColumnArray?.map((data, colIndex) => {
            const rowAlphabet = String.fromCharCode(props?.rowNo + 64);
            const seatId = `${rowAlphabet}${colIndex + 1}`;

            return (
              <SeatButton
              key={colIndex}
                data={data}
                seatId={seatId}
                onSeatSelect={handleSeatSelect}
                onSeatDeselect={handleSeatDeselect}
                bookedSeats={props?.bookedSeats}
              />
            );
          })
        : null}
    </div>
  );
}

export default SeatColumn
