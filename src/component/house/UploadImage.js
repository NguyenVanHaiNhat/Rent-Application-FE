import React, { useState } from 'react';
import storage from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Formik, Form } from 'formik';
import {postMultipleImage} from "../../service/HouseService";
import PostHouseModal from "./PostHouseModal";
import {useParams} from "react-router-dom";

export default function UploadImage() {
    const [imagePreview, setImagePreview] = useState(null);
    const {id} = useParams();
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
        <div className="container mt-4">
            <h1 align={"center"}>Post House</h1>
            <div className="form-container">
                <Formik
                    initialValues={{
                        image: null
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const imageUrl = await handleUpload(values);
                            if (imageUrl) {
                                await postMultipleImage(id, {image :imageUrl});
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
    );
}
