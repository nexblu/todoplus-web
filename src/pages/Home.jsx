import '../static/css/home.css'
import { Container } from 'react-bootstrap'
import { Helmet } from "react-helmet";
import FormAdd from '../components/FormAdd';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from '../components/TodoList';
import CountTodo from '../components/CountTodo';
import Logout from '../components/Logout';
import DarkTheme from '../components/DarkTheme';

const Home = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            navigate('/login')
        }
    },);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
            <Container fluid className='container-home'>
                <br />
                <br />
                <br />
                <section className={`border rounded text-light shadow-lg text-center border-home ${isDark === false ? 'border-home-light' : 'border-home-dark'} mx-auto`}>
                    <div className="row justify-content-between m-3">
                        <div className="col-4">
                            <p className='fw-bold'>TODOPLUS</p>
                        </div>
                        <div className="col-4">
                            <DarkTheme isDark={isDark} setIsDark={setIsDark}/>
                        </div>
                        <div className="col-4">
                            <Logout />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <section className="border border-home-task m-3 mx-auto border-0">
                                <div className="row justify-content-between border rounded border-0">
                                    <div className="col-md-4 mt-5">
                                        <h2 className='fw-bold'>Todo Done</h2>
                                        <p>Keep It Up</p>
                                    </div>
                                    <div className="col-md-4 pt-1">
                                        <div className="border rounded-circle mx-auto count-task count-task-light border-0">
                                            <CountTodo list={list} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <FormAdd list={list} setList={setList} />
                            </section>
                            <section className="border border-todo-list-item mx-auto m-3 border-0">
                                <TodoList list={list} setList={setList} />
                            </section>
                        </div>
                    </div>
                </section>
                <br />
                <br />
            </Container>
        </>
    )
}

export default Home