"use client"
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../../client";
import { Button } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

export default function QuizDetails () {
  const router = useRouter();
  const { qid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  return (
  <div>

    {
      currentUser?.role != "STUDENT" && 
      <div> 
      <div className="fs-6 d-flex align-items-center gap-2 offset-sm-4"> 
      <Button variant="secondary"> Preview </Button>
  
      <Button variant="secondary" onClick={ () => router.push(`/courses/${quiz.course}/quizzes/${quiz._id}`)}> <FaPencil/> Edit </Button>
      </div>
      <br/>

      <b style={{ fontSize: '24px' }}> {quiz.title} </b>
      <br/>

      <div className="fs-6 align-items-center gap-2 offset-sm-4" id="list">
        <b> Quiz Type </b> <span className="ms-2">{quiz.quizType}</span>
         <br/>
        <b> Points </b> <span className="ms-2">{quiz.points}</span> <br/>
        <b> Assignment Group </b> <span className="ms-2">{quiz.assignmentGroup}</span> <br/>
        <b> Shuffle Answers </b> <span className="ms-2">{quiz.shuffleAnswers}</span> <br/>
        <b> Time Limit </b> <span className="ms-2">{quiz.timeLmit} minutes</span> <br/>
        <b> Multiple Attempts </b> <span className="ms-2">{quiz.multipleAttempts ? "Yes" : "No"}</span> <br/>
        <b> Show Correct Answers </b> <span className="ms-2">{quiz.showCorrectAnswers}</span> <br/>
        <b> One Question At a Time </b> <span className="ms-2">{quiz.oneQuestionAtATime ? "Yes" : "No"}</span> <br/>
        <b> Webcam Required </b> <span className="ms-2">{quiz.webcamRequired ? "Yes" : "No"}</span> <br/>
        <b> Lock Questions After Answering</b> <span className="ms-2">{quiz.lockQuestionsAfter ? "Yes" : "No"}</span> <br/>

        



       </div> 
      </div>
    }



    {
      currentUser?.role == "STUDENT" &&  <Button variant="success"> Start </Button>
    }


   
   

  </div>

)}