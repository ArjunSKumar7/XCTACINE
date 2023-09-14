
this is the basic movie card


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function UserHomeCard(props) {
  console.log("props",props)
  return (
    <div className="px-2 md:w-full w-60 hover:shadow-2xl py-2 border flex flex-col bg-white hover:border-2 hover:bg-gray-200 border-gray-200 cursor-pointer rounded-md shadow-md">
      <div className="flex justify-center items-center">
        <img src={props.data.moviePoster} alt="" className="w-full h-full rounded-md"/>
      </div>
      <div className="h-full gap-1 md:gap-2 px-2 py-1 flex flex-col justify-between">
        <div className="flex justify-between items-center gap-2">
          <h4 className="font-medium">{props.data.movieTitle}</h4>
          <span className="uppercase text-sm font-semibold"> {props.data.movieLanguage}</span>
        </div>
        <div className="">
          <button className="uppercase w-full bg-purple-800 py-2 border-2  border-purple-800 hover:text-purple-800 hover:bg-white font-semibold rounded-md text-gray-50 transition duration-500">book now</button>
        </div>
      </div>
      {/* <div className="flex justify-between items-center">
        <p color="blue-gray" className="font-medium">
          {props.data.movieName}
        </p>
        <p color="blue-gray" className="font-medium">
          {props.data.language}
        </p>
      </div> */}
      {/* <div>
      <Button
          ripple={false}
          fullWidth={true}
          className="bg-deep-purple-600 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Book Now
        </Button>
      </div> */}
    </div>
    // <Card className="flex flex-col justify-between">
    //   <div >
    //   <CardHeader shadow={false} floated={false} className="h-96">
    //     <img
    //       src={props.data.poster}
    //       alt="card-image"
    //       className="w-52 h-48 object-cover"
    //     />
    //   </CardHeader>
    //   <CardBody className="mt-0">
    //     <div className=" flex items-center justify-between">
    //       <Typography color="blue-gray" className="font-medium">
    //       {props.data.movieName}
    //       </Typography>
    //       <Typography color="blue-gray" className="font-medium">
    //         {props.data.language}
    //       </Typography>
    //     </div>

    //   </CardBody>
    //   </div>
    //   <CardFooter className="pt-0">
    //     <Button
    //       ripple={false}
    //       fullWidth={true}
    //       className="bg-deep-purple-600 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
    //     >
    //       Book Now
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}


import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export function CircularPagination(props) {
  console.log("props", props);
  const [active, setActive] = React.useState(1);
 
  const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
      className: "rounded-full",
    } );
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
        <IconButton {...getItemProps(5)}>5</IconButton>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}