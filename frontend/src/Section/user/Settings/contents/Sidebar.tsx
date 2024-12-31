import React from 'react';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { profileData } from '../../../../utils/Contents';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../utils/redux/slice/Auth/UserAuthSlice';

const Sidebar:React.FC = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = () => {
    dispatch(logout());
    navigate("/login");
  };


  return (
    <>

<div className="w-1/3 ">
        <div className=" flex flex-col   hover:w-64 md:w-64 bg-white  text-gray-600 ">
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col  space-y-1">

            <li>
                  <Link
                    to={'/agent/wallet'}
                    className="relative flex flex-row items-center h-11 hover:bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600    dark:focus:ring-cyan-800 border-2 "
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <i className="fas fa-users"></i>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Wallet
                    </span>
                  </Link>
                </li>
              {profileData.map((profile) => (
                <li>
                  <Link
                    to={profile.path}
                    className="relative flex flex-row items-center h-11 hover:bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600    dark:focus:ring-cyan-800 border-2 "
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <i className="fas fa-users"></i>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      {profile.name}
                    </span>
                  </Link>
                </li>
              ))}
                 <li>
                  <button
                         onClick={handleSubmit}
                    className="relative flex flex-row items-center h-11 w-full ps-5 hover:bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-center  border-2 "
                  >
                 
           
                      Logout
            
                  </button>
                </li>
            </ul>
          </div>
        </div>
      </div>




    
    </>

  );
}




export default Sidebar;