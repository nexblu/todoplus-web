import { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import IsDone from './IsDone';

const Todo = (prop) => {
    const { list, setList } = prop;
    const [updatedList, setUpdatedList] = useState(list);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;

    useEffect(() => {
        setUpdatedList(list);
    }, [list]);

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
                        <IsDone todo={todo} updatedList={updatedList} setUpdatedList={setUpdatedList} setList={setList}/>
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
