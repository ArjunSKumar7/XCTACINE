
import {UserNavBar} from "../../components/user/UserNavBar";
import Body from "../../components/user/Body";
import {UserHomeCard} from "../../components/user/UserHomeCard";
import { UserFooter } from "../../components/user/UserFooter";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {setMovieHomeData} from "../../redux/userReducer";
import {moviesFetchUser} from "../../api/user/userApi";
const Home = () => {
  const movies = useSelector((store)=>store.user.movieHomeData)
  const [page, setPage] = useState(1);

  // const [banners, setBanners] = useState([]);
  const dispatch = useDispatch()


  useEffect(() => {
    async function fetchAllMovies() {
      const movieResponse = await moviesFetchUser(page, 8);
      console.log(movieResponse)
      return movieResponse;
    }
    // async function fetchAllBanners() {
    //   // const bannerResponse = await
    //   // return bannerResponse
    // }

    fetchAllMovies().then((data) => {
      
      dispatch(setMovieHomeData(data.movieList));
    });
  }, []);


  return (
    <>    
<UserNavBar/>
<Body/>
<div className="grid md:grid-cols-4 grid-flow-col md:grid-flow-row md:h-full overflow-y-auto  gap-3">
{movies.length > 0 ? (
          movies.map((movie, _id) => <UserHomeCard key={_id} data={movie} />)
        ) : (
          <p>No movies found.</p>
        )}

</div>

<UserFooter/>

    </>
  )
}

export default Home