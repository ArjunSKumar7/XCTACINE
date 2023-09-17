
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  // ListItemSuffix,
  // Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  // UserCircleIcon,
  // Cog6ToothIcon,
  // InboxIcon,
  // PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {AddMovieForm} from "../../components/theater/AddMovieForm"
import { AddScreenForm } from "./AddScreenForm";
 
export function TheatreSideBar() {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [addMivieOpen, setaddMivieOpen] = useState(false);
  const [addScreenOpen, setaddScreenOpen] =useState(false);

  const handleAddScreenOpen = () => {
    console.log("openscreen")
    setaddScreenOpen(!addScreenOpen);}
 
  const handleMovieAddOpen = () => setaddMivieOpen(!addMivieOpen);

  const navigate = useNavigate();
 
  return (
    <Card className=" rounded-none fixed h-[calc(100vh-2rem)]  p-4 shadow-xl shadow-blue-gray-900/5 top-16">
      {/* <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div> */}
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               Movies
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={handleMovieAddOpen}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
               Add Movies
              </ListItem>
              <ListItem onClick={()=>{navigate("/theatre/movielist")}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Movie List
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Screens
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={handleAddScreenOpen}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add Screens
              </ListItem>
              <ListItem onClick={()=>{navigate("/theatre/screenlist")}}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Screen List
              </ListItem>
              {/* <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Approvals44
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Approvals55
              </ListItem> */}
            </List>
          </AccordionBody>
        </Accordion>







        {/* <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      </List>

      <Dialog
        open={addMivieOpen}
        handler={handleMovieAddOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className=" sm:w-96 md:w-1/2 lg:w-3/5 xl:w-2/3 top-0"
        size="lg"
      >
        <DialogHeader >Add Movie</DialogHeader>
        
        <DialogBody>
            <AddMovieForm />
          

        </DialogBody>
        
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleMovieAddOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleMovieAddOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>




      <Dialog
        open={addScreenOpen}
        handler={handleAddScreenOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className=" sm:w-96 md:w-1/2 lg:w-3/5 xl:w-2/3 top-0"
        size="lg"
      >
        <DialogHeader >Add Screen</DialogHeader>
        
        <DialogBody>
            <AddScreenForm handleAddScreenOpen={handleAddScreenOpen}/>
          

        </DialogBody>
        
        
      </Dialog>






    </Card>
  );
}