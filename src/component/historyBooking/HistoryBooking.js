import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getAllHistory, updateBookingStatus} from "../../service/BookHouse";
import './HistoryBooking.css';
import {Button, Table} from "react-bootstrap";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

export default function HistoryBooking() {
    const [historyBookings, setHistoryBookings] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        getAllHistory(id).then((res) => {
            setHistoryBookings(res);
        });
    }, [id]);

    const handleCancelBooking = async (bookingId) => {
        try {
            if (!bookingId) {
                console.error('Booking ID is null');
                return;
            }
            await updateBookingStatus(bookingId);
            setHistoryBookings(prevBookings => prevBookings.map(booking => {
                if (booking.id === bookingId) {
                    return {...booking, status: 'AVAILABLE'};
                }
                return booking;
            }));
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    return (
        <>

        <div>
            <Header/>
        </div>
        <div className="history-container">
            <h2 className="history-title">History Bookings</h2>
            <Table striped bordered hover className="history-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>House Name</th>
                    <th>Total Order</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Cancel Rent</th>
                </tr>
                </thead>
                <tbody>
                {historyBookings.map((booking,index) => (
                    <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.start_date}</td>
                        <td>{booking.end_date}</td>
                        <td>{booking.name_house}</td>
                        <td>{booking.total_order}</td>
                        <td>{booking.address}</td>
                        <td>{booking.status}</td>
                        <td>
                            {booking.status === 'RENTED' ? (
                                <Button variant="danger" onClick={() => handleCancelBooking(booking.id)}>Hủy
                                    thuê</Button>
                            ) : null}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
            <div style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </>
    );
}
