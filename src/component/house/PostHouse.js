import React, { useState } from 'react';
import storage from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postHouse } from "../../service/HouseService";
import * as Yup from "yup";
import PostHouseModal from "./PostHouseModal";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import "./PostHouse.css"

// Định nghĩa CSS class mới cho màu đỏ
const redErrorText = {
    color: 'red'
};

const validate = Yup.object().shape({
    name_house: Yup.string().required("Vui lòng nhập tên ngôi nhà"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    num_of_bedrooms: Yup.number()
        .min(1, "Có ít nhất 1 phòng ngủ")
        .max(10, "Có nhiều nhất 10 phòng ngủ")
        .required("Vui lòng nhập số lượng phòng ngủ"),
    num_of_bathrooms: Yup.number()
        .min(1, "Có ít nhất 1 phòng tắm")
        .max(3, "Có nhiều nhất 3 phòng tắm")
        .required("Vui lòng nhập số lượng phòng tắm"),
    description: Yup.string().required("Vui lòng nhập mô tả ngôi nhà"),
    price_of_day: Yup.string()
        .min(1, "Giá một ngày phải lớn hơn 0 VNĐ")
        .required("Vui lòng nhập số tiền mỗi ngày thuê")
});

export default function PostHouse() {
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleImageChange = (e, setFieldValue) => {
        const imageFile = e.target.files[0];
        setFieldValue("image", imageFile);
        setImagePreview(URL.createObjectURL(imageFile));
    };

    const handleUpload = async (values) => {
        try {
            if (!values.image) {
                console.error('Please select an image.');
                return;
            }
            const imageRef = ref(storage, `house_images/${values.name_house}`);
            await uploadBytes(imageRef, values.image);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <div>
                <Header/>
            </div>
            <div className="posthouse">
                <div className="container mt-4">
                    <h1 align={"center"}>Đăng nhà cho thuê</h1>
                    <div className="form-container">
                        <Formik
                            initialValues={{
                                name_house: '',
                                address: '',
                                num_of_bedrooms: '',
                                num_of_bathrooms: '',
                                description: '',
                                price_of_day: '',
                                status: 'Đang trống',
                                image: null
                            }}
                            validationSchema={validate}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                try {
                                    const imageUrl = await handleUpload(values);
                                    if (imageUrl) {
                                        await postHouse({ ...values, image: imageUrl });
                                        console.log('House information added successfully!');
                                        resetForm();
                                        setImagePreview(null);
                                        setShowSuccessModal(true)
                                    }
                                } catch (error) {
                                    console.error('Error adding house information:', error);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label">Tên ngôi nhà :</label>
                                        <Field type="text" className="form-control" name="name_house" />
                                        <ErrorMessage name="name_house" component="div" style={redErrorText} /> {/* Sử dụng redErrorText */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Địa chỉ :</label>
                                        <Field type="text" className="form-control" name="address" />
                                        <ErrorMessage name="address" component="div" style={redErrorText} /> {/* Sử dụng redErrorText */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Số lượng phòng ngủ :</label>
                                        <Field type="number" className="form-control" name="num_of_bedrooms" />
                                        <ErrorMessage name="num_of_bedrooms" component="div" style={redErrorText} /> {/* Sử dụng redErrorText */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Số lương phòng tắm :</label>
                                        <Field type="number" className="form-control" name="num_of_bathrooms" />
                                        <ErrorMessage name="num_of_bathrooms" component="div" style={redErrorText} /> {/* Sử dụng redErrorText */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mô tả :</label>
                                        <Field type="text" className="form-control" name="description" />
                                        <ErrorMessage name="description" component="div" style={redErrorText} /> {/* Sử dụng redErrorText */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Giá mỗi ngày thuê (VNĐ) :</label>
                                        <Field type="number" className="form-control" name="price_of_day" />
                                        <ErrorMessage name="price_of_day" component="div" style={redErrorText} /> {/* Sử dụng redErrorText */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        <input type="file" accept="image/jpeg, image/png" className="file-input" onChange={(e) => handleImageChange(e, setFieldValue)} />
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Preview" className="file-preview" style={{ width: '450px', height: '250px' }} />
                                        )}
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="dat">Xac nhận</button>
                                </Form>
                            )}
                        </Formik>
                        <PostHouseModal
                            show={showSuccessModal}
                            onClose={() => setShowSuccessModal(false)}
                        />
                    </div>
                </div>
            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
}
