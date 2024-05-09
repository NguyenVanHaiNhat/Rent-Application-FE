import React, {useState} from 'react';
import storage from "../../firebase/FirebaseConfig";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {Form, Formik} from 'formik';
import {Link, useParams} from "react-router-dom";
import {postImageHouse} from "../../service/HouseService";
import {toast} from "react-toastify";
import Button from "react-bootstrap/Button";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

export default function PostImage() {
    const [imagePreview, setImagePreview] = useState(null);
    const {id} = useParams();

    const handleImageChange = (e, setFieldValue) => {
        const imageFile = e.target.files[0];
        setFieldValue("image_url", imageFile);
        setImagePreview(URL.createObjectURL(imageFile));
    };

    const handleUpload = async (values) => {
        try {
            if (!values.image_url) {
                console.error('Please select an image.');
                return;
            }
            const imageRef = ref(storage, `house_images/${values.name_house}`);
            await uploadBytes(imageRef, values.image_url);
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
                <h1 align={"center"}>Post Image</h1>
                <div className="form-container">
                    <Formik
                        initialValues={{image_url: null}}
                        onSubmit={async (values, {setSubmitting, resetForm}) => {
                            try {
                                const imageUrl = await handleUpload(values);
                                if (imageUrl) {
                                    console.log(imageUrl);
                                    console.log(values)
                                    await postImageHouse(id, { ...values, image_url: imageUrl });
                                    toast.success("post image for house successfully");
                                    console.log('House information added successfully!');
                                    resetForm();
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
                                    <input type="file" accept="image/jpeg, image/png" className="file-input"
                                           onChange={(e) => handleImageChange(e, setFieldValue)}/>
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="file-preview"
                                             style={{width: '450px', height: '250px'}}/>
                                    )}
                                </div>
                                <button type="submit" disabled={isSubmitting} className="btn-submit">Post
                                </button>
                                <div className="mb-3">
                                    <p className="form-label"><Link
                                        to={`/house/${id}`}><Button>Back to house detail</Button></Link></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
}
