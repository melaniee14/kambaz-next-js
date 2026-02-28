import { useState } from "react";
import { Button, Card, CardBody, Col, Form, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function ArrayStateVariable() {
const { todos } = useSelector((state: RootState) => state.todosReducer);

 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
  
  <div id="wd-array-state-variables">
<Card> 
    <CardBody> 
   <h2> Array State Variable</h2>
   <Button size="sm" variant="success" className="mb-3" onClick={addElement}> Add Element</Button>

   <ListGroup> 
    {array.map((item, index) => (
        
     <ListGroupItem className="d-flex justify-content-between align-items-center">
      <h4> {item} </h4> 
    
            <Button variant="danger" onClick={() => deleteElement(index)}>
            Delete</Button>

        </ListGroupItem> 

    ))}
  
  </ListGroup>

   <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
      </CardBody>
</Card>
  

  


   
   <hr/></div>);}

