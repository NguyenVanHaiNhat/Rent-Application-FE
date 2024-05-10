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
import PostImage from "./PostImage";
import Modal from "react-bootstrap/Modal";
import {toast} from "react-toastify";

const HouseDetail = () => {
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

    const { id } = useParams();
    const [imgIndex, setImgIndex] = useState(0);
    const [showPostImageModal, setShowPostImageModal] = useState(false);
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [hoveredImageUrl, setHoveredImageUrl] = useState(null);

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
        if (id) {
            fetchHouseInfo();
        }
    }, [id]);

    const togglePostImageModal = () => {
        setShowPostImageModal(!showPostImageModal);
    };

    const toggleUpdateStatusModal = () => {
        setShowUpdateStatusModal(!showUpdateStatusModal);
    };

    const handleCloseUpdateStatusModal = () => {
        setShowUpdateStatusModal(false);
    };

    const handleUpdateStatus = (id, newStatus) => {
        updateHouseStatus(houseInfo.id, selectedStatus)
            .then(() => {
                fetchHouseInfo();
                toast.success("sửa trạng thái nhà thành công")
                handleCloseUpdateStatusModal(); // Đóng modal sau khi cập nhật thành công
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    const handleImageMouseEnter = (imageUrl) => {
        setHoveredImageUrl(imageUrl);
    };
    return (
        <>

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
                                                <div className="col-6"><Link
                                                    to={`/book/${houseInfo.id}/${houseInfo.price_of_day}`}><Button>Đặt
                                                    ngay</Button></Link></div>
                                                <div className="col-6">
                                                    <button onClick={togglePostImageModal}>Đăng ảnh</button>
                                                    {showPostImageModal && <PostImage toggleModal={() => setShowPostImageModal(false)}
                                                                             onUpdateSuccess={fetchHouseInfo()}/>}
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-center">
                                                        <button onClick={toggleUpdateStatusModal}>Cập nhật trạng thái
                                                        </button>
                                                    </div>
                                                </div>
                                                <Modal show={showUpdateStatusModal} onHide={handleCloseUpdateStatusModal}>
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

            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
};


export default HouseDetail;
