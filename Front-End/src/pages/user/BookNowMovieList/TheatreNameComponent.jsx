import React from 'react'
import ScreenNameComponent from "../BookNowMovieList/ScreenNameComponent"

function TheaterNameComponent(props) {
    console.log("props", props);
  return (
    <div key={props?.screenData?._id} className="border px-4 py-4 rounded-md">
                      <h1 className="font-bold text-lg  text-gray-100">
                        {props?.screenData ?.theatreName}
                      </h1>
                      
                      {props?.screenData?.screen?.length > 0
                        ?  (props?.screenData?.screen.map((screenData, index) => (
                          <ScreenNameComponent key={index}  screen={screenData} theatreName={props?.screenData?.theatreName} theatreId={props?.screenData?._id} />  
                          )))
                        : null}
                    </div>
  )
}

export default TheaterNameComponent