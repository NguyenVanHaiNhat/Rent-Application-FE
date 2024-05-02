import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import "./BookingForm.css"
import { bookHouse, calculateTotalPrice } from "../../service/BookHouse";
import BookingModal from "./BookingModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validate = Yup.object().shape({
    startDate: Yup.date()
        .required('Start Date is required')
        .max(Yup.ref('endDate'), 'Start Date must be before End Date'),
    endDate: Yup.date()
        .min(Yup.ref('startDate'), 'End Date must be after Start Date')
        .required('End Date is required'),
});

const BookingForm = () => {
    const { id: houseId, price: housePrice } = useParams();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(housePrice);

    useEffect(() => {
        setTotalPrice(calculateTotalPrice(totalDays, housePrice));
    }, [totalDays, housePrice]);

    return (
        <div className="booking-form-container">
            <h2>Book House</h2>
            <Formik
                initialValues={{
                    startDate: new Date(),
                    endDate: new Date(),
                    houseId: houseId
                }}
                validationSchema={validate}
                onSubmit={async (values, { setSubmitting }) => {
                    const { startDate, endDate } = values;
                    try {
                        const { success, message } = await bookHouse(startDate, endDate, houseId);
                        if (success) {
                            setShowSuccessModal(true);
                        } else {
                            toast.error(message);
                        }
                    } catch (error) {
                        toast.error('Booking failed. Please try again.');
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <div>
                            <label>Start Date:</label>
                            <DatePicker
                                name="startDate"
                                selected={values.startDate}
                                onChange={(date) => {
                                    setFieldValue('startDate', date);
                                    const days = moment(values.endDate).diff(moment(date), 'days') + 1;
                                    setTotalDays(days);
                                }}
                                maxDate={values.endDate}
                            />
                            <ErrorMessage name="startDate" component="div" className="error" />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <DatePicker
                                name="endDate"
                                selected={values.endDate}
                                onChange={(date) => {
                                    setFieldValue('endDate', date);
                                    const days = moment(date).diff(moment(values.startDate), 'days') + 1;
                                    setTotalDays(days);
                                }}
                                minDate={values.startDate}
                            />
                            <ErrorMessage name="endDate" component="div" className="error" />
                        </div>
                        <div>
                            <label>Total Days:</label>
                            <input type="text" value={totalDays} readOnly />
                        </div>
                        <div>
                            <label>Total Price:</label>
                            <input type="text" value={totalPrice} readOnly />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Booking...' : 'Book Now'}
                        </button>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
            <BookingModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
};

export default BookingForm;