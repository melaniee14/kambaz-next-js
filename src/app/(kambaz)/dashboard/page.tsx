import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course"> 
        <Link href="/courses/hello" className="wd-dashboard-course-link">
        <Image src="/images/miffy.jpg" width={200} height={150} alt="miffy" />
            <div>
              <h5> CS3403 Miffy Baking </h5>
              <p className="wd-dashboard-course-title">
                Learn how to make a cake with miffy on it.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link href="/courses/angel" className="wd-dashboard-course-link">
        <Image src="/images/angel.jpg" width={200} height={150} alt="angel" />
            <div>
              <h5> CS1111 Angel Training </h5>
              <p className="wd-dashboard-course-title">
                Understand all angel numbers.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link href="/courses/smiski" className="wd-dashboard-course-link">
        <Image src="/images/smiski.jpg" width={200} height={150} alt="smiski" />
            <div>
              <h5> CS2222 Smiski Trading </h5>
              <p className="wd-dashboard-course-title">
                Trade and sell Smiskis with people.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link href="/courses/matcha" className="wd-dashboard-course-link">
        <Image src="/images/matcha.jpg" width={200} height={150} alt="matcha" />
            <div>
              <h5> CS7777 Making Matcha </h5>
              <p className="wd-dashboard-course-title">
                Get taught how to create iced matcha lattes at home.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link href="/courses/pink" className="wd-dashboard-course-link">
        <Image src="/images/pink.jpg" width={200} height={150} alt="pink" />
            <div>
              <h5> CS0000 Closet Full of Pink </h5>
              <p className="wd-dashboard-course-title">
                Understand how to turn all fashion choices into pink monochrome outfits.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
        <Link href="/courses/HTML" className="wd-dashboard-course-link">
        <Image src="/images/dev.jpg" width={200} height={150} alt="dev" />
            <div>
              <h5> CS8282 Web Dev For Beginners </h5>
              <p className="wd-dashboard-course-title">
                Fully understand HTML, CSS, and JS through this course.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
