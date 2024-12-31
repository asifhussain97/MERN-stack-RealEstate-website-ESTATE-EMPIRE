import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import { BiLayout } from "react-icons/bi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiHome2Line } from "react-icons/ri";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { logout } from '../../../utils/redux/slice/Auth/AgentAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import { IoNotifications } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Notification from './Notification';
const Layout:React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.agent);


  const navigate: NavigateFunction = useNavigate();
    const [isMaxSidebar, setIsMaxSidebar] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => {
      setOpen(open);
    };

    function toggleSidebar() {
      if (window.innerWidth >= 640) {
        setIsMaxSidebar((prevState) => !prevState);
      } else {
        setIsSidebarOpen((prevState) => !prevState);
      }
    }



  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };



  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  
  };



  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const handleSubmit=()=>{
      dispatch(logout());
      navigate('/agent/login')
    }
  
  return (
    <div className="w-full bg-[#DFF5EB] min-h-screen h-full">
    <nav
      className={`fixed w-full  z-10 flex bg-gray-100  duration-1000  p-2 items-center justify-between h-16  ${
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
          } transition transform ease-in-out duration-500  flex border-4 border-white  bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700  hover:bg-purple-500   p-3 rounded-full text-white`}
        >
          <BiLayout className="w-4 h-4" />
        </div>
        <div className="logo ml-14 mt-3 transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
        ESTATE EMPIRE
        </div>
      </div>

      <div
        className={` h-full text-center flex items-center duration-500 me-12 justify-center ${
          isMaxSidebar ? "sm:pe-12" : ""
        }`}
      >


<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
  <p className='me-5 text-2xl text-green-600 cursor-pointer' onClick={()=>   navigate("/agent/chat")}><IoChatbubbleEllipsesOutline /></p>
  <IoNotifications className='me-5 text-2xl text-green-600 cursor-pointer' onClick={()=>toggleDrawer(true)}/>
      {user.agentToken ?(<div className="relative ml-3" ref={dropdownRef}>
                    <div>
                      <button
                        type="button"
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                        onClick={handleDropdownToggle}
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
      
                    {dropdownOpen && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex={-1}
                      >
                        
                        <button
                        onClick={()=>{
                          navigate('/agent/settings')
                          setDropdownOpen(!dropdownOpen)

                        
                        }}
                      
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-1"
                        >
                          Settings
                        </button>
                        <button
                    
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-2"
                          onClick={handleSubmit}
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>):(<p><Link to={'/login'}>Login</Link> </p>)}
                  
                </div>

                {open&&(<Notification  toggleDrawer={toggleDrawer}  open={open} />)}
      
      </div>
    </nav>
    <aside
      className={` sm:w-60 ${
        isMaxSidebar ? "sm:-translate-x-48" : "sm:translate-x-0"
      } ${
        isSidebarOpen ? "w-48  " : " w-0 "
      }fixed transition  ease-in-out duration-700 z-40 flex-col h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br`}
    >

      <div className="flex justify-between  h-16 w-full">
      <div
        className={` translate-x-6  transition transform ease-in duration-300 flex items-center   ${
          isMaxSidebar ? "sm:hidden " : " sm:block "
        }${
          isSidebarOpen ? "block " : "hidden "
        }  border-white   mt-3  rounded-full h-12`}
      >
        <div className="   font-bold text-2xl sm:px-5   py-1 rounded-full text-white  ">
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
        <NavLink  to={'/agent'} className={({ isActive, isPending }) =>
    isPending ? "" : isActive ? "bg-red-500" : ""
  }>
        <div className="hover:ml-4 mt-5 w-full text-white  hover:text-black  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3 border" >
          <RiHome2Line className="w-4 h-4" />
          <div className="text-white hover:text-black">Home</div>
        </div></NavLink>
        <NavLink  to={'/agent/location'} >
        <div className="hover:ml-4  w-full text-white mt-1 hover:text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3  border" >
          <RiHome2Line className="w-4 h-4" />
          <div className="text-white hover:text-black">Property</div>
        </div></NavLink>
        



        
        <NavLink  to={'/manager/UserbookingHistory'} >
        <div className="hover:ml-4  w-full text-white mt-1 hover:text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3  border" >
          <RiHome2Line className="w-4 h-4" />
          <div className="text-white hover:text-black">User booking History</div>
        </div></NavLink>

        <NavLink  to={'/manager/offer'} >
        <div className="hover:ml-4  w-full text-white mt-1 hover:text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  p-2 pl-8 rounded-lg transform ease-in-out duration-500 flex flex-row items-center space-x-3  border" >
          <RiHome2Line className="w-4 h-4" />
          <div className="text-white hover:text-black">Offer</div>
        </div></NavLink>
 
    
      </div>

      <div
        className={`mini  mt-5 flex flex-col space-y-2 w-full  ${
          isMaxSidebar ? "sm:block" : ""
        } ${
          isSidebarOpen ? "block " : "hidden "
        }`}
      >
        <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br p-3 rounded-full transform ease-in-out duration-300 flex">
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