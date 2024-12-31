import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid } from "./LayoutGrid";
import { useCallback, useEffect, useState } from "react";
import {
  ApiResponseLocation,
  propertyDataTypes,
  location,
} from "../../../utils/types";
import { getlocationDetails } from "../../../service/api/agent/apiMethod";
import { toast } from "react-toastify";
import {  useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  checkAvailability,
} from "../../../service/api/user/apiMethod";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Details = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [timeData, setTimeData] = useState<string[] | null>(null);
  const [locationData, setLocationData] = useState<location | null>(null);
  const [data, setData] = useState<propertyDataTypes[] | null>(null);

  const property = useSelector((state: RootState) => state.property);
  console.log(property,'aaa')
  const navigate: NavigateFunction = useNavigate();
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

  const handleChange = (value: ValuePiece) => {
    setValue(value);
    if (!locationData || !locationData._id) {
      return;
    }

    checkAvailability(value, locationData._id)
      .then((response) => {
        if (response.status === "success") {
          if (response.data) {
            setTimeData(response.data.map((item) => item.time));
          }
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  const allTimeData: string[] = ["full Day", "morning", "evening"];

console.log(data,'gjfgjgh')

  return (
    <div className="  py-14  w-full bg-white">
      <div className="flex  justify-end">
        <button
          className="authentication_button w-48 mb-5 me-14"
          onClick={() => {
            navigate("/chat");
          }}
        >
          connect
        </button>
      </div>
      <div className="h-96">
        <LayoutGrid cards={state} />
      </div>
      <div className="flex ">
        <div className="card mt-16 ms-32 me-10 px-10 border flex w-3/5 ">
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

                <td className="px-6 py-4 text-lg">
                  {locationData?.discountPrice === locationData?.price ? (
                    <span>{locationData?.price}</span>
                  ) : locationData?.discountPrice ? (
                    <p className="font-medium">
                      <span>{locationData.discountPrice}</span>,{" "}
                      <span className="line-through">
                        {locationData?.price}
                      </span>
                    </p>
                  ) : (
                    <span>{locationData?.price}</span>
                  )}
                </td>
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
        {/* <div className=" mt-5 w-2/5 mx-auto  me-4">
          {/* <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Check Availability
          </h3>
          <div className="flex  justify-center">
            <Calendar
              onChange={handleChange}
              value={value}
              minDate={new Date()}
            />
          </div> }
          <div>
            <ul className="flex px-20">
              {allTimeData.map((time) =>
                !timeData?.includes(time) ? (
                  <li className="mx-4 my-4" key={time}>
                    {time}
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div> */}
      </div>

      <div className="flex  justify-center">
        <button
          className="authentication_button w-1/2 mt-5"
          onClick={() => {
            navigate("/booking", { state: { type: locationData } });
          }}
        >
          book Property
        </button>
      </div>
    </div>
  );
};

export default Details;