import React, { useState } from 'react';
import storage from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postHouse } from "../../service/HouseService";
import * as Yup from "yup";
import PostHouseModal from "./PostHouseModal";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const validate = Yup.object().shape({
    name_house: Yup.string().required("Please enter the house name"),
    address: Yup.string().required("Please enter the address"),
    num_of_bedrooms: Yup.number()
        .min(1, "It is only allowed to enter a bedroom number of at least 1")
        .max(10, "The maximum number of bedrooms allowed is only 10")
        .required("Please enter the number bedrooms of house"),
    num_of_bathrooms: Yup.number()
        .min(1, "It is only allowed to enter a bathrooms number of at least 1")
        .max(3, "The maximum number of bathrooms allowed is only 3")
        .required("Please enter the number bathrooms of house"),
    description: Yup.string().required("Please enter the description"),
    price_of_day: Yup.string()
        .min(1, "price must be positive")
        .required("Please enter the price of house")
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

            <div className="container mt-4">
                <h1 align={"center"}>Post House</h1>
                <div className="form-container">
                    <Formik
                        initialValues={{
                            name_house: '',
                            address: '',
                            num_of_bedrooms: '',
                            num_of_bathrooms: '',
                            description: '',
                            price_of_day: '',
                            status: 'đang trống',
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
                                    <label className="form-label">Name House</label>
                                    <Field type="text" className="form-control" name="name_house" />
                                    <ErrorMessage name="name_house" component="div" className="error" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <Field type="text" className="form-control" name="address" />
                                    <ErrorMessage name="address" component="div" className="error" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Number of Bedroom</label>
                                    <Field type="number" className="form-control" name="num_of_bedrooms" />
                                    <ErrorMessage name="num_of_bedrooms" component="div" className="error" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Number of Bathroom</label>
                                    <Field type="number" className="form-control" name="num_of_bathrooms" />
                                    <ErrorMessage name="num_of_bathrooms" component="div" className="error" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                    <ErrorMessage name="description" component="div" className="error" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price (VNĐ)</label>
                                    <Field type="number" className="form-control" name="price_of_day" />
                                    <ErrorMessage name="price_of_day" component="div" className="error" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" accept="image/jpeg, image/png" className="file-input" onChange={(e) => handleImageChange(e, setFieldValue)} />
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="file-preview" style={{ width: '450px', height: '250px' }} />
                                    )}
                                </div>
                                <button type="submit" disabled={isSubmitting} className="btn-submit">Post</button>
                            </Form>
                        )}
                    </Formik>
                    <PostHouseModal
                        show={showSuccessModal}
                        onClose={() => setShowSuccessModal(false)}
                    />
                </div>
            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
}