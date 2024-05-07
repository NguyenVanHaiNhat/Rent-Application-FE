import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { searchAll } from "../../service/HomeService";
import Header from "./Header";

const Home = () => {
    const [houses1, setHouses1] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(2); // Số lượng host hiển thị trên mỗi trang
    const [searchBedrooms, setSearchBedrooms] = useState("");
    const [searchBathrooms, setSearchBathrooms] = useState("");
    const [searchAddress, setSearchAddress] = useState("");
    const [searchPrice, setSearchPrice] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    let { id } = useParams();

    useEffect(() => {
        getAllHouses1();
    }, []);

    const getAllHouses1 = () => {
        searchAll(searchBedrooms, searchBathrooms, searchAddress, searchPrice, checkInDate, checkOutDate)
            .then((res) => {
                setHouses1(res);
                console.log(res);
            })
            .catch((error) => {
                console.error("Error fetching houses:", error);
            });
    };

    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = houses1.slice(indexOfFirstHouse, indexOfLastHouse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = () => {
        getAllHouses1();
    };

    return (
        <>
            <div>
                <Header/>
            </div>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Danh sách căn nhà</h2>
                <div className="row">
                    <div className="col-md-2 mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Số phòng ngủ"
                            value={searchBedrooms}
                            onChange={(e) => setSearchBedrooms(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Số phòng tắm"
                            value={searchBathrooms}
                            onChange={(e) => setSearchBathrooms(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Địa chỉ"
                            value={searchAddress}
                            onChange={(e) => setSearchAddress(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Giá"
                            value={searchPrice}
                            onChange={(e) => setSearchPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Ngày nhận phòng"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Ngày trả phòng"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <button className="btn btn-primary mt-2" onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </div>
                <div className="row">
                    {currentHouses.map((house, index) => (
                        <div key={house.id} className="col-md-6 mb-4">
                            <div className="card">
                                <img
                                    src={house.image}
                                    className="card-img-top"
                                    alt={house.name_house}
                                    style={{height: "200px", objectFit: "cover"}}
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
                                            <Link to={`/house/${house.id}`} className="btn btn-primary ">Chi tiết</Link>
                                        </div>
                                        <div className="col-6">
                                            <Link to={`/house/update/${house.id}`} className="btn btn-primary">Cập nhật</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    housesPerPage={housesPerPage}
                    totalHouses={houses1.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
};

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

export default Home;