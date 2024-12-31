import React from "react";
import { BentoGrid, BentoGridItem } from "./Card";
import { useLocation } from "react-router-dom";
interface locationDataType {
  _id: string; // or number, based on your data type
  name: string;
  description: string;
  image: string; // Adjust if 'image' can be undefined
  verify: string;
}

const ViewLocation: React.FC = () => {
  const location = useLocation();
  const receivedData = location.state as locationDataType[]; // Type the received data

  const filteredData = receivedData?.filter((item) => item.verify !== "cancelled");

  return (
    <div className="">
      <BentoGrid className="w-full  px-10">
        {filteredData?.map((item: locationDataType, i: number) => ( // Explicitly type 'item' and 'i'
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            header={item.image ? [{ url: item.image }] : undefined} // Assuming header expects an array of objects
            verify={item.verify}
            id={item._id}
            className={""}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default ViewLocation;
