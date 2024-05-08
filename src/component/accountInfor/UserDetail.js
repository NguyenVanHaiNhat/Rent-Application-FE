import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {findUserDetailById} from "../../service/AccountService";
import Header from "../Home/Header";


const UserDetail = () => {
    const [userDetail, setUserDetail] = useState();

    let {id} = useParams();


    useEffect(() => {
        getAllUserDetail();
    }, []);

    const getAllUserDetail = () => {
        findUserDetailById(id)
            .then((res) => {
                setUserDetail(res);
            })
            .catch((error) => {
                console.error("Error fetching host details:", error);
                setUserDetail([]);
            });
    };



    return (
        <>
            <div>
                <Header/>
            </div>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <img
                                        src={userDetail && userDetail.avatar}
                                        alt=""
                                        style={{width: "100%", height: "250px"}}
                                    />
                                </div>
                                <hr />
                                <h2>Thông tin chi tiết</h2>
                                <div className="form-group">
                                    <p htmlFor="username"> Username: <span className="m-lg-2">{userDetail && userDetail.username}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="fullName">Họ và tên: <span className="m-lg-2">{userDetail && userDetail.fullName}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="phoneNumber">Số điện thoại: <span className="m-lg-2">{userDetail && userDetail.phoneNumber}</span></p>
                                </div>

                                <div className="form-group">
                                    <p htmlFor="status">Trạng thái: <span className="m-lg-2">{userDetail && userDetail.status}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="amountSpent">Tổng chi tiêu: <span className="m-lg-2">{userDetail && userDetail.amountSpent}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="amountSpent"><Link className="btn btn-warning" to={`/history/${id}`}>History</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};


export default UserDetail;