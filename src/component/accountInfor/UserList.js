import {Link} from "react-router-dom";
import {updateAccountStatus} from "../../service/HostService";
import {BsFillLockFill, BsInfoCircleFill, BsPersonFill, BsPhone} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {findAllListUser} from "../../service/AccountService";
import Header from "../Home/Header";
import Footer from "../Home/Footer";



const UserList = () => {
    const [users, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage] = useState(2); // Số lượng host hiển thị trên mỗi trang

    useEffect(() => {
        getAllListUser();
    }, []);

    const getAllListUser = () => {
        findAllListUser().then((res) => {
            setUser(res);
        });
    };

    const handleLockAccount = (id, newStatus) => {
        updateAccountStatus(id, newStatus)
            .then(() => {
                getAllListUser();
            })
            .catch((error) => {
                console.error("Error locking account:", error);

            });
    };

    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUser = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div>
                <Header/>
            </div>
            <div className="container mt-4">
                <h2>List user</h2>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col"> <BsPersonFill className="mr-2" /> Họ và tên</th>
                        <th scope="col"> <BsPhone className="mr-2" /> Số điện thoại</th>
                        <th scope="col"><BsInfoCircleFill className="mr-2" /> Trạng thái</th>
                        <th scope="col"> <BsFillLockFill /> Hành động</th>
                        <th scope="col">Detail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUser.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-right">{index + 1}</td>
                            <td>{item.full_name}</td>
                            <td className="text-right">{item.phone}</td>
                            <td>{item.status}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleLockAccount(item.id, item.status === "Đang hoạt động" ? "Khóa" : "Đang hoạt động")}
                                >
                                    {item.status === "Đang hoạt động" ? "Khóa" : "Mở khóa"}
                                </button>
                            </td>
                            <td className="text-center"><Link className="btn btn-warning" to={`/user/${item.id}`}>Detail</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    userPerPage={userPerPage}
                    totalUsers={users.length}
                    paginate={paginate}
                />
            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
};

const Pagination = ({ userPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default UserList;