import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {findHostDetailById} from "../../service/HostService";


const HostDetail = () => {
    const [hostDetail, setHostDetail] = useState();

    let {id} = useParams();


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
            <div className="container mt-4">
                <h2>Host Detail</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form>
                            <div className="form-group">
                                <label htmlFor="avatar">Avatar:</label>
                                <img
                                    src={hostDetail && hostDetail.avatar}
                                    alt=""
                                    style={{width: "45px", height: "45px"}}
                                    className="rounded-circle"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={hostDetail && hostDetail.username}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullName">Họ và tên:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    value={hostDetail && hostDetail.fullName}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số điện thoại:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    value={hostDetail && hostDetail.phone}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={hostDetail && hostDetail.address}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Trạng thái:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="status"
                                    value={hostDetail && hostDetail.status}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="totalRevenue">Tổng Doanh thu:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="totalRevenue"
                                    value={hostDetail && hostDetail.totalRevenue}
                                    readOnly
                                />
                            </div>
                           <button className="btn btn-dark"> <Link to={`/owner/${id}`}>List House</Link></button>
                           <Link to={`/change-password`}><button className="btn-dark"> Change Password</button></Link>

                        </form>
                    </div>
                </div>
            </div>
                


        </>
    );
};


export default HostDetail;