import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function AlertBox(props) {
    console.log("props", props);
//   const [open, setOpen] = React.useState(false);
 

 
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={props.open} handler={props.handleOpen}>
        <DialogHeader>{props.message}</DialogHeader>
        {/* <DialogBody divider>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody> */}
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={props.handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {props?.theatreScreenListDelete && <Button variant="gradient" color="green" onClick={props?.theatreScreenListDelete}>
            <span>Confirm.</span>
          </Button>}
          {props?.theatreMovieListDelete && <Button variant="gradient" color="green" onClick={props?.theatreMovieListDelete}>
            <span>Confirm</span>
          </Button>}
        </DialogFooter>
      </Dialog>
    </>
  );
}