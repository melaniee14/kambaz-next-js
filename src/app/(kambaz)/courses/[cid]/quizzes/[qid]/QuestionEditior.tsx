"use client";
import { Row, FormLabel, Col, FormControl, FormSelect, Button, Card, CardBody, Badge } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

export type QuestionType = "multiple_choice" | "true_false" | "fill_in_blank";

export interface Choice {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  points: number;
  question: string;
  choices: Choice[];
  correctAnswer?: string;
  blanks?: string[];
  editing: boolean;
}

export function newQuestion(): Question {
  return {
    id: uuidv4(),
    type: "multiple_choice",
    title: "New Question",
    points: 1,
    question: "",
    choices: [
      { id: uuidv4(), text: "", correct: true },
      { id: uuidv4(), text: "", correct: false },
      { id: uuidv4(), text: "", correct: false },
      { id: uuidv4(), text: "", correct: false },
    ],
    correctAnswer: "true",
    blanks: [""],
    editing: true,
  };
}

export default function QuestionEditor({
  question, onChange, onSave, onCancel, onDelete, onToggleEdit,
}: {
  question: Question;
  onChange: (q: Question) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onToggleEdit: () => void;
}) {
  const setCorrectChoice = (id: string) => {
    onChange({ ...question, choices: question.choices.map((c) => ({ ...c, correct: c.id === id })) });
  };

  const updateChoiceText = (id: string, text: string) => {
    onChange({ ...question, choices: question.choices.map((c) => c.id === id ? { ...c, text } : c) });
  };

  const addChoice = () => {
    onChange({ ...question, choices: [...question.choices, { id: uuidv4(), text: "", correct: false }] });
  };

  const removeChoice = (id: string) => {
    onChange({ ...question, choices: question.choices.filter((c) => c.id !== id) });
  };

  if (!question.editing) {
    return (
      <Card className="mb-3 border">
        <CardBody>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <strong>{question.title}</strong>
              </div>
              <div className="text-muted small">{question.question || <em>No question text</em>}</div>
            </div>
            <div className="d-flex gap-2">
              <Button size="sm" variant="outline-secondary" onClick={onToggleEdit}><FaPencil /></Button>
              <Button size="sm" variant="outline-danger" onClick={onDelete}><FaTrash /></Button>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="mb-3 border border-primary">
      <CardBody>
        <Row className="mb-3 align-items-center">
          <Col sm={5}>
            <FormControl type="text" placeholder="Question Title" value={question.title}
              onChange={(e) => onChange({ ...question, title: e.target.value })} />
          </Col>
          <Col sm={4}>
            <FormSelect value={question.type}
              onChange={(e) => onChange({ ...question, type: e.target.value as QuestionType })}>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True / False</option>
              <option value="fill_in_blank">Fill in the Blank</option>
            </FormSelect>
          </Col>
          <Col sm={3}>
            <div className="d-flex align-items-center gap-2">
              <FormLabel className="mb-0 text-nowrap">pts:</FormLabel>
              <FormControl type="number" min={0} value={question.points}
                onChange={(e) => onChange({ ...question, points: Number(e.target.value) })} />
            </div>
          </Col>
        </Row>

        <div className="mb-3">
          <FormLabel>Question</FormLabel>
          <FormControl as="textarea" rows={3} placeholder="Enter question text..." value={question.question}
            onChange={(e) => onChange({ ...question, question: e.target.value })} />
        </div>

        {question.type === "multiple_choice" && (
          <div className="mb-3">
            <FormLabel>Answers <span className="text-muted fs-6">(select the correct answer)</span></FormLabel>
            {question.choices.map((choice) => (
              <div key={choice.id} className="d-flex align-items-center gap-2 mb-2">
                <input type="radio" name={`correct-${question.id}`} checked={choice.correct}
                  onChange={() => setCorrectChoice(choice.id)} />
                <FormControl type="text" placeholder="Answer choice..." value={choice.text}
                  onChange={(e) => updateChoiceText(choice.id, e.target.value)} />
                <Button size="sm" variant="outline-danger" onClick={() => removeChoice(choice.id)}
                  disabled={question.choices.length <= 2}><FaTrash /></Button>
              </div>
            ))}
            <Button size="sm" variant="outline-secondary" onClick={addChoice}>+ Add Choice</Button>
          </div>
        )}

        {question.type === "true_false" && (
          <div className="mb-3">
            <FormLabel>Correct Answer</FormLabel>
            <FormSelect value={question.correctAnswer}
              onChange={(e) => onChange({ ...question, correctAnswer: e.target.value })}>
              <option value="true">True</option>
              <option value="false">False</option>
            </FormSelect>
          </div>
        )}

        {question.type === "fill_in_blank" && (
          <div className="mb-3">
            <FormLabel>Accepted Answers <span className="text-muted fs-6">(any of these will be marked correct)</span></FormLabel>
            {(question.blanks ?? [""]).map((blank, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                <FormControl type="text" placeholder={`Accepted answer ${i + 1}...`} value={blank}
                  onChange={(e) => {
                    const updated = [...(question.blanks ?? [""])];
                    updated[i] = e.target.value;
                    onChange({ ...question, blanks: updated });
                  }} />
                <Button size="sm" variant="outline-danger" disabled={(question.blanks ?? [""]).length <= 1}
                  onClick={() => {
                    const updated = (question.blanks ?? [""]).filter((_, idx) => idx !== i);
                    onChange({ ...question, blanks: updated.length ? updated : [""] });
                  }}><FaTrash /></Button>
              </div>
            ))}
            <Button size="sm" variant="outline-secondary"
              onClick={() => onChange({ ...question, blanks: [...(question.blanks ?? [""]), ""] })}>
              + Add Answer
            </Button>
          </div>
        )}

        <div className="d-flex gap-2 justify-content-end mt-3">
          <Button size="sm" variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button size="sm" variant="danger" onClick={onSave}>Update Question</Button>
        </div>
      </CardBody>
    </Card>
  );
}