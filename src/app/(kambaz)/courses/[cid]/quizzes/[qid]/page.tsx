"use client";
import {
  Row, FormLabel, Col, FormControl, FormSelect,
  Button, Card, CardBody, Nav, Badge
} from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setQuizzes } from "../reducer";
import { useEffect, useState } from "react";
import * as client from "../client";
import QuestionEditor, { Question, newQuestion } from "./QuestionEditior";

export default function QuizEditor() {
  const { qid, cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

  const currentQuiz = quizzes.find((q: any) => q._id === qid);
  const [editedQuiz, setEditedQuiz] = useState<any>(currentQuiz);
  const [activeTab, setActiveTab] = useState("details");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [savedQuestions, setSavedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    client.findQuizzesForCourse(cid as string).then((data) => {
      dispatch(setQuizzes(data));
    });
  }, [cid]);

  useEffect(() => {
    if (currentQuiz) {
      setEditedQuiz(currentQuiz);
      if (currentQuiz.questions?.length > 0) {
        const loaded = currentQuiz.questions.map((q: any) => ({ ...q, editing: false }));
        setQuestions(loaded);
        setSavedQuestions(loaded);
      }
    }
  }, [qid, quizzes]);

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  if (!editedQuiz && quizzes.length > 0) {
    return <div>Quiz not found.</div>;
  }

  const saveQuiz = async (publish = false) => {
    if (!editedQuiz) return;
    const cleanedQuestions = questions.map(({ editing, ...q }) => q);
    const quizWithQuestions = { ...editedQuiz, questions: cleanedQuestions };
    const exists = quizzes.find((q: any) => q._id === editedQuiz._id && !q.newQuiz);
    if (exists) {
      const { newQuiz, ...quizToSave } = quizWithQuestions;
      const finalQuiz = publish ? { ...quizToSave, published: true } : quizToSave;
      await client.updateQuiz(finalQuiz);
      dispatch(setQuizzes(quizzes.map((q: any) => q._id === finalQuiz._id ? finalQuiz : q)));
    } else {
      const { newQuiz, ...quizToSave } = quizWithQuestions;
      const finalQuiz = publish ? { ...quizToSave, published: true } : quizToSave;
      const created = await client.createQuizForCourse(cid, finalQuiz);
      dispatch(setQuizzes([...quizzes.filter((q: any) => q._id !== editedQuiz._id), created]));
    }
    router.push(`/courses/${cid}/quizzes`);
  };

  const cancel = () => {
    if ((currentQuiz as any)?.newQuiz) {
      dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== editedQuiz?._id)));
    }
    router.push(`/courses/${cid}/quizzes`);
  };

  const addQuestion = () => setQuestions([...questions, newQuestion()]);

  const updateQuestion = (id: string, updated: Question) => {
    setQuestions(questions.map((q) => q.id === id ? updated : q));
  };

  const saveQuestion = (id: string) => {
    const updated = questions.map((q) => q.id === id ? { ...q, editing: false } : q);
    setQuestions(updated);
    setSavedQuestions(updated);
  };

  const cancelQuestion = (id: string) => {
    const original = savedQuestions.find((q) => q.id === id);
    if (original) {
      setQuestions(questions.map((q) => q.id === id ? { ...original, editing: false } : q));
    } else {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    setSavedQuestions(savedQuestions.filter((q) => q.id !== id));
  };

  const toggleEdit = (id: string) => {
    setQuestions(questions.map((q) => q.id === id ? { ...q, editing: !q.editing } : q));
  };

  return (
    <div>
     <Nav variant="tabs" className="mb-4">
  <Nav.Item>
    <Nav.Link
      active={activeTab === "details"}
      onClick={() => setActiveTab("details")}
      className={activeTab === "details" ? "text-black" : "text-danger"}
    >
      Details
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link
      active={activeTab === "questions"}
      onClick={() => setActiveTab("questions")}
      className={activeTab === "questions" ? "text-black" : "text-danger"}
    >
      Questions
    </Nav.Link>
  </Nav.Item>
</Nav>
      {activeTab === "details" && (
        <div>
          <div className="mb-3">
            <FormLabel>Quiz Title</FormLabel>
            <FormControl type="text" placeholder={editedQuiz?.title}
              onChange={(e) => setEditedQuiz({ ...editedQuiz, title: e.target.value })} />
          </div>
          <div className="mb-4">
            <FormLabel>Description</FormLabel>
            <FormControl as="textarea" rows={6} placeholder={editedQuiz?.desc}
              onChange={(e) => setEditedQuiz({ ...editedQuiz, desc: e.target.value })} />
          </div>
          <Row className="mb-3 offset-sm-1">
            <FormLabel column sm={3}>Quiz Type</FormLabel>
            <Col sm={9}>
              <FormSelect value={editedQuiz?.quizType}
                onChange={(e) => setEditedQuiz({ ...editedQuiz, quizType: e.target.value })}>
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3 offset-sm-1">
            <FormLabel column sm={3}>Points</FormLabel>
            <Col sm={9}>
              <FormControl type="number" defaultValue={editedQuiz?.points}
                onChange={(e) => setEditedQuiz({ ...editedQuiz, points: Number(e.target.value) })} />
            </Col>
          </Row>
          <Row className="mb-3 offset-sm-1">
            <FormLabel column sm={3}>Assignment Group</FormLabel>
            <Col sm={9}>
              <FormSelect value={editedQuiz?.assignmentGroup}
                onChange={(e) => setEditedQuiz({ ...editedQuiz, assignmentGroup: e.target.value })}>
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3 offset-sm-1">
            <FormLabel column sm={3}>Options</FormLabel>
            <Col sm={9}>
              <Card><CardBody>
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Shuffle Answers</FormLabel>
                  <Col sm={7}>
                    <FormSelect value={editedQuiz?.shuffleAnswers ? "true" : "false"}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, shuffleAnswers: e.target.value === "true" })}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </FormSelect>
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Time Limit (minutes)</FormLabel>
                  <Col sm={7}>
                    <FormControl type="number" defaultValue={editedQuiz?.timeLimit}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, timeLimit: Number(e.target.value) })} />
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Multiple Attempts</FormLabel>
                  <Col sm={7}>
                    <FormSelect value={editedQuiz?.multipleAttempts ? "true" : "false"}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, multipleAttempts: e.target.value === "true" })}>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </FormSelect>
                  </Col>
                </Row>
                {editedQuiz?.multipleAttempts && (
                  <Row className="mb-3 align-items-center">
                    <FormLabel column sm={5}>Number of Attempts</FormLabel>
                    <Col sm={7}>
                      <FormControl type="number" defaultValue={editedQuiz?.numberOfAttempts}
                        onChange={(e) => setEditedQuiz({ ...editedQuiz, numberOfAttempts: Number(e.target.value) })} />
                    </Col>
                  </Row>
                )}
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Show Correct Answers</FormLabel>
                  <Col sm={7}>
                    <FormSelect value={editedQuiz?.showCorrectAnswers}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, showCorrectAnswers: e.target.value })}>
                      <option value="Immediately">Immediately</option>
                      <option value="After Due Date">After Due Date</option>
                      <option value="Never">Never</option>
                    </FormSelect>
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Access Code</FormLabel>
                  <Col sm={7}>
                    <FormControl type="text" placeholder="Leave blank for no code"
                      defaultValue={editedQuiz?.accessCode}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, accessCode: e.target.value })} />
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>One Question at a Time</FormLabel>
                  <Col sm={7}>
                    <FormSelect value={editedQuiz?.oneQuestionAtATime ? "true" : "false"}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, oneQuestionAtATime: e.target.value === "true" })}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </FormSelect>
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Webcam Required</FormLabel>
                  <Col sm={7}>
                    <FormSelect value={editedQuiz?.webcamRequired ? "true" : "false"}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, webcamRequired: e.target.value === "true" })}>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </FormSelect>
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Lock Questions After Answering</FormLabel>
                  <Col sm={7}>
                    <FormSelect value={editedQuiz?.lockQuestionsAfter ? "true" : "false"}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, lockQuestionsAfter: e.target.value === "true" })}>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </FormSelect>
                  </Col>
                </Row>
              </CardBody></Card>
            </Col>
          </Row>
          <Row className="mb-3 offset-sm-1">
            <FormLabel column sm={3}>Assign</FormLabel>
            <Col sm={9}>
              <Card><CardBody>
                <FormLabel className="fw-bold">Due</FormLabel>
                <FormControl className="mb-3" type="date" defaultValue={editedQuiz?.due}
                  onChange={(e) => setEditedQuiz({ ...editedQuiz, due: e.target.value })} />
                <Row>
                  <Col>
                    <FormLabel className="fw-bold">Available From</FormLabel>
                    <FormControl className="mb-3" type="date" defaultValue={editedQuiz?.available}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, available: e.target.value })} />
                  </Col>
                  <Col>
                    <FormLabel className="fw-bold">Until</FormLabel>
                    <FormControl className="mb-3" type="date" defaultValue={editedQuiz?.until}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, until: e.target.value })} />
                  </Col>
                </Row>
              </CardBody></Card>
            </Col>
          </Row>
          <hr />
          <Row className="mb-3">
            <Col className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={cancel}>Cancel</Button>
              <Button variant="danger" onClick={() => saveQuiz(false)}>Save</Button>
              <Button variant="success" onClick={() => saveQuiz(true)}>Save & Publish</Button>
            </Col>
          </Row>
        </div>
      )}

      {activeTab === "questions" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="text-muted ms-3">Total: {totalPoints} pt{totalPoints !== 1 ? "s" : ""}</span>
            </div>
          </div>
            <div className="text-center text-muted py-5 border rounded">
              <Button variant="secondary" onClick={addQuestion}>+ New Question</Button>
            </div>
          

          {questions.map((question) => (
            <QuestionEditor
              key={question.id}
              question={question}
              onChange={(updated) => updateQuestion(question.id, updated)}
              onSave={() => saveQuestion(question.id)}
              onCancel={() => cancelQuestion(question.id)}
              onDelete={() => deleteQuestion(question.id)}
              onToggleEdit={() => toggleEdit(question.id)}
            />
          ))}

          <hr />
          <Row className="mb-3">
            <Col className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={cancel}>Cancel</Button>
              <Button variant="danger" onClick={() => saveQuiz(false)}>Save</Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}