"use client";
import { Row, FormLabel, Col, FormControl, FormSelect, Button, Card, CardBody, FormCheck, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { MdCalendarMonth } from "react-icons/md";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setAssignments } from "../reducer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";


export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const router = useRouter();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const currentAssignment = assignments.find((a: any) => a._id === aid);
  const [editedAssignment, setEditedAssignment] = useState<any>(
    currentAssignment
  );

  const onUpdateAssignmentsInEditor =  async () => {
    const exists = assignments.find((a: any) => a._id === editedAssignment._id);
    if (exists && !exists.newAssign) {
      await client.updateAssignment(editedAssignment);
      const newAssignments = assignments.map((a: any) => a._id === editedAssignment._id ? editedAssignment : a);
      dispatch(setAssignments(newAssignments));
    } else {
      const assignmentToAdd = await client.createAssignmentForCourse(cid, editedAssignment);

      dispatch(setAssignments([...assignments, assignmentToAdd]));
    }
    router.push(`/courses/${editedAssignment.course}/assignments`);
  }

  // const updateAssignmentsInEditor = () => {
  //   const exists = assignments.find((a: any) => a._id === editedAssignment._id);
  //   if (exists) {
  //     dispatch(updateAssignment(editedAssignment));
  //   } else {
  //     dispatch(addAssignment(editedAssignment));
  //   }
  //   router.push(`/courses/${editedAssignment.course}/assignments`);
  // }

  const deleteOrNot = async () => {
    if ((currentAssignment as any)?.newAssign) {
    
      dispatch(setAssignments(assignments.filter((a: any) => a._id !== editedAssignment._id)));
      
    }
      router.push(`/courses/${cid}/assignments/`);
    
  }

  return (
    <div>
      <div className="mb-3">
        <FormLabel> Assignment Name</FormLabel>
        <FormControl onChange={(e) =>
          setEditedAssignment({ ...editedAssignment, title: e.target.value })} type="name" placeholder={editedAssignment.title} />
      </div>

      <div className="mb-4">
        <FormControl onChange={(e) =>
          setEditedAssignment({ ...editedAssignment, desc: e.target.value })} as="textarea" rows={8} placeholder={editedAssignment.desc} />
      </div>

      <div>
        <Row className="mb-3 offset-sm-1" controlId="points">
          <FormLabel column sm={2}> Points </FormLabel>
          <Col sm={10}>
            <FormControl onChange={(e) =>
              setEditedAssignment({ ...editedAssignment, points: e.target.value })} type="number" defaultValue={editedAssignment.points} />
          </Col>
        </Row>

        <Row className="mb-3 offset-sm-1" controlid="points">
          <FormLabel column sm={2}>Assignment Group</FormLabel>
          <Col sm={10}>
            <FormSelect>
              <option value="0" defaultChecked>ASSIGNMENTS</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3 offset-sm-1" controlId="points">
          <FormLabel column sm={2}>Display Grade as</FormLabel>
          <Col sm={10}>
            <FormSelect>
              <option value="0" defaultChecked>Percentage</option>
            </FormSelect>
          </Col>
        </Row>

        <div id="wd-css-navigating-with-cards">
          <Row className="mb-3 offset-sm-1" controlId="assign">
            <FormLabel column sm={2}>Submission Type</FormLabel>
            <Col sm={10}>
              <Card className="w-55">
                <CardBody>
                  <FormSelect className="mb-3">
                    <option value="0" defaultChecked>Online</option>
                  </FormSelect>

                  <FormLabel className="fw-bold mb-3">Online Entry Options </FormLabel>
                  <FormCheck className="mb-3" type="checkbox" label="Text Entry" name="formSubmissionType" />
                  <FormCheck className="mb-3" type="checkbox" label="Website URL" name="formSubmissionType" defaultChecked />
                  <FormCheck className="mb-3" type="checkbox" label="Media Recordings" name="formSubmissionType" />
                  <FormCheck className="mb-3" type="checkbox" label="Student Annotation" name="formSubmissionType" />
                  <FormCheck className="mb-3" type="checkbox" label="File Uploads" name="formSubmissionType" />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <div id="wd-css-navigating-with-cards">
          <Row className="mb-3 offset-sm-1" controlId="assign">
            <FormLabel column sm={2}>Assign</FormLabel>
            <Col sm={10}>
              <Card className="w-55">
                <CardBody>
                  <FormLabel className="fw-bold">Assign To</FormLabel>

                  <FormControl className="mb-3" type="text" placeholder="Everyone" />

                  <FormLabel className="fw-bold">Due</FormLabel>
                  <InputGroup>
                    <FormControl onChange={(e) =>
                      setEditedAssignment({ ...editedAssignment, due: e.target.value })}
                      className="mb-3" type="text" placeholder={editedAssignment.due} />
                    <InputGroupText className="mb-3"> <MdCalendarMonth /> </InputGroupText>
                  </InputGroup>

                  <Row className="mb-3">
                    <Col>
                      <FormLabel className="fw-bold">  Available From </FormLabel>
                      <InputGroup>
                        <FormControl onChange={(e) =>
                          setEditedAssignment({ ...editedAssignment, available: e.target.value })} className="mb-3" type="text" placeholder={editedAssignment.available} />
                        <InputGroupText className="mb-3 gap-2"> <MdCalendarMonth /> </InputGroupText>
                      </InputGroup>
                    </Col>

                    <Col>
                      <FormLabel className="fw-bold">Until</FormLabel>
                      <InputGroup>

                        <FormControl onChange={(e) =>
                          setEditedAssignment({ ...editedAssignment, until: e.target.value })}
                          className="mb-3" type="text" placeholder={editedAssignment.until} />
                        <InputGroupText className="mb-3"> <MdCalendarMonth /> </InputGroupText>
                      </InputGroup>
                    </Col>
                  </Row>


                </CardBody>

              </Card>
            </Col>
          </Row>
        </div>
      </div><hr />
      <Row className="mb-3 offset-sm-9">
        <Col>

          <Button id="wd-cancel-btn" variant="secondary"
            onClick={deleteOrNot}
            className="w-40 mb-2">
            Cancel </Button>  <Button id="wd-save-btn" variant="danger"
              onClick={onUpdateAssignmentsInEditor}
              className="w-40 mb-2">
            Save </Button>
        </Col>
      </Row>
    </div>

  )
};
