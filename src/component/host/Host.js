import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {findAllHost, updateAccountStatus} from "../../service/HostService";


const Host = () => {
    const [host, setHost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hostsPerPage] = useState(2); // Số lượng host hiển thị trên mỗi trang

    useEffect(() => {
        getAllHost();
    }, []);

    const getAllHost = () => {
        findAllHost().then((res) => {
            setHost(res);
        });
    };

    const handleLockAccount = (id, newStatus) => {
        updateAccountStatus(id, newStatus)
            .then(() => {
                getAllHost();
            })
            .catch((error) => {
                console.error("Error locking account:", error);

            });
    };

    const indexOfLastHost = currentPage * hostsPerPage;
    const indexOfFirstHost = indexOfLastHost - hostsPerPage;
    const currentHosts = host.slice(indexOfFirstHost, indexOfLastHost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);




    return (
        <>
            <div className="container mt-4">
                <h2>List host</h2>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Doanh thu</th>
                        <th scope="col">Số nhà</th>
                        <th scope="col">Hành động</th>
                        <th scope="col">Detail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentHosts.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.fullName}</td>
                            <td>{item.phone}</td>
                            <td>{item.status}</td>
                            <td>{item.totalRevenue}</td>
                            <td>{item.numberOfHouses}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleLockAccount(item.id, item.status === "Đang hoạt động" ? "Khóa" : "Đang hoạt động")}
                                >
                                    {item.status === "Đang hoạt động" ? "Khóa" : "Mở khóa"}
                                </button>
                            </td>
                            <td className="text-center"><Link className="btn btn-warning" to={`/detail/${item.id}`}>Detail</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    hostsPerPage={hostsPerPage}
                    totalHosts={host.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
};

const Pagination = ({ hostsPerPage, totalHosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalHosts / hostsPerPage); i++) {
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

export default Host;
