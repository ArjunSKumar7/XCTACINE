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
            Location:{
                type:String,
                required:true,
            },
            ProfilePic:{
                type:Array
            },

            blockedStatus:{

                type:Boolean,
                default:false
            },
            approvalStatus:{
                type:Boolean,
                default:false
            },

            

        


        },
        {
            timestamps:true,
           
        }

    )


    const Theatre=model('TheatreSchema',theatreSchema)
    export default Theatre