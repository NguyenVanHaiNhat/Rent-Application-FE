import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {findAllListHouse} from "../../service/HostService";

const ListHouse = () => {
    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(2); // Số lượng host hiển thị trên mỗi trang
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    let {id} = useParams();
    useEffect(() => {
        getAllHouses();
    }, []);
    const getAllHouses = () => {
        findAllListHouse(id, searchName, searchStatus).then((res) => {
            setHouses(res);
        });
        console.log(houses)
    };

    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = houses.slice(indexOfFirstHouse, indexOfLastHouse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = () => {
        getAllHouses();
    };


    return (
        <>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Danh sách căn nhà</h2>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo tên nhà"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo trạng thái"
                            value={searchStatus}
                            onChange={(e) => setSearchStatus(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <button className="btn btn-primary mt-2" onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </div>
                {/*<button className="btn btn-primary mt-2" onClick={handleSearch}>Tìm kiếm</button>*/}
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
                                    <div className="row">
                                        <div className="col-6">
                                            <Link to={`/house/${house.id}`} className="btn btn-primary ">Detail</Link>
                                        </div>
                                        <div className="col-6 float-left">
                                            <Link to={`/house/update/${house.id}`} className="btn btn-primary">Cập
                                                nhật</Link>
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

export default ListHouse;