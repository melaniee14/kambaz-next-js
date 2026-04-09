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
    {label: "People" , path: `/courses/${cid}/people`} ];


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


