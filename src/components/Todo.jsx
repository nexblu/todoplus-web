import { useState } from 'react';
import { Form, Pagination } from 'react-bootstrap';

const Todo = (prop) => {
    const { list, setList } = prop;
    const [updatedList, setUpdatedList] = useState(list);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

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

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = updatedList.slice(indexOfFirstTask, indexOfLastTask);

    const nextPage = () => {
        if (indexOfLastTask < updatedList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {currentTasks.map((todo) => (
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
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={nextPage} disabled={indexOfLastTask >= updatedList.length} />
            </Pagination>
        </>
    );
};

export default Todo;
