import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";
export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center" key={todo.id}>

      <div className="d-flex align-items-center gap-2"> 
      {todo.title}

       <Button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"> Edit </Button>
        <Button variant="danger" onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"> Delete </Button>
       
        
      </div>
    </ListGroupItem>
);}
