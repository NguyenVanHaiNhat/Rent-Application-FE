import React from 'react';
import './Success.css'; // Import file CSS
import Modal from "react-bootstrap/Modal";

export default function ModalBookingSuccess(props) {
    const { show, onClose} = props;
    const redirectTo = () => {
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thành công !!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn đã đặt phòng thành công !!!</Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" className="success-button" onClick={redirectTo}>
                        Success
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
