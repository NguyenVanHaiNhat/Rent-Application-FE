import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";

export default function UpdateModal(props) {
    const navigate = useNavigate();
    const { show, onClose} = props;
    const redirectTo = () => {
        onClose();
        navigate(`/owner/${localStorage.getItem(`idAccount`)}`);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body> successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Success
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
