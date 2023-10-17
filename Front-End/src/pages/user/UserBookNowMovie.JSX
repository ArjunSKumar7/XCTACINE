import { useSelector } from "react-redux";
import { UserNavBar } from "../../components/user/UserNavBar";
import {UserFooter} from "../../components/user/UserFooter"
import { useEffect } from "react";
import { moviePageData } from "../../api/user/userApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { setSelectedDate } from "../../redux/userReducer";
import TheaterNameComponent from "../../pages/user/BookNowMovieList/TheatreNameComponent"
function UserBookNowMovie() {
  const dispatch = useDispatch();
  const movieId = useSelector((store) => store.user?.bookingOperation?.movieId);
  console.log("movieId", movieId);
  const location = useSelector((store) => store.user?.locationSelected);
  console.log("location", location);

  const [currentDate, setCurrentDate] = useState(moment());
  const [nextDate, setnextDate] = useState([]);
  const [movieData, setmovieData] = useState();
  const [screenData, setscreenData] = useState();

  // to get 7 dates from current date

  useEffect(() => {
    const datearray = [];
    const datefunction = () => {
      for (let i = 0; i < 7; i++) {
        const nextday = moment().add(i, "days");
        datearray.push(nextday);
      }
      return datearray;
    };
    setCurrentDate(moment());
    setnextDate(datefunction());  
  }, []);

  useEffect(() => {
    async function fetchData(movieId, location) {
      console.log("movieId", movieId, "location", location);
      const response = await moviePageData(movieId, location);
      console.log("response", response); 
      
      setmovieData(response?.movieDetails)
      setscreenData(response?.screenList)
      
    }

    fetchData(movieId,location);
  }, []);

function handleSelectedDate(date){
dispatch(setSelectedDate(date.format('YYYY-MM-DD')))
}


  return (
    <div className="w-full h-full bg-blue-gray-200 overflow-y-auto ">
      <div className="">
        <UserNavBar />
      </div>

      <div
        className="bg-cover bg-no-repeat  h-4/5 "
        style={{
          backgroundImage:
            `url(${movieData?.movieBackgroundPoster})`,
          // width: '1080px', // Adjust the width as needed
          // height: '400px', // Adjust the height as needed
        }}
      >
        <div className="flex flex-wrap mx-14  gap-3">
          <div className="bg-white  w-72 ms-32 mt-20 rounded-md border-solid">
            <img  src={movieData?.moviePoster} alt="" />
          </div>
          <div className="w-1/2 h-64 rounded-md mt-28  bg-transparent">
            <h1 className="ps-5 pt-3 font-semibold text-white uppercase text-4xl">
            {movieData?.movieTitle}
              
            </h1>
            <h1 className="ps-5 pt-3 text-xl uppercase text-white">{movieData?.movieLanguage}</h1>
            <h1 className="ps-5 pt-3 text-xl text-white">Released on:   {moment(movieData?.movieReleaseDate).format('MMMM DD, YYYY')}</h1>
            <h1 className="ps-5 pt-3 text-white">Description: {movieData?.movieOverview}</h1>
          </div>
        </div>
      </div>




      <div className=" bg-blue-gray-200 w-screen">
        
          <div className="w-1/2 mx-96 my-3 px-2 py-2 bg-white rounded-lg">
            <ButtonGroup color="deep-purple" size="lg">
              {nextDate?.length > 0
                ? nextDate.map((date, index) => (
                    <Button  key={index} onClick={()=>handleSelectedDate(date)}>{date.format("ddd Do MMM")}</Button>
                  ))
                : null}
            </ButtonGroup>
          </div>
        
      </div>



     <div className="w-screen my-3 bg-blue-gray-200">
  <div className="w-3/4 rounded-lg mx-auto relative overflow-hidden">
    <div
      className="bg-white rounded-xl w-full"
      style={{
        zIndex: 1, // Ensure content is on top of the pseudo-element
      }}
    >
      
      <div className="px-4 py-4 h-96 overflow-y-auto relative z-10">
        <div className="px-2 py-2">
        <h1 className="font-semibold text-xl text-gray-100">Shows Available</h1>
      </div>
        {/* mapcomponent */}
        {console.log("screeData", screenData)}
        {screenData?.length > 0 ? (
          screenData?.map((screenData, index) => (
            <TheaterNameComponent key={index} screenData={screenData} movieData={movieData} />
          ))
        ) : (
          <h1  className=" text-gray-100">no shows available</h1>
        )}
        {/* mapcomponent end*/}
      </div>
    </div>
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${movieData?.moviePoster})`,
        filter: 'blur(10px)', // Apply a blur effect to the background image
        zIndex: 0, // Place the pseudo-element behind the content
      }}
    ></div>
  </div>
</div>




      <div>
        <UserFooter />
      </div>
    </div>
  );

}

export default UserBookNowMovie;
