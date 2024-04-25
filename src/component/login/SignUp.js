import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {register} from "../../service/AccountService";
import {useNavigate} from "react-router-dom";
import Header from "../Home/Header";

const Register = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    return (
        <>
            <div>
                <Header/>
            </div>
            <section className="login-section">
                <div className="login-container">
                    <h2>Đăng ký</h2>
                    {successMessage && <div
                        className="alert alert-success">{successMessage}</div>} {/* Hiển thị thông báo thành công nếu có */}
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            confirmPassword: "",
                            phone: ""
                        }}
                        onSubmit={(values) => {
                            if (values.password !== values.confirmPassword) {
                                alert("Mật khẩu và mật khẩu xác nhận không khớp");
                                return;
                            }
                            register(values);
                            console.log(values);
                            setSuccessMessage("Đăng ký thành công!");
                            setTimeout(() => {
                                navigate("/login");
                            }, 3000);
                        }}
                    >
                        {({errors, touched}) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="username">Tài khoản:</label>
                                    <Field name="username" type="text"
                                           className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu:</label>
                                    <Field name="password" type="password"
                                           className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                                    <Field name="confirmPassword" type="password"
                                           className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <Field name="phone" type="text"
                                           className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="phone" component="div" className="invalid-feedback"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Đăng ký</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    );
};

export default Register;