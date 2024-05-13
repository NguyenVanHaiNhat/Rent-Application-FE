import React from 'react';
import './Success.css'; // Import file CSS
import Modal from "react-bootstrap/Modal";

export default function ModalChangePasswordSuccess(props) {
    const { show, onClose} = props;
    const redirectTo = () => {
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
            <Modal.Title>Thành công !!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn đã đổi mật khẩu thành công !!!</Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" className="success-button" onClick={redirectTo}>
                        Đóng
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
