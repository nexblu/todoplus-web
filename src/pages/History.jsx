import { Helmet } from "react-helmet";
import icon from '../assets/icon.png'
import TodoListHistory from "../components/TodoListHistory";

const History = () => {
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
                    <TodoListHistory />
                    <br />
                </section>
            </div>
        </>
    )
}

export default History
