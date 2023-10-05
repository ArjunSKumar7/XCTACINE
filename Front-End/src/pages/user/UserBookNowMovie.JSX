import { useSelector } from "react-redux";
import { UserNavBar } from "../../components/user/UserNavBar"
import { useEffect } from "react";
import {moviePageData} from "../../api/user/userApi"

function UserBookNowMovie() {

  const movieId =useSelector((store) => store.user?.bookingOperation?.movieId);
  console.log("movieId", movieId);

useEffect(() => {
 
    
    async function fetchData(movieId) {
      const movieResponse = await moviePageData(movieId)
      console.log("movieResponse",movieResponse)
    }
  
fetchData(movieId);
})




  return (
    <div>  
        <div>
            <UserNavBar/>
        </div> 

        <div>
            
        </div>
</div>
  )
}

export default UserBookNowMovie;  