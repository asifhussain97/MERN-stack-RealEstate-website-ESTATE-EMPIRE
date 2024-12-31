import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { addProperty } from '../../../service/api/admin/apiMethod';
import { toast } from 'react-toastify';

import { propertyType } from '../../../utils/types';

type ModalProps = {
  setShowModal: (value: boolean) => void;
  setApi: (value: boolean) => void;
  api:boolean
};

const initialValues: propertyType = {
  name: '',
  description: '',
  imageFile: '',
  image: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters long"),
  imageFile: Yup.mixed()
    .required("An image file is required")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => {            const file = value as File;       return file && [
        'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff', 'image/svg+xml'
      ].includes(file.type)}
    ),
});

const Modal: React.FC<ModalProps> = ({ setShowModal,setApi,api }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (payloads) => {
        console.log(payloads,'gjhgfh');
        
      const data = {
        name: payloads.name,
        description: payloads.description,
        image: payloads.image
      };
      
      addProperty(data)
        .then((response) => {
          if (response.status === "success") {
            toast.success(response.message);
            setApi(!api)
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });

      formik.resetForm();
      setSelectedImage(null);
      setImageUrl(null);
      setShowModal(false);
    },
  });

  const handleImageUpload = (property: React.ChangeEvent<HTMLInputElement>) => {
    const file = property.target.files?.[0];
    if (file) {
      setIsUploading(true);  // Start the upload process
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        formik.setFieldValue('imageFile', file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mycloud");
        formData.append("folder", "images");

        fetch("https://api.cloudinary.com/v1_1/dp4edf7uw/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const croppedImageUrl = data.secure_url;
            setImageUrl(croppedImageUrl);
            formik.setFieldValue('image', croppedImageUrl);
            setIsUploading(false);  // Upload complete
          })
          .catch((error) => {
            console.error("Error uploading image to Cloudinary:", error);
            setIsUploading(false);  // Upload failed
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full overflow-x-hidden md:w-1/2 md:left-1/4 bg-red-500 fixed m-10 md-m-0 z-50 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="flex justify-between p-5">
          <h3 className="text-2xl font-semibold">Modal Title</h3>
          <button
            className="text-2xl"
            onClick={() => setShowModal(false)}
          >
            <span className="text-black text-2xl me-6">x</span>
          </button>
        </div>

        <div className="p-6 mx-auto">
          <form className="w-full" noValidate onSubmit={formik.handleSubmit}>
            <div className="flex w-full">
              <div>
                <div className="mb-4">
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="input"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter your description"
                    className="input"
                    {...formik.getFieldProps('description')}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <div className="text-red-500 text-sm">{formik.errors.description}</div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {selectedImage ? (
                          <img src={selectedImage} alt="Selected" className="h-32" />
                        ) : (
                          <>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        id="imageFile"
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  {formik.errors.imageFile && formik.touched.imageFile && (
                    <div className="text-red-500 text-sm">{formik.errors.imageFile}</div>
                  )}
                </div>
                <div className="flex items-center justify-end mt-12 p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className={`bg-regal-blue authentication_button font-bold uppercase px-6 py-2 text-sm rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 text-center me-2 mb-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;