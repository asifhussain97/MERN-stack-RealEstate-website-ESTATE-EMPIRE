import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../utils/redux/slice/Auth/UserAuthSlice";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../assets/icons/unnamed.webp";
import { RootState } from "../../../utils/redux/app/store";
const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);



  const navigate: NavigateFunction = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuDropdownToggle = () => {
    // Toggle the menuDropdown state
    setMenuDropdown(!menuDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
    if (
      menuDropdownRef.current &&
      !menuDropdownRef.current.contains(event.target as Node)
    ) {
      setMenuDropdown(false);
    }
  };

  const handleSubmit = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-100 ">
      <nav className="bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={handleMenuDropdownToggle}
              >
                <svg
                  className={`block h-6 w-6 ${
                    menuDropdown ? "hidden" : "block"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className={`h-6 w-6 ${menuDropdown ? "block" : "hidden"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-10 w-10 " src={logo} alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="bg-white text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/location"
                    className="text-gray-900   rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Property
                  </Link>

                  <a
                    href="#"
                    className="text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                  >
                    abouts
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user.token ? (
                <div className="relative ml-3" ref={dropdownRef}>
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
                      className="absolute  right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        Settings
                      </Link>
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
                </div>
              ) : (
                <p>
                  <Link to={"/login"}>Login</Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          className={`sm:hidden ${menuDropdown ? "block" : "hidden"}`}
          id="mobile-menu"
          ref={menuDropdownRef}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
      <div className="bg-gray-100  mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;