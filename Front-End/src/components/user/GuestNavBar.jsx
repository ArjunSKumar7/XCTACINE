import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  userLogout,
  setSearchedMovie,
  setLocationSelected,
} from "../../redux/userReducer";
import { getMoviesBySearch, getLocation } from "../../api/user/userApi";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const signout = () => {
    dispatch(userLogout());
  };

  const handleProfile=()=>{
    navigate('/login')
  }

  const profileMenuItems = [
    {
      label: "Guest",
      icon: UserCircleIcon,
    
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
            src="https://res.cloudinary.com/xctacine/image/upload/v1698833898/avatar_image_mjvvgs.png"
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
               if (label === "Guest") {
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

// nav list menu
// const navListMenuItems = [
//   {
//     title: "@material-tailwind/html",
//     description:
//       "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
//   },
//   {
//     title: "@material-tailwind/react",
//     description:
//       "Learn how to use @material-tailwind/react, packed with rich components for React.",
//   },
//   {
//     title: "Material Tailwind PRO",
//     description:
//       "A complete set of UI Elements for building faster websites in less time.",
//   },
// ];

// function NavListMenu() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const renderItems = navListMenuItems.map(({ title, description }) => (
//     <a href="#" key={title}>
//       <MenuItem>
//         <Typography variant="h6" color="blue-gray" className="mb-1">
//           {title}
//         </Typography>
//         <Typography variant="small" color="gray" className="font-normal">
//           {description}
//         </Typography>
//       </MenuItem>
//     </a>
//   ));

//   return (
//     <React.Fragment>
//       <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
//         <MenuHandler>
//           <Typography as="a" href="#" variant="small" className="font-normal">
//             <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
//               <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
//               <ChevronDownIcon
//                 strokeWidth={2}
//                 className={`h-3 w-3 transition-transform ${
//                   isMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </MenuItem>
//           </Typography>
//         </MenuHandler>
//         <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
//           <Card
//             color="blue"
//             shadow={false}
//             variant="gradient"
//             className="col-span-3 grid h-full w-full place-items-center rounded-md"
//           >
//             <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
//           </Card>
//           <ul className="col-span-4 flex w-full flex-col gap-1">
//             {renderItems}
//           </ul>
//         </MenuList>
//       </Menu>
//       <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
//         <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
//       </MenuItem>
//       <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
//         {renderItems}
//       </ul>
//     </React.Fragment>
//   );
// }

// nav list component
const navListItems = [
  {
    label: "Guest",
    icon: UserCircleIcon,
  },
  // {
  //   label: "Blocks",
  //   icon: CubeTransparentIcon,
  // },
  // {
  //   label: "Docs",
  //   icon: CodeBracketSquareIcon,
  // },
];

function NavList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [TheatreLocation, setTheatreLocation] = useState(["No Location Selected"]);

  const storedLocation = useSelector((store) => store.user.locationSelected);

  const searchUserMovies = async (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
    const movieDataBySearch = await getMoviesBySearch(e.target.value);
    dispatch(setSearchedMovie(movieDataBySearch?.movieList));
  };

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

  const handleProfile=()=>{
    navigate('/login')
  }


  return (
    <ul className="mb-4 mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
         {label === "Guest" ? (
  <MenuItem
    className="flex items-center gap-2 lg:rounded-full"
    onClick={handleProfile}
  >
    {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
    {label}
  </MenuItem>
) : (
  <MenuItem className="flex items-center gap-2 lg:rounded-full">
    {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
    {label}
  </MenuItem>
)}
        </Typography>
      ))}
      {/********************************searchbar *************************************************/}
      <div className="relative flex w-full gap-2 md:w-max">
        {/* <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button size="sm" className="!absolute right-1 top-1 rounded" onChange={searchUserMovies} value={searchText}>
            Search
          </Button> */}
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
      <div className="relative flex w-full gap-4 md:w-max">
        <Select
          className="bg-gray-300 focus:outline-none    rounded text-black"
          label="Select Location"
          value={storedLocation }
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
      </div>
      {/********************************LOCATION LIST *************************************************/}
    </ul>
  );
}

export function GuestNavBar() {
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
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Xctacine
        </Typography>
        <img
          src="https://res.cloudinary.com/dbsgcwkhd/image/upload/v1694432315/android-chrome-512x512_kj47v1.png"
          alt="Your Logo"
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
