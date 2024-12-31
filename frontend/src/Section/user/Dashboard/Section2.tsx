import React from "react";
import { dashbordDatas } from "../../../utils/Contents";
import DashboardCard from "../../../components/user/DashboardCard";
const Section2: React.FC = () => {
  return (
    <div>
      <h1 className="h1">Why Estate Empire?</h1>
      <div className="flex justify-evenly  my-4">
        {dashbordDatas.map((dashbordData) => (
          <DashboardCard key={dashbordData.name} {...dashbordData} />
        ))}
      </div>
    </div>
  );
};

export default Section2;