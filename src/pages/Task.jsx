import { Helmet } from "react-helmet";
import icon from '../assets/icon.png'
import { useState } from "react";
import TodoList from "../components/TodoList";

const Task = () => {
    const [list, setList] = useState([])

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
