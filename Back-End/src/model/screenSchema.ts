import {Schema,model} from 'mongoose';


const screenSchema =new Schema( {
    screenName:{
        type:String,
        required:true
    },
    rows:{
        type:Number,
        required:true
    },
    columns:{
        type:Number,
        required:true
    },
    shows:{
        type:Array
    },
    theatreId:{
        type:String,
        required:true
    },
    theatreName:{
        type:String,
        required:true
    },
    movieTitle:
    {
        type:String
    },
    movieId:{
        type:String
    },
    ticketPrice:{
        type:Number
    },
    selectedDates:{
        type:Array
    }
})

const Screen = model("ScreenSchema",screenSchema)
export default Screen;  