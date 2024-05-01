import React, {useState, useEffect} from 'react';
import storage from "../../firebase/FirebaseConfig";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useParams} from "react-router-dom";
import {editHouse, findHouseDetailById} from "../../service/HouseService";




const UpdateHouse = () => {
    const [houseInfo, setHouseInfo] = useState({
        name_house: '',
        address: '',
        num_of_bedrooms: '',
        num_of_bathrooms: '',
        description: '',
        price_of_day: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
     const [errors, setErrors] = useState({});
    const {id} = useParams();

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

    const handleChange = (e) => {
        const {name, value} = e.target;
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
            const imageRef = ref(storage, `house_images/${id}`);
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
        if (!houseInfo.num_of_bedrooms || houseInfo.num_of_bedrooms < 1 || houseInfo.num_of_bedrooms > 10) {
            errors.num_of_bedrooms = 'Vui lòng nhập số lượng phòng ngủ 1-10 phòng .';
        }
        if (!houseInfo.num_of_bathrooms || houseInfo.num_of_bathrooms < 1 || houseInfo.num_of_bathrooms > 3) {
            errors.num_of_bathrooms = 'Vui lòng nhập số lượng phòng tắm 1-3 phòng.';
        }
        if (!houseInfo.description) {
            errors.description = 'Vui lòng nhập mô tả.';
        }
        if (!houseInfo.price_of_day) {
            errors.price_of_day = 'Vui lòng nhập giá tiền theo ngày.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (

<div className="container mt-4">
    <div className="justify-content-center col-md-6">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Tên căn nhà</label>
                <input type="text" className="form-control" name="name_house" value={houseInfo.name_house} onChange={handleChange}/>
                {errors.name_house && <div className="error">{errors.name_house}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Địa chỉ</label>
                <input type="text" className="form-control" name="address" value={houseInfo.address} onChange={handleChange}/>
                {errors.address && <div className="error">{errors.address}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Số lượng phòng ngủ</label>
                <input type="number" className="form-control" name="num_of_bedrooms" value={houseInfo.num_of_bedrooms} onChange={handleChange}/>
                {errors.num_of_bedrooms && <div className="error">{errors.num_of_bedrooms}</div>}
            </div>
            <div>
                <label className="form-label">Số lượng phòng tắm</label>
                <input type="number" className="form-control" name="num_of_bathrooms" value={houseInfo.num_of_bathrooms}
                       onChange={handleChange}/>
                {errors.num_of_bathrooms && <div className="error">{errors.num_of_bathrooms}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <input type="text" className="form-control" name="description" value={houseInfo.description} onChange={handleChange}/>
                {errors.description && <div className="error">{errors.description}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Giá tiền theo ngày (VNĐ)</label>
                <input type="number" className="form-control" name="price_of_day" value={houseInfo.price_of_day} onChange={handleChange}/>
                {errors.price_of_day && <div className="error">{errors.price_of_day}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Hình ảnh</label>
                <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange}/>
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}}/>
                )}
            </div>
            <div className="mb-3"><button type="button" onClick={handleUpload} disabled={!houseInfo.image || uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button></div>

            <button type="submit">Cập nhật thông tin</button>
        </form>
    </div>
</div>

    );
};

export default UpdateHouse;

