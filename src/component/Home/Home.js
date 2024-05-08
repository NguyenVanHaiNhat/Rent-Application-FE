import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { searchAll, getTop5MostBookedHouses } from "../../service/HomeService";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Home = () => {
    const [houses1, setHouses1] = useState([]);
    const [top5Houses, setTop5Houses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(9);
    const [searchBedrooms, setSearchBedrooms] = useState("");
    const [searchBathrooms, setSearchBathrooms] = useState("");
    const [searchAddress, setSearchAddress] = useState("");
    const [searchPrice, setSearchPrice] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [searchError, setSearchError] = useState("");

    let { id } = useParams();

    useEffect(() => {
        getAllHouses1();
        getTop5Houses();
    }, []);

    const getAllHouses1 = () => {
        searchAll(
            searchBedrooms,
            searchBathrooms,
            searchAddress,
            searchPrice,
            checkInDate,
            checkOutDate
        )
            .then((res) => {
                setHouses1(res);
                setSearchError("");
            })
            .catch((error) => {
                console.error("Error fetching houses:", error);
            });
    };

    const getTop5Houses = () => {
        getTop5MostBookedHouses()
            .then((res) => {
                setTop5Houses(res);
            })
            .catch((error) => {
                console.error("Error fetching top 5 houses:", error);
            });
    };

    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = houses1.slice(indexOfFirstHouse, indexOfLastHouse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = () => {
        if (checkInDate && checkOutDate && new Date(checkInDate) >= new Date(checkOutDate)) {
            alert("Ngày nhận phòng phải trước ngày trả phòng.");
            return;
        }

        setSearchError("");
        getAllHouses1();
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <img
                    alt=""
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2024/05/06/1715012791662-a05945f5bf23efc89b4b9688ca283d88.jpeg?tr=q-75,w-1280"
                    style={{ width: "100%", height: "auto" }}
                />
            </div>
            <div>
                <img
                    alt=""
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2024/04/23/1713856101097-e771a0cb31ac1cfd55bfaeed2032a013.png?tr=q-75,w-1280"
                    style={{ width: "92%", height: "auto", marginLeft: "4%", marginTop: "5%" }}
                />
            </div>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Top 5 nhà được thuê nhiều nhất</h2>
                <div className="row">
                    {top5Houses.map((house, index) => (
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
                <h2 className="text-center mb-4">Danh sách căn nhà</h2>
                <div className="row">
                    <TextField
                        className="col-md-2 mb-2"
                        label="Số phòng ngủ"
                        type="number"
                        value={searchBedrooms}
                        onChange={(e) => setSearchBedrooms(e.target.value)}
                    />
                    <TextField
                        className="col-md-2 mb-2"
                        label="Số phòng tắm"
                        type="number"
                        value={searchBathrooms}
                        onChange={(e) => setSearchBathrooms(e.target.value)}
                    />
                    <TextField
                        className="col-md-2 mb-2"
                        label="Địa chỉ"
                        type="text"
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                    />
                    <TextField
                        className="col-md-2 mb-2"
                        label="Giá"
                        type="number"
                        value={searchPrice}
                        onChange={(e) => setSearchPrice(e.target.value)}
                    />
                    <TextField
                        className="col-md-2 mb-2"
                        label="Ngày nhận phòng"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                    />
                    <TextField
                        className="col-md-2 mb-2"
                        label="Ngày trả phòng"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                    <Button className="col-md-2 mb-2" variant="contained" color="primary" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </div>
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
                <Pagination housesPerPage={housesPerPage} totalHouses={houses1.length} paginate={paginate} />
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
                        <a onClick={() => paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Home;