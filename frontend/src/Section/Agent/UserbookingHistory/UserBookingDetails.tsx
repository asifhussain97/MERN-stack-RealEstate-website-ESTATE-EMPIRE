import React, { useEffect, useState } from "react";

// import VenderCard from "./VenderCard";
import { getUserBookingDetails } from "../../../service/api/agent/apiMethod";
import { toast } from "react-toastify";
import { bookingData } from "../../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";

const UserBookingDetails: React.FC = () => {

  const [receivedData,setReceivedData]=useState<bookingData|null>(null)


  const book = useSelector((state: RootState) => state.book);


useEffect(() => {
  getDetails()
}, []);


const getDetails=async()=>{
  try {

    const response = await getUserBookingDetails(book.data);

    if(response.data){
      setReceivedData(response.data)

    }

  
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred");
    }
  }
}



console.log(receivedData,'hjhgjh');


  return (
    <div className="flex flex-col min-h-screen mx-24 ">

  
    <div className=" bg-gray-50 py-12">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Booked History Details</h1>
      </header>
      <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-1 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p>{receivedData?.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p>{receivedData?.time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p>{receivedData?.locationData.address},{receivedData?.locationData.state}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p> {receivedData?.time=='full Day'?(<p>12 hours</p>):(<p>6 hours</p>)}  {receivedData?.time=='evening'?(<p>(4:00 PM to 11:00 PM)</p>):receivedData?.time=='full Day'?(<p>(9:00 AM to 11:00 PM)</p>):(<p>(9:00 AM to 3:00 PM)</p>)}</p>
                </div>
                {/* <div>
                  <p className="text-muted-foreground">Group Size</p>
                  <p>{receivedData?.count} people</p>
                  </div> */}
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <p>{receivedData?.total}</p>
                  </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">History Details</h2>
              <div className="space-y-4">
                <p>
                {receivedData?.locationData.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src= {receivedData?.locationData.image[0].url}
                    width={300}
                    height={200}
                    alt="History Image 1"
                    className="rounded-lg object-cover"
                  />
                  <img
                    src= {receivedData?.locationData.image[1].url}
                    width={300}
                    height={200}
                    alt="History Image 2"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* <div>
              <h2 className="text-xl font-semibold mb-2">vender Details</h2>
              <div className="space-y-4 mt-10">
         
          


<div className="flex ">
       
 
          <div
            className="grid grid-cols-2 gap-4 transition-transform duration-500 ease-in-out"
         
          >
            {receivedData?.service.map((value:any) => (
       
                <VenderCard vender={value.data}  receivedData={receivedData} status={value.status} />
           
            ))}
          </div>
        </div>
      
 
              </div>
            </div> */}
          </div>
          
        </div>
      </main>
    </div>
    </div>
  );
};

export default UserBookingDetails;