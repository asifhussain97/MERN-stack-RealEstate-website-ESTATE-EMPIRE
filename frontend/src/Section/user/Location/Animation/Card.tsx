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
      navigate('/details',{state:id})
    }
    const truncateDescription = (desc: string, maxLength: number) => {
      return desc.length > maxLength ? `${desc.slice(0, maxLength)}...` : desc;
    };

    return (
   
        
      <div
        className={cn(
          " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4   bg-gray-100 border  border-transparent border-gray-300 justify-between flex flex-col space-y-4",
       
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
        <div className="group-hover/bento:translate-x-2 transition duration-200 flex">
      <div className='w-4/5'>
      <div className="font-sans font-bold text-neutral-600 dark:text-neutral-800 mb-2 mt-2">
            {item.name}
          </div>
          <div className="font-sans font-semibold text-neutral-600 dark:text-neutral-800 mb-2 mt-2">

          {item?.discountPrice === item?.price ? (
  <span>{item?.price}</span>
) : item?.discountPrice ? (
  <p className="font-medium">
    <span>{item.discountPrice}</span>, <span className="line-through">{item?.price}</span>
  </p>
) : (
  <span>{item?.price}</span>
)}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-800">
          {truncateDescription(item.description, 70)}
          </div>
      </div>
   
          <div className='flex my-auto  justify-end'>
            <button className='authentication_button' onClick={()=>handleView(item._id)}>view</button>
            </div>

        </div>
      </div>
 

    );
  };