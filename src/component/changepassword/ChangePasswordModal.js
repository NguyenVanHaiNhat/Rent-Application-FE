import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";

export default function ChangePasswordModal(props) {
    const { show, onClose} = props;
    const navigate = useNavigate();
    const redirectTo = () => {
        onClose();
        navigate(`/detail/${localStorage.getItem("idAccount")}`);
    }

    return (

        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your password has been changed successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Success
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
