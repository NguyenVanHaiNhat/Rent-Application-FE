import React, {useState, useEffect} from 'react';
import storage from "../../firebase/FirebaseConfig";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useParams} from "react-router-dom";
import {editAccount, findAccountDetailById} from "../../service/AccountInfor";




const UpdateAccount = () => {
    const [accountInfo, setAccountInfo] = useState({
        full_name: '',
        address: '',
        phone: '',
        avatar: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const fetchedAccountInfo = await findAccountDetailById(id);
                setAccountInfo(fetchedAccountInfo);
                setImagePreview(fetchedAccountInfo.avatar);
            } catch (error) {
                console.error('Error fetching account information:', error);
            }
        };

        if (id) {
            fetchAccountInfo();
        }
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccountInfo({
            ...accountInfo,
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
        setAccountInfo({
            ...accountInfo,
            avatar: imageFile
        });
        setImagePreview(URL.createObjectURL(imageFile));
    };

    const handleUpload = async () => {
        try {
            if (!accountInfo.avatar) {
                console.error('Please select an image.');
                return;
            }
            setUploading(true);
            const imageRef = ref(storage, `avatar_image/${id}`);
            await uploadBytes(imageRef, accountInfo.avatar);
            const imageUrl = await getDownloadURL(imageRef);
            setAccountInfo({
                ...accountInfo,
                avatar: imageUrl
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
            await editAccount(accountInfo);
            console.log('Thông tin account đã được cập nhật thành công!');
        } catch (error) {
            console.error('Error updating account information:', error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!accountInfo.full_name.trim()) {
            errors.full_name = 'Vui lòng nhập họ và tên';
        }
        if (!accountInfo.address.trim()) {
            errors.address = 'Vui lòng nhập địa chỉ.';
        }
        if (!accountInfo.phone.trim()) {
            errors.phone = 'Vui lòng nhập SDT';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (

        <div className="container mt-4">
            <div className="justify-content-center col-md-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input type="text" className="form-control" name="full_name" value={accountInfo.full_name} onChange={handleChange}/>
                        {errors.full_name && <div className="error">{errors.full_name}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" name="address" value={accountInfo.address} onChange={handleChange}/>
                        {errors.address && <div className="error">{errors.address}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input type="text" className="form-control" name="phone" value={accountInfo.phone} onChange={handleChange}/>
                        {errors.phone && <div className="error">{errors.phone}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ảnh đại diện</label>
                        <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange}/>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}}/>
                        )}
                    </div>
                    <div className="mb-3"><button type="button" onClick={handleUpload} disabled={!accountInfo.avatar || uploading}>
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </button></div>

                    <button type="submit">Cập nhật thông tin</button>
                </form>
            </div>
        </div>

    );
};

export default UpdateAccount;

