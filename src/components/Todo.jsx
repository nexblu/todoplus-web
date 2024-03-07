import { Form } from 'react-bootstrap';

const Todo = (prop) => {
    let { list } = prop;

    return (
        <>
            {list.map((todo) => (
                <li key={todo.id} className='border m-2 rounded li-todo-list-item border-0 mb-3'>
                    <div className="d-flex flex-row flex-todo-list-item">
                        <Form.Check aria-label="option 1" className='btn-is-done' />
                        <p className='ms-3'>{todo.task}</p>
                    </div>
                </li>
            ))}
        </>
    )
}

export default Todo