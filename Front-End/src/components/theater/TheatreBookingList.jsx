import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useEffect,useState } from "react";
import {fetchBookings} from "../../api/theater/theaterApi"
import { useSelector } from "react-redux";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
const TABLE_HEAD = ["Movie","Amount", "Date", "Time",];

 

 
export function TheatreBookingList() {
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem("theatreBookListPage")) || 1; // Initialize with the last saved page from localStorage or 1 as defau  lt
  });
  const [totalPages, setTotalPages] = useState(1); // Track total pages

 
  
  const[bookings,setBookings]=useState([])
  const theatreData = useSelector((store) => store.theatre.theatreDetails);
useEffect(()=>{
  async function fetchData(){
    const response = await fetchBookings(theatreData?.theatreId,page,4)
   setBookings(response?.bookings)
   setTotalPages(response?.totalPages)
  }
  fetchData()
},[page])


const getItemProps = (index) =>
    ({
      variant: page === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        setPage(index);
        localStorage.setItem("theatreBookListPage", index.toString());
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
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Bookings
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the bookings.
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              {/* <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              /> */}
            </div>
            {/* <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button> */}
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings?(
            bookings.map(
              (
                {
                  _id,
                  totalAmount,
                  userName,
                  movieName,
                  screenName,
                  showTime,
                  showDate,
                  bookedSeats,
                 
                },
                index,
              ) => {
                const isLast = index === bookings.length - 0;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar
                          src={img}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        /> */}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
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
                      
                        
                      </div>
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
              },
            )):"No data"}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <div className="flex items-center justify-center ml-72 gap-4">
      <Button
        variant="text"
        className="flex  items-center gap-2"
        onClick={prev}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex  items-center gap-2">
       
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