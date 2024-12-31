import React from "react";
import { locationType } from "../../utils/Contents";

const LocationCard: React.FC<locationType> = ({
  name,
  image,
  location,
  price,
}) => {
  return (
    <div className="p-3 py-4 border  hover:shadow-2xl hover:shadow-cyan-500/50">
      <img
        src={image}
        className="mb-4 h-48 w-full transition-transform duration-700 ease-in-out transform hover:scale-105"
        alt={name}
      />
      <div className=""></div>
      <div>
        <span className="text-base font-medium mb-2">{name}</span>
        <p className="font-sm">{price}</p>
        <span className="font-sm">{location}</span>
      </div>
    </div>
  );
};

export default LocationCard;