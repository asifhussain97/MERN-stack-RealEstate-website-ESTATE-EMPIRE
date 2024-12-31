import React, { useEffect, useState } from "react";

import { BentoGrid, BentoGridItem } from "./Animation/Card";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../utils/redux/app/store";
import { useSelector } from "react-redux";
import { getAlllocationwithId } from "../../../service/api/agent/apiMethod";
import { toast } from "react-toastify";
import { location } from "../../../utils/types";

const Location: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [locationData, setLocationData] = useState<location[]>([]);
  const agent = useSelector((state: RootState) => state.agent);

  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = () => {
    getAlllocationwithId(agent.agentId)
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          setLocationData(response.data);
        } else {
          toast.error("No user data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="">
      <div className="flex justify-end me-16 my-5">
        <button
          className="agent_button"
          onClick={() => navigate("/agent/addlocation")}
        >
          Add Property
        </button>
      </div>
      <BentoGrid className="w-full px-10">
        {locationData?.map((item) => (
          <BentoGridItem item={item} />
        ))}
      </BentoGrid>
    </div>
  );
};

export default Location;