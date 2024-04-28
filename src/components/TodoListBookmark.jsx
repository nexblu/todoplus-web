import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import "react-toastify/dist/ReactToastify.css";

const TodoListBookmark = (prop) => {
    let { todo } = prop

    const [user, setUser] = useState({})

    const [token, setToken] = useState('')

    const [loading, setLoading] = useState(false)

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

    const apiBookmark = async (username, id) => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const data = {
                username: username,
                id: id
            };
            const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/todolist/bookmark`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(
                    data
                )
            });
            const resp = await response.json();
            if (resp['status_code'] === 201) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    const handleClick = async () => {
        setLoading(true)
        const result = await apiBookmark(user.username, todo.id)
        if (result) {
            await apiAddLog(token, user.username, `success pinned task ${todo.id}`)
        } else {
            await apiAddLog(token, user.username, `failed pinned task ${todo.id}`)
        }
        setLoading(false)
    }

    return (
        <>
            <FaBookmark className="text-[#FFFFFF] me-1 ms-1 cursor-pointer" onClick={loading === false ? handleClick : null} />
        </>
    )
}

export default TodoListBookmark