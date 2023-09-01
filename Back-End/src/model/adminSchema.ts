import { Schema,model} from "mongoose";



const adminSchema =new Schema( {
   Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        minlength:6    }
}
)

const Admin = model('Admin',adminSchema)
export default Admin