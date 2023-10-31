import { Carousel } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { fetchBanners } from "../../api/user/userApi";
export function UserHomeCarousel() { 
  const [banners, setBanners] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await fetchBanners()
      console.log("response", response)
      return response
    }
    fetchData().then((data) => {
      console.log("data", data)
      setBanners(data.response)
  
    })
  },[])
  
  return (
    
    <Carousel
      className="rounded-none">
        {console.log(banners)}
      {banners.length > 0 ?(
        banners.map((banner,Index)=>(
          console.log("banner", banner),
          <img
          key={Index}
          src={banner?.bannerImage}
          alt="bannerImage"
          className="h-full w-full object-fit"
        />
          
        ))
      ):( <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
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