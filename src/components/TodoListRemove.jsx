import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const TodoListRemove = (prop) => {
    let { todo, list, setList } = prop

    const [user, setUser] = useState({})

    const [token, setToken] = useState('')

    const [loading, setLoading] = useState()

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUser({
                username: decodedToken.username,
                email: decodedToken.email,
                password: decodedToken.password,
                is_active: decodedToken.is_active
            })
            setToken(accessToken)
        }
    }, [setUser, setToken]);

    const apiAddLog =  async (token, username, log) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`)
        headers.append('Content-Type', 'application/json')
        const data = {
            username: username,
            log: log
        }
        const response = await fetch('https://web-production-df03.up.railway.app/todoplus/v1/todolist/log', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(
                data
            )
        })
        const resp = await response.json()
        if (resp.status_code === 201) {
            return true
        } else {
            return false
        }
    }

    const todoDelete = async (id, username) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const data = {
            username: username,
            id: id,
        };
        const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/todolist`, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(
                data
            )
        });
        const resp = await response.json();
        if (resp.status_code) {
            return true
        } else {
            return false
        }
    }

    const handleClick = async () => {
        setLoading(true)
        const result = await todoDelete(todo.id, user.username)
        if (result) {
            await apiAddLog(token, user.username, `success remove task '${todo.task}'`)
            let newArray = list.filter(element => element.id !== todo.id);
            setList(newArray)
        } else {
            await apiAddLog(token, user.username, `failed remove task '${todo.task}'`)
        }
        setLoading(false)
    }

    return (
        <>
            <FaTrash className="text-[#FFFFFF] me-1 ms-1 cursor-pointer" onClick={loading ? null : handleClick} />
        </>
    )
}

export default TodoListRemove