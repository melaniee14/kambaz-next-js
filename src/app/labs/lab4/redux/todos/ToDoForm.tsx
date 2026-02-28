
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
  
<ListGroupItem className="d-flex gap-2 align-items-center">

<FormControl
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>

<Button variant="warning" onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"> Update </Button>

      <Button variant="success" id="wd-add-todo-click"> Add </Button>
      
      
    </ListGroupItem>
);}

