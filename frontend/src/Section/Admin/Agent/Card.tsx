import React from 'react';
import {cn } from "../../../animation/cn";
import { verifyLocation, cancelRequest } from '../../../service/api/admin/apiMethod';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type BentoGridProps = {
  className?: string;
  children?: React.ReactNode;
};
export const BentoGrid:React.FC<BentoGridProps> = ({
    className,
    children,
  }) => {
    return (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3  gap-4 w-full ",
          className
        )}
      >
     

        {children}
      </div>
    );
  };

  interface Header {
    url: string;
  }
   
  export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    verify,
    id
  }: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: Header[];
    verify:string;
    id:string;
  }) => {


    const navigate: NavigateFunction = useNavigate();
    const handleVerifyLocation = (id: string) => {
      Swal.fire({
        title: "Are you sure to verify location?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true, // This enables the "Cancel" button
        confirmButtonColor: "#3085d6", // Blue for "Yes"
        cancelButtonColor: "#d33", // Red for "Cancel"
        confirmButtonText: "Yes", // Text for "Yes" button
        cancelButtonText: "Cancel", // Text for "Cancel" button
      }).then((result) => {
        if (result.isConfirmed) {
          // Logic for confirming action
          verifyLocation(id)
            .then((response) => {
              console.log(response);
              navigate('/admin/agent');
            })
            .catch((error) => {
              toast.error(error?.message);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Logic for cancel action (if needed)
          toast.info("Verification canceled");
        }
      });
    };
    
    const handleCancelRequest = (id: string) => {
      Swal.fire({
        title: "Are you sure to cancel this request?",
        text: "This action will mark the request as canceled.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33", // Red for Cancel Request
        cancelButtonColor: "#3085d6", // Blue for Close
        confirmButtonText: "Cancel Request",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          cancelRequest(id)
            .then((response) => {
              toast.success("Request has been successfully canceled.");
              console.log(response); // Debugging
              // Optionally trigger a page refresh or state update here
            })
            .catch((error) => {
              toast.error("Failed to cancel the request.");
              console.error(error);
            });
        }
      });
    };
    

    return (
   
        
      <div
        className={cn(
          " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4   border border-transparent border-neutral-300 justify-between flex flex-col space-y-4",
          className
        )}
      >
           {header && header.length > 0 && (
        <img
          src={header[0].url}
          className="w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          alt=""
          height={400}
        />
      )}
        <div className="group-hover/bento:translate-x-2 transition duration-200 flex justify-between">
      <div>
      <div className="font-sans font-bold text-neutral-600 dark:text-neutral-800 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-800">
            {description}
          </div>
      </div>
      <div className="flex space-x-2">
          {!verify ? (
            <button
              className="bg-purple-700 text-white px-3 py-1 rounded-lg hover:bg-purple-800"
              onClick={() => handleVerifyLocation(id)}
            >
              Verify
            </button>
          ) : (
            <p className="bg-green-500 text-white px-3 py-1 rounded-lg">
              Verified
            </p>
          )}
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            onClick={() => handleCancelRequest(id)}
          >
            Cancel Request
          </button>
        </div>
        
        </div>
      </div>
 

    );
  };