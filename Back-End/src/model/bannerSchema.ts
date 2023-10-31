import { Schema,model} from "mongoose";


    const bannerSchema = new Schema ({
        bannerName:{type:String}, 
        bannerDescription:{type:String},
        bannerImage:{type:String},
        bannerState:{type:Boolean,
        default:false}
    
    })  

    const Banner = model('BannerSchema',bannerSchema)
    export default Banner