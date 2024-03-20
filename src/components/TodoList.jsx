import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import Todo from './Todo';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const TodoList = (prop) => {
    let { list, setList } = prop;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            const decodedToken = jwtDecode(accessToken);
            setUser(decodedToken);
        } catch (error) {
            // error handling
        }
    }, []);

    useEffect(() => {
        if (user.username) {
            const getTodo = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://web-production-56f81.up.railway.app/todoplus/v1/todolist/${user.username}`);
                    const json = await response.json();
                    setList(json[0]['result']);
                } catch (error) {
                    // error handling
                } finally {
                    setLoading(false);
                }
            };
            getTodo();
        }
    }, [user, setList]);

    return (
        <>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <ul>
                    <Todo list={list} setList={setList} user={user}/>
                </ul>
            )}
        </>
    )
}

export default TodoList;