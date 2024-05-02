import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";

export default function ProfileModal(props) {
    const { show, onClose, id} = props;
    const navigate = useNavigate();
    const redirectTo = () => {
        onClose();
        navigate(`/account/profile2/${id}`);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Update profile successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Success
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
