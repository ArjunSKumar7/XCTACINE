import { TheatreNavBar } from '../../components/theater/TheatreNavBar'
import { TheatreSideBar } from '../../components/theater/TheatreSideBar'
import TheatreShowMangementInput from '../../components/theater/TheatreShowManagementInput'
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { ScreenListDataFetch, movieListDataFetch } from "../../api/theater/theaterApi";
import { setScreenToList,setMovieToList } from '../../redux/theatreReducer';


function TheatreShowMangement() {
    const dispatch = useDispatch();
const theatreData = useSelector((store) => store.theatre.theatreDetails);
console.log("theatreData", theatreData);
    const screenData = useSelector((store) => store.theatre.screenToList);
    console.log("screenDetails", screenData);
 const movieData = useSelector((store) => store.theatre.movieToList);
 console.log("movieData", movieData);
    useEffect(() => {
        async function fetchData(){
            const screen =await ScreenListDataFetch(theatreData?.theatreId);
            console.log("screen",screen)
            const movie = await movieListDataFetch(theatreData?.theatreId);
            console.log("movie",movie)
            dispatch(setMovieToList(movie?.movieList))
            dispatch(setScreenToList(screen?.screenList))
        }
        fetchData();
    },[screen])
  return (
    <div>
    <TheatreNavBar/>
    <TheatreSideBar/>
    <div className=' fixed  ms-[22rem]   w-[calc(100vw-25rem)] m-24 '>
<TheatreShowMangementInput screen={screenData} movie={movieData}/>
        </div>
    </div>
  )
}

export default TheatreShowMangement