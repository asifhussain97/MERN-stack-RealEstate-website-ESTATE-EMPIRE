import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { CropperDemoProps } from "../../../../../utils/types";

// Define the props type


const CropperDemo: React.FC<CropperDemoProps> = ({ src, getCroppedFile,handleClose }) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
  
  
    const imageElement = cropperRef.current as any; 
    const cropper = imageElement?.cropper;
    const img = cropper.getCroppedCanvas().toDataURL();
  
    const formData = new FormData();
  
    // Append the cropped image data URI to FormData as a Blob
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        formData.append("file", blob);
        formData.append("upload_preset", "mycloud");
        formData.append("folder", "images");
  
        fetch("https://api.cloudinary.com/v1_1/dp4edf7uw/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const croppedImageUrl = data.secure_url;
            getCroppedFile(croppedImageUrl);
         
          })
          .catch((error) => {
            console.error("Error uploading cropped image to Cloudinary:", error);
          });
      })
      .catch((error) => {
        console.error("Error converting data URI to Blob:", error);
      });   
  };

  return (
    <>
      <Cropper
        src={src}
        className="w-full"
        style={{ maxHeight: '300px' }}
        initialAspectRatio={16 / 9}
        guides={false}
        ref={cropperRef}
      />
      <button
        className=" mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        onClick={handleClick}
        autoFocus
      >
        Crop
      </button>
      <button onClick={handleClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Decline
                </button>
    </>
  );
};

export default CropperDemo;