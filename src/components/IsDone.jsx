import { Form } from 'react-bootstrap';

const IsDone = (prop) => {
    let {todo, handleCheckboxChange} = prop

    return (
        <>
            <Form.Check
                aria-label="option 1"
                className='btn-is-done'
                checked={todo.is_done}
                onChange={() => handleCheckboxChange(todo.id)}
            />
        </>
    )
}

export default IsDone