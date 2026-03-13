import { Modal, Button } from "react-bootstrap";
import {deleteAssignment }from "./reducer";
import { useDispatch } from "react-redux";

export default function DeleteAssignment({ show, handleClose, dialogTitle, aid}: {
 show: boolean; handleClose: () => void; dialogTitle: string; aid: any }) {

const dispatch = useDispatch();

 return (
   
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>{dialogTitle}</Modal.Title>
   </Modal.Header>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="primary"
     onClick={() => {
      dispatch(deleteAssignment(aid));
      handleClose();
     }} > Yes </Button>
   </Modal.Footer>
  </Modal>
);}

