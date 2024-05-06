import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./houseDetail.css"
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {findHouseImageById} from "../../service/HouseService";


const HouseDetail = () => {
    const [houseInfo, setHouseInfo] = useState({
        name_house: '',
        address: '',
        num_of_bedrooms: '',
        num_of_bathrooms: '',
        description: '',
        price_of_day: '',
        image: null,
        all_images: null
    });

    const [hoveredImageUrl, setHoveredImageUrl] = useState(null);
    const {id} = useParams();
    const [imgIndex, setImgIndex] = useState(0);
    const handleSelectImage = (selectedIndex) => {
        setImgIndex(selectedIndex);
    };
    useEffect(() => {
        const fetchHouseInfo = async () => {
            try {
                const fetchedHouseInfo = await findHouseImageById(id);
                setHouseInfo(fetchedHouseInfo);
            } catch (error) {
                console.error('Error fetching house information:', error);
            }
        };

        if (id) {
            fetchHouseInfo();
        }
    }, [id]);

    const handleImageMouseEnter = (imageUrl) => {
        setHoveredImageUrl(imageUrl);
    };
    return (
        <div className="container">
            <div className="card border border-5 rounded">
                <div className="card-body">
                    <div className="row">
                        <h2>Thông tin chi tiết căn nhà</h2>
                        <div className="col-6">
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
                            <ol className="d-flex p-0">
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
                        <div className="col-6 d-flex justify-content-center ">
                            <div className="text-left">
                                <h3>Đặc điểm bất động sản</h3>
                                <div className="mb-3">
                                    <p className="form-label">Tên căn nhà : {houseInfo.name_house}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="form-label">Địa chỉ : {houseInfo.address}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="form-label">Số lượng phòng ngủ : {houseInfo.num_of_bedrooms} phòng</p>
                                </div>
                                <div>
                                    <p className="form-label">Số lượng phòng tắm : {houseInfo.num_of_bathrooms} phòng</p>
                                </div>
                                <div className="mb-3">
                                    <p className="form-label">Mô tả : {houseInfo.description} phòng</p>
                                </div>
                                <div className="mb-3">
                                    <p className="form-label">Giá tiền theo ngày : {houseInfo.price_of_day} (VNĐ)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default HouseDetail;