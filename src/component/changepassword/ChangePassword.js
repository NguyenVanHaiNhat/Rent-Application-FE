import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import "./ChangePassword.css"
import ChangePasswordModal from "./ChangePasswordModal";
import {changePassword} from "../../service/ChangePasswordService";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const validation = Yup.object({
    currentPassword: Yup.string().required("Required").min(6, "Password has at least 6 characters").max(8, "Password has at most 8 characters"),
    newPassword: Yup.string().required("Required").min(6, "Password has at least 6 characters").max(8, "Password has at most 8 characters"),
    checkNewPassword: Yup.string().required("Required").oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
})

export default function ChangePassword() {
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (values, formikBag) => {
        try {
            await changePassword(values);
            setShowSuccessModal(true);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    setErrorMessage('Mật khẩu hiện tại không đúng');
                    formikBag.resetForm();
                } else {
                    console.log(error);
                    setErrorMessage('Mật khẩu hiện tại không đúng');
                }
            } else {
                console.log(error);
                setErrorMessage('Lỗi không xác định');
            }
        }
    };

    return (
        <>
            <div>
                <Header/>
            </div>

        <div className="form-container">
            <h2>Change Password</h2>
            <Formik initialValues={{
                currentPassword: "",
                newPassword: "",
                checkNewPassword: ""
            }} onSubmit={handleSubmit}
                    validationSchema={validation}>
                {({errors, touched}) => (
                    <Form>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                        <div>
                            <label>Current Password:</label>
                            <Field
                                type="password"
                                name="currentPassword"
                            />
                            <ErrorMessage name="currentPassword"/>
                        </div>
                        <div>
                            <label>New Password</label>
                            <Field
                                type="password"
                                name="newPassword"
                            />
                            <ErrorMessage name="newPassword"/>
                        </div>
                        <div>
                            <label>Confirm New Password</label>
                            <Field
                                type="password"
                                name="checkNewPassword"
                            />
                            <ErrorMessage name="checkNewPassword"/>
                        </div>
                        <button type="submit">Thay đổi mật khẩu</button>
                    </Form>
                )}
            </Formik>
            <ChangePasswordModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
            </>
    );
}