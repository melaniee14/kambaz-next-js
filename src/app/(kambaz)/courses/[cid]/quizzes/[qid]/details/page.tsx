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
  const currentQuiz = quizzes.find((q: any) => q._id === qid);

  return (
  <div>

    <div className="fs-6 d-flex align-items-center gap-2"> 
    <Button variant="secondary"> Preview </Button>

    <Button variant="secondary" onClick={ () => router.push(`/courses/${currentQuiz.course}/quizzes/${currentQuiz._id}`)}> <FaPencil/> Edit </Button>
    </div>

  </div>

)}