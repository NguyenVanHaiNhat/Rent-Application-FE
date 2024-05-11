import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getListSchedule} from "../../service/HostService";

export default function ListSchedule(){
    const [schedule, setSchedule] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [schedulePerPage] = useState(3);
    let {id} = useParams();

    useEffect(() => {
        getSchedule()
    }, []);

    const getSchedule = () => {
        getListSchedule(id).then((res) => {
            setSchedule(res)
        });
    }

    const indexOfLastHouse = currentPage * schedulePerPage;
    const indexOfFirstHouse = indexOfLastHouse - schedulePerPage;
    const currentSchedule = schedule.slice(indexOfFirstHouse, indexOfLastHouse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Lịch đặt thuê</h2>
                <div className="row">
                    {currentSchedule.map((schedule, index) => (
                        <div key={schedule.id} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{schedule.name_house}</h5>
                                    <p className="card-text">Thời gian thuê : Từ ngày {schedule.start_date} đến ngày {schedule.end_date}</p>
                                    <p className="card-text">Tên khách hàng: {schedule.full_name}</p>
                                    <p className="card-text">Trạng thái đơn: {schedule.status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    housesPerPage={schedulePerPage}
                    totalHouses={schedule.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
};

const Pagination = ({housesPerPage, totalHouses, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalHouses / housesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            onClick={() => paginate(number)}
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
