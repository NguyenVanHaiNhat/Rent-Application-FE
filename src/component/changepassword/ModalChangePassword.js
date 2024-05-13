import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { changePassword } from "../../service/ChangePasswordService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ModalChangePasswordSuccess from "./ModalChangePasswordSuccess";
import * as Yup from "yup";
import './ModalChangePassword.css';
import { toast, ToastContainer } from "react-toastify";

const validation = Yup.object({
    currentPassword: Yup.string().required("Không được để trống").min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(8, "Mật khẩu có nhiều nhất 8 ký tự"),
    newPassword: Yup.string().required("Không được để trống").min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(8, "Mật khẩu có nhiều nhất 8 ký tự"),
    checkNewPassword: Yup.string().required("Không được để trống").oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
});

export default function ModalChangePassword(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (values, formikBag) => {
        try {
            await changePassword(values);
            setShowSuccessModal(true);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403 ) {
                    toast.error('Mật khẩu hiện tại không đúng');
                } else {
                    console.log(error);
                    toast.error('Mật khẩu hiện tại không đúng');
                }
            }
        }
    };

    const { show, onClose } = props;

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        onClose();
    }

    return (
        <>
            <ToastContainer /> {/* Add ToastContainer here */}
            <Modal show={show} onHide={onClose} centered className="custom-modal">
                <Modal.Header closeButton className="custom-header">
                    <Modal.Title className="custom-title">Thay đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            currentPassword: "",
                            newPassword: "",
                            checkNewPassword: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validation}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {errorMessage && <div className="error">{errorMessage}</div>}
                                <div className="form-group">
                                    <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                                    <Field
                                        type="password"
                                        name="currentPassword"
                                        className={`form-control ${errors.currentPassword && touched.currentPassword && 'is-invalid'}`}
                                    />
                                    <ErrorMessage name="currentPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                                    <Field
                                        type="password"
                                        name="newPassword"
                                        className={`form-control ${errors.newPassword && touched.newPassword && 'is-invalid'}`}
                                    />
                                    <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="checkNewPassword">Xác nhận mật khẩu mới:</label>
                                    <Field
                                        type="password"
                                        name="checkNewPassword"
                                        className={`form-control ${errors.checkNewPassword && touched.checkNewPassword && 'is-invalid'}`}
                                    />
                                    <ErrorMessage name="checkNewPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="button-group">
                                    <button type="submit" className="btn btn-primary">Thay đổi mật khẩu</button>
                                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <ModalChangePasswordSuccess show={showSuccessModal} onClose={handleCloseSuccessModal} />
                </Modal.Body>
            </Modal>
        </>
    );
}