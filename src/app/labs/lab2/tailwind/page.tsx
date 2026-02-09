import "./index.css";
import TailwindBackgroundColors from "./TailwindBackgroundColors";
import TailwindFilters from "./TailwindFilters";
import TailwindGrids from "./TailwindGrids";
import TailwindResponsiveDesign from "./TailwindResponsiveDesign";
import TailwindTypography from "./TailwingTypography";


export default function TailwindLab() {
 return (
   <div className="p-8">
     <h1 className="text-4xl font-bold mb-8">Tailwind CSS</h1>

     <div>
    <TailwindTypography/>
   </div>

   <div>
    <TailwindBackgroundColors/>
   </div>

   <div>
    <TailwindResponsiveDesign/>
   </div>

   <div>
    <TailwindFilters/>
   </div>

   <div>
    <TailwindGrids/>
   </div>
   </div>

   
 );
}

