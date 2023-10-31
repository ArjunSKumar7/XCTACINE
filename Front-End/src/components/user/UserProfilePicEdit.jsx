import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {profilePicEdit} from "../../api/user/userApi"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function UserProfilePicEdit(props) {
  const userId = useSelector((store) => store.user.userId);
 
  const [selectedFile, setSelectedFile] = useState(null);
  const [image,setmage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setmage(e.target.files[0]);
    if (file) {
      // Display a preview of the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setSelectedFile({ file, imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async() => {

    if (selectedFile) {
      // Prepare to send the selected file to your backend
      // const formData = new FormData();
      // formData.append("profilePic", image); // Use the appropriate field name
      // console.log("formData", formData);
      // Make an API request to upload the image

      // You can use fetch or any other library you prefer for API calls
      // Replace 'your-upload-api-endpoint' with the actual API endpoint
      // console.log("formData",image);
     const response = await profilePicEdit(userId,image);
      console.log("response", response);
      if(response?.status === 200){
        toast.success(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
       
 props?.handleOpen()
      }
    
  };

  return (
    <>
    
      <Dialog open={props?.open} handler={props?.handleOpen}>
      
        <DialogHeader>Upload Profile Picture</DialogHeader>
        <DialogBody>
        
          <input type="file" accept="image/*" value={''} name="ProfilePic" onChange={handleFileChange} />
          {selectedFile && (
            <div>
              <img src={selectedFile.imageUrl} alt="Selected"
                style={{ width: "400px", height: "400px" }} />
            </div>
          )}
        </DialogBody>
        <DialogFooter>

          <Button
            variant="text"

            color="red"
            onClick={props?.handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpload}>
            <span>Upload</span>
          </Button>

        </DialogFooter>
         
      </Dialog>
    </>
  );
}
