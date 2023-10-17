
import {

    Typography,
    IconButton,
    Tooltip,
    Avatar,
   
  } from "@material-tailwind/react";
  import {  TrashIcon } from "@heroicons/react/24/solid";
import { AlertBox } from "../../components/AlertBox"
import { useState } from "react";
import{deleteTheatreScreen} from "../../api/theater/theaterApi"
import { useSelector, useDispatch } from "react-redux";
import { setScreenToList } from "../../redux/theatreReducer";
import { toast } from "react-toastify";

  
  
  function TheatreScreenTable(props) {
    console.log("props", props);
    const dispatch = useDispatch()

    const screenList = useSelector(
      (store) => store.theatre.screenToList
  
    );
    console.log("screenList", screenList);

    console.log("props", props);
    const [open, setOpen] = useState(false);

   const theatreScreenListDelete = async() => {
    try{
      console.log("theatrescreencalled")
      const updatedScreenList = screenList.filter((screen)=>screen._id!==props?.screenId)
      dispatch(setScreenToList(updatedScreenList))
    const resposne=await deleteTheatreScreen(props?.screenId)

    console.log(resposne);
    if (resposne?.message === "screen deleted") {
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
    } else {
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
    }
    }catch(err){
      console.log(err);
      
    }
  }
    const handleOpen = () => setOpen(!open);

      console.log("props", props);
    return (
      <tr key={props.screenId}>
      <td className={props.classes}>
        <div className="flex items-center gap-3">
          {/* <Avatar src={props.moviePoster} alt={props.movieTitle} size="sm" /> */}
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {props.screenName}
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
          {/* <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {props.movieReleaseDate}
          </Typography> */}
        <div className="grid grid-cols-2 gap-1">
  {Object.keys(props?.screenshows[0]).map((showKey) => (
    <div
      key={showKey}
      className="w-16 h-8 border-2 bg-green-500 border-green-900 rounded-full flex items-center justify-center"
    >
      {props?.screenshows[0][showKey]}
    </div>
  ))}
</div>
        </div>
      </td>
  
  
      <td className={props.classes}>
        <div className="flex flex-col">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {props.theatreName}:{props?.movieTitle}
          </Typography>
         
        </div>
      </td>
  
      {/* <td className={props.classes}>
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
      </td> */}
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
          <AlertBox open={open} handleOpen={handleOpen} message={"Are you sure you want to delete this movie"} theatreScreenListDelete={theatreScreenListDelete}/>
          </IconButton>
        </Tooltip>
      </td>

    </tr>
  
    )
  }

  
  export default TheatreScreenTable