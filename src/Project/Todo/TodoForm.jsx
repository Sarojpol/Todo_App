import { useState } from "react";

export const TodoForm = ({ onAddTodo }) =>{
    const [inputValue, setInputValue] = useState({});

    const handleInputChange = (value) => {
        setInputValue({id: value, content: value, checked: false});
    };

    const handleFromSubmit =(Event)=>{
        Event.preventDefault();
        onAddTodo ( inputValue );
        setInputValue({id: "", content: "", checked: false});
    };

 return (
    <section className="form">
                <form onSubmit={handleFromSubmit}>
                    <div>
                        <input type="text" className="todo-input" autoComplete="off"
                            value={inputValue.content} onChange={(Event) =>
                                handleInputChange(Event.target.value)} />
                    </div>

                    <div>
                        <button type="submit" className="todo-btn">Add Task</button>
                    </div>
                </form>
            </section>
 );
};