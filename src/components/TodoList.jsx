import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const TodoList = (prop) => {
    let { list, setList } = prop;
    const [user, setUser] = useState({});

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            const decodedToken = jwtDecode(accessToken);
            setUser(decodedToken);
        } catch (error) {
            // error
        }
    }, []);

    useEffect(() => {
        if (user.username) {
            const getTodo = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/${user.username}`);
                    const json = await response.json();
                    setList(json[0]['result']);
                } catch (error) {
                    // error handling
                }
            };
            getTodo();
        }
    }, [user, setList]);

    return (
        <>
            <ul>
                {list.map((todo) => (
                    <li key={todo.id} className='border m-2 rounded li-todo-list-item border-0 mb-3'>
                        <div className="d-flex flex-row flex-todo-list-item">
                            <Form.Check aria-label="option 1" className='btn-is-done' />
                            <p className='ms-3'>{todo.task}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList