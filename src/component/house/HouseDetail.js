import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./houseDetail.css"
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {findHouseImageById} from "../../service/HouseService";
import Button from "react-bootstrap/Button";
import Footer from "../Home/Footer";
import {addNewRate, findAllRate} from "../../service/RateService";
import "./CreateRate.css"


const HouseDetail = () => {
    const [stars, setStars] = useState("");
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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

    const [rate, setRate] = useState([]);

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


    // phần đánh giá
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
        try {
            const rate = {
                stars: stars,
                content: content
            };

            await addNewRate(id, rate);
            setSuccessMessage('Rate created successfully!');
            setStars("");
            setContent('');
            getAllRateDetail();
        } catch (error) {
            setErrorMessage('Error creating rate');
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

    // phần edit
    const [expandedItems, setExpandedItems] = useState([]);

    const toggleExpand = (id) => {
        if (expandedItems.includes(id)) {
            setExpandedItems(expandedItems.filter(item => item !== id));
        } else {
            setExpandedItems([...expandedItems, id]);
        }
    };

    // Thêm state cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    // Tính toán chỉ mục của các mục hiện tại trên trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rate.slice(indexOfFirstItem, indexOfLastItem);

    // Hàm thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Thêm logic hiển thị phân trang cho danh sách đánh giá
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rate.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
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
                                            <p className="form-label"><Link
                                                to={`/book/${houseInfo.id}/${houseInfo.price_of_day}`}><Button>Book
                                                Now</Button></Link></p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="form-label"><Link
                                                to={`/api/image/${houseInfo.id}`}><Button>Up Image</Button></Link></p>
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
                        <button className="mt-2" type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Bình Luận'}
                        </button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
                <div className="row">
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



            </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
};


export default HouseDetail;