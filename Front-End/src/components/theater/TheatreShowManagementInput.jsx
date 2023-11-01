import {
  Card,
  CardBody,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { movieScreenAllocation } from "../../api/theater/theaterApi";
import { toast } from "react-toastify";
import ShowManagementList from "../../components/theater/ShowManagementList";

function TheatreShowManagementInput(props) {
  const [screenSelected, setScreenSelected] = useState("");
  const [movieSelected, setMovieSelected] = useState("");

  const handleSubmit = async () => {
    if (
      (screenSelected && movieSelected !== "") ||
      undefined ||
      (screenSelected && movieSelected === "No data available")
    ) {
      const data = {
        screenId: screenSelected,
        movieId: movieSelected,
        selectedDates: datevalue,
      };

      const response = await movieScreenAllocation(data);
      toast.success(`movie screen allocation added `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(
        `please select screen and movie if no data available please add data accordingly `,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <>
      <Card className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto p-4">
        <CardBody>
          <div className="text-center">
            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl pb-4 text-light-green-700">
              Show Management
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <Select
                label="Select Screen"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                {props?.screen?.length > 0 ? (
                  props?.screen?.map((screen) => (
                    <Option
                      onClick={() => {
                        setScreenSelected(screen?._id);
                      }}
                      key={screen?._id}
                    >
                      {screen?.screenName}
                    </Option>
                  ))
                ) : (
                  <Option value="No data available">No data available</Option>
                )}
              </Select>
            </div>
            <div className="w-full">
              <Select
                label="Select Movie"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                {props?.movie ? (
                  props?.movie.map((movie) => (
                    <Option
                      onClick={() => {
                        setMovieSelected(movie?.movieId);
                      }}
                      key={movie?.movieId}
                    >
                      {movie?.movieTitle}
                    </Option>
                  ))
                ) : (
                  <Option value="No data available">No data available</Option>
                )}
              </Select>
            </div>
            <div className="w-full"></div>
          </div>
          <div className="pt-6 text-center">
            <Button onClick={handleSubmit} color={"green"}>
              Submit
            </Button>
          </div>
        </CardBody>
      </Card>
      <ShowManagementList />
    </>
  );
}

export default TheatreShowManagementInput;
