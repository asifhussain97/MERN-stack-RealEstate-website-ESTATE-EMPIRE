import React from 'react';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../utils/redux/slice/Auth/AgentAuthSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = () => {
    dispatch(logout());
    navigate("/agent/login");
  };

  return (
    <div className="w-1/3">
      <div className="flex flex-col hover:w-64 md:w-64 bg-white text-gray-600">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col space-y-1">
            {/* Placeholder for any other links you want to add manually */}
            <li>
              <Link
                to="/some-default-path" // Replace with any default link path
                className="relative flex flex-row items-center h-11 hover:bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 border-2"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fas fa-home"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Default Link
                </span>
              </Link>
            </li>

            {/* Logout button */}
            <li>
              <button
                onClick={handleSubmit}
                className="relative flex flex-row items-center h-11 w-full ps-5 hover:bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-center border-2"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
