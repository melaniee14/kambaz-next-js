"use client";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { TbGripVertical } from "react-icons/tb";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilThin } from "react-icons/pi";
import GreenCheckmark from "../modules/GreenCheckmark";
import {useParams } from "next/navigation";
import { setQuizzes }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import "../../../../(kambaz)/styles.css"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import * as client from "./client";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteQuiz from "./DeleteQuiz";


export default function Quizzes () {

 const { cid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const dispatch = useDispatch();
  const [quizToDel, setQuizToDel] = useState<string | null>();
  const handleClose = () => setQuizToDel(null);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const currentDate = new Date();

  const availability = (quizDate: string) => {
    if(currentDate > new Date(quizDate)) {

    }

  }
  const onCreateNewQuiz = async () => {
    if(!cid) return;
    const qid = uuidv4();


    if(currentUser?.role != "STUDENT") {
      const newQuiz = {
        _id: qid,
        title: "New Quiz",
        course: cid,
        due: "",
        points: 100,
        newQuiz: true,
        score: 0,
        questions: 1, 
      };
      const quiz = await client.createQuizForCourse(cid, newQuiz);
  
      dispatch(setQuizzes([...quizzes, quiz]));
      router.push(`/courses/${cid}/quizzes/${quiz._id}`);
    }
    
  }

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  }
  
  useEffect(() => {
    fetchQuizzes();
  }, [cid]);




    return (
      <div id="wd-quizzes">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="position-relative w-50">
            <CiSearch 
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
              />
              <FormControl type="search" placeholder="Search..." className="ps-5" />
          </div>
          
      
          {currentUser?.role != "STUDENT" && <div className="d-flex gap-1">
           
          
            <Button onClick={onCreateNewQuiz} 
            variant="danger" size="sm" className="w-100 text-nowrap ">
              <FaPlus className="me-2 fs-5" /> Quiz
            </Button>

            <Button 
                variant="secondary" size="sm" className="w-50 text-nowrap">
                    <BsThreeDotsVertical className="me-2 fs-5"/>
            </Button>
          </div> }
         </div>


  <ListGroup className="rounded-0" id="wd-assignments">
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> 
        <div className="d-flex align-items-center justify-content-between">
          <div className="position-relative w-50">
          <FaCaretDown /> Assignment Quizzes
          </div>
        </div>
      </div>
      
      {quizzes.map((quiz: any) => (
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <TbGripVertical className="fs-4" />
                
              </div>

              <div>
                <h5 className="mb-1"> 
                  <a href= {`/courses/${quiz.course}/assignments/${quiz._id}`}
                className="wd-quiz-link" >
              {quiz.title}  

            </a> </h5>
                <div className="fs-6">
                  

                {availability(quiz.due)}
                <b> Not available until</b> {quiz.available} | </div>
                <div className="fs-6">
                <b>Due</b> {quiz.due} | {quiz.points} pts | {quiz.questions} questions {currentUser?.role == "STUDENT" && <div> | {quiz.score}/100 </div> }
                </div>
              </div>
            </div>

            <div className="float-end d-flex justify-content-between gap-2 ">
            
           
            {currentUser?.role != "STUDENT" && 
                <FaTrash onClick={() => {setQuizToDel(quiz._id); }} className="text-danger" /> }
                <GreenCheckmark/>
                <IoEllipsisVertical/>

                
                <DeleteQuiz show={quizToDel === quiz._id} handleClose={handleClose} qid={quiz._id} dialogTitle={"Are You Sure You Want to Delete?"} />
           
            </div>
          </div>
        </ListGroupItem>
      </ListGroup> ))}
      </ListGroupItem>
    </ListGroup>

  
</div>   
  );}