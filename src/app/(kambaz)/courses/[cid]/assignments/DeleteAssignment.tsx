import { Modal, Button } from "react-bootstrap";
import {setAssignments }from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../client";

import { RootState } from "../../../store";

export default function DeleteAssignment({ show, handleClose, dialogTitle, aid}: {
 show: boolean; handleClose: () => void; dialogTitle: string; aid: any }) {

const dispatch = useDispatch();
const {assignments} = useSelector((state: RootState) => state.assignmentsReducer);

const onRemoveAssignment = async (aid: string) => {
  await client.deleteAssignment(aid);
  dispatch(setAssignments(assignments.filter((assignments: any) => assignments._id !== aid)));
  handleClose();
};

 return (
   
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>{dialogTitle}</Modal.Title>
   </Modal.Header>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="primary"
     onClick={() => onRemoveAssignment(aid)} > Yes </Button>
   </Modal.Footer>
  </Modal>
);}

