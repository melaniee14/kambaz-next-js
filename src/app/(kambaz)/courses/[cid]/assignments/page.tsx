"use client";
import Link from "next/link";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { TbGripVertical } from "react-icons/tb";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilThin } from "react-icons/pi";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useParams } from "next/navigation";
import * as db from "../../../database";





export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

    return (
      <div id="wd-assignments">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="position-relative w-50">
            <CiSearch 
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
              />
              <FormControl type="search" placeholder="Search..." className="ps-5" />
          </div>
          

          <div className="d-flex gap-1">
            <Button variant="secondary" size="sm" className="w-100 text-nowrap ">
              <FaPlus className="me-2 fs-5" /> Group 
            </Button>
          
            <Button variant="danger" size="sm" className="w-100 text-nowrap ">
              <FaPlus className="me-2 fs-5" /> Assignment
            </Button>
          </div>
         </div>


  <ListGroup className="rounded-0" id="wd-assignments">
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> 
        <div className="d-flex align-items-center justify-content-between">
          <div className="position-relative w-50">
          <TbGripVertical/> <FaCaretDown /> Assignments  
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
                  <Link href= {`/courses/${assignment.course}/assignments/${assignment._id}`}
               className="wd-assignment-link" >
              {assignment.title}

            </Link> </h5>
                <div className="fs-6">
                  <span className="text-warning">Multiple Modules</span> | 
                <b> Not available until</b> {assignment.available} | </div>
                <div className="fs-6">
                <b>Due</b> {assignment.due} | {assignment.points} pts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                <GreenCheckmark/>
                <IoEllipsisVertical/>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup> ))}
      </ListGroupItem>
    </ListGroup>

  
</div>   
  );}