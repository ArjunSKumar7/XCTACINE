import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieHomeData,setBookingOperation } from "../../redux/userReducer";
import { moviesFetchUser } from "../../api/user/userApi";
import { UserHomeCard } from "../../components/user/UserHomeCard";
import { UserNavBar } from "../../components/user/UserNavBar";
import Body from "../../components/user/Body";
import { UserFooter } from "../../components/user/UserFooter";
import { CircularPagination } from "../../components/CircularPagination";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const searchedMovies = useSelector((store) => store.user.searchedMovieData);
  const wholeMovieList = useSelector((store) => store.user.movieHomeData);
const selectedLocation = useSelector((store) => store.user.locationSelected);
console.log("selectedLocation", selectedLocation);
  let movies = "";
  if (searchedMovies.length > 0) movies = searchedMovies; else movies = wholeMovieList;
  

  console.log("movies", movies);

  const dispatch = useDispatch();
  const [page, setPage] = useState(() => {
   
    return parseInt(localStorage.getItem("activePage")) || 1;  // Initialize with the last saved page from localStorage or 1 as defau  lt
  });
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const handlePageChange = (page) => {
    setPage(page);
    localStorage.setItem("activePage", page.toString()); // Save the active page to localStorage
  };
  
  async function fetchAllMovies(locationValue) {
    const movieResponse = await moviesFetchUser(locationValue,page, 8);
    console.log(movieResponse);
   
    if (movieResponse) {
      dispatch(setMovieHomeData(movieResponse.movieList));
      setTotalPages(movieResponse.totalPages); // Update total pages
    }
  }
  
  useEffect(() => {
    if (selectedLocation ===   "No Location Selected") {
      const noLocation=''
      fetchAllMovies(noLocation);
    }else{
      fetchAllMovies(selectedLocation);
    }
  }, [selectedLocation, page]); // Trigger fetch when selectedLocation or page changes
  // Trigger fetch when selectedLocation or page changes


  async function handleHomeBookClick(movieId){
        const data={
          movieId:movieId
        }
localStorage.setItem("bookingOperation",data)
dispatch(setBookingOperation(data))
navigate('/movietobook')
  }
  
  return (
    <>
      <UserNavBar />
      <Body />
      <div className="grid md:grid-cols-4 grid-flow-col md:grid-flow-row md:h-full overflow-y-auto gap-3">
        {movies.length > 0 ? (
          movies.map((movie, _id) => <UserHomeCard key={_id} data={movie}  handleHomeBookClick={handleHomeBookClick}/>)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      <div className="flex justify-center items-center mt-4 mb-4">
        <CircularPagination
          handlePageChange={handlePageChange}
          activePage={page}
          totalPages={totalPages}
        />
      </div>
      <UserFooter />
    </>
  );
};

export default Home;
