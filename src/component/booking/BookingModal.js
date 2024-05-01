import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";

export default function BookingModal(props) {
    const { show, onClose} = props;
    const navigate = useNavigate();
    const redirectTo = () => {
        onClose();
        navigate("/");
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Booking successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Success
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
