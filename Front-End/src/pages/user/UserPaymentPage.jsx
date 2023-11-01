
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { UserNavBar } from '../../components/user/UserNavBar';
import {UserPaymentCard} from '../../components/user/UserPaymentCard';
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { bookingMovieFetch } from "../../api/user/userApi";




function UserPaymentPage() {

    const [MovieData, setMovieData] = useState({})  ;
    const bookingMovieData = useSelector((store) => store.user.bookingOperation);
    




    useEffect(() => {
        async function fetchData() {
            const response =await bookingMovieFetch(bookingMovieData?.movieId);
            return response;
        }
        fetchData().then((response) => {
            setMovieData(response?.bookingMovieData);
        })
    
    },[]);




  return (
    <div className="bg-black w-full h-full">
<div>
    <UserNavBar/>
</div>


<div className=" pt-32 flex flex-wrap justify-center mr-38 gap-24">
<Card className="w-full max-w-[48rem] flex-row ">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={MovieData?.moviePoster}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        {/* <Typography variant="h6" color="gray" className="mb-4 uppercase">
          startups
        </Typography> */}
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {MovieData?.movieTitle}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
         {MovieData?.movieOverview}
        </Typography>
        {/* <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a> */}
      </CardBody>
    </Card>
    
<UserPaymentCard  />

    </div>










    </div>
  )
}

export default UserPaymentPage