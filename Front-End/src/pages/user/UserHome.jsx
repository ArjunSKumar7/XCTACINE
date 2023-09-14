// import {UserNavBar} from "../../components/user/UserNavBar";
// import Body from "../../components/user/Body";
// import {UserHomeCard} from "../../components/user/UserHomeCard";
// import { UserFooter } from "../../components/user/UserFooter";
// import { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import {setMovieHomeData} from "../../redux/userReducer";
// import {moviesFetchUser} from "../../api/user/userApi";
// import { CircularPagination } from "../../components/CircularPagination";
// const Home = () => {
//   const movies = useSelector((store)=>store.user.movieHomeData)
//   const [page, setPage] = useState(1);

//   // const [banners, setBanners] = useState([]);
//   const dispatch = useDispatch()

//   const handlePageChange = (page) => {
//     setPage(page);
//   }

//   useEffect(() => {
//     async function fetchAllMovies() {
//       const movieResponse = await moviesFetchUser(page, 8);
//       console.log(movieResponse)
//       return movieResponse;
//     }
//     // async function fetchAllBanners() {
//     //   // const bannerResponse = await
//     //   // return bannerResponse
//     // }

//     fetchAllMovies().then((data) => {

//       dispatch(setMovieHomeData(data.movieList));
//     });
//   }, []);

//   return (
//     <>
// <UserNavBar/>
// <Body/>
// <div className="grid md:grid-cols-4 grid-flow-col md:grid-flow-row md:h-full overflow-y-auto  gap-3">
// {movies.length > 0 ? (
//           movies.map((movie, _id) => <UserHomeCard key={_id} data={movie} />)
//         ) : (
//           <p>No movies found.</p>
//         )}

// </div>
// <div className="flex justify-center items-center mt-4 mb-4">
// <CircularPagination handlePageChange={handlePageChange}/>
// </div>

// <UserFooter/>

//     </>
//   )
// }

// export default Home

// .....working without circle page

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMovieHomeData } from "../../redux/userReducer";
// import { moviesFetchUser } from "../../api/user/userApi";
// import { UserHomeCard } from "../../components/user/UserHomeCard";
// import { UserNavBar } from "../../components/user/UserNavBar";
// import Body  from "../../components/user/Body";
// import { UserFooter } from "../../components/user/UserFooter";
// import { CircularPagination } from "../../components/CircularPagination";

// const Home = () => {
//   const movies = useSelector((store) => store.user.movieHomeData);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1); // Track total pages

//   const dispatch = useDispatch();

//   const handlePageChange = (page) => {
//     setPage(page);
//   };

//   useEffect(() => {
//     async function fetchAllMovies() {
//       const movieResponse = await moviesFetchUser(page, 8);
//       console.log(movieResponse);
//       if (movieResponse) {
//         dispatch(setMovieHomeData(movieResponse.movieList));
//         setTotalPages(movieResponse.totalPages); // Update total pages
//       }
//     }

//     fetchAllMovies();
//   }, [page]); // Trigger fetch when the page changes

//   return (
//     <>
//       <UserNavBar />
//       <Body />
//       <div className="grid md:grid-cols-4 grid-flow-col md:grid-flow-row md:h-full overflow-y-auto gap-3">
//         {movies.length > 0 ? (
//           movies.map((movie, _id) => <UserHomeCard key={_id} data={movie} />)
//         ) : (
//           <p>No movies found.</p>
//         )}
//       </div>
//       <div className="flex justify-center items-center mt-4 mb-4">
//         <CircularPagination
//           handlePageChange={handlePageChange}
//           activePage={page}
//           totalPages={totalPages}
//         />
//       </div>
//       <UserFooter />
//     </>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieHomeData } from "../../redux/userReducer";
import { moviesFetchUser } from "../../api/user/userApi";
import { UserHomeCard } from "../../components/user/UserHomeCard";
import { UserNavBar } from "../../components/user/UserNavBar";
import Body from "../../components/user/Body";
import { UserFooter } from "../../components/user/UserFooter";
import { CircularPagination } from "../../components/CircularPagination";

const Home = () => {
  const movies = useSelector((store) => store.user.movieHomeData);
  console.log("movies", movies);

  const dispatch = useDispatch();
  const [page, setPage] = useState(() => {
    // Initialize with the last saved page from localStorage or 1 as defau  lt
    return parseInt(localStorage.getItem("activePage")) || 1;
  });
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const handlePageChange = (page) => {
    setPage(page);
    localStorage.setItem("activePage", page.toString()); // Save the active page to localStorage
  };

  useEffect(() => {
    async function fetchAllMovies() {
      // const theaterId = movies.length > 0 ? movies[0].theatreId : null;
      // console.log("theaterId", theaterId);
      const movieResponse = await moviesFetchUser(page, 8);
      console.log(movieResponse);
      if (movieResponse) {
        dispatch(setMovieHomeData(movieResponse.movieList));
        setTotalPages(movieResponse.totalPages); // Update total pages
      }
    }

    fetchAllMovies();
  }, [page]); // Trigger fetch when the page changes

  return (
    <>
      <UserNavBar />
      <Body />
      <div className="grid md:grid-cols-4 grid-flow-col md:grid-flow-row md:h-full overflow-y-auto gap-3">
        {movies.length > 0 ? (
          movies.map((movie, _id) => <UserHomeCard key={_id} data={movie} />)
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
