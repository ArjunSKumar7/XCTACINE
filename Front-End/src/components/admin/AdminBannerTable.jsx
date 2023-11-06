
import { useState } from "react";
import {theatreAppoval} from '../../api/admin/adminApi'
import {toast} from 'react-toastify'
  import {
   
    Typography,
   
    Chip,
    Switch,
    Avatar,
    Tooltip,
    IconButton,
    
    
  } from "@material-tailwind/react";

  import {  TrashIcon } from "@heroicons/react/24/solid";
  import { AlertBox } from "../../components/AlertBox"
  import {deleteBanner,bannerStateChange} from "../../api/admin/adminApi"
import { useSelector, useDispatch } from "react-redux";
import { setBannerToList } from "../../redux/adminReducer";

const AdminBannerTable= (props) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
const [isSwitchOn, setIsSwitchOn] = useState(props?.bannerState);
const banners=useSelector((store)=>store.admin.bannerToList)
const toggleHandle =async()=>{
  await bannerStateChange({id:props?.id,state:!isSwitchOn}).then((response)=>{
    console.log(response)
    if(response?.status===200){
      setIsSwitchOn(response?.bannerState)
      toast.success(`${response?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }else{
      toast.error(`${response?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    
  }).catch((err)=>{
    console.log("err",err)
  })
  
}

const adminBannerListDelete = async() => {

    const updatedBannerList = banners.filter((banner) => banner._id !== props?.id);
    dispatch(setBannerToList(updatedBannerList));
  
    const resposne=await deleteBanner(props?.id)
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
      })
    }else{
      toast.error(`${resposne.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    })}
    handleOpen();
}


const handleOpen = () => setOpen(!open);

  return (
    <tr key={props.id}>
    <td className={props.classes}>
      <div className="flex items-center gap-3">
        <Avatar src={props.bannerImage} alt={name} size="sm" />
        <div className="flex flex-col">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {props.bannerName}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {props.bannerDescription}
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
     
     
    </td>

    <td>
       <Tooltip content="Delete Banner">
       <IconButton variant="text">
        <TrashIcon onClick={handleOpen}  class="h-6 w-6 text-black" />
        <AlertBox open={open} handleOpen={handleOpen} message={"Are you sure you want to delete this movie"} adminBannerListDelete={adminBannerListDelete}/>
        </IconButton>
      </Tooltip>
    </td>
  </tr>
  )
}

export default AdminBannerTable