import React, { useState, useEffect } from 'react';
import { findAccountDetailById } from "../../service/AccountInfor";
import UpdateAccount from "./UpdateInfor";
import { useParams } from "react-router-dom";
import './style.css';
import Header from "../Home/Header";
import Footer from "../Home/Footer"; // Import CSS file

export default function UserProfile() {
    const [accountInfo, setAccountInfo] = useState({});
    const { id } = useParams();
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const fetchedAccountInfo = await findAccountDetailById(id);
                setAccountInfo(fetchedAccountInfo);
            } catch (error) {
                console.error('Error fetching account information:', error);
            }
        };

        if (id) {
            fetchAccountInfo();
        }
    }, [id]);

    const onUpdateSuccess = async () => {
        try {
            const fetchedAccountInfo = await findAccountDetailById(id);
            setAccountInfo(fetchedAccountInfo);
        } catch (error) {
            console.error('Error fetching updated account information:', error);
        }
    };

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    return (
        <>
        <Header/>
        <div className="profile-container"> {/* Thêm class 'profile-container' */}
            <h2>Thông tin người dùng</h2>
            <div className="profile-info"> {/* Thêm class 'profile-info' */}
                <img src={accountInfo.avatar} alt="Avatar" className="avatar" /> {/* Thêm class 'avatar' */}
            </div>
            <div className="profile-info"> {/* Thêm class 'profile-info' */}
                <label>Username:</label>
                <p>{accountInfo.username}</p>
            </div>
            <div className="profile-info"> {/* Thêm class 'profile-info' */}
                <label>Họ và tên:</label>
                <p>{accountInfo.full_name}</p>
            </div>
            <div className="profile-info"> {/* Thêm class 'profile-info' */}
                <label>Địa chỉ:</label>
                <p>{accountInfo.address}</p>
            </div>
            <div className="profile-info"> {/* Thêm class 'profile-info' */}
                <label>Số điện thoại:</label>
                <p>{accountInfo.phone}</p>
            </div>
            <button className="update-button" onClick={handleOpenUpdateModal}>Cập nhật thông tin</button> {/* Thêm class 'update-button' */}
            {showUpdateModal && <UpdateAccount id={id} showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} onUpdateSuccess={onUpdateSuccess} />}
        </div>
            <Footer/>
        </>
    );
};
