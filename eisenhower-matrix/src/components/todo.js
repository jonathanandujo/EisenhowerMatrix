import React, { useState, useEffect } from 'react';

const TodoList = (props) => {
    const [inputTask, setInputTask] = useState('');
    const [list, setList] = useState(JSON.parse(window.localStorage.getItem('dbPriority' + props.priority)) ?? []);

    const handleAddTodo = () => {
        const newTask = {
            id: crypto.randomUUID(),
            todo: inputTask
        };
        setList([...list, newTask]);
        setInputTask('');
    };

    useEffect(() => {
          saveInDb();
      }, [list]);

    const handleDeleteTodo = (id) => {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
    };

    const handleInputChange = (event) => {
        setInputTask(event.target.value);
    };

    const saveInDb = () => {
        window.localStorage.setItem('dbPriority' + props.priority,JSON.stringify(list));
    }

    return (
        <div className="Todo">
            <h1>{props.title}</h1>

            <div className="Top">
                <input className="input" type="text" value={inputTask}
                    onChange={handleInputChange} placeholder="Name of your task" />

                <button className="btn" onClick={handleAddTodo}>ADD</button>
            </div>

            <ul>
                {list.map((todo) => (
                    <li className="task" key={todo.id}>
                        {todo.todo}
                        <text className='deleteButton' onClick={() => handleDeleteTodo(todo.id)}>
                            X
                        </text>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList; 