"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams } from "next/navigation";


export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();


  const links = [
    {label: "Home", path: `/courses/${cid}/home`}, 
    {label: "Modules", path: `/courses/${cid}/modules`}, 
    {label: "Piazza", path: `/courses/${cid}/piazza`}, 
    {label: "Zoom", path: `/courses/${cid}/zoom`}, 
    {label: "Assignments", path: `/courses/${cid}/assignments`}, 
    {label: "Quizzes", path: `/courses/${cid}/quizzes`}, 
    {label: "Grades", path: `/courses/${cid}/grades`}, 
    {label: "People" , path: `/courses/${cid}/people/table`} ];


  return (
    <ListGroup id="wd-courses-navigation"  className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <ListGroupItem key={link.path} as={Link} href={link.path}
        className={`${pathname.includes(link.label.toLowerCase()) ? "active border-0" : "text-danger border-0"
        }`}>
          {link.label}
        </ListGroupItem>
        ))}
    </ListGroup>
  );}


//   <Link href="/courses/1234/home" id="wd-course-home-link"
//   className="list-group-item active border-0"> Home </Link>

// <Link href="/courses/1234/modules" id="wd-course-modules-link"
//   className="list-group-item text-danger border-0"> Modules </Link>

// <Link href="/courses/1234/piazza" id="wd-course-piazza-link"
//   className="list-group-item text-danger border-0"> Piazza </Link>

// <Link href="/courses/1234/zoom" id="wd-course-zoom-link"
//   className="list-group-item text-danger border-0"> Zoom </Link>

// <Link href="/courses/1234/assignments" id="wd-course-assignments-link"
//   className="list-group-item text-danger border-0"> Assignments </Link>

// <Link href="/courses/1234/quizzes" id="wd-course-quizzes-link"
//   className="list-group-item text-danger border-0"> Quizzes </Link>

// <Link href="/courses/1234/grades" id="wd-course-grades-link"
//   className="list-group-item text-danger border-0"> Grades</Link>

// <Link href="/courses/1234/people/table" id="wd-course-people-link"
//   className="list-group-item text-danger border-0" > People </Link>
