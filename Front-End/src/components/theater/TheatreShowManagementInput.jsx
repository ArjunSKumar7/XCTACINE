// import {
//     Card,
//     CardBody,
//     Select,
//      Option ,
//     Button,
//   } from "@material-tailwind/react";
//   import { useState } from "react";
// import {movieScreenAllocation} from '../../api/theater/theaterApi'
// function TheatreShowManagementInput(props) {

//     console.log("props", props);
//     const [screenSelected, setscreenSelected] = useState("");
//     const [movieSelected, setmovieSelected] = useState("");
//     const handleSubmit=async ()=>{
     
//       if(screenSelected && movieSelected!=""||undefined){
//         const data ={
//           screenId:screenSelected,
//           movieId:movieSelected
//         }
        
//        const response=await movieScreenAllocation(data)
//        console.log("response",response)
      
//       }
      
//     }
//   return (
   
//       <Card className="w- h-11/12 px-40 py-40">
//       {/* <CardHeader>
//               <Typography>
//                   Show Management
//               </Typography>
//           </CardHeader> */}
//       <CardBody>
//         <div>
//           <h1 className="font-bold pb-10">Show Management</h1>
//         </div>

//         <div className="">
//           <div className="grid grid-cols-2">
//           <div className="w-72">
//       <Select
//         label="Select Movie"
//         animate={{
//           mount: { y: 0 },
//           unmount: { y: 25 },
//         }}
//       >

//         {props?.screen?.map((screen) => (

//           <Option
//           onClick={()=>{
//             setscreenSelected(screen?._id)
//           }} key={screen?._id}>{screen?.screenName}</Option>
//         ))}
     
       
//       </Select>
//     </div>
//     <div className="w-72">
//       <Select
//         label="Select Screen   "
//         animate={{
//           mount: { y: 0 },
//           unmount: { y: 25 },
//         }}
//       >
//        {props?.movie.map((movie) => (
//           <Option onClick={() => {
//             setmovieSelected(movie?.movieId)
//           }}  key={movie?.movieId}>{movie?.movieTitle}</Option>
//         ))}
//       </Select>
//     </div>
//           </div>
//           <div className="pt-10">
//             <Button onClick={handleSubmit} color={"purple"}>
//               submit
//             </Button>
//           </div>
//         </div>
//       </CardBody>
//     </Card>
 
//   )
// }

// export default TheatreShowManagementInput

import {
  Card,
  CardBody,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { movieScreenAllocation } from "../../api/theater/theaterApi";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker"; 

function TheatreShowManagementInput(props) {
  const currentDate = new Date();
  const [screenSelected, setScreenSelected] = useState("");
  const [movieSelected, setMovieSelected] = useState("");
  const [datevalue, setdateValue] = useState({ 
   startDate: new Date(), 
endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())
    }); 

    const handleValueChange = (newValue) => {
      console.log("newValue:", newValue); 
      setdateValue(newValue); 
      } 

      console.log("datevalue", datevalue);
  const handleSubmit = async () => {
    if (screenSelected && movieSelected !== ""||undefined||screenSelected && movieSelected === "No data available") {
      const data = {
        screenId: screenSelected,
        movieId: movieSelected,
        selectedDates: datevalue
       
      };

      const response = await movieScreenAllocation(data);
      console.log("response", response);
    }
    else{
      toast.error(`please select screen and movie if no data available please add data accordingly `, {
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
  };

  return (
    <Card className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto p-4">
      <CardBody>
        <div className="text-center">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl pb-4">
            Show Management
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Select
          
              label="Select Screen"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              {props?.screen?.length>0 ?(props?.screen?.map((screen) => (
                <Option
                  onClick={() => {
                    setScreenSelected(screen?._id);
                  }}
                  key={screen?._id}
                >
                  {screen?.screenName}
                </Option>
              ))):<Option value="No data available">No data available</Option>}
            </Select>
          </div>
          <div className="w-full">
            <Select
              label="Select Movie"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              {props?.movie?(props?.movie.map((movie) => (
                <Option
                  onClick={() => {
                    setMovieSelected(movie?.movieId);
                  }}
                  key={movie?.movieId}
                >
                  {movie?.movieTitle}
                </Option>
              ))):(<Option value="No data available" >No data available</Option>)}
            </Select>
          </div>
          <div className="w-full">
          <Datepicker 
         startFrom={currentDate}
         minDate={currentDate}
          primaryColor={"red"} 
value={datevalue} 
onChange={handleValueChange} 
/> 
</div>
    


        </div>
        <div className="pt-6 text-center">
          <Button onClick={handleSubmit} color={"purple"}>
            Submit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default TheatreShowManagementInput;
