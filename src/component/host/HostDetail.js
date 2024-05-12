import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {findHostDetailById} from "../../service/HostService";
import Header from "../Home/Header";
import Footer from "../Home/Footer";



const HostDetail = () => {
    const [hostDetail, setHostDetail] = useState();

    let {id} = useParams();
    const role = localStorage.getItem("role")
    console.log(role)

    useEffect(() => {
        getAllHostDetail();
    }, []);

    const getAllHostDetail = () => {
        findHostDetailById(id)
            .then((res) => {
                setHostDetail(res);
            })
            .catch((error) => {
                console.error("Error fetching host details:", error);
                setHostDetail([]);
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
                                        src={hostDetail && hostDetail.avatar}
                                        alt=""
                                        style={{width: "100%", height: "250px"}}
                                    />
                                </div>
                                <hr />
                                <h2>Thông tin chi tiết</h2>
                                <div className="form-group">
                                    <p htmlFor="username"> Username: <span className="m-lg-2">{hostDetail && hostDetail.username}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="fullName">Họ và tên: <span className="m-lg-2">{hostDetail && hostDetail.fullName}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="phone">Số điện thoại: <span className="m-lg-2">{hostDetail && hostDetail.phone}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="address">Địa chỉ: <span className="m-lg-2">{hostDetail && hostDetail.address}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="status">Trạng thái: <span className="m-lg-2">{hostDetail && hostDetail.status}</span></p>
                                </div>
                                <div className="form-group">
                                    <p htmlFor="totalRevenue">Tổng Doanh thu: <span className="m-lg-2">{hostDetail && hostDetail.totalRevenue}</span></p>
                                </div>
                                <button className="btn btn-dark"> <Link to={`/owner/${id}`} style={{ color: "white", textDecoration: "none" }}>Danh sách nhà</Link></button>
                                {role === "ROLE_HOST" && (
                                    <button className="btn btn-dark"> <Link to={`/totalIncome`} style={{ color: "white", textDecoration: "none" }}>Thống kê thu nhập</Link></button>
                                )}
                                <button className="btn btn-dark"> <Link to={`/history/${id}`} style={{ color: "white", textDecoration: "none" }}>Lịch sử thuê nhà</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>



        </>
    );
};


export default HostDetail;