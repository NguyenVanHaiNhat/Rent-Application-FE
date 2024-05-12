import React, { useEffect, useState } from "react";
import { getTotalIncome, getTotalIncomeRange } from "../../service/BookHouse";
import { Table, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import "./TotalIncome.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const TotalIncome = () => {
    const [totalIncome, setTotalIncome] = useState([]);
    const [startYear, setStartYear] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endYear, setEndYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // currentPage starts from 0 for ReactPaginate
    const [rowsPerPage] = useState(12); // Number of rows to display per page

    const id = localStorage.getItem("idAccount");

    useEffect(() => {
        fetchData();
    }, []); // Fetch data once on component mount

    const fetchData = () => {
        if (startYear && startMonth && endYear && endMonth && !isEndDateBeforeStartDate()) {
            getTotalIncomeRange(
                id,
                parseInt(startYear),
                parseInt(startMonth),
                parseInt(endYear),
                parseInt(endMonth)
            )
                .then((res) => {
                    setTotalIncome(res);
                    setError(null);
                    setCurrentPage(0); // Reset current page to 0 after fetching new data
                })
                .catch((error) => {
                    console.error("Error fetching total income range:", error);
                    setTotalIncome([]);
                    toast.info("Trong tháng đã chọn không có ngôi nhà được thuê");
                });
        } else if (!startYear && !startMonth && !endYear && !endMonth) {
            getTotalIncome(id)
                .then((res) => {
                    setTotalIncome(res);
                    setError(null);
                    setCurrentPage(0); // Reset current page to 0 after fetching new data
                })
                .catch((error) => {
                    console.error("Error fetching total income:", error);
                    setTotalIncome([]);
                    setError("Không có dữ liệu");
                });
        }
    };

    const handleApply = () => {
        fetchData();
    };

    const isEndDateBeforeStartDate = () => {
        return (
            parseInt(endYear) < parseInt(startYear) ||
            (parseInt(endYear) === parseInt(startYear) && parseInt(endMonth) < parseInt(startMonth))
        );
    };

    // Logic for pagination
    const indexOfLastRow = (currentPage + 1) * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = totalIncome.slice(indexOfFirstRow, indexOfLastRow);

    // Change page
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const totalPages = Math.ceil(totalIncome.length / rowsPerPage);

    return (
        <>
        <div>
            <Header/>
        </div>
        <div className="total-income">
            <h3>Thống kê thu nhập theo tháng</h3>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Từ tháng - năm :</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control as="select" value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
                                    <option value="">Chọn tháng :</option>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control as="select" value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                                    <option value="">Chọn năm :</option>
                                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Đến tháng - năm:</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control as="select" value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
                                    <option value="">Chọn tháng :</option>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control as="select" value={endYear} onChange={(e) => setEndYear(e.target.value)}>
                                    <option value="">Chọn năm</option>
                                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col className="align-self-end">
                    <button className="dat" variant="primary" onClick={handleApply}>Apply</button>
                    {isEndDateBeforeStartDate() && (
                        <Alert variant="danger">Thời gian kết thúc phải lớn hơn thời gian bắt đầu</Alert>
                    )}
                </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tháng</th>
                        <th>Năm</th>
                        <th>Tổng Thu Nhập</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRows.map((t, index) => (
                        <tr key={index}>
                            <td>{index + 1 + indexOfFirstRow}</td>
                            <td>{t.months}</td>
                            <td>{t.years}</td>
                            <td>{t.total_money.toLocaleString()} VNĐ</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <div className="pagination">
                <ReactPaginate
                    previousLabel={"Trước"}
                    nextLabel={"Tiếp theo"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
};

export default TotalIncome;
