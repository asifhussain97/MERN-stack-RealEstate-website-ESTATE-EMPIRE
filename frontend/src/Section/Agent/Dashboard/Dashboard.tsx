import React from 'react';

const Dashboard:React.FC = () => {
  return (
    <div>   
    <div className="flex flex-col  items-center  pt-4 w-full">
        <p className="text-2xl font-semibold">Dashboard</p>
      <div className="min-w-[375px] md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 w-full px-20">
      <div className="relative h-32 flex flex-grow  items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                          <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                              stroke="#35D7C2"
                              fill="#35D7C2"
                              stroke-width="0"
                              viewBox="0 0 24 24"
                              className="h-7 w-7"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                          </svg>
                          </span>
                      </div>
                      </div>
                      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">Total Sales</p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">$5000 </h4>
                      </div>
                  </div>
                  <div className="relative flex flex-grow flex-row  items-center rounded-[10px]  border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                          <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                              stroke="#35D7C2"
                              fill="#35D7C2"
                              stroke-width="0"
                              viewBox="0 0 512 512"
                              className="h-6 w-6"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path d="M298.39 248a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V236a12 12 0 0012 12z"></path>
                              <path d="M197 267a43.67 43.67 0 01-13-31v-92h-72a64.19 64.19 0 00-64 64v224a64 64 0 0064 64h144a64 64 0 0064-64V280h-92a43.61 43.61 0 01-31-13zm175-147h70.39a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V108a12 12 0 0012 12z"></path>
                              <path d="M372 152a44.34 44.34 0 01-44-44V16H220a60.07 60.07 0 00-60 60v36h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400h53.05c32.51 0 58.95-26.92 58.95-60V152z"></path>
                          </svg>
                          </span>
                      </div>
                      </div>
                      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">Total Properties</p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">50</h4>
                      </div>
                  </div>
                  <div className="relative flex flex-grow  items-center  border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                          <span className="flex items-center text-brand-500 dark:text-white">
                          <svg
                              stroke="#35D7C2"
                              fill="#35D7C2"
                              stroke-width="0"
                              viewBox="0 0 24 24"
                              className="h-7 w-7"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                          </svg>
                          </span>
                      </div>
                      </div>
                      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                      <p className="font-dm text-sm font-medium text-gray-600">Total Offers</p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">30</h4>
                      </div>
                  </div>
          
         
             
      </div>
    
    </div>
    </div>
  );
}

export default Dashboard;