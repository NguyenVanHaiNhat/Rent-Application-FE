import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getAllHistory, updateBookingStatus } from "../../service/BookHouse";
import './HistoryBooking.css';
import { Table, Button } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import Footer from "../Home/Footer";
import Header from "../Home/Header";

export default function HistoryBooking() {
    const [historyBookings, setHistoryBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { id } = useParams();

    const bookingsPerPage = 5;

    useEffect(() => {
        getAllHistory(id).then((res) => {
            setHistoryBookings(res);
            setTotalPages(Math.ceil(res.length / bookingsPerPage));
        });
    }, [id]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            if (!bookingId) {
                console.error('Booking ID is null');
                return;
            }
            await updateBookingStatus(bookingId);
            setHistoryBookings(prevBookings => prevBookings.map(booking => {
                if (booking.id === bookingId) {
                    return {...booking, status: 'Đã hủy'};
                }
                return booking;
            }));
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    const renderBookings = () => {
        const startIndex = currentPage * bookingsPerPage;
        const endIndex = startIndex + bookingsPerPage;
        const currentBookings = historyBookings.slice(startIndex, endIndex);

        return currentBookings.map((booking, index) => (
            <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.start_date}</td>
                <td>{booking.end_date}</td>
                <td>{booking.name_house}</td>
                <td>{booking.total_order}</td>
                <td>{booking.address}</td>
                <td>{booking.status}</td>
                <td className="center-cell">
                    {booking.status === 'Đang chờ nhận phòng' && (
                        <Button variant="outline-danger" onClick={() => handleCancelBooking(booking.id)}>Hủy thuê</Button>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <>
            <div>
                <Header/>
            </div>
        <div className="history-container">
            <h2 className="history-title">Lịch sử thuê nhà</h2>
            <Table striped bordered hover className="history-table">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Tên ngôi nhà</th>
                    <th>Tổng số tiền</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Hủy thuê</th>
                </tr>
                </thead>
                <tbody>
                {renderBookings()}
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel={"Trước"}
                nextLabel={"Tiếp theo"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName={"pagination"} // Đây là lớp CSS được gắn vào container của ReactPaginate
                activeClassName={"active"}
            />

        </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
}
