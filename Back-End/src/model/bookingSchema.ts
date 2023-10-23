import { Schema,model } from "mongoose";


const bookingSchema = new Schema({
    ticketPrice: {
        type: Number,
    
      },
      userId: {
     type: String,
    
      },
      email: {
        type: String,
    
      },
      userName: {
        type: String,
    
      },
      showDate: {
        type: String,
    
      },
      showTime:{type:String},

      bookedDate: {
        type: Date,
    
      },
      paymentId: {
        type: String,
    
      },
      paymentStatus:{
         type:String
      },
      bookingStatus:{
        type:String
     },
      movieName: {
        type: String,
    
        
      },
      theaterId: {
        type: String,     
      },
      screenName: {
        type: String,
    
      },
      screenId: {
        type: String,
    
      },
      startAt: {
        type: String,
        trim: true,
      },
      bookedSeats: {
        type: [],
    
      },
      theaterName: {
        type: String,
    
      },
      totalAmount: {
        type: Number,
    
      },
      ticketCount: {
        type: Number,
    
      },
      movieId: {
        type:String,   
      
    
      },
      checkin: {
        type: Boolean,
        default: false,
      },
      qrCode: {
        type: String,
       
      },
    }


,{
    timestamps:true,
   
})

const Booking  = model('BookingSchema',bookingSchema)
export default Booking
