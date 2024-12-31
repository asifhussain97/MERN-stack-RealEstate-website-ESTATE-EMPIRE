import React from 'react';
import {cn } from "../../../../animation/cn";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { location } from '../../../../utils/types';

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

  interface BentoGridItemProps {
    item: location;
 
  }
   
  export const BentoGridItem:React.FC<BentoGridItemProps> = ({
item
 
  } ) => {
    const navigate: NavigateFunction = useNavigate();

    const handleView=(id:string|undefined)=>{
      navigate('/agent/viewlocation',{state:id})
    }

    const handleEdit=(id:string|undefined)=>{
      console.log(id);
      navigate('/agent/editlocation',{state:{item}})

    }

    return (
   
        
        <div
          className={cn(
            " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4   bg-gray-100 border border-transparent justify-between flex flex-col space-y-4",
        
          )}
        >
           {item?.image && (
        <img
          src={item.image[0]?.url}
          className="w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          alt=""
          height={400}
        />
      )}
        <div className="group-hover/bento:translate-x-2 transition duration-200">
      
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-600 mb-2 mt-2">
            {item.name}
          </div>
          <div className="font-sans font-semibold text-neutral-600 dark:text-neutral-600 mb-2 mt-2">
            { item.price}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-600">
            {item.description}
          </div>
          <div className="font-sans text-sm text-gray-500 mt-3">
            Status: <span className={
              item.verify === true ? 'text-green-500' :
              item.verify === false ? 'text-yellow-500' :
              item.verify === 'cancelled' ? 'text-red-500' : 
              'text-gray-500'
            }>
              {item.verify === true ? 'Verified' : 
              item.verify === false ? 'Unverified' : 
              item.verify === 'cancelled' ? 'Request Cancelled' : 
              'Unknown'}
            </span>
          </div>

          <div className='flex mt-5'>
            <button className='me-5 text-gray-700 hover:text-black border border-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2' onClick={()=>handleView(item._id)}>view</button>
            <button className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 '  onClick={()=>handleEdit(item._id)}>edit</button>
            </div>
        </div>
      </div>
 

    );
  };