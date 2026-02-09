import Link from "next/link";
import { FormControl, InputGroup } from "react-bootstrap";
import { MdCalendarMonth } from "react-icons/md";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl id="wd-username"
             placeholder="alice"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="123" type="password"
             className="mb-2"/>
      <FormControl id="wd-name"
             placeholder="Alice" type="name"
             className="mb-2"/>
      <FormControl id="wd-last"
             placeholder="Wonderland" type="name"
             className="mb-2"/>
      <div className="position-relative mb-2">
         <MdCalendarMonth
            className="position-absolute top-50 end-0 translate-middle-y me-2 text-secondary"/>
               <FormControl type="search" placeholder="mm/dd/yyyy" />
                </div>
      <FormControl id="wd-email"
             placeholder="alice@wonderland.com" type="email"
             className="mb-2"/>   
      <FormControl id="wd-user"
             placeholder="User" type="name"
             className="mb-2"/>   
      <Link id="wd-signin-btn"
            href="/account/profile"
            className="btn btn-danger w-100 mb-2">
            Signout </Link>

    </div>
);}
