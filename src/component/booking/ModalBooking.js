import Modal from "react-bootstrap/Modal";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { bookHouse, calculateTotalPrice, checkDate } from "../../service/BookHouse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import * as Yup from "yup";
import "./ModalBooking.css";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalBookingSuccess from "./ModalBookingSuccess";

// Validation schema
const validate = Yup.object().shape({
    startDate: Yup.date()
        .required('Start Date is required')
        .min(new Date(), 'Start Date must be after today')
        .max(Yup.ref('endDate'), 'Start Date must be before or equal to End Date')
        .test('startBeforeEnd', 'Start Date must be before or equal to End Date', function(value) {
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

export default function ModalBooking(props) {
    const { show, onClose, price: housePrice, id: houseId } = props;
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(housePrice);

    useEffect(() => {
        setTotalPrice(calculateTotalPrice(totalDays, housePrice));
    }, [totalDays, housePrice]);

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose} centered className="custom-modal">
            <Modal.Header closeButton className="custom-header">
                <Modal.Title className="custom-title1">Đặt Phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-content">
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
                                toast.error("Ngy này đã được đặt")
                            } else {
                                await bookHouse(startDate, endDate, houseId);
                                setShowSuccessModal(true);
                            }
                        } catch (error) {
                            // Differentiate between network errors and booking conflicts
                            if (error.response && error.response.status === 409) {
                                toast.error('This date has been booked. Please choose another date.');
                            } else {
                                toast.error('Booking failed. Please try again.');
                            }
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div className="date-picker">
                                <label htmlFor="startDate" className="date-label">Ngày bắt đầu:</label>
                                <DatePicker
                                    name="startDate"
                                    selected={values.startDate}
                                    onChange={(date) => {
                                        setFieldValue('startDate', date);
                                        const days = moment(date).diff(moment(values.endDate), 'days') + 1;
                                        setTotalDays(Math.max(days, 0)); // Ensure days is not negative
                                    }}
                                    maxDate={null}
                                    minDate={null}
                                />
                                <ErrorMessage name="startDate" component="div" className="error" />
                            </div>
                            <div className="date-picker">
                                <label htmlFor="endDate" className="date-label">Ngày kết thúc:</label>
                                <DatePicker
                                    name="endDate"
                                    selected={values.endDate}
                                    onChange={(date) => {
                                        setFieldValue('endDate', date);
                                        const days = moment(date).diff(moment(values.startDate), 'days') + 1;
                                        setTotalDays(Math.max(days, 0)); // Ensure days is not negative
                                    }}
                                    minDate={values.startDate}
                                />
                                <ErrorMessage name="endDate" component="div" className="error" />
                            </div>
                            <div className="date-picker">
                                <label>Tổng số ngày:</label>
                                <input type="text" value={totalDays} readOnly />
                            </div>
                            <div className="date-picker">
                                <label>Tổng tiền (VNĐ):</label>
                                <input type="text" value={totalPrice} readOnly />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="book-now-button">
                                {isSubmitting ? 'Đang Đặt...' : 'Đặt Ngay'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <ModalBookingSuccess
            show={showSuccessModal}
            onClose={handleCloseSuccessModal}
            />
            <ToastContainer />
        </Modal>
    )
}
