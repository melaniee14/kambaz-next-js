"use client";
import Link from "next/link";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { TbGripVertical } from "react-icons/tb";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilThin } from "react-icons/pi";
import GreenCheckmark from "../modules/GreenCheckmark";
import { redirect, useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, editAssignment, updateAssignment, deleteAssignment }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import "../../../../(kambaz)/styles.css"
import { useState } from "react";
import DeleteAssignment from "./DeleteAssignment";





export default function Assignments() {
  const router = useRouter();
  const { cid } = useParams();
  const {assignments} = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [asgnToDel, setAsgnmntToDel] = useState<string | null>();
  const handleClose = () => setAsgnmntToDel(null);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  
  const createNewAssignment = () => {
    const aid = "New Assignment";

    if(currentUser?.role != "STUDENT") {
      const newAssignment = {
        _id: aid,
        title: "New Assignment",
        course: cid,
        available: "",
        due: "",
        points: 100,
      };
  
      dispatch(addAssignment(newAssignment));
      router.push(`/courses/${cid}/assignments/${aid}`);
    }
    
  }



  

    return (
      <div id="wd-assignments">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="position-relative w-50">
            <CiSearch 
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
              />
              <FormControl type="search" placeholder="Search..." className="ps-5" />
          </div>
          
      
          {currentUser?.role != "STUDENT" && <div className="d-flex gap-1">
            <Button variant="secondary" size="sm" className="w-100 text-nowrap ">
              <FaPlus className="me-2 fs-5" /> Group 
            </Button>
          
            <Button onClick={createNewAssignment} 
            variant="danger" size="sm" className="w-100 text-nowrap ">
              <FaPlus className="me-2 fs-5" /> Assignment
            </Button>
          </div> }
         </div>


  <ListGroup className="rounded-0" id="wd-assignments">
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> 
        <div className="d-flex align-items-center justify-content-between">
          <div className="position-relative w-50">
          <TbGripVertical/> <FaCaretDown /> ASSIGNMENTS
          </div>

          <div className="d-flex align-items-center gap-1">
            <div className="p-3 border rounded-4 fs-6">
              40% of Total
            </div>
            <FaPlus/>
            <IoEllipsisVertical className="fs-4" />

          </div>
        </div>
      </div>
      
      {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <TbGripVertical className="fs-4" />
                <PiNotePencilThin className="fs-5 text-success" />
              </div>

              <div>
                <h5 className="mb-1"> 
                  <a href= {`/courses/${assignment.course}/assignments/${assignment._id}`}
                className="wd-assignment-link" >
              {assignment.title}  

            </a> </h5>
                <div className="fs-6">
                  <span className="text-warning">Multiple Modules</span> | 
                <b> Not available until</b> {assignment.available} | </div>
                <div className="fs-6">
                <b>Due</b> {assignment.due} | {assignment.points} pts
                </div>
              </div>
            </div>

            <div className="float-end d-flex justify-content-between gap-2 ">
            
            {currentUser?.role != "STUDENT" && 
                <FaTrash onClick={() => {setAsgnmntToDel(assignment._id); }} className="text-danger" /> }
                <GreenCheckmark/>
                <IoEllipsisVertical/>

                
                <DeleteAssignment show={asgnToDel === assignment._id} handleClose={handleClose} aid={assignment._id} dialogTitle={"Are You Sure You Want to Delete?"} />
           
            </div>
          </div>
        </ListGroupItem>
      </ListGroup> ))}
      </ListGroupItem>
    </ListGroup>

  
</div>   
  );}