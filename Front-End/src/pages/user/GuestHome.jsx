import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieHomeData } from "../../redux/userReducer";
import { moviesFetchUser } from "../../api/user/userApi";
import { UserHomeCard } from "../../components/user/UserHomeCard";
import { GuestNavBar } from "../../components/user/GuestNavBar";
import { UserHomeCarousel } from "../../components/user/UserHomeCarousel";
import { UserFooter } from "../../components/user/UserFooter";
import { CircularPagination } from "../../components/CircularPagination";
import { useNavigate } from "react-router-dom";

const GuestHome = () => {
  const navigate = useNavigate();
  const searchedMovies = useSelector((store) => store.user.searchedMovieData);
  const wholeMovieList = useSelector((store) => store.user.movieHomeData);
  const selectedLocation = useSelector((store) => store.user.locationSelected);
  let movies = "";
  if (searchedMovies.length > 0) movies = searchedMovies;
  else movies = wholeMovieList;

  const dispatch = useDispatch();
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem("activePage")) || 1; // Initialize with the last saved page from localStorage or 1 as defau  lt
  });
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const handlePageChange = (page) => {
    setPage(page);
    localStorage.setItem("activePage", page.toString()); // Save the active page to localStorage
  };

  async function fetchAllMovies(locationValue) {
    const movieResponse = await moviesFetchUser(locationValue, page, 8);

    if (movieResponse) {
      dispatch(setMovieHomeData(movieResponse.movieList));
      setTotalPages(movieResponse.totalPages); // Update total pages
    }
  }

  useEffect(() => {
    if (selectedLocation === "No Location Selected") {
      const noLocation = "";
      fetchAllMovies(noLocation);
    } else {
      fetchAllMovies(selectedLocation);
    }
  }, [selectedLocation, page]); // Trigger fetch when selectedLocation or page changes
  // Trigger fetch when selectedLocation or page changes

  async function handleHomeBookClick() {
    navigate("/login");
  }

  return (
    <>
      <GuestNavBar />
      <div className=" h-96 mt-24 ">
        <UserHomeCarousel />
      </div>
      <div className="grid md:grid-cols-4 grid-flow-col md:grid-flow-row md:h-full overflow-y-auto gap-3">
        {movies.length > 0 ? (
          movies.map((movie, _id) => (
            <UserHomeCard
              key={_id}
              data={movie}
              handleHomeBookClick={handleHomeBookClick}
            />
          ))
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
      <div>
        <UserFooter />
      </div>
    </>
  );
};

export default GuestHome;
