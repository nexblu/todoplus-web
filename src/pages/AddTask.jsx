import { Helmet } from "react-helmet";
import icon from '../assets/icon.png'
import { useState } from "react";
import CountTodo from "../components/CountTodo";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TodoListAdd from "../components/TodoListAdd";

const AddTask = () => {
    const [length, setLength] = useState(0)
    const [isDone, setIsDone] = useState(0)

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="icon" type="image/svg+xml" href={icon} />
            </Helmet>
            <div className="flex-grow p-8 bg-[#171823] flex flex-col items-center justify-center">
                <section className="rounded-lg bg-[#68A4F1] m-[2.8rem] w-full">
                    <div className="flex flex-wrap justify-evenly text-center pt-[2rem] pb-[2rem]">
                        <div className="w-4/12 text-[#FFFFFF] flex flex-col justify-center items-center">
                            <p className="text-[38.4px] font-bold mb-2">Todo Done</p>
                            <p className="text-[16px]">Keep It Up</p>
                        </div>
                        <div className="w-4/12 flex justify-center">
                            <div className="bg-[#171823] text-[#FFFFFF] font-bold w-[150px] h-[150px] rounded-full flex items-center justify-center">
                                <CountTodo length={length} setLength={setLength} isDone={isDone} setIsDone={setIsDone} />
                            </div>
                        </div>
                    </div>
                </section>
                <TodoListAdd setLength={setLength} setIsDone={setIsDone} />
                <ToastContainer theme={'dark'} />
            </div>
        </>
    )
}

export default AddTask
