import multer from 'multer'
import { CloudinaryStorage } from "multer-storage-cloudinary"
import {v2 as cloudinary} from 'cloudinary'


const profilePic = {
    cloudinary: cloudinary,
    params: {
        folder: 'ProfilePic',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
        public_id: (req: any, file: any) => {
            console.log('cloudinary  filee', file, req.body);
            const originalname = file.originalname.split('.');
            return `image-${Date.now()}-${originalname[0]}`;
        }
    }
}

const profilePicStorage = new CloudinaryStorage(profilePic)
const uploadProfilePic = multer({storage:profilePicStorage}).single('ProfilePic')


export { uploadProfilePic }