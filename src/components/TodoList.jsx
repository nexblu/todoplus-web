import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import TodoListRemove from "./TodoListRemove";
import TodoListEdit from "./TodoListEdit";
import TodoListIsDone from "./TodoListIsDone";
import { ThreeCircles } from 'react-loader-spinner'
import TaskPagination from "./TaskPagination";
import TodoListBookmark from "./TodoListBookmark";
import TodoListPinned from "./TodoListPinned";
import TaskPinned from "./TaskPinned";

const TodoList = (prop) => {
    let { list, setList } = prop;

    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 8;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = list.slice(indexOfFirstTask, indexOfLastTask);

    const nextPage = () => {
        if (indexOfLastTask < list.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        const lastPage = Math.ceil(list.length / tasksPerPage);
        setCurrentPage(lastPage);
    };

    useEffect(() => {
        setLoading(true);
        const getTodo = async (token) => {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist`, {
                method: 'GET',
                headers: headers
            });
            const json = await response.json();
            if (json['status_code'] === 200) {
                setList(json['result']);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            getTodo(accessToken);
        }
    }, [setList, setLoading]);

    return (
        <>
            <TaskPinned list={list} />
            {loading === true ? <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#0B5ED7"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass="flex justify-center"
            /> : <ul className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {currentTasks.map((todo) => (
                    <li key={todo.id} className={`bg-[#68A4F1] flex items-center p-[5px] me-[4rem] ms-[4rem] mb-[15px] rounded-lg border ${todo.is_done ? 'border-lime-500' : 'border-red-600'}`}>
                        <TodoListIsDone todo={todo} setList={setList} />
                        <TodoListPinned todo={todo} setList={setList} />
                        <div className="flex justify-center flex-grow">
                            <p className={`${todo.is_done ? 'line-through' : ''} text-[#FFFFFF] text-center`}>
                                {todo.task}
                            </p>
                        </div>
                        <TodoListEdit />
                        <TodoListBookmark todo={todo} />
                        <TodoListRemove todo={todo} list={list} setList={setList} />
                    </li>
                ))}
            </ul>}
            <br />
            <TaskPagination indexOfLastTask={indexOfLastTask} indexOfFirstTask={indexOfFirstTask} list={list} currentPage={currentPage} prevPage={prevPage} nextPage={nextPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
        </>
    );
}

export default TodoList;
