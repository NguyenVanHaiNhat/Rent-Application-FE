import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./houseDetail.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { findHouseImageById, updateHouseStatus } from "../../service/HouseService";
import Button from "react-bootstrap/Button";
import Footer from "../Home/Footer";
import {addNewRate, checkRate, findAllRate} from "../../service/RateService";
import "./CreateRate.css"
import {toast} from "react-toastify";
import ModalBooking from "../booking/ModalBooking";

import PostImage from "./PostImage";
import Modal from "react-bootstrap/Modal";
import Header from "../Home/Header";
import {logDOM} from "@testing-library/react";

const HouseDetail = () => {
    const [stars, setStars] = useState("");
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [houseInfo, setHouseInfo] = useState({
        name_house: "",
        address: "",
        num_of_bedrooms: "",
        num_of_bathrooms: "",
        description: "",
        price_of_day: "",
        status: "",
        image: null,
        all_images: null,
    });

    const id_account = localStorage.getItem('idAccount');


    const [rate, setRate] = useState([]);
    const { id } = useParams();
    const [imgIndex, setImgIndex] = useState(0);
    const [showPostImageModal, setShowPostImageModal] = useState(false);
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [hoveredImageUrl, setHoveredImageUrl] = useState(null);
    const [showModalBooking,setShowModalBooking] = useState(false)
    const role = localStorage.getItem('role');
    const idAccount = parseInt(localStorage.getItem('idAccount'));

    const handleSelectImage = (selectedIndex) => {
        setImgIndex(selectedIndex);
    };

    const fetchHouseInfo = async () => {
        try {
            const fetchedHouseInfo = await findHouseImageById(id);
            setHouseInfo(fetchedHouseInfo);
        } catch (error) {
            console.error("Error fetching house information:", error);
        }
    };

    useEffect(() => {
        const fetchHouseInfo = async () => {
            try {
                const fetchedHouseInfo = await findHouseImageById(id);
                setHouseInfo(fetchedHouseInfo);
                console.log(houseInfo.all_images)
            } catch (error) {
                console.error('Error fetching house information:', error);
            }
        };

        if (id) {
            fetchHouseInfo();
        }
    }, [id]);


    // phần đánh giá
    const togglePostImageModal = () => {
        setShowPostImageModal(!showPostImageModal);
    };

    const toggleUpdateStatusModal = () => {
        setShowUpdateStatusModal(!showUpdateStatusModal);
    };

    const handleCloseUpdateStatusModal = () => {
        setShowUpdateStatusModal(false);
    };
    const handleCloseModalBooking = () => {
        setShowModalBooking(false);
    }
    const handleShowModalBooking = () => {
        setShowModalBooking(true);
    }

    const handleUpdateStatus = (id, newStatus) => {
        if (role === 'ROLE_HOST' && houseInfo.id_account === idAccount) {
            updateHouseStatus(houseInfo.id, selectedStatus)
                .then(() => {
                    fetchHouseInfo();
                    toast.success("sửa trạng thái nhà thành công")
                    handleCloseUpdateStatusModal(); // Đóng modal sau khi cập nhật thành công
                })
                .catch((error) => {
                    console.error("Error updating status:", error);
                    toast.error("Không thể cập nhật trạng thái nhà đang cho thuê")
                });
        } else {
            toast.error('Bạn không có quyền cập nhật trạng thái cho nhà này');
        }
    };

    const handleImageMouseEnter = (imageUrl) => {
        setHoveredImageUrl(imageUrl);
    };
    const handleStarClick = (starIndex) => {
        setStars(starIndex);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const check = await checkRate(id,id_account);
        if (check === 0) {
            toast.error("Bạn vui lòng đặt phòng")
        } else {
            try {
                const rate = {
                    stars: stars,
                    content: content
                };

                await addNewRate(id, rate, id_account);
                toast.success("Đã thêm đánh giá thành công", {autoClose: 1000})
                setStars("");
                setContent('');
                getAllRateDetail();
            } catch (error) {
                toast.error('Error creating rate', {autoClose: 1000})
            }
        }


        setIsLoading(false);
    };
// phần hiển thị tương tác
    useEffect(() => {
        getAllRateDetail();
    }, []);
    const getAllRateDetail = () => {
        findAllRate(id)
            .then((res) => {
                setRate(res);
            })
            .catch((error) => {
                console.error("Error fetching rate details:", error);
                setRate([]);
            });
    };

// Sắp xếp mảng rate theo id từ lớn đến nhỏ
    const sortedRate = rate.slice().sort((a, b) => new Date(b.time_rate) - new Date(a.time_rate));

    // Thêm state cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    // Tính toán chỉ mục của các mục hiện tại trên trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedRate.slice(indexOfFirstItem, indexOfLastItem);

    // Hàm thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Thêm logic hiển thị phân trang cho danh sách đánh giá
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rate.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <div>
                <Header/>
            </div>
            <div className="container">
                <div className="card border-3">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="row">
                                <h2>Thông tin chi tiết căn nhà</h2>
                                <div className="col-6 ">
                                    <div className="card border-2">
                                        <div className="card-body p-0">
                                            <Carousel
                                                interval={null}
                                                indicators={false}
                                                activeIndex={imgIndex}
                                                onSelect={handleSelectImage}
                                            >
                                                {houseInfo.all_images && houseInfo.all_images.split(',').map((imagePath, i) => (
                                                    <Carousel.Item key={i}>
                                                        <img
                                                            className="d-block w-100"
                                                            style={{width: "50px", height: "400px"}}
                                                            src={imagePath}
                                                            alt={`Ảnh ${i}`}
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                            <ol className="d-flex p-2">
                                                {houseInfo.all_images && houseInfo.all_images.split(',').map((imagePath, i) => (
                                                    <li
                                                        style={{listStyleType: "none"}}
                                                        key={i}
                                                        onClick={() => handleSelectImage(i)}
                                                        className={i === imgIndex ? "active" : ""}
                                                    >
                                                        <img
                                                            className="mx-3 shadow rounded-1"
                                                            src={imagePath}
                                                            style={{width: "100px", height: "100px"}}
                                                            alt={`Ảnh ${i}`}
                                                        />
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-4 d-flex justify-content-center">
                                    <div className="text-left">
                                        <h3>Đặc điểm bất động sản</h3>
                                        <div className="mb-3">
                                            <p className="form-label">Tên căn nhà : {houseInfo.name_house}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="form-label">Địa chỉ : {houseInfo.address}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="form-label">Số lượng phòng ngủ
                                                : {houseInfo.num_of_bedrooms} phòng</p>
                                        </div>
                                        <div>
                                            <p className="form-label">Số lượng phòng tắm
                                                : {houseInfo.num_of_bathrooms} phòng</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="form-label">Mô tả : {houseInfo.description} phòng</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="form-label">Giá tiền theo ngày
                                                : {houseInfo.price_of_day} (VNĐ)</p>
                                        </div>
                                        <div className="mb-3">
                                            <div className="row">
                                                <div className="mb-3">
                                                    <p className="form-label"><Button onClick={handleShowModalBooking}>Thuê
                                                        ngay</Button></p>
                                                </div>
                                                {role === 'ROLE_HOST' && (
                                                    <div className="col-6">
                                                        <button onClick={togglePostImageModal}>Đăng ảnh</button>
                                                        {showPostImageModal &&
                                                            <PostImage toggleModal={() => setShowPostImageModal(false)}
                                                                       onUpdateSuccess={fetchHouseInfo()}/>}
                                                    </div>
                                                )}
                                                {role === 'ROLE_HOST' && (
                                                    <div className="col-6">
                                                        <div className="text-center">
                                                            <button onClick={toggleUpdateStatusModal}>Cập nhật trạng
                                                                thái
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {role === 'ROLE_HOST' && (
                                                    <div className="col-3">
                                                        <div className="text-center">
                                                            <Link to={`/house/update/${houseInfo.id}`}><button>Sửa thông tin nhà
                                                            </button></Link>
                                                        </div>
                                                    </div>
                                                )}
                                                <Modal show={showUpdateStatusModal}
                                                       onHide={handleCloseUpdateStatusModal}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Cập nhật trạng thái</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <p className="form-label">Trạng thái :</p>
                                                        <select
                                                            className="form-select"
                                                            value={selectedStatus}
                                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                                        >
                                                            <option value="Đang trống">Đang trống</option>
                                                            <option value="Bảo trì">Bảo trì</option>
                                                        </select>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="primary" onClick={handleUpdateStatus}>
                                                            Xác nhận
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <h2 className="mt-3">Đánh giá ngôi nhà</h2>
                    <div className="">
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                            <div
                                key={starIndex}
                                className={`star ${starIndex <= stars ? 'checked' : ''}`}
                                onClick={() => handleStarClick(starIndex)}

                            >
                                &#9733; {/* Unicode character for star */}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="content">Nhận xét:</label>
                            <textarea
                                className="form-control"
                                id="content"
                                value={content}
                                onChange={handleContentChange}
                            />
                        </div>
                        <button className="btn btn-primary col-2 mt-2" type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Bình Luận'}
                        </button>
                    </form>

                </div>
                <div className="row mt-2">
                    {currentItems.map((item, index) => (
                        <div key={item.id} className="col-md-6 mb-4">
                            <div className="row">
                                <div className="col-1 mb-2">
                                    <img
                                        src={item.avatar}
                                        className="card-img-top rounded-circle"
                                        alt=""
                                        style={{height: "50px", width: "50px"}}
                                    />
                                </div>
                                <div className="col-4 mt-2 m-lg-2 " style={{fontWeight: "bold", fontSize: "larger"}}>
                                    {item.username}
                                </div>
                            </div>
                            <div>
                                {[...Array(item.stars)].map((star, index) => (
                                    <img key={index}
                                         src="https://cdn.pixabay.com/photo/2015/01/17/11/45/star-602148_960_720.png"
                                         alt="star" style={{width: "15px", height: "20px"}}/>
                                ))}
                            </div>
                            <div>Thời gian: {item.time_rate} </div>
                            <div>Nội dung đánh giá: {item.content}</div>
                            <hr/>
                        </div>
                    ))}

                </div>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} href="#" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>


                <ModalBooking
                    id={houseInfo.id}
                    price={houseInfo.price_of_day}
                    show={showModalBooking}
                    onClose={handleCloseModalBooking}
                />
            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
};


export default HouseDetail;