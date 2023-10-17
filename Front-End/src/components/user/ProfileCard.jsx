import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
   import { useState } from "react";
import { ProfileEdit } from "./ProfileEdit";
  export function ProfileCard() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <div className="pt-24 m-2">
      <Card className="w-96 ">
        <CardHeader floated={false} className="h-60">
          <img src="/img/team-3.jpg" alt="profile-picture" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Natalie Paisley
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            CEO / Co-Founder
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-5 pt-2">
          <Button onClick={handleOpen} >
            Edit Profile
          </Button>
          <ProfileEdit open={open} handleOpen={handleOpen} />
        </CardFooter>
      </Card>
      </div>
    );
  }