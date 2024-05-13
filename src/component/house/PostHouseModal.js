import {useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function PostHouseModal(props) {
    const { show, onClose} = props;
    const navigate = useNavigate();
    const redirectTo = () => {
        onClose();
        navigate(`/owner/${localStorage.getItem("idAccount")}`);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thành Công !</Modal.Title>
            </Modal.Header>
            <Modal.Body>Đăng nhà thành công!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}