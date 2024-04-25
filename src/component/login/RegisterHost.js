import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { checkUserNameAccount, register1 } from "../../service/AccountService";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";

const RegisterHost = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(""); // State để hiển thị thông báo nếu tên người dùng đã tồn tại

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");
        if (isLogin) {
            navigate("/home");
        }
    }, []);

    const registerHost = async (values) => {
        // Kiểm tra tên người dùng đã tồn tại trong cơ sở dữ liệu của chủ nhà hay chưa
        const checkNameAccount = await checkUserNameAccount(values.username);

        if (checkNameAccount.length !== 0) {
            // Nếu tên người dùng đã tồn tại, hiển thị thông báo tương ứng
            setNotification("Tên người dùng đã tồn tại!");
        } else {
            // Nếu tên người dùng chưa tồn tại, thực hiện đăng ký cho chủ nhà
            await register1(values);
            // Hiển thị thông báo đăng ký thành công và chuyển hướng về trang đăng nhập sau 3 giây
            setNotification("Đăng ký thành công!");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <section className="login-section">
                <div className="login-container">
                    <h2>Đăng ký Làm Chủ Nhà</h2>
                    {notification && <div className="alert alert-danger">{notification}</div>}
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
                            registerHost(values); // Gọi hàm kiểm tra và đăng ký
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="username">Tài khoản:</label>
                                    <Field name="username" type="text" className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu:</label>
                                    <Field name="password" type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                                    <Field name="confirmPassword" type="password" className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <Field name="phone" type="text" className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
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

export default RegisterHost;