import { Modal, Button } from "react-bootstrap";
import {setQuizzes }from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";

import { RootState } from "../../../store";

export default function DeleteQuiz({ show, handleClose, dialogTitle, qid}: {
 show: boolean; handleClose: () => void; dialogTitle: string; qid: any }) {

const dispatch = useDispatch();
const {quizzes} = useSelector((state: RootState) => state.quizzesReducer);

const onRemoveQuiz = async (qid: string) => {
  await client.deleteQuiz(qid);
  dispatch(setQuizzes(quizzes.filter((quiz: any) => quiz._id !== qid)));
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
     onClick={() => onRemoveQuiz(qid)} > Yes </Button>
   </Modal.Footer>
  </Modal>
);}

