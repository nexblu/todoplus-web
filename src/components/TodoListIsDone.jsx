import { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const TodoListIsDone = (prop) => {
    let { todo, setList } = prop

    const [isDone, setIsDone] = useState(todo.is_done)

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

    const todoIsDone = async (id, username, is_done) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const data = {
            username: username,
            id: id,
            is_done: is_done
        };
        const response = await fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/todolist/is_done`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(
                data
            )
        });
        const resp = await response.json();
        if (resp.status_code === 201) {
            return true
        } else {
            return false
        }
    }

    const handleClick = async () => {
        setLoading(true)
        setIsDone(!isDone);
        const updatedIsDone = !isDone;
        const result = await todoIsDone(todo.id, user.username, updatedIsDone)
        if (result) {
            setList(prevList => prevList.map(item => item.id === todo.id ? { ...item, is_done: updatedIsDone } : item));
            await apiAddLog(token, user.username, `success ${todo.is_done === true ? 'unmark' : 'mark'} as done task '${todo.task}'`)
        } else {
            await apiAddLog(token, user.username, `failed ${todo.is_done === true ? 'unmark' : 'mark'} as done task '${todo.task}'`)
        }
        setLoading(false)
    };

    return (
        <>
            <div className="flex items-center">
                <input type="checkbox" id="flexCheckDefault" className="form-checkbox border-[transparent] cursor-pointer" checked={isDone} onClick={loading ? null : handleClick}/>
            </div>
        </>
    )
}

export default TodoListIsDone