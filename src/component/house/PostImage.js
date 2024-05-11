import React, { useEffect, useState } from 'react';
import storage from "../../firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useParams } from "react-router-dom";
import { postImageHouse } from "../../service/HouseService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function PostImage({ toggleModal, onUpdateSuccess }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Thêm biến trạng thái mới
    const { id } = useParams();
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        toggleModal(); // Call the function from props to toggle modal in parent component
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleShow();
    }, []);

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setSelectedImage(imageFile); // Lưu tệp hình ảnh vào biến trạng thái
        setImagePreview(URL.createObjectURL(imageFile));
    };

    const handleUpload = async () => {
        try {
            if (!selectedImage) {
                console.error('Please select an image.');
                return;
            }
            const imageRef = ref(storage, `house_images`);
            await uploadBytes(imageRef, selectedImage);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ảnh cho nhà của mình</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const values = Object.fromEntries(formData.entries());
                        try {
                            const imageUrl = await handleUpload();
                            if (imageUrl) {
                                console.log(imageUrl);
                                console.log(values)
                                await postImageHouse(id, { ...values, image_url: imageUrl });
                                toast.success("đăng ảnh cho nhà thành công !");
                                console.log('House information added successfully!');
                                setImagePreview(null); // Reset image preview
                                handleClose(); // Close the modal after successful submission
                            }
                        } catch (error) {
                            console.error('Error adding house information:', error);
                        }
                    }}>
                        <div className="mb-3">
                            <label className="form-label">Ảnh</label>
                            <input type="file" name="image" accept="image/jpeg, image/png" className="form-control"
                                   onChange={handleImageChange} />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="file-preview"
                                     style={{ width: '450px', height: '250px' }} />
                            )}
                        </div>
                        <Button variant="primary" type="submit">Đăng</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
