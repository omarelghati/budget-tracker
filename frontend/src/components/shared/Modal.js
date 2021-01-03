import { Modal } from "react-bootstrap";

export default function AppModal({ show, title, body, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className="modal-title">{title}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>

      <Modal.Footer>
        <input
          type="button"
          className="btn btn-default"
          data-dismiss="modal"
          value="Cancel"
          onClick={onClose}
        />
        <input type="submit" className="btn btn-success" value="Add" />
      </Modal.Footer>
    </Modal>
  );
}
