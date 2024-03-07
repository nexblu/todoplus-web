import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';

const TodoList = (prop) => {
    let { list, setList } = prop;

    useEffect(() => {
        const getTodo = async () => {
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/nexblu`)
            response.json().then(json => {
                setList(json[0]['result'])
            })
        }

        getTodo()
    }, [setList]);

    return (
        <>
            <ul>
                {list.map((todo) => (
                    <li key={todo.id} className='border m-2 rounded li-todo-list-item border-0'>
                        <div className="d-flex flex-row flex-todo-list-item">
                            <Form.Check aria-label="option 1" className='btn-is-done'/>
                            <p className='ms-3'>{todo.task}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList