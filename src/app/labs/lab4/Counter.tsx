import { useState } from "react";
import { Button } from "react-bootstrap";
export default function Counter() {

  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>

 
      <Button className="mb-2" variant="success" onClick={() => setCount(count + 1)}
              id="wd-counter-up-click">Up</Button> <Button className="mb-2" variant="danger" onClick={() => setCount(count - 1)}
              id="wd-counter-down-click">Down</Button>
                
<hr/></div>);}

