
import {

    Typography,
    
    Avatar,
   
  } from "@material-tailwind/react";
  
  
  
  function TheatreMovieTable(props) {
      console.log("props", props);
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
      {/* <td className={classes}>
        <Tooltip content="Edit User">
          <IconButton variant="text">
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td> */}
    </tr>
  
    )
  }
  
  export default TheatreMovieTable