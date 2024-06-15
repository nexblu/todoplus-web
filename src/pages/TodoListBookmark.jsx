import { useState, useEffect } from "react"
import { Helmet } from "react-helmet";
import icon from '../assets/icon.png'
import Cookies from 'js-cookie';
import { ThreeCircles } from 'react-loader-spinner'
import TaskPagination from "../components/TaskPagination";

const TodoListBookmark = () => {
    const [list, setList] = useState([])

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
        const getTodo = async () => {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/bookmark`, {
                method: 'GET',
                headers: headers
            });
            const resp = await response.json();
            if (resp.success) {
                setList(resp.data);
            }
        };
        getTodo();
        setLoading(false);
    }, [setList, setLoading]);

    return (
        <>
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Home</title>
                    <link rel="icon" type="image/svg+xml" href={icon} />
                </Helmet>
                <div className="flex-grow p-8 bg-[#171823] max-h-screen flex justify-center items-center">
                    <section className="rounded-lg shadow-lg bg-[#1F2937] w-full">
                        <br />
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
                                    <div className="flex justify-center flex-grow">
                                        <p className={`${todo.is_done ? 'line-through' : ''} text-[#FFFFFF] text-center`}>
                                            {todo.task}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                        <br />
                        <TaskPagination indexOfLastTask={indexOfLastTask} indexOfFirstTask={indexOfFirstTask} list={list} currentPage={currentPage} prevPage={prevPage} nextPage={nextPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
                        <br />
                    </section>
                </div>
            </>
        </>
    )
}

export default TodoListBookmark