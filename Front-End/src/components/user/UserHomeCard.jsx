import { motion } from "framer-motion";
import { useState } from "react";

export function UserHomeCard(props) {
  console.log("props", props);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const cardvariants = {
    expanded: {
      width: "400px",
    },
    collapsed: {
      width: "200px",
    },
  };

  let movieImages;
  // const movieDescriptions = [props.data.movieOverview];
  let movieTitle ;
  // const movieLanguage=[props.data.movieLanguage];
  let movieReleaseDate ;

  // if(props?.data?.locationBasedMovieList){
  //    movieImages = [props?.data?.locationBasedMovieList?.moviePoster];
  //   // const movieDescriptions = [props.data.movieOverview];
  //  movieTitle = [props?.data?.locationBasedMovieList?.movieTitle];
  //   // const movieLanguage=[props.data.movieLanguage];
  //   movieReleaseDate = [props?.data?.locationBasedMovieList?.movieReleaseDate];
  // }

    movieImages = [props?.data?.moviePoster];
    // const movieDescriptions = [props.data.movieOverview];
    movieTitle = [props?.data?.movieTitle];
    // const movieLanguage=[props.data.movieLanguage];
    movieReleaseDate = [props?.data?.movieReleaseDate];
  

  


  return (
    
    <section className="px-2 md:w-full    hover:shadow-2xl py-2 border flex flex-col bg-white hover:border-2 hover:bg-gray-200 border-gray-200 cursor-pointer rounded-md shadow-md ">
      {/* // <section className="px-2 py-2 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4"> */}
      <div className="flex justify-center items-center relative">
        {/* Blurred background image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md"
          style={{ backgroundImage: `url(${movieImages[0]})` }}
        ></div>

        {movieImages?.map((image, index) => (
          <motion.div
            key={props?.data?.movieId}
            className={`card cursor-pointer h-[500px] bg-cover bg-center rounded-[20px] ${
              index === expandedIndex ? "expanded" : ""
            }`}
            variants={cardvariants}
            initial="collapsed"
            animate={index === expandedIndex ? "expanded" : "collapsed"}
            transition={{ duration: 0.5 }}
            onClick={() => handleCardClick(index)}
            style={{
              // Background image is the same as the blurred background image
              backgroundImage: `url(${movieImages[0]})`,
              // Add opacity to the image to make it visible but blurred
              opacity: 0.8,
            }}
          >
            <div className="card-content h-full flex flex-col justify-end">
              <div className="card-footer rounded-b-[20px] bg-gray-800 bg-opacity-75 min-h-[100px] flex flex-col items-center justify-center">
                <button className="bg-gray-500 hover:bg-white-700 text-white font-bold py-2 px-4 rounded">
                  Book Now
                </button>

                {/* <button className="relative bg-transparent text-white font-extrabold py-2 px-4 rounded border-y-2">
                  Book Now
                  <span
                    className="absolute inset-0 bg-cover bg-center filter blur-md"
                    style={{ backgroundImage: `url(${cardImages[0]})` }}
                  ></span>
                </button> */}

                {index === expandedIndex && (
                  <>
                    <h2 className="mt-2 text-gray-300 text-center font-extrabold ">
                      {movieTitle[index]}
                    </h2>
                    <p className="mt-2 text-gray-300 text-center front-semibold">
                      {movieReleaseDate[index]}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
