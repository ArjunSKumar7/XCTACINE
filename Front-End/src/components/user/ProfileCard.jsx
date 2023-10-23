import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
   import { useState,useEffect } from "react";
import { ProfileEdit } from "./ProfileEdit";
import {UserProfilePicEdit} from "./UserProfilePicEdit"
import { fetchUserData} from "../../api/user/userApi";

import { useSelector } from "react-redux";
  export function ProfileCard() {

    const [UserData, setUserData] = useState("");
    const userId=useSelector((store)=>store.user.userId)
    console.log("userId",userId);
  
    useEffect(() => {
      async function fetchData(userId) {
        const response = await fetchUserData(userId);
        return response;
      }
  
      fetchData(userId).then((user) => {
        console.log("user", user?.userData);
        setUserData(user?.userData);
      });
    }, [userId]);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const[editPicOpen,setEditPicOpen]=useState(false)
   const handleEditPicOpen = () => {
    console.log("editPicOpen");
      setEditPicOpen(!editPicOpen);
    }
    return (
        <div className="pt-24 m-2">
      <Card className="w-96 ">
        <CardHeader floated={false} className="h-60">
          <img src={UserData?.ProfilePic} alt={UserData?.Name} onClick={handleEditPicOpen} />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {UserData?.Name}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
           {UserData?.Email}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-5 pt-2">
          <Button onClick={handleOpen} >
            Edit Profile
          </Button>
          <ProfileEdit open={open} handleOpen={handleOpen} UserData={UserData} />
          <UserProfilePicEdit open={editPicOpen} handleOpen={handleEditPicOpen}/>
        </CardFooter>
      </Card>
      </div>
    );
  }