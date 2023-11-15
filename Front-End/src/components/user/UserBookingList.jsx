import { Card, Typography,CardFooter,Button,Chip, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState, useEffect } from "react";
import {fetchProfileBookings} from "../../api/user/userApi"
import { useSelector } from "react-redux";
 
const TABLE_HEAD = ["Movie","Amount","Date","Time"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];



 
export function UserBookingList() {
  const userId = useSelector((store) => store.user.userId);
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem("profileBookListPage")) || 1; // Initialize with the last saved page from localStorage or 1 as defau  lt
  });
  const [totalPages, setTotalPages] = useState(1);
  const[bookings,setBookings]=useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetchProfileBookings(userId,page,4);
      setBookings(response?.profileBookings)
      setTotalPages(response?.totalPages)
    
    }
    fetchData();
  },[page])
 
  const getItemProps = (index) =>
  ({
    variant: page === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setPage(index);
      localStorage.setItem("profileBookListPage", index.toString());
    }
  } );

const next = () => {
  if (page === 5) return;

  setPage(page + 1);
};

const prev = () => {
  if (page === 1) return;

  setPage(page - 1);
};
const renderPaginationButtons = (totalPages)=>{
  const Button=[];
 

 for(let i=1;i<=totalPages;i++){
  Button.push(
    <IconButton {...getItemProps(i)}>{i}</IconButton>
  )
 
}
return Button;
}


   



  return (
    <Card className="h-full w-full bg-blue-gray-200">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-200 p-4"
              >
                <Typography
                  variant="small"
                  color="bg-blue-gray-200"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings ? (bookings.map(({  _id,
                  totalAmount,
                  userName,
                  movieName,
                  screenName,
                  showTime,
                  showDate,
                  bookedSeats, }, index) => {
            const isLast = index === bookings.length - 0;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {movieName}
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {screenName}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {bookedSeats}
                  </Typography>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {totalAmount}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {showDate}
                  </Typography>
                </td>
                <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={showTime}
                          color={
                            
                               "green"
                              
                          }
                        />
                      </div>
                    </td>
              </tr>
            );
          })):"No data"}
        </tbody>
      </table>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
 <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
      {renderPaginationButtons(totalPages)}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={page === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
      </CardFooter>
    </Card>
  );
}