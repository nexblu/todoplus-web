import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = (prop) => {
    let {list, setList} = prop;

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
            <p>hello</p>
            <ul>
                {list.map((todo) => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </>
    )
}

export default TodoList