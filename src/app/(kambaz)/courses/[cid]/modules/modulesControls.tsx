import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { FiSlash } from "react-icons/fi";
export default function ModulesControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
    
     <Button variant="danger" size="lg" className="float-end me-2" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Module
     </Button>
     <Dropdown className="float-end me-2">
       <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
         <GreenCheckmark /> Publish All
       </DropdownToggle>
       <DropdownMenu>
         <DropdownItem id="wd-publish-all">
           <GreenCheckmark /> Publish All
         </DropdownItem>
         <DropdownItem id="wd-publish-all-modules-and-items">
           <GreenCheckmark /> Publish all modules and items
         </DropdownItem>
         <DropdownItem id="wd-publish-modules-only">
           <GreenCheckmark /> Publish modules only
         </DropdownItem>
         <DropdownItem id="wd-unpublish-all-modules-and-items">
         <FiSlash /> Unpublish all modules and items
         </DropdownItem>
         <DropdownItem id="wd-unpublish-modules-only"> 
            <FiSlash />  Unpublish modules only
         </DropdownItem>
       </DropdownMenu>
     </Dropdown>

     

     <Button className="float-end me-2" variant="secondary" size="lg" id="wd-view-progress">
        View Progress
     </Button>

     <Button className="float-end me-2" variant="secondary" size="lg" id="wd-collapse-all">
        Collapse All
     </Button>

     
     
   </div>
);}

