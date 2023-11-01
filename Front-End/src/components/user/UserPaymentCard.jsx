import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Radio,
  } from "@material-tailwind/react";
  import { useSelector,useDispatch } from "react-redux";
  import { useEffect ,useState} from "react";
import {stripeGateWay,} from "../../api/user/userApi"
  import {setStripeId,setUniqueId} from "../../redux/userReducer"   
  function CheckIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }
   
  export function UserPaymentCard() {
    const dispatch = useDispatch();
    const[RadioClick,setRadioClick]=useState(false)
    const bookingDetails = useSelector((store) => store.user.bookingOperation);
    const userId = useSelector((store) => store.user.userId);
    
    const handleStripePayment=async()=>{
       const bookingData={
        ...bookingDetails,
        gateway:"stripe",
        userId:userId

       };
       const response =await stripeGateWay(bookingData)
       //null
       localStorage.setItem("stripeId", response?.paymentId);
       localStorage.setItem("bookingOperation",JSON.stringify(bookingData))
       localStorage.setItem("uniqueId",response?.uniqueId);
       dispatch(setUniqueId(response?.uniqueId));
    dispatch(setStripeId(response?.paymentId));
    const paymentURL = response?.paymenturl;
    window.location.href = paymentURL;
// const stripe =await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    },
    handleRazorpayPayment=async()=>{
      const bookingData={
        ...bookingDetails,
        gateway:"razorpay",
        userId:userId

       };
      //  const response =await razorpayGateWay(bookingData)
    }



    return (
      <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            {bookingDetails?.selectedtheatre}
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-4xl">₹</span>{bookingDetails?.ticketPrice}{" "}
            {/* <span className="self-end text-4xl">/mo</span> */}
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{"Screen Name : "+bookingDetails?.selectedScreen}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{"Selected Seats : "+bookingDetails?.selectedSeats}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{"Selected Show : "+bookingDetails?.selectedShow}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{"Selected Date : "+bookingDetails?.showDate}</Typography>
            </li>
            {/* <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">
                
              </Typography>
        
            </li> */}
            <div className="rounded-full border border-white/20 bg-white/20 p-1">
           
      <Radio name="type" label="Stripe" onClick={()=>{setRadioClick("Stripe")}}/>
      </div>
      <div className="rounded-full border border-white/20 bg-white/20 p-1">
           
           <Radio name="type" label="razorpay" onClick={()=>{setRadioClick("razorpay")}}/>
           </div>
   
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
         {RadioClick==="Stripe"&& (<Button
            size="lg"
            color="green"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            onClick={handleStripePayment}
          >
            Stripe Payment
          </Button>)}
          {RadioClick==="razorpay"&& (<Button
            size="lg"
            color="green"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            onClick={handleRazorpayPayment}
          >
            Razor Pay Payment
          </Button>)}
        </CardFooter>
      </Card>
    );
  }