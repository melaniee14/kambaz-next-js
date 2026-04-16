"use client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Nav } from "react-bootstrap";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const { cid, qid } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            active={pathname.endsWith("/details")}
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/details`)}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={pathname.endsWith("/questions")}
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/questions`)}
          >
            Questions
          </Nav.Link>
        //fix questions tab
        </Nav.Item>
      </Nav>
      {children}
    </div>
  );
}