import React from "react";
type DashbordCard = {
  name: string;
  image: string;
  para?: string;
};
const DashboardCard: React.FC<DashbordCard> = ({ image, name, para }) => {
  return (
    <div>
      <div className="p-8  flex flex-col items-center py-4">
        <img src={image} className="w-28 h-16 mb-4" alt="" />
        <span className="text-base font-medium mb-2">{name}</span>
        <span className="font-sm">{para}</span>
      </div>
    </div>
  );
};

export default DashboardCard;