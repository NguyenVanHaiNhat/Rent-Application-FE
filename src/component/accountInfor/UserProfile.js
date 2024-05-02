import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findAccountDetailById} from "../../service/AccountInfor";

export default function UserProfile(){
    const [accountInfo, setAccountInfor] = useState({});
    const {id} = useParams();
    const {imagePreview, setImagePreview} = useState(null);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const fetchedAccountInfo = await findAccountDetailById(id);
                setAccountInfor(fetchedAccountInfo);
                setImagePreview(fetchedAccountInfo.avatar);
            } catch (error) {
                console.error('Error fetching account information:', error);
            }
        };

        if (id) {
            fetchAccountInfo();
        }
    }, [id]);


    return (
        <div>
            <h2>Thông tin người dùng</h2>
            <div>
                <label>Avatar:</label>
                <img src={accountInfo.avatar} alt="Avatar" style={{width: '100px', height: '100px'}}/>
            </div>
            <div>
                <label>Username:</label>
                <p>{accountInfo.username}</p>
            </div>
            <div>
                <label>Họ và tên:</label>
                <p>{accountInfo.full_name}</p>
            </div>
            <div>
                <label>Địa chỉ:</label>
                <p>{accountInfo.address}</p>
            </div>
            <div>
                <label>Số điện thoại:</label>
                <p>{accountInfo.phone}</p>
            </div>
            <Link to={`/account/profile/${id}`}>
                <button>Update</button></Link>
        </div>
    );
};