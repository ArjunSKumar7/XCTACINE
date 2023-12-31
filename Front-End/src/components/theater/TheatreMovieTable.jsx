
import {

    Typography,
    IconButton,
    Tooltip,
    Avatar,
   
  } from "@material-tailwind/react";
  import {  TrashIcon } from "@heroicons/react/24/solid";
import { AlertBox } from "../../components/AlertBox"
import { useState } from "react";
import{deleteTheatreMovie} from "../../api/theater/theaterApi"
import { useSelector, useDispatch } from "react-redux";
import {setMovieToList} from "../../redux/theatreReducer"
import { toast } from "react-toastify";

  
  
  function TheatreMovieTable(props) {
    const theatreId = useSelector((store) => store.theatre.theatreDetails?.theatreId);
    const dispatch = useDispatch()

    const theatreMoviesList = useSelector((store)=>store.theatre.movieToList)

    const [open, setOpen] = useState(false);

   const theatreMovieListDelete = async() => {
    try{
      const updatedMovieList = theatreMoviesList.filter((movie)=>movie.movieId!==props.movieId)
      dispatch(setMovieToList(updatedMovieList))
      
    const resposne=await deleteTheatreMovie(props.movieId,theatreId)

   if(resposne.status===200){
    toast.success(`${resposne.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    }else{
      toast.error(`${resposne.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }}
    catch(err){
      console.log(err);
      
    }
  }
    const handleOpen = () => setOpen(!open);

    return (
      <tr key={props.movieId}>
      <td className={props.classes}>
        <div className="flex items-center gap-3">
          <Avatar src={props.moviePoster} alt={props.movieTitle} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {props.movieTitle}
            </Typography>
            {/* <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {props.movieReleaseDate}
            </Typography> */}
          </div>
        </div>
      </td>
      <td className={props.classes}>
        <div className="flex flex-col">
          {/* <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {props.movieLanguage}
          </Typography> */}
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {props.movieReleaseDate}
          </Typography>
        </div>
      </td>
  
  
      <td className={props.classes}>
        <div className="flex flex-col">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {props.movieLanguage}
          </Typography>
         
        </div>
      </td>
  
      <td className={props.classes}>
        <div className="flex flex-col">
        <Typography
        variant="small"
        color="blue-gray"
        className="font-normal"
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '150px', // Adjust the width as needed
        }}
      >
        {props.movieOverview}
      </Typography>
         
        </div>
      </td>
      {/* <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={online ? "online" : "offline"}
            color={online ? "green" : "blue-gray"}
          />
        </div>
      </td> */}
  
  
      {/* <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {date}
        </Typography>
      </td> */}
      <td className={props.classes}>
        <Tooltip content="Delete Movie">
          <IconButton variant="text">
            
          <TrashIcon class="h-6 w-6 text-gray-900 "
          onClick={handleOpen} />
          <AlertBox open={open} handleOpen={handleOpen} message={"Are you sure you want to delete this movie"} theatreMovieListDelete={theatreMovieListDelete}/>
          </IconButton>
        </Tooltip>
      </td>

    </tr>
  
    )
  }

  
  export default TheatreMovieTable