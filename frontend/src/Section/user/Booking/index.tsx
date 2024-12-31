import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import { eventDataTypes, vender, venderType } from '../../../utils/types';
import { getAllVenderType } from '../../../service/api/admin/apiMethod';
import Select from 'react-dropdown-select';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import { bookingEvent, checkAvailability, filterVender } from '../../../service/api/user/apiMethod';
import { toast } from 'react-toastify';
import { initialValues,validationSchema } from './validation';


const Booking: React.FC = () => {
  const [venderData, setVenderData] = useState<venderType[]>([]);
  const [serviceData, setServiceData] = useState<vender[]>([]);
  const [data, setData] = useState<eventDataTypes[] | null>(null);
  const [availableTimes] = useState<string[]>(['full Day', 'morning', 'evening']);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const location = useLocation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const receivedData = location.state?.type?.type || [];
  const event = useSelector((state: RootState) => state.event);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
console.log(event,'fjdhfkj');

  useEffect(() => {
    getDetails();
    const filteredEvents = event.data?.filter((event_data) =>
      receivedData.some((type: string) => type === event_data._id)
    );
    setData(filteredEvents ?? null);
  }, []);

  const getDetails = async () => {
    try {
      const response = await getAllVenderType();
      if (response && Array.isArray(response.data)) {
        setVenderData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      getVenderDetails(selectedTypes);
    
  }, [selectedTypes]);

  const getVenderDetails = async (selectedTypes: string[]) => {
    try {
      const response = await filterVender(selectedTypes);
      
      if (response && Array.isArray(response.data)) {
        setServiceData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvailableTimes = async (date: string, locationId: string) => {
    try {
      const dateObj = new Date(date);
      const response = await checkAvailability(dateObj, locationId);
      if (response.status === 'success' && Array.isArray(response.data)) {
        const bookedTimes = response.data.map((value: any) => value.time);
        setBookedTimes(bookedTimes);
      } else {
        setBookedTimes([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        service: selectedIds,
        locationData: location.state?.type._id,
        manager: location.state?.type.manager,
        user: user.userId,
        status: 'pending'
      };

      bookingEvent(data)
        .then((response) => {
          if (response.status === 'success') {
            toast.success(response.message);
            navigate('/payment', { state: { data: response.data } });
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });

      formik.resetForm();
    },
  });

  const handleTypeChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setSelectedTypes(selectedValues);
  };

  const [selectedIds, setSelectedIds] = useState<{ data: string, status: string }[]>([]);

  const handleCheckboxChange = (id: string) => {
    const selectedCard = serviceData.find((card) => card._id === id);
    if (!selectedCard) return;

    const isTypeAlreadySelected = selectedIds.some(
      (selectedId) => serviceData.find((card) => card._id === selectedId.data)?.type === selectedCard.type
    );

    if (selectedIds.some((selectedId) => selectedId.data === id)) {
      setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((selectedId) => selectedId.data !== id));
    } else {
      if (!isTypeAlreadySelected) {
        setSelectedIds((prevSelectedIds) => [
          ...prevSelectedIds.filter((selectedId) => {
            const card = serviceData.find((card) => card._id === selectedId.data);
            return card?.type !== selectedCard.type;
          }),
          { data: id, status: 'pending' }
        ]);
      } else {
        toast.warning('You can only select one card of each type.');
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    formik.setFieldValue('date', date);
    fetchAvailableTimes(date, location.state?.type?._id);
  };
  

  return (
    <div className='min-h-screen '>
      <div className="grid md:grid-cols-2 gap-8  mx-10 py-12 px-4 border mt-5 bg-white rounded-lg p-6 shadow-sm">
        <div className="grid gap-8">
        <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700">Vendor Type</label>
              <Select
                name="type"
                className="input"
                options={venderData.map(value => ({ value: value._id, label: value.name }))}
                values={venderData.filter(option => selectedTypes.includes(option._id))}
                onChange={handleTypeChange}
                multi
                placeholder="Select Vendor Type"
              />
         
            </div>
          <div className="grid md:grid-cols-2 gap-4 overflow-y-auto ">
                   
            {serviceData?.map((value) => (
              <div key={value._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg max-h-96">
                <a href="#">
                  <img
                    className="p-8 rounded-t-lg"
                    src={value.image[0]}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {value.name}
                    </h5>
                  </a>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{value.price}</span>
                  </div>
                  <input
            type="checkbox"
            checked={selectedIds.some((selectedId) => selectedId.data === value._id)}
            onChange={() => handleCheckboxChange(value._id)}
          />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-muted rounded-lg p-6 shadow-lg mt-12">
          <h2 className="text-2xl font-bold mb-4">Booking</h2>
          <form className="grid gap-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="Enter the name"
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                className="input"
                placeholder="Enter the phone"
                {...formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-600">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="event">Event</label>
              <select
                id="event"
                className="input"
                {...formik.getFieldProps('event')}
              >
                <option value="" label="Select event" />
                {data ? data.map((value) => (
                  <option key={value._id} value={value._id} label={value.name} />
                )) : []}
              </select>
              {formik.touched.event && formik.errors.event ? (
                <div className="text-red-600">{formik.errors.event}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="count">Count</label>
              <input
                id="count"
                type="text"
                className="input"
                placeholder="Enter the count"
                {...formik.getFieldProps('count')}
              />
              {formik.touched.count && formik.errors.count ? (
                <div className="text-red-600">{formik.errors.count}</div>
              ) : null}
            </div>

            <div className='flex'>
              <div className="mb-4 w-2/4">
                <label className="label" htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  placeholder="Enter the date"
                  {...formik.getFieldProps('date')}
                  onChange={handleDateChange}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-600">{formik.errors.date}</div>
                ) : null}
              </div>
              <div className="mb-4 w-2/4 mx-3">
                <label className="label" htmlFor="time">Time</label>
                <select
                  id="time"
                  className="input"
                  {...formik.getFieldProps('time')}
                >
                  <option value="" label="Select time" />
                  {availableTimes.map((time) => (
                    !bookedTimes.includes(time) && <option key={time} value={time} label={time} />
                  ))}
                </select>
                {formik.touched.time && formik.errors.time ? (
                  <div className="text-red-600">{formik.errors.time}</div>
                ) : null}
              </div>
            </div>
            <button type="submit" className="justify-center authentication_button">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;