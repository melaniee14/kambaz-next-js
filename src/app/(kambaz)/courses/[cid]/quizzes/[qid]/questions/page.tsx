"use client";
import {
  Row, FormLabel, Col, FormControl, FormSelect,
  Button, Card, CardBody, Nav
} from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { setQuizzes } from "../../reducer";
import { useState } from "react";
import * as client from "../../client";

export default function QuizEditor() {
  const { qid, cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

  const currentQuiz = quizzes.find((q: any) => q._id === qid);
  const [editedQuiz, setEditedQuiz] = useState<any>(currentQuiz);
  const [activeTab, setActiveTab] = useState("details");

  const saveQuiz = async (publish = false) => {
    const quizToSave = publish ? { ...editedQuiz, published: true } : editedQuiz;
    const exists = quizzes.find((q: any) => q._id === editedQuiz._id && !q.newQuiz);

    if (exists) {
      await client.updateQuiz(quizToSave);
      dispatch(setQuizzes(quizzes.map((q: any) =>
        q._id === quizToSave._id ? quizToSave : q
      )));
    } else {
      const created = await client.createQuizForCourse(cid, quizToSave);
      dispatch(setQuizzes([
        ...quizzes.filter((q: any) => q._id !== editedQuiz._id),
        created
      ]));
    }

    if (publish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${editedQuiz._id}`);
    }
  };

  const cancel = () => {
    if (currentQuiz?.newQuiz) {
      dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== editedQuiz._id)));
    }
    router.push(`/courses/${cid}/quizzes`);
  };

  return (
    <div>
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link active={activeTab === "details"} onClick={() => setActiveTab("details")}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "questions"} onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/questions`)}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mb-3">
        <FormLabel>Quiz Title</FormLabel>
        <FormControl
          type="text"
          placeholder={editedQuiz?.title}
          onChange={(e) => setEditedQuiz({ ...editedQuiz, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <FormLabel>Description</FormLabel>
        <FormControl
          as="textarea"
          rows={6}
          placeholder={editedQuiz?.desc}
          onChange={(e) => setEditedQuiz({ ...editedQuiz, desc: e.target.value })}
        />
      </div>

      <Row className="mb-3 offset-sm-1">
        <FormLabel column sm={3}>Quiz Type</FormLabel>
        <Col sm={9}>
          <FormSelect
            value={editedQuiz?.quizType}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, quizType: e.target.value })}
          >
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
          <FormControl
            type="number"
            defaultValue={editedQuiz?.points}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, points: Number(e.target.value) })}
          />
        </Col>
      </Row>

      <Row className="mb-3 offset-sm-1">
        <FormLabel column sm={3}>Assignment Group</FormLabel>
        <Col sm={9}>
          <FormSelect
            value={editedQuiz?.assignmentGroup}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, assignmentGroup: e.target.value })}
          >
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
          <Card>
            <CardBody>
              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>Shuffle Answers</FormLabel>
                <Col sm={7}>
                  <FormSelect
                    value={editedQuiz?.shuffleAnswers ? "true" : "false"}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, shuffleAnswers: e.target.value === "true" })}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </FormSelect>
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>Time Limit (minutes)</FormLabel>
                <Col sm={7}>
                  <FormControl
                    type="number"
                    defaultValue={editedQuiz?.timeLimit}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, timeLimit: Number(e.target.value) })}
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>Multiple Attempts</FormLabel>
                <Col sm={7}>
                  <FormSelect
                    value={editedQuiz?.multipleAttempts ? "true" : "false"}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, multipleAttempts: e.target.value === "true" })}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </FormSelect>
                </Col>
              </Row>

              {editedQuiz?.multipleAttempts && (
                <Row className="mb-3 align-items-center">
                  <FormLabel column sm={5}>Number of Attempts</FormLabel>
                  <Col sm={7}>
                    <FormControl
                      type="number"
                      defaultValue={editedQuiz?.numberOfAttempts}
                      onChange={(e) => setEditedQuiz({ ...editedQuiz, numberOfAttempts: Number(e.target.value) })}
                    />
                  </Col>
                </Row>
              )}

              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>Show Correct Answers</FormLabel>
                <Col sm={7}>
                  <FormSelect
                    value={editedQuiz?.showCorrectAnswers}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, showCorrectAnswers: e.target.value })}
                  >
                    <option value="Immediately">Immediately</option>
                    <option value="After Due Date">After Due Date</option>
                    <option value="Never">Never</option>
                  </FormSelect>
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>Access Code</FormLabel>
                <Col sm={7}>
                  <FormControl
                    type="text"
                    placeholder="Leave blank for no code"
                    defaultValue={editedQuiz?.accessCode}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, accessCode: e.target.value })}
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>One Question at a Time</FormLabel>
                <Col sm={7}>
                  <FormSelect
                    value={editedQuiz?.oneQuestionAtATime ? "true" : "false"}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, oneQuestionAtATime: e.target.value === "true" })}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </FormSelect>
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>Webcam Required</FormLabel>
                <Col sm={7}>
                  <FormSelect
                    value={editedQuiz?.webcamRequired ? "true" : "false"}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, webcamRequired: e.target.value === "true" })}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </FormSelect>
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <FormLabel column sm={5}>Lock Questions After Answering</FormLabel>
                <Col sm={7}>
                  <FormSelect
                    value={editedQuiz?.lockQuestionsAfter ? "true" : "false"}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, lockQuestionsAfter: e.target.value === "true" })}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </FormSelect>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3 offset-sm-1">
        <FormLabel column sm={3}>Assign</FormLabel>
        <Col sm={9}>
          <Card>
            <CardBody>
              <FormLabel className="fw-bold">Due</FormLabel>
              <FormControl
                className="mb-3"
                type="date"
                defaultValue={editedQuiz?.due}
                onChange={(e) => setEditedQuiz({ ...editedQuiz, due: e.target.value })}
              />
              <Row>
                <Col>
                  <FormLabel className="fw-bold">Available From</FormLabel>
                  <FormControl
                    className="mb-3"
                    type="date"
                    defaultValue={editedQuiz?.available}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, available: e.target.value })}
                  />
                </Col>
                <Col>
                  <FormLabel className="fw-bold">Until</FormLabel>
                  <FormControl
                    className="mb-3"
                    type="date"
                    defaultValue={editedQuiz?.until}
                    onChange={(e) => setEditedQuiz({ ...editedQuiz, until: e.target.value })}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
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
  );
}