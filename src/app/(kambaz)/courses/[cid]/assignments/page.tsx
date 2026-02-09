import Link from "next/link";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import LessonControlButtons from "../modules/LessonControlButtons";
import ModuleControlButtons from "./ButtonsAfterTitle";
import { TbGripVertical } from "react-icons/tb";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilThin } from "react-icons/pi";
import GreenCheckmark from "../modules/GreenCheckmark";
import { ReactNode } from "react";




export default function Assignments() {

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



    <ListGroup className="rounded-0" id="wd-modules">
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
                  <Link href="/courses/1234/assignments/1"
               className="wd-assignment-link" >
              A1
            </Link> </h5>
                <div className="fs-6">
                  <span className="text-warning">Multiple Modules</span> | 
                <b> Not available until</b> May 6 at 12:00 am | </div>
                <div className="fs-6">
                <b>Due</b> May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                <GreenCheckmark/>
                <IoEllipsisVertical/>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>

      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <TbGripVertical className="fs-4" />
                <PiNotePencilThin className="fs-5 text-success" />
              </div>

              <div>
              <h5 className="mb-1"> <Link href="/courses/1234/assignments/2"
               className="wd-assignment-link" >
              A2
            </Link> </h5>
                <div className="fs-6">
                  <span className="text-warning">Multiple Modules</span> | 
                <b> Not available until</b> May 13 at 12:00 am | </div>
                <div className="fs-6">
                <b>Due</b> May 20 at 11:59pm | 100 pts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                <GreenCheckmark/>
                <IoEllipsisVertical/>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>

      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <TbGripVertical className="fs-4" />
                <PiNotePencilThin className="fs-5 text-success" />
              </div>

              <div>
                <h5 className="mb-1"> <Link href="/courses/1234/assignments/3"
               className="wd-assignment-link" >
              A3
            </Link> </h5>
                <div className="fs-6">
                  <span className="text-warning">Multiple Modules</span> | 
                <b> Not available until</b> May 20 at 12:00 am | </div>
                <div className="fs-6">
                <b>Due</b> May 27 at 11:59pm | 100 pts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                <GreenCheckmark/>
                <IoEllipsisVertical/>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>

        
    
      </ListGroupItem>
    </ListGroup>

  
</div>





      
      
  );}

  