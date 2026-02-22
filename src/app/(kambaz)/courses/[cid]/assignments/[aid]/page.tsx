"use client";
import { Row, FormLabel, Col, FormControl, FormSelect, Button, Card, CardBody, CardImg, CardText, CardTitle, FormCheck, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { MdCalendarMonth } from "react-icons/md";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import Link from "next/link";


export default function AssignmentEditor() {
const { aid } = useParams();
const assignments = db.assignments;

    return (
      
      

      <div>
        {assignments
        .filter((assignment: any) => assignment._id=== aid)
        .map((assignment: any) => (
      <><div className="mb-3">
            <FormLabel> Assignment Name</FormLabel>
            <FormControl type="name" placeholder={assignment.title} />
          </div><div className="mb-4">
              <FormControl as="textarea" rows={8} placeholder={`
The assignment is available online. 
Submit a link to the landing page of your Web application running on Netlify. 
         
The landing page should include the following:
  • Your full name and section 
  • Links to each of the lab assignments 
  • Link to the Kanbas application
  • Links to all relevant source code repositories. 

The Kanbas application should include a link to navigate back to the landing page`} />
            </div><div>
              <Row className="mb-3 offset-sm-1" controlId="points">
                <FormLabel column sm={2}> Points </FormLabel>
                <Col sm={10}>
                  <FormControl type="number" defaultValue={assignment.points} />
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
                          <FormControl className="mb-3" type="text" placeholder={assignment.due} />
                          <InputGroupText className="mb-3"> <MdCalendarMonth /> </InputGroupText>
                        </InputGroup>

                        <Row className="mb-3">
                          <Col>
                            <FormLabel className="fw-bold">  Available From </FormLabel>
                            <InputGroup>
                              <FormControl className="mb-3" type="text" placeholder={assignment.available} />
                              <InputGroupText className="mb-3 gap-2"> <MdCalendarMonth /> </InputGroupText>
                            </InputGroup>
                          </Col>

                          <Col>
                            <FormLabel className="fw-bold">Until</FormLabel>
                            <InputGroup>

                              <FormControl className="mb-3" type="text" placeholder = {assignment.due} />
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
             
              <Link id="wd-cancel-btn"
            href={`/courses/${assignment.course}/assignments/`}
            className="btn btn-secondary w-40 mb-2">
            Cancel </Link>  <Link id="wd-cancel-btn"
            href={`/courses/${assignment.course}/assignments/`}
            className="btn btn-danger w-40 mb-2">
            Save </Link>
              </Col>
            </Row>
            </>

       ))}
</div>

   )};

        {/* <div id="wd-assignments-editor">
        <h3><label htmlFor="wd-name">Assignment Name</label></h3>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of 
          your Web application running on Netlify. The landing page should include the following:
          Your full name and section Links to each of the lab assignments Link to the Kanbas application
          Links to all relevant source code repositories. The Kanbas application should
          include a link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
            <br></br>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <br></br>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <select name="ASSIGNMENTS" id="group"> 
            <option>ASSIGNMENTS</option>
            </select>
          </tr>
        <br />

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Display Grade as </label>
            </td>
            <select name="percent" id="group"> 
            <option>Percentage</option>
            </select>
          </tr>
          <br />

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Submission Type </label>
            </td>
            <select name="online" id="type"> 
            <option>Online</option>
            </select>
            
            <br />
            <tr>
                <td align="left" valign="top">
                    
            <label>Online Entry Options</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-entry"/>
            <label htmlFor="wd-chkbox-entry">Text Entry</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-url"/>
            <label htmlFor="wd-chkbox-url">Website URL</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-url"/>
            <label htmlFor="wd-chkbox-url">Media Recordings</label><br/>

            <input type="checkbox" name="options" id="wd-chkbox-url"/>
            <label htmlFor="wd-chkbox-url">Student Annotation</label>
            <br />

            <input type="checkbox" name="options" id="wd-chkbox-upload"/>
            <label htmlFor="wd-chkbox-upload">File Uploads</label>
            </td>
            </tr>

            <br />
        
          </tr>
          <br></br>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Assign</label>
              </td>
              <td>
              <label>Assign to</label> <br />
              <input id="wd-name" defaultValue="Everyone" /><br /><br />

              <label>Due</label> <br />
              <input type="date"
                    defaultValue="2024-05-13"
                    id="wd-text-fields-due"/><br /> <br />
                   
           
            <label>Available From&emsp;&nbsp;&nbsp;Until</label> <br />
                   <input type="date"
                    defaultValue="2024-05-06"
                    id="wd-text-fields-due"/> <input type="date"
                    defaultValue="2024-05-20"
                    id="wd-text-fields-due"/>
           </td>
          </tr>
          <br />
         
        </table>
         
      </div>

      <div>
        <hr />
        <div style={{textAlign: 'right', padding:'10px 170px'}}>
        <button>Cancel</button> <button>Save</button>
        </div>
           
            

      </div>
      </>
      
   */}