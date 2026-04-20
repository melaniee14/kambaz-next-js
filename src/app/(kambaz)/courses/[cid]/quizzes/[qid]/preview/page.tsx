"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { setQuizzes } from "../../reducer";
import * as client from "../../client";
import { Button, Card, CardBody, Badge, Row, Col } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    client.findQuizzesForCourse(cid as string).then((data) => {
      dispatch(setQuizzes(data));
    });
  }, [cid]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  useEffect(() => {
    if (quiz.previous && quiz.prevAnswers) {
      setAnswers(quiz.prevAnswers);
    }
  }, [quiz._id, quiz.previous]);

  if (!quiz) return <div>Loading...</div>;

  const questions = quiz.questions ?? [];
  const isFaculty = currentUser?.role === "FACULTY";
  const totalPoints = questions.reduce((sum: number, q: any) => sum + q.points, 0);

  const maxAttempts = quiz.numberOfAttempts ?? 1;
  const attemptsExhausted = quiz.multipleAttempts && quiz.attempts >= maxAttempts;



  const handleSubmit = async () => {
    let total = 0;
    questions.forEach((q: any) => {
      const answer = answers[q.id];
      if (q.type === "multiple_choice") {
        const correct = q.choices.find((c: any) => c.correct);
        if (correct && answer === correct.id) total += q.points;
      } else if (q.type === "true_false") {
        if (answer === q.correctAnswer) total += q.points;
      } else if (q.type === "fill_in_blank") {
        const blanks = q.blanks ?? [];
        if (blanks.some((b: string) => b.toLowerCase() === (answer ?? "").toLowerCase())) {
          total += q.points;
        }
      }
    });

    setScore(total);
    setAttemptCount(prev => prev + 1);

    const newQuizzes = quizzes.map((q: any) => q._id === quiz._id ? { ...quiz, score: total, attempts: attemptCount + 1, previous: true, prevAnswers: answers } : q);
    dispatch(setQuizzes(newQuizzes));

    if (currentUser?.role === "STUDENT") {
      await client.updateScore(quiz, total, attemptCount + 1, true, answers);


    }
    setSubmitted(true);

  };

  const isCorrect = (q: any) => {
    const answer = answers[q.id];
    if (q.type === "multiple_choice") {
      const correct = q.choices.find((c: any) => c.correct);
      return correct && answer === correct.id;
    } else if (q.type === "true_false") {
      return answer === q.correctAnswer;
    } else if (q.type === "fill_in_blank") {
      const blanks = q.blanks ?? [];
      return blanks.some((b: string) => b.toLowerCase() === (answer ?? "").toLowerCase());
    }
    return false;
  };

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (

    <div className="p-4">
      <Row>
        <Col>
          {isFaculty && (
            <div className="alert mb-4" style={{ backgroundColor: "#fff3f3", border: "1px solid #f5c6c6", color: "#c0392b" }}>
              This is a preview of the published version of this quiz. Students will see this view.
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{quiz.title}</h2>
          </div>

          {(submitted || quiz.previous) && (
            <div className={`alert ${(quiz.previous ? quiz.score : score) === totalPoints ? "alert-success" : "alert-warning"} mb-4`}>
              Score: <strong>{quiz.previous ? quiz.score : score} / {totalPoints}</strong>
            </div>
          )}

          {currentQuestion && (
            <Card className={`mb-4 ${(submitted || quiz.previous) ? (isCorrect(currentQuestion) ? "border-success" : "border-danger") : "border"}`}>
              
                <div className="d-flex justify-content-between align-items-center mb-2 p-2"
                  style={{ backgroundColor: "var(--bs-secondary-bg)" }}>
                  <strong>Question {currentIndex + 1}: {currentQuestion.title}</strong>
                  <strong>{currentQuestion.points} pt{currentQuestion.points !== 1 ? "s" : ""}  </strong>
             
                </div>

              
                <CardBody>
                <p>{currentQuestion.question}</p>
                <hr/>

                {currentQuestion.type === "multiple_choice" && (
                  <div>
                    {currentQuestion.choices.map((choice: any) => (
                      
                      <div key={choice.id} className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
                        
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          disabled={(submitted || quiz.previous)}
                          checked={answers[currentQuestion.id] === choice.id}
                          onChange={() => handleAnswer(currentQuestion.id, choice.id)}
                        />
                         
                      
                        <span className={(submitted || quiz.previous) && choice.correct ? "text-success fw-bold" : ""}>
                          {choice.text}
                        </span>
                        
                        {(submitted || quiz.previous) && choice.correct && <Badge bg="success">Correct Answer</Badge>}
                       
                      </div>
                      
                    ))}
                  </div>
                )}

                {currentQuestion.type === "true_false" && (
                  <div className="d-flex gap-4">
                    {["true", "false"].map((val) => (
                      <div key={val} className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          disabled={(submitted || quiz.previous)}
                          checked={answers[currentQuestion.id] === val}
                          onChange={() => handleAnswer(currentQuestion.id, val)}
                        />
                        <span className={(submitted || quiz.previous) && currentQuestion.correctAnswer === val ? "text-success fw-bold" : ""}>
                          {val.charAt(0).toUpperCase() + val.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "fill_in_blank" && (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      disabled={(submitted || quiz.previous)}
                      value={answers[currentQuestion.id] ?? ""}
                      onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                      placeholder="Type your answer..."
                    />
                    {(submitted || quiz.previous) && (
                      <div className="text-success mt-1">
                        Accepted answers: {currentQuestion.blanks.join(", ")}
                      </div>
                    )}
                  </div>
                )}

                {(submitted || quiz.previous) && (
                  <div className={`mt-2 fw-bold ${isCorrect(currentQuestion) ? "text-success" : "text-danger"}`}>
                    {isCorrect(currentQuestion) ? "Correct" : "Incorrect"}
                  </div>
                )}
              </CardBody>
            </Card>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            {isFaculty && isLast && (
              <Button variant="secondary"
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/details`)}>
                <FaPencil className="me-2" /> Keep Editing Quiz
              </Button>
            )}

            <div className="d-flex justify-content-between align-items-center">
              {currentIndex !== 0 && (
                <Button variant="outline-secondary" onClick={() => setCurrentIndex(currentIndex - 1)}>
                  Prev
                </Button>
              )}
            </div>

            <div className="ms-auto d-flex gap-2">
              {!isLast && (
                <Button variant="outline-secondary" onClick={() => setCurrentIndex(currentIndex + 1)}>
                  Next
                </Button>

              )}

              {isLast && !(submitted || quiz.previous) && (
                <div className="d-flex gap-2">

                  <Button variant="danger" onClick={handleSubmit}>Submit Quiz</Button>
                </div>
              )}
            </div>


          </div>

          {(submitted || quiz.previous) && (quiz.multipleAttempts ? (
            attemptsExhausted ? (
              <div className="gap-2">
                <div className="alert alert-warning mt-3">You have no more quiz attempts left.</div>
                <Button onClick={() => router.push(`/courses/${cid}/quizzes`)} variant="secondary"> Back </Button> </div>
            ) : (
              <Button variant="secondary" className="mt-3" onClick={async () => {
                setAnswers({});
                setSubmitted(false);
                setScore(0);
                setCurrentIndex(0);

                await client.updateScore(quiz, score, attemptCount, false, answers);

                const newQuizzes = quizzes.map((q: any) => q._id === quiz._id ? { ...quiz, previous: false, attempts: attemptCount } : q);
                dispatch(setQuizzes(newQuizzes));

              }}>
                Retake Quiz
              </Button>
            )
          ) : <div>
            <div className="alert alert-warning mt-3">You have no more quiz attempts left.</div>
            <Button onClick={() => router.push(`/courses/${cid}/quizzes`)} variant="secondary"> Back </Button> </div>)}
        </Col>

        <Col xs={2}>

          <div>  <h5> Questions </h5> </div>
          <div className="d-flex flex-column ">
            {questions.map((q: any, index: number) => (
              <Button variant="outline-secondary" className="mb-2" onClick={() => setCurrentIndex(index)}>
                Question {index + 1}

              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}