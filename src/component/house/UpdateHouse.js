
import React, { useState, useEffect } from 'react';
import analytics from "./firebaseConfig";
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {editHouse, findHouseDetailById} from "../../service/HouseService";


const UpdateHouseInfo = ({ houseId }) => {
    const [houseInfo, setHouseInfo] = useState({
        name_house: '',
        address: '',
        num_of_bedrooms: '',
        num_of_bathrooms: '',
        price_of_day: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchHouseInfo = async () => {
            try {
                const fetchedHouseInfo = await findHouseDetailById(houseId);
                setHouseInfo(fetchedHouseInfo);
                setImagePreview(fetchedHouseInfo.image);
            } catch (error) {
                console.error('Error fetching house information:', error);
            }
        };

        if (houseId) {
            fetchHouseInfo();
        }
    }, [houseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHouseInfo({
            ...houseInfo,
            [name]: value
        });
        // Xóa thông báo lỗi khi người dùng nhập liệu vào trường
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setHouseInfo({
            ...houseInfo,
            image: imageFile
        });
        setImagePreview(URL.createObjectURL(imageFile));
    };

    const handleUpload = async () => {
        try {
            if (!houseInfo.image) {
                console.error('Please select an image.');
                return;
            }
            setUploading(true);
            const imageRef = ref(analytics, `house_images/${houseId}`);
            await uploadBytes(imageRef, houseInfo.image);
            const imageUrl = await getDownloadURL(imageRef);
            setHouseInfo({
                ...houseInfo,
                image: imageUrl
            });
            setUploading(false);
            console.log('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            await editHouse(houseInfo);
            console.log('Thông tin căn nhà đã được cập nhật thành công!');
        } catch (error) {
            console.error('Error updating house information:', error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!houseInfo.name_house.trim()) {
            errors.name_house = 'Vui lòng nhập tên căn nhà.';
        }
        if (!houseInfo.address.trim()) {
            errors.address = 'Vui lòng nhập địa chỉ.';
        }
        if (!houseInfo.num_of_bedrooms) {
            errors.num_of_bedrooms = 'Vui lòng nhập số lượng phòng ngủ.';
        }
        if (!houseInfo.num_of_bathrooms) {
            errors.num_of_bathrooms = 'Vui lòng nhập số lượng phòng tắm.';
        }
        if (!houseInfo.price_of_day) {
            errors.price_of_day = 'Vui lòng nhập giá tiền theo ngày.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Tên căn nhà:
                <input type="text" name="name_house" value={houseInfo.name_house} onChange={handleChange} />
                {errors.name_house && <div className="error">{errors.name_house}</div>}
            </label>
            <label>
                Địa chỉ:
                <input type="text" name="address" value={houseInfo.address} onChange={handleChange} />
                {errors.address && <div className="error">{errors.address}</div>}
            </label>
            <label>
                Số lượng phòng ngủ:
                <input type="number" name="num_of_bedrooms" value={houseInfo.num_of_bedrooms} onChange={handleChange} />
                {errors.num_of_bedrooms && <div className="error">{errors.num_of_bedrooms}</div>}
            </label>
            <label>
                Số lượng phòng tắm:
                <input type="number" name="num_of_bathrooms" value={houseInfo.num_of_bathrooms} onChange={handleChange} />
                {errors.num_of_bathrooms && <div className="error">{errors.num_of_bathrooms}</div>}
            </label>
            <label>
                Giá tiền theo ngày (VNĐ):
                <input type="number" name="price_of_day" value={houseInfo.price_of_day} onChange={handleChange} />
                {errors.price_of_day && <div className="error">{errors.price_of_day}</div>}
            </label>
            <label>
                Chọn ảnh:
                <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                )}
            </label>
            <button type="button" onClick={handleUpload} disabled={!houseInfo.image || uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button type="submit">Cập nhật thông tin</button>
        </form>
    );
};

export default UpdateHouseInfo;

