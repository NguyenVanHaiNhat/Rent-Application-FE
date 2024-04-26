import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {findAllListHouse} from "../../service/HostService";



const ListHouse = () => {
    const [houses, setHouse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(2); // Số lượng host hiển thị trên mỗi trang
    let {id} = useParams();

    useEffect(() => {
        getAllHouse();
    }, []);

    const getAllHouse = () => {
        findAllListHouse(id).then((res) => {
            setHouse(res);
        });
    };

    const indexOfLastHost = currentPage * housesPerPage;
    const indexOfFirstHost = indexOfLastHost - housesPerPage;
    const currentHouses = houses.slice(indexOfFirstHost, indexOfLastHost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);




    return (
        <>
            <div className="container mt-4">
                <h2>List host</h2>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Tên nhà</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Số phòng ngủ</th>
                        <th scope="col">Số phòng tắm</th>
                        <th scope="col">Giá phòng mỗi ngày</th>
                        <th scope="col">Hình ảnh</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentHouses.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name_house}</td>
                            <td>{item.address}</td>
                            <td>{item.num_of_bedrooms}</td>
                            <td>{item.num_of_bathrooms}</td>
                            <td>{item.price_of_day}</td>
                            <td className="text-center">
                                <img
                                    src={item && item.image}
                                    alt=""
                                    style={{width: "200px", height: "200px"}}
                                    className="rectangle"
                                /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    housesPerPage={housesPerPage}
                    totalHouses={houses.length}
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

export default ListHouse;

