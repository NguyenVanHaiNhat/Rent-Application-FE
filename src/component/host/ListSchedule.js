import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListSchedule } from "../../service/HostService";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

export default function ListSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [schedulePerPage] = useState(3);
    let { id } = useParams();

    useEffect(() => {
        getSchedule();
    }, []);

    const getSchedule = () => {
        getListSchedule(id).then((res) => {
            setSchedule(res);
        });
    };

    const indexOfLastHouse = currentPage * schedulePerPage;
    const indexOfFirstHouse = indexOfLastHouse - schedulePerPage;
    const currentSchedule = schedule.slice(indexOfFirstHouse, indexOfLastHouse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Lịch đặt thuê nhà của mình</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Nhà</th>
                        <th scope="col">Thời Gian Thuê</th>
                        <th scope="col">Tên Khách Hàng</th>
                        <th scope="col">Trạng Thái Đơn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentSchedule.map((schedule, index) => (
                        <tr key={schedule.id}>
                            <td>{index + 1}</td>
                            <td>{schedule.name_house}</td>
                            <td>
                                Từ ngày {schedule.start_date} đến ngày {schedule.end_date}
                            </td>
                            <td>{schedule.full_name}</td>
                            <td>{schedule.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination housesPerPage={schedulePerPage} totalHouses={schedule.length} paginate={paginate} />
            </div>
            <div style={{ marginTop: "5%" }}>
                <Footer />
            </div>
        </>
    );
}

const Pagination = ({ housesPerPage, totalHouses, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalHouses / housesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
