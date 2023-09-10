
import { useState } from "react";
import {theatreAppoval} from '../../api/admin/adminApi'
  import {
   
    Typography,
   
    Chip,
    Switch,
    Avatar,
    
  } from "@material-tailwind/react";
   import {ToggleButton} from '../toggle'

const AdminTheatreTable= (props) => {
    console.log("props", props);


const [isSwitchOn, setIsSwitchOn] = useState(props?.approvalStatus);
const toggleHandle =async()=>{
  await theatreAppoval({id:props?.id,status:!isSwitchOn}).then((response)=>{
    console.log("response",response)
    setIsSwitchOn(response.approvalStatus)
  }).catch((err)=>{
    console.log("err",err)
  })
  
}


  return (
    <tr key={props.id}>
    <td className={props.classes}>
      <div className="flex items-center gap-3">
        <Avatar src={props.img} alt={name} size="sm" />
        <div className="flex flex-col">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {props.Name}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {props.Email}
          </Typography>
        </div>
      </div>
    </td>
    {/* <td className={classes}>
      <div className="flex flex-col">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {job}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {org}
        </Typography>
      </div>
    </td> */}
    <td className={props.classes}>
      <div className="w-max">
        <Chip
          variant="ghost"
          size="sm"
          value={isSwitchOn ? "Active" : "Inactive"}
          color={isSwitchOn ? "green" : "red"}
        />
      </div>
    </td>
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
    <Switch checked={isSwitchOn} onChange={toggleHandle}></Switch>
      {/* <Tooltip content="Edit User">
        <IconButton variant="text">
         
        </IconButton>
      </Tooltip> */}
     
    </td>
  </tr>
  )
}

export default AdminTheatreTable