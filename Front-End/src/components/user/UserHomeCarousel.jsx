import { Carousel } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { fetchBanners } from "../../api/user/userApi";
export function UserHomeCarousel() { 
  const [banners, setBanners] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await fetchBanners()
      return response
    }
    fetchData().then((data) => {
      setBanners(data.response)
  
    })
  },[])
  
  return (
    
    <Carousel
      className="rounded-none">
      {banners.length > 0 ?(
        banners.map((banner,Index)=>(
          <img
          key={Index}
          src={banner?.bannerImage}
          alt="bannerImage"
          className="h-full w-full object-fit"
        />
          
        ))
      ):( <img
        src="https://res.cloudinary.com/xctacine/image/upload/v1698777486/BannerImage/image-1698777483706-banner%204.jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />)
      // navigation={({ setActiveIndex, activeIndex, length }) => (
      //   <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
      //     {new Array(length).fill("").map((_, i) => (
      //       <span
      //         key={i}
      //         className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
      //           activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
      //         }`}
      //         onClick={() => setActiveIndex(i)}
      //       />
      //     ))}
      //   </div>
      // )}
    
     
      }
    </Carousel>

  );
}











// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// import { fetchBanners } from "../../api/user/userApi";

// export function UserHomeCarousel() {
//   const [banners, setBanners] = React.useState([]);

//   React.useEffect(() => {
//     async function fetchData() {
//       const response = await fetchBanners();
//       console.log("response", response);
//       return response;
//     }

//     fetchData().then((data) => {
//       console.log("data", data);
//       setBanners(data.response);
//     });
//   }, []);

//   return (
//     <Carousel autoPlay interval={6000} infiniteLoop>
//       {banners.map((banner, index) => (
//         <div key={index}>
//           <img src={banner?.bannerImage} alt="bannerImage" />
//         </div>
//       ))}
//     </Carousel>
//   );
// }
