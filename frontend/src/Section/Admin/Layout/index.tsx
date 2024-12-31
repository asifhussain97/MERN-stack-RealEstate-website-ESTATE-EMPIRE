import React from 'react';
import { useState } from "react";
import { BiLayout } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { logout } from '../../../utils/redux/slice/Auth/AdminAuthSlice';
import { useDispatch } from 'react-redux';
const Layout:React.FC = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
    const [isMaxSidebar, setIsMaxSidebar] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    function toggleSidebar() {
      if (window.innerWidth >= 640) {
        setIsMaxSidebar((prevState) => !prevState);
      } else {
        setIsSidebarOpen((prevState) => !prevState);
      }
    }

    const handleSubmit=()=>{
      dispatch(logout());
      navigate('/adminLogin')
    }
  
  return (
    <div className="w-full">
    <nav
      className={`fixed w-full  z-10 flex bg-gray-100  duration-1000 dark:bg-[#0F172A] p-2 items-center justify-between h-16  ${
        isMaxSidebar ? "sm:pl-12" : ""
      }`}
    >
      <div
        className={`w-auto flex   ${isMaxSidebar ? " sm:ml-14" : "sm:ml-60"}`}
      >
        <div
          onClick={toggleSidebar}
          className={`${
            isSidebarOpen ? "hidden sm:block" : " block"
          } transition transform ease-in-out duration-500  flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500   p-3 rounded-full text-white`}
        >
          <BiLayout className="w-4 h-4" />
        </div>
        <div className="logo ml-14 mt-3 transform ease-in-out duration-500 flex-none h-full flex items-center justify-center text-white">
          ESTATE EMPIRE
        </div>
      </div>

      <div
        className={` h-full text-center flex items-center duration-500 me-12 justify-center ${
          isMaxSidebar ? "sm:pe-12" : ""
        }`}
      >
        <div className="flex space-x-3 items-center px-3">
          {/* <div className="flex-none flex justify-center">
            <div className="w-8 h-8 flex ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                alt="profile"
                className="shadow rounded-full object-cover"
              />
            </div>
          </div> */}

          <div className="hidden md:block text-sm md:text-md text-black dark:text-white" onClick={handleSubmit} style={{cursor:"pointer"}}>
            Logout
          </div>
        </div>
      </div>
    </nav>
    <aside
      className={` sm:w-60 ${
        isMaxSidebar ? "sm:-translate-x-48" : "sm:translate-x-0"
      } ${
        isSidebarOpen ? "w-48  " : " w-0 "
      }fixed transition  ease-in-out duration-700 z-40 flex-col h-screen bg-[#1E293B]`}
    >

      <div className="flex justify-between  h-16 w-full">
      <div
        className={` translate-x-6  transition transform ease-in duration-300 flex items-center   ${
          isMaxSidebar ? "sm:hidden " : " sm:block "
        }${
          isSidebarOpen ? "block " : "hidden "
        }  border-white dark:border-[#0F172A] bg-[#1E293B]  mt-3  rounded-full h-12`}
      >
        <div className="    bg-gradient-to-r dark:from-cyan-500  from-indigo-500 via-purple-500 to-purple-500 sm:px-5   py-1 rounded-full text-white  ">
          <div className="transform ease-in-out duration-300 m  sm:block">
          ESTATE EMPIRE
          </div>
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className={`${
          isSidebarOpen ? "block " : "hidden "
        } transition transform ease-in-out mt-3  duration-500 h-12 flex border-4 border-black dark:border-[#f8f9fc] bg-[#fbfcff] dark:hover:bg-blue-500 hover:bg-purple-500   p-3 rounded-full text-black`}
      >
        <BiLayout className="w-4 h-4" />
      </div>
      </div>

       <div
        className={`max  text-white mt-5 flex flex-col space-y-2 h-[calc(100vh)] ${
          isMaxSidebar ? "sm:hidden" : "sm:block"
        } ${
          isSidebarOpen ? "block " : "hidden "
        }` }
      >
        <Link  to={'/admin'}>
        <div className="hover:ml-4 mt-5 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3" >
          <RiHome2Line className="w-4 h-4" />
          <div className="text-white">Home</div>
        </div></Link>
        <Link   to={'/admin/usermanagment'}>
        <div className="hover:ml-4 mt-5 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3" >
          <FaRegUserCircle className="w-4 h-4" />
          <div className="text-white">User List</div>
        </div>
        </Link>
        <Link   to={'/admin/Propertytype'}>
        <div className="hover:ml-4 mt-5 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3" >
          <FaRegUserCircle className="w-4 h-4" />
          <div className="text-white">Property</div>
        </div>
        </Link>
        {/* <Link   to={'/admin/vendertype'}>
        <div className="hover:ml-4 mt-5 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3" >
          <FaRegUserCircle className="w-4 h-4" />
          <div className="text-white">Vender Type</div>
        </div>
        </Link> */}

        <Link   to={'/admin/agent'}>
        <div className="hover:ml-4 mt-5 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3" >
          <FaRegUserCircle className="w-4 h-4" />
          <div className="text-white">Agents</div>
        </div>
        </Link>
        {/* <Link   to={'/admin/vender'}>
        <div className="hover:ml-4 mt-5 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3" >
          <FaRegUserCircle className="w-4 h-4" />
          <div className="text-white">Vender</div>
        </div>
        </Link> */}
      </div>

      <div
        className={`mini  mt-5 flex flex-col space-y-2 w-full  ${
          isMaxSidebar ? "sm:block" : ""
        } ${
          isSidebarOpen ? "block " : "hidden "
        }`}
      >
        <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
          <RiHome2Line className="w-4 h-4" />
        </div>
        <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
          <FaRegUserCircle className="w-4 h-4" />
        </div>
        <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
          <RiHome2Line className="w-4 h-4" />
        </div>
      </div> 
      
    </aside>

    <div
      className={`content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ${
        isMaxSidebar ? "" : "sm:ml-60"
      }`}
    >
    <Outlet />
    </div>
  </div>
  );
}

export default Layout;
