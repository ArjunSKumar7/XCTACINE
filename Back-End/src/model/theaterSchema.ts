import {Schema,model} from 'mongoose'





const theatreSchema = new Schema (
    {
        Name:{
            type:String,
            required:true
        },
    
        Email:{
            type:String,
            required:true,
            unique:true
        },
        Password:{
            type:String,
            required:true,
            minlength:6
        },
        // ProfilePic:{
        //     type:Array
        // },

        // blockedStatus:{

        //     type:Boolean,
        //     default:false
        // },

      


    }

)


const Theater=model('TheatreSchema',theatreSchema)
export default Theater