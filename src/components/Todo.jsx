import { Form } from 'react-bootstrap';
import { useState } from "react";

const Todo = (prop) => {
    const { list, setList } = prop;
    const [updatedList, setUpdatedList] = useState(list);

    const handleCheckboxChange = (todoId) => {
        const newList = updatedList.map(item => {
            if (item.id === todoId) {
                return { ...item, is_done: !item.is_done };
            }
            return item;
        });
        setUpdatedList(newList);
        setList(newList);
    };

    return (
        <>
            {updatedList.map((todo) => (
                <li key={todo.id} className='border m-2 rounded li-todo-list-item border-0 mb-3'>
                    <div className="d-flex flex-row flex-todo-list-item">
                        <Form.Check 
                            aria-label="option 1" 
                            className='btn-is-done'
                            checked={todo.is_done}
                            onChange={() => handleCheckboxChange(todo.id)}
                        />
                        <p className={`ms-3 ${todo.is_done ? 'text-decoration-line-through' : ''}`}>{todo.task}</p>
                    </div>
                </li>
            ))}
        </>
    );
};

export default Todo;
