
import { UserNavBar } from "../../components/user/UserNavBar";
import  TheatreScreen  from "../../components/user/TheatreScreen";
import SeatColumn from "../../components/user/SeatColumn";
import { Button } from "@material-tailwind/react";
import { useSelector,useDispatch  } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
import {setBookingOperation,} from "../../redux/userReducer"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {fetchBookedSeatsData} from "../../api/user/userApi"



function UserSeatBooking() {
  const[BookedSeats,setBookedSeats]=useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingOperation = useSelector((store)=>store.user.bookingOperation);

  const selectedSeats= useSelector((store)=>store.user.userSelectedSeats)
  console.log("bookingOperation",selectedSeats);
  const ticketCount= useSelector((store)=>store.user.userSeatCount)
  console.log("priorSeatcount", ticketCount)

useEffect(()=>{
  async function fetchBookedSeats(){
const data={
         bookingStatus:"confirmed",
        date:bookingOperation?.showDate,
        show:bookingOperation?.selectedShow,
        theatre:bookingOperation?.selectedtheatre,
        screen:bookingOperation?.screenId,
        movie:bookingOperation?.movieId
}

    const bookedSeats= await fetchBookedSeatsData(data);
    console.log("bookedSeats",bookedSeats)
    return bookedSeats;
   
  }
  fetchBookedSeats().then((data)=>{
    console.log("data",data?.bookedSeats)
    setBookedSeats(data?.bookedSeats)
  })

},[])

console.log("BookedSeats",BookedSeats)

const row=bookingOperation?.screenRows;
const col=bookingOperation?.screenCols;


const rowArray=Array.from({length:row},(_,index)=>index);
const colArray=Array.from({length:col},(_,index)=>index);
const seatNameArr = Array.from({ length: row }, (_, index) => index); //array to print the alphabets for rows
console.log("rowArray",rowArray)

const formattedPricePerTicket = bookingOperation?.ticketPrice?.toLocaleString("en-IN", {
  style: "currency",
  currency: "INR",
}) || "₹"+ bookingOperation?.ticketPrice; // You can replace "N/A" with any default value you prefer.


const seatColumnArray = [];

function seatArrange(columns) {
  for (let c = 1; c <=columns; c++) {
    const seatObj = { rowNo: 0, colNo: c };
    seatColumnArray.push(seatObj);
  }
}
seatArrange(col)
console.log(seatColumnArray );
  


const bookingSubmitHandler = () => {
  if(ticketCount>0){
   const bookingdata={
    ...bookingOperation,
    selectedSeats:selectedSeats,
    ticketCount:ticketCount

   }
   console.log("bookingOperation",bookingdata)
   localStorage.setItem("bookingOperation",JSON.stringify(bookingdata))
   dispatch(setBookingOperation(bookingdata))
   navigate('/payment')
}else{
  toast.error(`please select seats to continue`, {
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







  
  return (
    <div className="w-100 h-full bg-black">
      <div>
        <UserNavBar />
        </div>
        <div className="h-40 bg-gray-300 ">
        <div className="flex gap-6 pt-24 ps-10">
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              {moment(bookingOperation?.showDate,).format("DD-MM-YYYY")}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Theater :{bookingOperation?.selectedtheatre}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Screen :{bookingOperation?.selectedScreen}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Show Time :{bookingOperation?.selectedShow}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Ticket Price :{formattedPricePerTicket}
            </h1>
          </div>
        </div>
      </div>
        {/* <div className="w-11/12 h-96 bg-blue-gray-600 mt-4 mx-auto overflow-y-auto"></div> */}
        
        <div className="w-4/5 h-screen m-auto px-2 py-2  bg-white">
        <div className=" bg-brown-50 w-full h-4/5 overflow-auto">
        <div className="w-2/3 h-6 mx-auto bg-blue-gray-900 text-white flex items-center justify-center">
  {"Screen is here"}
</div>



          <div className="mt-16 mx-auto\">
            <div className="flex gap-3">
              <div className="bg-black w-12 grid grid-flow-column">
                {seatNameArr?.length > 0
                  ? seatNameArr?.map((item, alpha) => (
                      <div
                        key={alpha}
                        className="bg-blue-gray-400 border-solid ps-3 pt-3 w-12 h-10"
                      >
                        {String.fromCharCode(65 + alpha)}
                      </div>
                    ))
                  : null}
              </div>
              <div className="grid grid-flow-row">
                {console.log("seatColumnArray",BookedSeats)}
                {rowArray?.length > 0
                  ? rowArray?.map((item, rowIndex) => (
                      <SeatColumn
                        key={rowIndex}
                        rowNo={rowIndex + 1}
                        seatColumnArray={seatColumnArray}
                        bookedSeats={BookedSeats}
                      />
                    ))
                  : null}
              </div>

              {/* <div className="bg-black w-12 grid grid-flow-column">

              <div className="bg-blue-gray-400 border-solid ps-3 pt-3 w-12 h-10">
                A
              </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg- my-3 start-0 w-1/2 h-28 rounded-lg border-2 border-solid border-black  px-3 py-3">
          <div className="flex gap-2 ">
            <div className=" w-1/2">
              <div className=" bg-cyan-700 mb-1  h-10 p-1 font-semibold text-center text-white rounded-lg">
                <span>Tickets</span>
                <span>:</span>
                <span>{ticketCount}</span>
              </div>
              <div className="bg-cyan-700  h-10 p-1 text-center font-semibold text-white rounded-lg">
                <span>Total</span>
                <span>:</span>
                <span>
                  {ticketCount>0 ? ((ticketCount *  bookingOperation.ticketPrice).toLocaleString(
                    "en-IN",
                    {
                      style: "currency",
                      currency: "INR",
                    }
                  )) : 0}
                </span>
              </div>
            </div>
            <div className="w-1/2 my-auto mx-10">
              <Button color="deep-purple" onClick={bookingSubmitHandler} size="lg">
                Book Now
              </Button>
            </div>
          </div>
        </div>




        </div>

      
    </div>
  );
}

export default UserSeatBooking;
    