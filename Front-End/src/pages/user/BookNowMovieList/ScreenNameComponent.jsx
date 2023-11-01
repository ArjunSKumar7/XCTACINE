
import ShowTimeComponent from "./ShowTimeComponent";

function 
ScreenNameComponent(props) {
  return (
    <div key={props.screen._id} className="border px-4 py-4 rounded-md ">
      <h1 className="font-semibold text-sm  text-gray-100 ">{props.screen.screenName}</h1>
      {props?.screen?.shows?.length > 0
        ? props?.screen?.shows?.map((time, index) => (
           <ShowTimeComponent key={index}  screenObj={props.screen} screen={props.screen.screenName} theatreName={props?.theatreName} theatreId={props.theatreId} time={time} index={index}/>
          ))
        : null}
    </div>
  );
}

export default ScreenNameComponent;