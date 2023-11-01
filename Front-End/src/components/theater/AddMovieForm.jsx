// import { Input, Button } from "@material-tailwind/react";

// export function AddMovieForm() {
//   return (
//     <div className="relative flex w-full gap-2 md:w-max">
//     <Input
//       type="search"
//       label="Type here..."
//       className="pr-20"
//     //   containerProps={{
//     //     className: "min-w-[288px]",
//     //   }}
//     />
//     <Button size="sm" className="!absolute right-1 top-1 rounded">
//       Search
//     </Button>
//   </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  Input,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import { MovieCard } from "./MovieCard";

export function AddMovieForm() {
  //   const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [movieData,setMovieData]=useState([])


  const searchHandle = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      ).then((response)=>{
        setMovieData(response?.data?.results)

      })
      
  };
  return (
    <div className="m-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <div className="relative flex w-full gap-2 lg:w-max m-auto  p-1 ">
        <Input
        
          type="search"
          label="Type here..."
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
        />
        <Button
          onClick={searchHandle}
          size="sm"
          className="!absolute right-2 top-2 rounded"
        >
          Search
        </Button>
      </div>

      <div className="flex flex-wrap justify-evenly">
        {
          movieData?.length>0?(
            movieData.map((movie,index)=>(
         <MovieCard key={index} data={movie}/>
            )
          )
          ):(
            <p>movie not found</p>
          )}
       
      </div>
    </div>
  );
}
