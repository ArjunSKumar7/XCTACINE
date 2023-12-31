import { Button, Typography } from "@material-tailwind/react";
import { useSelector,useDispatch  } from "react-redux";
import {PaymentStatusReturn} from "../../api/user/userApi"
import { useEffect,useState } from "react";
import {toast} from "react-toastify"
import{useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

function UserPaymentSuccess() {
  const navigate=useNavigate()
  const { uuId } = useParams()
    const bookingData= useSelector((store)=>store.user.bookingOperation);
    const paymentId= useSelector((store)=>store.user.stripeId)
   

    async function confirmPayment(){
        const booking ={
          ...bookingData,

          paymentId:paymentId,
          paymentStatus:'success',
          bookingStatus:"confirmed"
         
    
        }
       
    
       const response =  await PaymentStatusReturn(booking)
       return response
    
      }

      useEffect(()=>{
        confirmPayment().then((response)=>{
          if(response?.status==200){
            toast.success(`${response?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
          }else{
            toast.error(`${response?.message}`, {
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
        })
    },[])

const handleHomeClick=()=>{
    navigate("/")
   }
  return (
    <div className="w-screen h-screen bg-black">
<div className="w-screen h-screen bg-black flex justify-center items-center">   
 <figure className="relative h-4/5 w-4/5">
      <img
        className="h-full w-full rounded-xl object-fit object-center"
        src={bookingData?.movieposter} 
            alt="Movie Poster"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
          {bookingData?.movieName} 
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
          {bookingData?.selectedtheatre} 
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
          {"screen :"+bookingData?.selectedScreen} 
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
          { "seats:"+bookingData?.selectedSeats} 
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
          {"Total Amount "+bookingData?.ticketCount*bookingData?.ticketPrice } 
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
          {bookingData?.showDate} 
          
          </Typography>
          <Button  className="mt-2" size="sm" onClick={handleHomeClick}>back to home</Button>
        </div>
        <Typography variant="h5" color="blue-gray">
        {bookingData?.selectedShow}
        
        </Typography>
       
        
      </figcaption>
    
    </figure>
   
    </div>
    
    </div>
  );
}
export default UserPaymentSuccess