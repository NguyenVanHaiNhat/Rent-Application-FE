import {useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function PostHouseModal(props) {
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
            <Modal.Body>Post successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Success
                </Button>
            </Modal.Footer>
        </Modal>
    );
}