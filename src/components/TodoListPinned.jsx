import { TbPinnedFilled } from "react-icons/tb";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const TodoListPinned = (prop) => {
    let { todo, setList } = prop

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
        const response = await fetch('https://web-production-896c2.up.railway.app/todoplus/v1/todolist/log', {
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

    const apiPinnedTask = async (token, username, id) => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const data = {
                username: username,
                id: id
            };
            const response = await fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/todolist/pinned`, {
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
        const result = await apiPinnedTask(token, user.username, todo.id)
        if (result) {
            const apiAddLog =  async (token, username, log) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`)
        headers.append('Content-Type', 'application/json')
        const data = {
            username: username,
            log: log
        }
        const response = await fetch('https://web-production-896c2.up.railway.app/todoplus/v1/todolist/log', {
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
            await apiAddLog(token, user.username, `success ${todo.is_pin === true ? 'unpin' : 'pin'} task '${todo.task}'`)
            setList(prevList => prevList.map(item => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        is_pin: !item.is_pin
                    };
                }
                return item;
            }));
            setLoading(false)
        } else {
            await apiAddLog(token, user.username, `failed ${todo.is_pin === true ? 'unpin' : 'pin'} task '${todo.task}'`)
            setLoading(false)
        }
    }

    return (
        <>
            <TbPinnedFilled className="text-[#FFFFFF] me-1 ms-1 cursor-pointer" onClick={loading ? null : handleClick} />
        </>
    )
}

export default TodoListPinned