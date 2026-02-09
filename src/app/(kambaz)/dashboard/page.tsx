import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
      <Row xs={1} md={5} className="g-4">

        <Col className="wd-dashboard-course"  style={{ width: "300px" }}>
          <Card>
            <Link href="/courses/1234/home" 
                    className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Full Stack software developer</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course"  style={{ width: "300px" }}>
          <Card>
            <Link href="/courses/hello/home" 
                    className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/miffy.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3403 Miffy Baking</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Learn how to make a cake with miffy on it. </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course"  style={{ width: "300px" }}>
          <Card>
            <Link href="/courses/angel" 
                    className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/angel.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1111 Angel Training</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Understand all angel numbers. </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course"  style={{ width: "300px" }}>
          <Card>
            <Link href="/courses/smiski" 
                    className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/smiski.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2222 Smiski Trading</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Trade and sell Smiskis with people. </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course"  style={{ width: "300px" }}>
          <Card>
            <Link href="/courses/matcha" 
                    className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/matcha.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS7777 Making Matcha</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Learn how to make iced matcha lattes at home. </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course"  style={{ width: "300px" }}>
          <Card>
            <Link href="/courses/pink" 
                    className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/pink.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS0000 Closet Full of Pink</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Understand how to turn all fashion choices into pink monochrome outfits. </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course"  style={{ width: "300px" }}>
          <Card>
            <Link href="/courses/HTML" 
                    className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/dev.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS8282 Web Dev For Beginners</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Fully understand HTML, CSS, and JS through this course. </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        
        </Row>
      </div>
    </div>
);}
