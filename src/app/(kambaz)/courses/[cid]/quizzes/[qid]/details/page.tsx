"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as client from "../../client";
import { Button, Col, Row } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { setQuizzes } from "../../reducer";

export default function QuizDetails() {
  const router = useRouter();
  const { qid, cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
    client.findQuizzesForCourse(cid as string).then((data) => {
      dispatch(setQuizzes(data));
    });
  }, [cid]);

  const quiz = quizzes.find((q: any) => q._id === qid);

  if (!quiz) return <div>Loading...</div>;


  const seePrevQuiz = async () => {
    await client.updateScore(quiz, quiz.score, quiz.attempts, true, quiz.prevAnswers);
    const newQuizzes = quizzes.map((q: any) => q._id === quiz._id ? {...quiz, score: quiz.score, attempts: quiz.attempts, previous: true, prevAnswers: quiz.prevAnswers} : q);
    dispatch(setQuizzes(newQuizzes));

    router.push(`/courses/${cid}/quizzes/${quiz._id}/preview`);
   
  }

  const startQuiz = async () => {
    await client.updateScore(quiz, quiz.score, quiz.attempts, false, quiz.prevAnswers);
    router.push(`/courses/${cid}/quizzes/${quiz._id}/preview`);
  }

  return (
    <div>
      {currentUser?.role != "STUDENT" &&
        <div>
          <div className="fs-6 d-flex align-items-center gap-2 offset-sm-4">
            <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/preview`)}> Preview</Button>
            <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}`)}> <FaPencil /> Edit</Button>
          </div>
          <br />
          <b className="offset-sm-2" style={{ fontSize: '24px' }}>{quiz.title}</b>
          <br />
          <div className="fs-6 align-items-center gap-2 offset-sm-1" id="list">
            <Row>
              <Col sm={4} className="text-end"><b>Quiz Type</b></Col>
              <Col sm={8}>{quiz.quizType}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Points</b></Col>
              <Col sm={8}>{quiz.points}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Assignment Group</b></Col>
              <Col sm={8}>{quiz.assignmentGroup}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Shuffle Answers</b></Col>
              <Col sm={8}>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Time Limit</b></Col>
              <Col sm={8}>{quiz.timeLimit} minutes</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Multiple Attempts</b></Col>
              <Col sm={8}>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Show Correct Answers</b></Col>
              <Col sm={8}>{quiz.showCorrectAnswers}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>One Question At a Time</b></Col>
              <Col sm={8}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Webcam Required</b></Col>
              <Col sm={8}>{quiz.webcamRequired ? "Yes" : "No"}</Col>
            </Row>
            <Row>
              <Col sm={4} className="text-end"><b>Lock Questions After Answering</b></Col>
              <Col sm={8}>{quiz.lockQuestionsAfter ? "Yes" : "No"}</Col>
            </Row>
          </div>
          <br />
          <Row>
            <Col><b>Due</b></Col>
            <Col><b>For</b></Col>
            <Col><b>Available From</b></Col>
            <Col><b>Until</b></Col>
          </Row>
          <hr />
          <Row>
            <Col>{quiz.due}</Col>
            <Col>Everyone</Col>
            <Col>{quiz.available}</Col>
            <Col>{quiz.until}</Col>
          </Row>
        </div>
      }

      {currentUser?.role == "STUDENT" && (quiz.attempts < quiz.numberOfAttempts ? 
      quiz.attempts >= 1 ? 
      <div className="d-flex justify-content-center gap-2">  
        <Button size="lg" onClick={startQuiz} variant="success">Start </Button> 
        
        <Button size="lg" onClick={seePrevQuiz} variant="secondary"> See Previous Quiz </Button>
        </div> 
        : 

      <div className="d-flex justify-content-center"> 
      <Button size="lg" onClick={startQuiz} variant="success">Start </Button> 
      
      </div> : 
      <div className="d-flex justify-content-center"> 
      <Button onClick={seePrevQuiz} size="lg" variant="secondary"> See Previous Quiz </Button> </div> )}
    </div>
  );
}