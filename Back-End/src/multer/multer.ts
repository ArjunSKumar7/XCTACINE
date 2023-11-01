import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const profilePic = {
  cloudinary: cloudinary,
  params: {
    folder: "ProfilePic",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "webp",
      "gif",
      "jfif",
      "webp",
    ],
    public_id: (req: any, file: any) => {
      const originalname = file.originalname.split(".");
      return `image-${Date.now()}-${originalname[0]}`;
    },
  },
};
const profilePicStorage = new CloudinaryStorage(profilePic);
const uploadProfilePic = multer({ storage: profilePicStorage }).single(
  "ProfilePic"
);

const bannerImage = {
  cloudinary: cloudinary,
  params: {
    folder: "BannerImage",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "webp",
      "gif",
      "jfif",
      "webp",
    ],
    public_id: (req: any, file: any) => {
      const originalname = file.originalname.split(".");
      return `image-${Date.now()}-${originalname[0]}`;
    },
  },
};
const bannerImageStorage = new CloudinaryStorage(bannerImage);
const uploadBannerImage = multer({ storage: bannerImageStorage }).single(
  "bannerImage"
);

export { uploadProfilePic, uploadBannerImage };
