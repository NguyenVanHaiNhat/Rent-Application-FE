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
                <Modal.Title>Thành công !</Modal.Title>
            </Modal.Header>
            <Modal.Body> Cập nhật thông tin nhà thành công!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={redirectTo}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
