import React from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import {  editOffer } from '../../../service/api/agent/apiMethod';
import { toast } from 'react-toastify';
import { offer } from '../../../utils/types';

interface editOfferProps {
    isEditModal: boolean;
    setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    editOfferData:offer|null|undefined,
    setApi: React.Dispatch<React.SetStateAction<boolean>>;
    api:string
}


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(' Name is required')
        .min(3, ' Name must be at least 3 characters long'),
    discountValue: Yup.number()
        .required("Discount Value is required")
        .positive("Discount Value must be a positive number")
        .integer("Discount Value must be an integer"),
    startDate: Yup.date()
        .required("Start Date is required"),
    endDate: Yup.date()
        .required("End Date is required")
        .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),
});

const EditOffer: React.FC<editOfferProps> = ({ isEditModal, setIsEditModal,editOfferData,setApi,api }) => {
    const agentData = useSelector((state: RootState) => state.agent);

    const formatDate = (date:string|undefined): string => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    
    const formik = useFormik({
        initialValues:{
            name: editOfferData?.name||'',
            discountValue: editOfferData?.discountValue||0,
            startDate: formatDate(editOfferData?.startDate),
            endDate:formatDate(editOfferData?.endDate),
       
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const data: offer = {
                ...values,
                discountedAgent: agentData.agentId,
                
            };

            editOffer(data,editOfferData?._id)
                .then((response) => {
                    if (response.status === "success") {
                        setIsEditModal(!isEditModal)
                        setApi(!api)
                        toast.success(response.message);
                    } else {
                        toast.error(response.message);
                    }
                })
                .catch((error) => {
                    toast.error(error?.message);
                });
            resetForm();
        },
    });

    const today = new Date().toLocaleDateString('en-CA');


    return (
        <>
            <div id="authentication-modal" className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Offer
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => { setIsEditModal(!isEditModal) }}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input"
                                        id="name"
                                        {...formik.getFieldProps('name')}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-red-500">{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="discountValue" className="block text-gray-700">Discount Value</label>
                                    <input
                                        type="number"
                                        placeholder="Type here"
                                        className="input"
                                        id="discountValue"
                                        {...formik.getFieldProps('discountValue')}
                                    />
                                    {formik.touched.discountValue && formik.errors.discountValue ? (
                                        <div className="text-red-500">{formik.errors.discountValue}</div>
                                    ) : null}
                                </div>
                                <div className='flex'>
                                    <div className="mb-4 w-2/4">
                                        <label className="label" htmlFor="startDate">Start Date</label>
                                        <input
                                            id="startDate"
                                            type="date"
                                            className="input"
                                            placeholder="Enter the date"
                                            min={today}
                                            {...formik.getFieldProps('startDate')}
                                        />
                                        {formik.touched.startDate && formik.errors.startDate ? (
                                            <div className="text-red-600">{formik.errors.startDate}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-4 w-2/4">
                                        <label className="label" htmlFor="endDate">End Date</label>
                                        <input
                                            id="endDate"
                                            type="date"
                                            className="input"
                                            placeholder="Enter the date"
                                            min={formik.values.startDate || today}
                                            {...formik.getFieldProps('endDate')}
                                        />
                                        {formik.touched.endDate && formik.errors.endDate ? (
                                            <div className="text-red-600">{formik.errors.endDate}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <button type="submit" className="agent_button w-full">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditOffer;