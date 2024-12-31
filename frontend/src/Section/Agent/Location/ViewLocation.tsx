
import { useLocation } from "react-router-dom";
import { LayoutGrid } from "./LayoutGrid";
import { useCallback, useEffect, useState } from "react";
import {
  ApiResponseLocation,
  propertyDataTypes,
  location,
} from "../../../utils/types";
import { getlocationDetails } from "../../../service/api/agent/apiMethod";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";

const ViewLocation = () => {
  const [locationData, setLocationData] = useState<location | null>(null);
  const [data, setData] = useState<propertyDataTypes[] | null>(null);
  const property = useSelector((state: RootState) => state.property);
  const location = useLocation();
  const receivedData = location.state;
  const getDetails = useCallback(() => {
    getlocationDetails(receivedData)
      .then((response: ApiResponseLocation) => {
        if (response.data) {
          setLocationData(response.data as location);
        } else {
          toast.error("No location data found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [receivedData]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  const [state, setState] = useState<
    { id: number; thumbnail: string; className: string }[]
  >([]);

  useEffect(() => {
    if (locationData?.image) {
      const cards = locationData.image.slice(0, 4).map((value, index) => ({
        id: index + 1,
        thumbnail: value.url,
        className:
          index == 0 ? "md:row-span-2 col-span-2" : "row-span-1 col-span-1",
      }));
      setState(cards);
      const filteredPropertys = property.data?.filter((property_data) =>
        locationData.type.some((type) => type === property_data._id)
      );
      setData(filteredPropertys ?? null);
    }
  }, [locationData, property.data]);

  return (
    <div className="  py-20  w-full bg-white">
      <div className="h-96">
        <LayoutGrid cards={state} />
      </div>

      <div className="card mt-5 mx-20 px-10 border flex">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Name
              </th>

              <td className="px-6 py-4">{locationData?.name}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Address
              </th>

              <td className="px-6 py-4 break-words">
                {locationData?.address},{locationData?.state}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                description
              </th>

              <td className="px-6 py-4">{locationData?.description}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                price
              </th>

              <td className="px-6 py-4">{locationData?.price}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                capasity
              </th>

              <td className="px-6 py-4">{locationData?.capasity}</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Propertys
              </th>

              <td className="px-6 py-4">
                {data?.map((value, index) => (
                  <span key={index}>
                    {value.name}
                    {index < data.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewLocation;