import { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ThreeCircles } from "react-loader-spinner";
import TaskPagination from "./TaskPagination";

const TodoListHistory = () => {
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
        const getTodo = async (token, username) => {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`https://web-production-df03.up.railway.app/todoplus/v1/todolist/log/${username}`, {
                method: 'GET',
                headers: headers
            });
            const json = await response.json();
            if (json.status_code === 200) {
                console.log(json)
                setList(json.result)
                setLoading(false)
            } else {
                console.log(json)
                setList([])
                setLoading(false)
            }
        };

        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            getTodo(accessToken, decodedToken.username);
        }
    }, [setLoading]);

    return (
        <>
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
                    <li key={todo.id} className={`bg-[#68A4F1] flex items-center p-[5px] me-[4rem] ms-[4rem] mb-[15px] rounded-lg border-0`}>
                        <div className="flex justify-center flex-grow">
                            <p className={`text-[#FFFFFF] text-center`}>
                                {todo.log}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>}
            <br />
            <TaskPagination indexOfLastTask={indexOfLastTask} indexOfFirstTask={indexOfFirstTask} list={list} currentPage={currentPage} prevPage={prevPage} nextPage={nextPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
        </>
    )
}

export default TodoListHistory