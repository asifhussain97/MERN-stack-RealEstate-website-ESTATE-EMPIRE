import React from "react";
type EventCard = {
  name: string;
  image: string;
};
const IconCard: React.FC<EventCard> = ({ image, name }) => {
  return (
    <div className="flex flex-col py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        src="path/to/icon_duplicate.webp"
        alt="."
        className="h-full w-full object-cover object-center"
      />
      </div>

      <div className=" my-2 text-center font-medium text-gray-900">
        <h3>
          <a href="#">{name}</a>
        </h3>
      </div>
    </div>
  );
};

export default IconCard;