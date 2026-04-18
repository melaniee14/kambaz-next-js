"use client";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useParams } from "next/navigation";
import { setQuizzes }  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import "../../../../(kambaz)/styles.css"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import * as client from "./client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiProhibitBold } from "react-icons/pi";
import { RxRocket } from "react-icons/rx";

export default function Quizzes() {

  const { cid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const dispatch = useDispatch();
  const [quizToDel, setQuizToDel] = useState<string | null>();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [show, setShow] = useState(false);



  const currentDate = new Date();

  const onRemoveQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
  };

  const onCreateNewQuiz = async () => {
    if (!cid) return;
    const qid = uuidv4();

    if (currentUser?.role != "STUDENT") {
      const newQuiz = {
        _id: qid,
        title: "New Quiz",
        course: cid,
        points: 100,
        newQuiz: true,
        score: 0,
        questions: 1,
        published: false,
        desc: "New Quiz Description",
        available: currentDate,
        due: currentDate
      };
      const quiz = await client.createQuizForCourse(cid, newQuiz);

      dispatch(setQuizzes([...quizzes, quiz]));
      router.push(`/courses/${cid}/quizzes/${quiz._id}/details`);
    }

  }

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  }


  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const visibleQuizzes = currentUser?.role === "STUDENT"
  ? quizzes.filter((q: any) => q.published)
  : quizzes;

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
            <BsThreeDotsVertical onClick={() => setShow(!show)} className="me-2 fs-5" />
          </Button>
        </div>}
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

          {visibleQuizzes.map((quiz: any) => (
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-4">           
                       <RxRocket className="fs-5 text-success ms-3" />
                    <div>
                      <h5 className="mb-1">
                        <a href={`/courses/${quiz.course}/quizzes/${quiz._id}`}
                          className="wd-quiz-link" >
                          <b> {quiz.title} </b>

                        </a> </h5>
                      <div className="fs-6">

                        {currentDate > new Date(quiz.due) ? <b>Closed</b> :
                          currentDate > new Date(quiz.available) ? (<a><b>Available</b> <a className="text-danger">Multiple Dates </a></a>) : (<a><b>Not available until</b> {quiz.available}</a>)}
                        <b>Due</b> {quiz.due} | {quiz.points} pts | {quiz.questions?.length ?? 0} questions {currentUser?.role == "STUDENT" && <div> | {quiz.score}/100 </div>}
                      </div>
                    </div>
                  </div>

                 
                  <div className="float-end d-flex align-items-center gap-2 ">

                  {currentUser?.role != "STUDENT" && show &&
                      <div className="fs-6 d-flex align-items-center gap-2">
                        <FaTrash onClick={() => onRemoveQuiz(quiz._id)} className="text-danger" />
                        <FaPencil onClick={() => router.push(`/courses/${quiz.course}/quizzes/${quiz._id}/details`)} />
                        <Button variant={quiz.published ? "danger" : "success"}
                          onClick={async () => {
                            if (quiz.published) {
                              const updatedQuiz = { ...quiz, published: false }
                              await client.updateQuiz(updatedQuiz);
                              dispatch(setQuizzes(quizzes.map((q: any) => q._id === updatedQuiz._id ? updatedQuiz : q)));
                            }

                            else {
                              const updatedQuiz = { ...quiz, published: true }
                              await client.updateQuiz(updatedQuiz);
                              dispatch(setQuizzes(quizzes.map((q: any) => q._id === updatedQuiz._id ? updatedQuiz : q)));
                            }
                          }
                          }>
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Button>

                      </div>}


                    {quiz.published ?

                      <GreenCheckmark /> : <PiProhibitBold
                        onClick={async () => {
                          const updatedQuiz = { ...quiz, published: true }
                          await client.updateQuiz(updatedQuiz);
                          dispatch(setQuizzes({ ...quizzes, updatedQuiz }));
                        }} />}
                    <IoEllipsisVertical />

                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>))}
        </ListGroupItem>
      </ListGroup>


    </div>
  );
}