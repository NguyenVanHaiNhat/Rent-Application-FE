import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import "./BookingForm.css"
import { bookHouse, calculateTotalPrice, checkDate } from "../../service/BookHouse";
import BookingModal from "./BookingModal";
import 'react-toastify/dist/ReactToastify.css';
import toast from "bootstrap/js/src/toast";
import moment from "moment";
import DatePicker from "react-datepicker";
import {ToastContainer} from "react-toastify";

const validate = Yup.object().shape({
    startDate: Yup.date()
        .required('Start Date is required')
        .min(new Date(), 'StartDate must be after today')
        .max(Yup.ref('endDate'), 'StartDate must be before or equal to End Date')
        .test('startBeforeEnd', 'StartDate must be before or equal to End Date', function(value) {
            const endDate = this.parent.endDate;
            return moment(value).isSameOrBefore(endDate);
        }),
    endDate: Yup.date()
        .required('End Date is required')
        .min(Yup.ref('startDate'), 'End Date must be after or equal to Start Date')
        .test('endAfterStart', 'End Date must be after or equal to Start Date', function(value) {
            const startDate = this.parent.startDate;
            return moment(value).isSameOrAfter(startDate);
        }),
});



const BookingForm = () => {
    const { id: houseId, price: housePrice } = useParams();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [totalDays, setTotalDays] = useState(1);
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
                        const checkDates = await checkDate(startDate, endDate, houseId)
                        if (checkDates.length !== 0) {
                            toast.error("This date has been booked")
                        } else {
                            await bookHouse(startDate, endDate, houseId);
                            setShowSuccessModal(true);
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
                                    setTotalDays(Math.max(days, 0)); // Kiểm tra và đặt số ngày là không âm
                                }}
                                maxDate={null}
                                minDate={null}
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