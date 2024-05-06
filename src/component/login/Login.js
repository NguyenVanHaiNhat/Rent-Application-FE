import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginAccount } from "../../service/AccountService";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";

export default function Login() {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Thêm state cho thông báo thành công
    const navigate = useNavigate();

    useEffect(() => {
        try {
            window.scrollTo(0, 0);
            document.title = "Đăng nhập";
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleLogin = async (values) => {
        try {
            if (values.username === "" || values.password === "") {
                setError("Tên đăng nhập và mật khẩu không được để trống!");
                return;
            };

            const response = await loginAccount({
                username: values.username,
                password: values.password
            });
            localStorage.setItem("isLogin", true);
            localStorage.setItem('authToken', response.token);

            localStorage.setItem('nameAccount', response.username);
            localStorage.setItem("idAccount", response.id);
            setSuccessMessage("Đăng nhập thành công!");
            navigate("/");
        } catch (err) {
            setError("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <section className="login-section">
                <div className="login-container">
                    <h2>Đăng nhập</h2>
                    <Formik
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        onSubmit={values => {
                            handleLogin(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Tên đăng nhập:</label>
                                    <Field name="username" type="text"
                                           className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu:</label>
                                    <Field name="password" type="password"
                                           className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                {successMessage && <div className="success-message">{successMessage}</div>} {/* Hiển thị thông báo thành công */}
                                <button type="submit" className="btn btn-primary">Xác nhận đăng nhập</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    );
}

