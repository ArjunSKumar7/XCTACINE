import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  userLogout,
  setSearchedMovie,
  setLocationSelected,
  setProfiePic,
} from "../../redux/userReducer";
import { getMoviesBySearch, getLocation,fetchUserData } from "../../api/user/userApi";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

// profile menu component

function ProfileMenu() {
  const profilePic=useSelector((store)=>store.user.profilePic)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const signout = () => {
    dispatch(userLogout());
  };

  const handleProfile=()=>{
    navigate("/profile");
  }

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: signout,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={profilePic ?(profilePic):"https://res.cloudinary.com/xctacine/image/upload/v1698833898/avatar_image_mjvvgs.png"}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (label === "Sign Out") {
                  signout(); // Call the handleLogout function when "Sign Out" is clicked
                  closeMenu(); // Close the menu after clicking "Sign Out"
                }else if (label === "My Profile") {
                  handleProfile();
                  closeMenu(); 
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}



// nav list component
const navListItems = [
  {
    label: "Guest",
    icon: UserCircleIcon,
  },
 
];

function NavList() {
  const locationhook = useLocation()
  const dispatch = useDispatch();
  const [UserName, setUserName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [TheatreLocation, setTheatreLocation] = useState("");


const userId=useSelector((store)=>store.user?.userId);

  const storedLocation = useSelector((store) => store.user.locationSelected);

  const searchUserMovies = async (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
    const movieDataBySearch = await getMoviesBySearch(e.target.value);
    dispatch(setSearchedMovie(movieDataBySearch?.movieList));
  };

  useEffect(()=>{
    async function fetchUserName(){
      const user=await fetchUserData(userId);
      setUserName(user?.userData?.Name);
      dispatch(setProfiePic(user?.userData?.ProfilePic))
      
      
    }
    fetchUserName(userId)

  },[userId])

  useEffect(() => {
    async function fetchData() {
      const response = await getLocation();
      return response;
    }

    fetchData().then((data) => {
      data?.locationList?.push("No Location Selected");
      setTheatreLocation(data?.locationList);
    });
  }, []);

  return (
    <ul className="mb-4 mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label === "Guest" ? (UserName ? UserName : "Guest") : label}
          </MenuItem>
        </Typography>
      ))}
      {/********************************searchbar *************************************************/}
      <div className="relative flex w-full gap-2 md:w-max">
       
        <input
          className="bg-gray-300 focus:outline-none p-1 px-4 w-100 rounded text-black"
          onChange={searchUserMovies}
          value={searchText}
          type="text"
          maxLength={20}
          placeholder="Search"
        />
      </div>
      {/********************************searchbar *************************************************/}

      {/********************************LOCATION LIST *************************************************/}
      {(locationhook.pathname==="/"||locationhook.pathname==="/user"||locationhook.pathname==="/login"||locationhook.pathname==="/home")&&(<div className="relative flex w-full gap-4 md:w-max">
        <Select
          className="bg-gray-300 focus:outline-none    rounded text-black"
          label="Select Location"
          value={storedLocation}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
        
          {TheatreLocation ? (
            TheatreLocation.map((location, Index) => (
              <Option
                key={Index}
                value={storedLocation}
                onClick={() => {
                  localStorage.setItem("selectedLocation", location);

                  dispatch(setLocationSelected(location));
                }}
              >
                {location}
              </Option>
            ))
          ) : (
            <Option value="default">No data available</Option>
          )}
        </Select>
      </div>)}
      {/********************************LOCATION LIST *************************************************/}
    </ul>
  );
}

export function UserNavBar() {
 
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className=" mx-auto fixed max-w-full p-3 top-0 rounded-none z-50 ">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Xctacine
        </Typography>
        <img
        
          src="https://res.cloudinary.com/dbsgcwkhd/image/upload/v1694432315/android-chrome-512x512_kj47v1.png"
          alt="Xctacine"
          className="  mr-4 ml-2 cursor-pointer py-1.5 lg:w-12 lg:h-16  xl:w-12 xl:h-22 sm:w-9  h-9"
        />
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
