import { model, Schema } from "mongoose";


function capitalizeLocation(location: string) {
  return location.replace(/\b\w/g, (match:string) => match.toUpperCase());// Helper function to capitalize the first letter of each word
}

const locationSchema = new Schema({
  location: {
    type: [String], 
    unique: true,  
    set: capitalizeLocation, 
  },
});

const Location = model("LocationSchema", locationSchema);
export default Location;
