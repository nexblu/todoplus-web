import { Helmet } from "react-helmet";
import icon from '../assets/icon.png'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";

const Task = () => {
    const [list, setList] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            navigate('/login')
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="icon" type="image/svg+xml" href={icon} />
            </Helmet>
            <div className="flex-grow p-8 bg-[#171823] max-h-screen flex justify-center items-center">
                <section className="rounded-lg shadow-lg bg-[#1F2937] w-full">
                    <br />
                    {/* <TodoListAdd />
        <TaskPagination /> */}
                    <TodoList list={list} setList={setList} />
                    <br />
                </section>
            </div>
        </>
    )
}

export default Task
