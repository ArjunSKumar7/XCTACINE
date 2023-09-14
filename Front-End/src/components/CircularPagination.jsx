// import React from "react";
// import { Button, IconButton } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
// export function CircularPagination(props) {
//   console.log("props", props);
//   const [active, setActive] = React.useState(1);
 
//   const getItemProps = (index) =>
//     ({
//       variant: active === index ? "filled" : "text",
//       color: "gray",
//       onClick: () => setActive(index),
//       className: "rounded-full",
//     } );
 
//   const next = () => {
//     if (active === 5) return;
 
//     setActive(active + 1);
//   };
 
//   const prev = () => {
//     if (active === 1) return;
 
//     setActive(active - 1);
//   };
 
//   return (
//     <div className="flex items-center gap-4">
//       <Button
//         variant="text"
//         className="flex items-center gap-2 rounded-full"
//         onClick={prev}
//         disabled={active === 1}
//       >
//         <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
//       </Button>
//       <div className="flex items-center gap-2">
//         <IconButton {...getItemProps(1)}>1</IconButton>
//         <IconButton {...getItemProps(2)}>2</IconButton>
//         <IconButton {...getItemProps(3)}>3</IconButton>
//         <IconButton {...getItemProps(4)}>4</IconButton>
//         <IconButton {...getItemProps(5)}>5</IconButton>
//       </div>
//       <Button
//         variant="text"
//         className="flex items-center gap-2 rounded-full"
//         onClick={next}
//         disabled={active === 5}
//       >
//         Next
//         <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }

//.................. working without circule number

// import React from "react";
// import { Button, IconButton } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// export function CircularPagination({ handlePageChange, activePage, totalPages }) {
//   const next = () => {
//     if (activePage === totalPages) return;
//     handlePageChange(activePage + 1);
//   };

//   const prev = () => {
//     if (activePage === 1) return;
//     handlePageChange(activePage - 1);
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <Button
//         variant="text"
//         className="flex items-center gap-2 rounded-full"
//         onClick={prev}
//         disabled={activePage === 1}
//       >
//         <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
//       </Button>
//       <div className="flex items-center gap-2">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <IconButton
//             key={index + 1}
//             variant={activePage === index + 1 ? "filled" : "text"}
//             color="gray"
//             onClick={() => handlePageChange(index + 1)}
//             className="rounded-full"
//           >
//             {index + 1}
//           </IconButton>
//         ))}
//       </div>
//       <Button
//         variant="text"
//         className="flex items-center gap-2 rounded-full"
//         onClick={next}
//         disabled={activePage === totalPages}
//       >
//         Next
//         <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }



import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ handlePageChange, activePage, totalPages }) {
  console.log("activePage", handlePageChange);
  // const totalPages = 5;
  const next = () => {
    if (activePage === totalPages) return;
    handlePageChange(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    handlePageChange(activePage - 1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <IconButton
          key={i}
          variant={activePage === i ? "filled" : "text"}
          color="gray"
          onClick={() => handlePageChange(i)}
          className={`rounded-full w-10 h-10 ${
            activePage === i ? "bg-blue-400 text-gray-900" : "a"
          }`}
        >
          {i}
        </IconButton>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{renderPaginationButtons()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={activePage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
