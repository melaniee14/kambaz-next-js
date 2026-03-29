"use client";
import { useEffect, useState } from "react";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses} from "../courses/reducer";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { enroll, setEnrollments, unenroll } from "./reducer";
import * as client from "../courses/client";
import * as enrollmentClient from "./client";



export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const isEnrolled = (courseId: string) => enrollments.some((enrollment) =>
    enrollment.user === currentUser?._id &&
    enrollment.course === courseId);

 
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/public/images/RS101.jpg", description: "New Description"
  });


  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);


  const [allCourses, setAllCourses] = useState<any []>([]);

  const fetchAllCourses = async () => {
    try {
      const everyCourse = await client.fetchAllCourses();
      setAllCourses(everyCourse);
    } catch(error) {
      console.error(error);
    }

  };
  useEffect(() => {
    fetchAllCourses();
  }, []);
  


  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setAllCourses([ ...allCourses, newCourse ]);
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
  })));};



 
 return (
  <div id="wd-dashboard">
    <div id="dashboard-enrollments"> 
      <Button onClick={() => setShow(!show)} className="float-end" variant="primary"> Enrollments </Button>
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      
      <hr />
    
   </div>

 {currentUser?.role != "STUDENT" && 
      <><h5> New Course
         <button className="btn btn-primary float-end"
           id="wd-add-new-course-click"
           onClick={onAddNewCourse}> Add </button>

         <button className="btn btn-warning float-end me-2"
           onClick={onUpdateCourse} id="wd-update-course-click">
           Update </button>

       </h5><br /><FormControl value={course.name} className="mb-2"
         onChange={(e) => setCourse({ ...course, name: e.target.value })} /><FormControl as="textarea" value={course.description} rows={3}
           onChange={(e) => setCourse({ ...course, description: e.target.value })} /><hr /></> }

   <h2 id="wd-dashboard-published">Published Courses ({show ? allCourses.length : courses.length})</h2> 
   <hr />
   
   <div id="wd-dashboard-courses">
    <Row xs={1} md={5} className="g-4">
      
     {!show && courses.map((course) => (
     <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <CardImg src={`/images/${course._id}.jpg`} variant="top" width="100%" height={160} />
        <CardBody className="card-body">
         <CardTitle className="wd-dashboard-course-title text-nowrap text-blue overflow-hidden">
          <b className="text-blue">{course.name}  </b></CardTitle>
         <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
          {course.description} </CardText>

             
          <Button className="mb-2" onClick={() => 
              {
              if(isEnrolled(course._id)) {
                router.push(`/courses/${course._id}/home`)
              }
              else {
                router.push('/dashboard')
              }
              }} variant="primary"> Go </Button>

            {currentUser?.role != "STUDENT" && <button onClick={(event) => { 
                event.preventDefault();
                onDeleteCourse(course._id);
              }} 
              className="btn btn-danger float-end" id="wd-delete-course-click">
                        Delete
            </button> }

            {currentUser?.role != "STUDENT" &&  <button id="wd-edit-course-click"
              onClick={(event) => {
                event.preventDefault();
                (setCourse(course));
               event.preventDefault(); }}
              className="btn btn-warning me-2 float-end" >
              Edit
            </button> }


          <Button className="float-end"variant={isEnrolled(course._id) ? "danger" : "success"} 
               onClick={async () =>  
                
                {if(isEnrolled(course._id)) {

                await enrollmentClient.unenrollUserInCourse(course._id);

                const newEnrollments = enrollments.filter((e: any) =>
                  !(e.user === currentUser?._id && e.course === course._id));

                dispatch(setEnrollments(newEnrollments));
              }
              else {
                await enrollmentClient.enrollUserInCourse(course._id);

                const newEnrollment = {
                  user: currentUser?._id, _id: currentUser?._id, course: course._id
                }
                
                dispatch(setEnrollments([...enrollments, newEnrollment]));

              }}}> {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
             
                </Button>
            
        </CardBody>
       
      </Card>
     </Col>
    ))}
  

    {show &&  allCourses.map((course) => (
     <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <CardImg src={`/images/${course._id}.jpg`} variant="top" width="100%" height={160} />
        <CardBody className="card-body">
         <CardTitle className="wd-dashboard-course-title text-nowrap text-blue overflow-hidden">
          <b className="text-blue">{course.name}  </b></CardTitle>
         <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
          {course.description} </CardText>

           
            <Button className="mb-2" onClick={() => 
              {
              if(isEnrolled(course._id)) {
                router.push(`/courses/${course._id}/home`)
              }
              else {
                router.push('/dashboard')
              }
              }} variant="primary"> Go </Button>

            {currentUser?.role != "STUDENT" && <button onClick={(event) => { 
                event.preventDefault();
                onDeleteCourse(course._id);
              }} 
              className="btn btn-danger float-end" id="wd-delete-course-click">
                        Delete
            </button> }

            {currentUser?.role != "STUDENT" &&  <button id="wd-edit-course-click"
              onClick={(event) => {
                event.preventDefault();
                (setCourse(course));
               event.preventDefault(); }}
              className="btn btn-warning me-2 float-end" >
              Edit
            </button> }

            
            
               <Button className="float-end"variant={isEnrolled(course._id) ? "danger" : "success"} 
               onClick={async () =>  
                
                {if(isEnrolled(course._id)) {

                await enrollmentClient.unenrollUserInCourse(course._id);

                const newEnrollments = enrollments.filter((e: any) =>
                  !(e.user === currentUser?._id && e.course === course._id));

                const newCourses = courses.filter((c : any) => !(c._id === course._id));

                dispatch(setEnrollments(newEnrollments));
                dispatch(setCourses(newCourses));

                
              }
              else {
                await enrollmentClient.enrollUserInCourse(course._id);

                const newEnrollment = {
                  user: currentUser?._id, _id: currentUser?._id, course: course._id
                }
                
                dispatch(setEnrollments([...enrollments, newEnrollment]));
                dispatch(setCourses([...courses, course]));

              }}}> {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
             
                </Button>
            

        </CardBody>
       
      </Card>
     </Col>
   
    ))} 
  
         

  </Row>
  </div>
  

   
   
 </div>);}

