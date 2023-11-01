import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { userApproval } from "../../api/admin/adminApi";
import { toast } from "react-toastify";
import { Typography, Chip, Avatar, Switch } from "@material-tailwind/react";
// import {ToggleButton} from '../toggle'

const AdminUserTable = (props) => {
  const [isSwitchOn, setIsSwitchOn] = useState(props?.blockedStatus);

  const toggleHandle = async () => {
    await userApproval({ id: props?.id, status: !isSwitchOn })
      .then((response) => {
        if (response?.status === 200) {
          setIsSwitchOn(response?.blockedStatus);
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
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <tr key={props.Name}>
      <td className={props.classes}>
        <div className="flex items-center gap-3">
          <Avatar
            src={
              props?.ProfilePic
                ? props?.ProfilePic
                : "https://res.cloudinary.com/xctacine/image/upload/v1698833898/avatar_image_mjvvgs.png"
            }
            alt={name}
            size="sm"
          />
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
            value={isSwitchOn ? "Inactive" : "Active"}
            color={isSwitchOn ? "red" : "green"}
          />
        </div>
      </td>
      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.date}
        </Typography>
      </td>
      <td className={props.classes}>
        <Switch checked={isSwitchOn} onChange={toggleHandle}></Switch>
        {/* <Tooltip content="Edit User">
        <IconButton variant="text">
        <ToggleButton />
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip> */}
      </td>
    </tr>
  );
};

export default AdminUserTable;
