import { Form } from 'react-bootstrap';

const IsDone = (prop) => {
    let { todo, updatedList, setUpdatedList, setList } = prop

    const handleCheckboxChange = async (todoId) => {
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