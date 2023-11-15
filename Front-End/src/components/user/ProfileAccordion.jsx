import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { UserBookingList } from "./UserBookingList";
import { useSelector } from 'react-redux';
import { fetchUserBookings } from '../../api/user/userApi';
import { useEffect, useState } from 'react';
 
export function ProfileAccordion() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 

  const userId=useSelector((store)=>store.user.userId)

  const [upcomingBookings, setUpcomingBookings] = useState([]);

useEffect(() => {
  async function fetchData(){
    const response =await fetchUserBookings(userId);
    const currentDate = new Date();

    // Filter bookings where the show date is greater than the current date
    const upcomingBookings = response.response.filter(booking => {
      const showDate = new Date(booking.showDate);
      return showDate > currentDate;
    });

    // Set the upcoming bookings in a new state
    setUpcomingBookings(upcomingBookings);
  }
  fetchData()
},[])










  return (
    <>
      <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
         Upcoming Booked Shows
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
         
            {upcomingBookings?.length > 0 ? (upcomingBookings?.map((booking, index) => (

            
            <div key={index}>
                    <h3>{booking.movieName}</h3>
                    <h4>{"Theatre: "+booking.theaterName+","+"Date: "+booking.showDate}</h4>
                    <h4>{"show time: "+booking.showTime}</h4>
            </div>
          ))):<h3>No upcoming bookings</h3>}
         
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors ${
            open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          Previouly Booked Shows
        </AccordionHeader>
        <AccordionBody className="pt-0 w- text-base font-normal">
          <UserBookingList />
        </AccordionBody>
      </Accordion>
      {/* <Accordion open={open === 3} className="rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors ${
            open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          Help Center
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion> */}
    </>
  );
}