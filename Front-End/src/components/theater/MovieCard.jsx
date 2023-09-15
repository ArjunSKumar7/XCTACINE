import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { addMovieData } from "../../api/theater/theaterApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";






export function MovieCard(props) {
  const navigate = useNavigate();
  const addMovie = props.data;  
  const theatreData = useSelector((store) => store.theatre.theatreDetails);
  console.log("theatreDataObj",(theatreData));
  async function handleAddMovie(addMovie) {


    console.log("Add", addMovie);
    
    const response = await addMovieData("/theatre/addmovie", addMovie,theatreData);
    if (response?.message === "movie added successfully!") {
      toast.success(`${response?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/theatre/movielist");
    } else {
      toast.error(`${response?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    console.log("response", response);
  }

  console.log("props", props);
  const moviepath = `https://image.tmdb.org/t/p/w500${props?.data?.poster_path}  `;
  return (
    <Card className="w-60 h-80 m-2 ">
      <CardHeader shadow={false} floated={false} className="h-96">
        <div className="w-full h-full ">
          <img src={moviepath} alt="card-image" className="w-full h-full " />
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-2 ">
          <div className="flex items-center  ">
            <Typography color="blue-gray" className="font-medium">
              {props.data.title}
            </Typography>
          </div>
          <div className="flex items-center">
            <Typography color="blue-gray" className="font-medium">
              {props.data.release_date}
            </Typography>
          </div>
        </div>

        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          color="blue"
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          onClick={() => handleAddMovie(addMovie)}
        >
          Add Movie
        </Button>
      </CardFooter>
    </Card>
  );
}
