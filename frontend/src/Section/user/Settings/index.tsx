import React, { useEffect, useState } from 'react';
import profileicon from '../../../assets/icons/space-default.webp'
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import { editProfileImg, getUserDeatails } from '../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';
import { ApiResponse, userDataTypes } from '../../../utils/types';
import ProfileModal from './contents/ProfileModal';
import CropperDemo from './contents/cropper/Cropper';


import Sidebar from './contents/Sidebar';


const Settings: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [userData, setUserData] = useState<userDataTypes | null>(null);
  const [api, setApi] = useState<boolean>(false);
const user = useSelector((state: RootState) => state.user);
useEffect(() => {
  getDetails()

}, [api]);
const getDetails=()=>{
  getUserDeatails(user.userId)
  .then((response:ApiResponse) => {
    if (response && response.data) {
      console.log(response.data);
      
      setUserData(response.data as userDataTypes);
    } else {
      toast.error("No user data found");
    }
  })
  .catch((error) => {
    console.log(error);
    
  });
}

const [uploadedImage, setUploadedImage] = useState<string | null>(null);
const [, setCroppedImage] = useState<string | null>(null);


const handleUpload = (imageData: string) => {
  setUploadedImage(imageData);
  setCroppedImage(null);

};

const handleClose = () => {
  setShowModal(false);
};

const getCroppedFile = (croppedData: string) => {
  setCroppedImage(croppedData);
  setUploadedImage(null)


  editProfileImg(user.userId,croppedData)
  .then((response:object) => {
console.log(response,"kjhfdkfdkj");

  })
  .catch((error) => {
    toast.error(error?.message);
  });



};

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  const files = e.target.files;
  if (files && files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      handleUpload(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  } else {
    alert("Please select a file.");
  }
};



  return (
    <div className="h-screen flex flex-col ">
      <div className="flex-grow flex justify-center items-center lg:px-48">
      <Sidebar />
        <div className="sm:w-2/3 w-96 ">
        <div
  className="w-full  pt-5 border-2"
  style={{ background: 'linear-gradient(to right, rgb(165 243 255), rgb(224 252 255 / 26%))' }}
>

        <div className="flex items-center gap-4  py-8 px-16 border-b-2">


        <label
          htmlFor="contained-button-file"
          className=" px-4 py-2 mt-4 text-white rounded cursor-pointer mb-4"
        >
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            className="hidden"
            onChange={onChange}
          />
       <img className="w-48 h-48 rounded-full"  onClick={() => setShowModal(true)}  src={userData?.image?userData.image:profileicon} alt="" />

        </label>
  
    <div className="font-large dark:text-white">
        <div>Hi {userData?.username}</div>
        <div className="text-lg text-gray-500 dark:text-gray-400">welcome to Estate Empire!</div>
        <div className="flex mt-3">
  <button className="authentication_button  h-8 pt-1" onClick={() => setShowModal1(true)}  >Edit Profile</button>
</div>
    </div>
</div>


<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Name
                </th>
                
                <td className="px-6 py-4">
                {userData?.username}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Email
                </th>
              
                <td className="px-6 py-4">
                {userData?.email}
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Phone Number
                </th>
                
                <td className="px-6 py-4">
                {userData?.phone}
                </td>
            </tr>
        </tbody>
    </table>
</div>
    </div>

    {showModal1 ? (
        <>
       <ProfileModal setShowModal={setShowModal1} userData={userData} setApi={setApi} api={api}/>
       
        </>
      ) : null}




{showModal &&uploadedImage !==null ? (
        <>
 <div id="default-modal" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full   overflow-x-hidden bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-screen">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleClose}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
              <div className={uploadedImage !==null?`w-full`:`hidden`}>

{uploadedImage !==null?(   <CropperDemo
    src={uploadedImage!}
    handleClose={handleClose}
    getCroppedFile={getCroppedFile}
  />):(<p>upload image</p>)}

</div>
              </div>
    
            </div>
          </div>
        </div>


        </>
      ) : null}



        </div>
      </div>
    </div>
  );
};

export default Settings;