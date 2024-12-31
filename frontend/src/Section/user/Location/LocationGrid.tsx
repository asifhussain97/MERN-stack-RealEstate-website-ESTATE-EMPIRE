import React from 'react';
import {cn } from "../../../animation/cn";
import { NavigateFunction, useNavigate } from 'react-router-dom';


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
          "grid grid-cols-1 md:grid-cols-3  gap-4  ",
          className
        )}
      >
     

        {children}
      </div>
    );
  };
   
  export const BentoGridItem = ({
    className,
    title,
    description,
    header,
  
  }: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: object;
   
  }) => {
    const navigate: NavigateFunction = useNavigate();


    return (
   
        
      <div
        className={cn(
          " rounded-xl group/bento hover:shadow-2xl transition duration-600 shadow-input  p-4 w-96  bg-white border border-transparent justify-between flex flex-col space-y-4",
          className
        )}
      >
           {header && (
        <img
          src={header[1].url}
          className=" transition-transform duration-700 ease-in-out h-60 transform hover:scale-105"
          alt=""
        
        />
      )}
        <div className="group-hover/bento:translate-x-2 transition duration-200 flex justify-between">
      <div>
      <div className="font-sans font-bold text-neutral-600  mb-2 mt-2">
            {title}
          </div>
          
          <div className="font-sans font-normal text-neutral-600 text-xs ">
            {description}
          </div>
      </div>
      <div>
        <button className='authentication_button' onClick={()=>navigate('/details')}>view</button>
      </div>
        
        </div>
      </div>
 

    );
  };