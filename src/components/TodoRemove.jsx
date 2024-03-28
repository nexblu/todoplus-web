import { IoMdTrash } from "react-icons/io";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const TodoRemove = (prop) => {
    let { list, setList, id } = prop
    const [user, setUser] = useState({});
    const [fetching, setFetching] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            const decodedToken = jwtDecode(accessToken);
            setUser(decodedToken)
            setToken(accessToken)
        } catch (error) {
            // error
        }
    }, [setUser]);

    const userRemoveTodo = async (username, id) => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch('http://127.0.0.1:5000/todoplus/v1/todolist', {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify({
                    username: username,
                    id: id
                })
            });
            const resp = await response.json();
            if (resp['status_code'] === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            return false;
        }
    };

    const handleClick = () => {
        setFetching(true)
        const result = userRemoveTodo(user['username'], id)
        if (result) {
            let newArray = list.filter(element => element.id !== id);
            setList(newArray)
        }
        setFetching(false)
    };

    return (
        <>
            <div className="d-flex flex-row-reverse">
                <div><IoMdTrash className="trash-icon" onClick={fetching === false ? handleClick : ''} type="button" /></div>
            </div>
        </>
    )
}

export default TodoRemove