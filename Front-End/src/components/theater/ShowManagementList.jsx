  import { Card, Typography } from "@material-tailwind/react";
  import { fetchShowManagement } from "../../api/theater/theaterApi"
  import { useEffect,useState } from "react";
  import { useSelector } from "react-redux";
  
  const TABLE_HEAD = ["Screen Name","Movie"];
  
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

  function ShowManagementList({ refreshList }) {
    const [shows, setShows] = useState([]);

    const theatreData = useSelector((store) => store.theatre.theatreDetails);

    useEffect(() => {
      async function fetchInfo() {
        const data = await fetchShowManagement(theatreData?.theatreId);
        setShows(data?.shows);
      }
      fetchInfo();
    },[refreshList]);
    return (
      <Card className="h-full w-full overflow-y-auto max-h-[500px]"> {/* Adjust the max height */}
      <div className="h-full overflow-y-auto">
        <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
          {shows ? (shows.map(({ _id, screenName, movieTitle }, index) => (
          <tr key={_id} className={index % 2 === 0 ? "bg-blue-gray-50/50" : ""}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {screenName}
                </Typography>
              </td>
          
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {movieTitle}
                </Typography>
              </td>
            </tr>
          ))):"No Shows"}
        </tbody>
      </table>
      </div>
    </Card>
    )
  }

  export default ShowManagementList