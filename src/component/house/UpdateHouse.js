import React, {useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {editHouse, findHouseDetailById} from '../../service/HouseService';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import storage from '../../firebase/FirebaseConfig';
import Button from "react-bootstrap/Button";
import "./UpdateHouse.css"

const validationSchema = Yup.object().shape({
    name_house: Yup.string().required('Vui lòng nhập tên căn nhà.'),
    address: Yup.string().required('Vui lòng nhập địa chỉ.'),
    num_of_bedrooms: Yup.number()
        .required('Vui lòng nhập số lượng phòng ngủ.')
        .min(1, 'Số lượng phòng ngủ phải lớn hơn 0')
        .max(3, 'Số lượng phòng ngủ không được vượt quá 3'),
    num_of_bathrooms: Yup.number()
        .required('Vui lòng nhập số lượng phòng tắm.')
        .min(1, 'Số lượng phòng tắm phải lớn hơn 0')
        .max(3, 'Số lượng phòng tắm không được vượt quá 3'),
    description: Yup.string().required('Vui lòng nhập mô tả.'),
    price_of_day: Yup.number().required('Vui lòng nhập giá tiền theo ngày.'),
    image: Yup.mixed().required('Vui lòng chọn một hình ảnh.'),
});

const UpdateHouse = () => {
    const [uploading, setUploading] = useState(false);
    const {id} = useParams();
    const [houseInfo, setHouseInfo] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHouseInfo = async () => {
            try {
                const fetchedHouseInfo = await findHouseDetailById(id);
                setHouseInfo(fetchedHouseInfo);
                setImagePreview(fetchedHouseInfo.image);

            } catch (error) {
                console.error('Error fetching house information:', error);
            }
        };

        if (id) {
            fetchHouseInfo();
        }
    }, [id]);


    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setHouseInfo({
            ...houseInfo,
            image: imageFile
        });
        setImagePreview(URL.createObjectURL(imageFile));
    };
    if (!houseInfo) {
        return <div>Loading...</div>;
    }
    if (!imagePreview) {
        return <div>Loading...</div>;
    }
    const handleUpload = async () => {
        try {
            if (!houseInfo.image) {
                console.error('Please select an image.');
                return;
            }
            setUploading(true);
            const imageRef = ref(storage, `house_images/${id}`);
            await uploadBytes(imageRef, houseInfo.image);
            const imageUrl = await getDownloadURL(imageRef);
            setHouseInfo({
                ...houseInfo,
                image: imageUrl
            });
            setUploading(false);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploading(false);
        }
    };
    const handleSubmit = async (houseInfo) => {
        try {
            await editHouse(houseInfo);
            navigate(`/owner/${localStorage.getItem(`idAccount`)}`);
            alert('Thông tin căn nhà đã được cập nhật thành công!');
        } catch (error) {
            console.error('Error updating house information:', error);
        }
    };
    return (
        <div className="container ">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 ">
                    <Formik
                        initialValues={houseInfo}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">Tên căn nhà</label>
                                <Field type="text" className="form-control" name="name_house"/>
                                <ErrorMessage name="name_house" component="div" className="error"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Địa chỉ</label>
                                <Field type="text" className="form-control" name="address"/>
                                <ErrorMessage name="address" component="div" className="error"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Số lượng phòng ngủ</label>
                                <Field type="number" className="form-control" name="num_of_bedrooms"/>
                                <ErrorMessage name="num_of_bedrooms" component="div" className="error"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Số lượng phòng tắm</label>
                                <Field type="number" className="form-control" name="num_of_bathrooms"/>
                                <ErrorMessage name="num_of_bathrooms" component="div" className="error"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <Field type="text" className="form-control" name="description"/>
                                <ErrorMessage name="description" component="div" className="error"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Giá tiền theo ngày (VNĐ)</label>
                                <Field type="number" className="form-control" name="price_of_day"/>
                                <ErrorMessage name="price_of_day" component="div" className="error"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Hình ảnh</label>
                                <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange}/>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview"
                                         style={{width: '550px',height:'300px', marginTop: '10px'}}/>
                                )}
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6 text-center">
                                    <button className="btn btn-primary col-6" type="button" onClick={handleUpload} disabled={!houseInfo.image || uploading}>
                                        {uploading ? 'Uploading...' : 'Upload Image'}
                                    </button>
                                </div>
                                <div className="mb-3 col-6 text-center">
                                    <button className="btn btn-primary col-8" type="submit">
                                        Cập nhật thông tin
                                    </button>
                                </div>
                            </div>

                            <Link to={`/book/${houseInfo.id}/${houseInfo.price_of_day}`}><Button>Book</Button></Link>

                        </Form>

                    </Formik>
                </div>
                <div className="col-3"></div>
            </div>

        </div>
    );
};

export default UpdateHouse;