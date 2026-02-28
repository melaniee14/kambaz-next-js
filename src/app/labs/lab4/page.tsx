"use client"
import Link from "next/link";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import store from "./store";
import { Provider } from "react-redux";
import TodoList from "./redux/todos/TodoList";



export default function Lab4() {
    function sayHello() {
        alert("Hello");
      }
    // fix array state variable later
    return (
        <Provider store={store}>
            <div id="wd-lab4"> 
        
                <h2> Lab 4</h2>

                <ClickEvent/>

                <PassingDataOnEvent/>

                <PassingFunctions theFunction={sayHello} />

                <Counter/>

                <BooleanStateVariables/>

                <StringStateVariables/>

                <DateStateVariable/>

                <ObjectStateVariable/>

                <ArrayStateVariable/>

                <ParentStateComponent/>

                <Link href="./redux">Redux Examples</Link>

                <TodoList/>

                
            </div>
        </Provider>
    )
}