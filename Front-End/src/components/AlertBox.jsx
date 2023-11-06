import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function AlertBox(props) {
  //   const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog open={props.open} handler={props.handleOpen}>
        <DialogHeader>{props.message}</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={props.handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {props?.theatreScreenListDelete && (
            <Button
              variant="gradient"
              color="green"
              onClick={props?.theatreScreenListDelete}
            >
              <span>Confirm.</span>
            </Button>
          )}
          {props?.theatreMovieListDelete && (
            <Button
              variant="gradient"
              color="green"
              onClick={props?.theatreMovieListDelete}
            >
              <span>Confirm</span>
            </Button>
          )}
          {props?.adminBannerListDelete && (
            <Button
              variant="gradient"
              color="green"
              onClick={props?.adminBannerListDelete}
            >
              <span>Confirm</span>
            </Button>
          )}
          {props?.adminLocationListDelete && (
            <Button
              variant="gradient"
              color="green"
              onClick={props?.adminLocationListDelete}
            >
              <span>Confirm</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
