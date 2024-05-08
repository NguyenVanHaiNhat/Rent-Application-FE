import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {findAllListHouseMaintenance} from "../../service/HostService";
import Header from "../Home/Header";

const ListHouseMaintenance = () => {
    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(4); // Số lượng host hiển thị trên mỗi trang
    let {id} = useParams();

    useEffect(() => {
        getAllHouses();
    }, []);

    const getAllHouses = () => {
        findAllListHouseMaintenance(id).then((res) => {
            setHouses(res);
        });
    };

    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = houses.slice(indexOfFirstHouse, indexOfLastHouse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <Header/>
            </div>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Danh sách căn nhà đang bảo trì</h2>
                <div className="row">
                    {currentHouses.map((house, index) => (
                        <div key={house.id} className="col-md-4 mb-4">
                            <div className="card rounded">
                                <img
                                    src={house.image}
                                    className="card-img-top"
                                    alt={house.name_house}
                                    style={{
                                        height: "150px",
                                        objectFit: "cover",
                                        borderTopLeftRadius: "10px",
                                        borderTopRightRadius: "10px",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{house.name_house}</h5>
                                    <p className="card-text">Địa chỉ: {house.address}</p>
                                    <p className="card-text">Số phòng ngủ: {house.num_of_bedrooms}</p>
                                    <p className="card-text">Số phòng tắm: {house.num_of_bathrooms}</p>
                                    <p className="card-text">Giá phòng mỗi ngày: {house.price_of_day}</p>
                                    <p className="card-text">Trạng thái: {house.status}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-6">
                                            <Link to={`/house/${house.id}`} className="btn btn-primary">
                                                Chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    housesPerPage={housesPerPage}
                    totalHouses={houses.length}
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

export default ListHouseMaintenance;