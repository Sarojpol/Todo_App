import { useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "../TodoList";
import { TodoDate } from "./TodoDate";

import { geteLocalStorageTodoData ,
    setLocalStorageTodoData }from "./TodoLocalStorage";

export const Todo = () => {
    const [task, setTask] = useState(() => geteLocalStorageTodoData() );
   

    const handleFromSubmit = (inputValue) => {
        const { id, content, checked } = inputValue;

        // To Check if the input  filed is empty or not
        if (!content) return;

        //to check if the data is alreadey existing or not
        // if (task.includes(InputValue)) return;
        const ifTodoContentMtched = task.find((curTask) => curTask.content === content);
        if (ifTodoContentMtched) return;

        setTask((prevTask) => [...prevTask, { id, content, checked }]);
    };

    //todo add data to localStorage
    setLocalStorageTodoData(task);

    // For Delete & clear function

    const handleDeleteTodo = (value) => {
        const updatedTsk = task.filter((curtask) => curtask.content !== value);
        setTask(updatedTsk);
    };

    const handleClearTodoData = () => {
        setTask([]);
    };

    // todo handleDeleteTodo function
    const handleCheckedTodo = (content) => {
        const updatedTsk = task.map((curtask) => {
            if (curtask.content === content) {
                return { ...curtask, checked: !curtask.checked };
            } else {
                return curtask;
            }
        });
        setTask(updatedTsk);
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate />
            </header>

            <TodoForm onAddTodo={handleFromSubmit} />

            <section className="myUnordList">
                <ul>
                    {
                        task.map((curtask) => {
                            return (< TodoList key={curtask.id} data={curtask.content}
                                checked={curtask.checked}
                                onHandleDeleteTodo={handleDeleteTodo}
                                onHandleCheckedTodo={handleCheckedTodo}
                            />);
                        })}
                </ul>
            </section>
            <section>
                <button className="clear-btn"
                    onClick={handleClearTodoData}>Clear All</button>
            </section>
        </section>
    );
};