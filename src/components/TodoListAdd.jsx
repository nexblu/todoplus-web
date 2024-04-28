import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const TodoListAdd = (prop) => {
    let { setIsDone, setLength } = prop
    const [task, setTask] = useState('')
    const [taskError, setTaskError] = useState(false)
    const [taskErrorMessage, setTaskErrorMessage] = useState('')

    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({})

    const [token, setToken] = useState('')

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
    }, [setUser]);

    const clearForm = async () => {
        setTaskError(false)
        setTaskErrorMessage('')
        setTask('')
    }

    const succesAdd = async () => {
        toast.success(`Succes Add Task`, {
            position: "bottom-right"
        });
    }

    const failedAdd = async () => {
        toast.error(`Failed Add Task`, {
            position: "bottom-right"
        });
    }

    const getTodoIsDone = async (token, username) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/todolist/completed/${username}`, {
            method: 'GET',
            headers: headers
        });
        const json = await response.json();
        if (json.status_code === 200) {
            setIsDone(json.result.length)
        } else {
            setIsDone(0)
        }
    };

    const getTodo = async (token, username) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/todolist/${username}`, {
            method: 'GET',
            headers: headers
        });
        const json = await response.json();
        if (json.status_code === 200) {
            setLength(json.result.length)
        } else {
            setLength(0)
        }
    };

    const apiAddLog = async (token, username, log) => {
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

    const apiAddTask = async (task, username) => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const data = {
                task: task,
                username: username,
                tags: [],
                date: null
            };
            const response = await fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/todolist`, {
                method: 'POST',
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

    const onAddTask = async (e) => {
        e.preventDefault();
        setLoading(true)
        const result = await apiAddTask(task, user.username)
        if (result) {
            await clearForm()
            await apiAddLog(token, user.username, `create task '${task}'`)
            await getTodoIsDone(token, user.username)
            await getTodo(token, user.username)
            await succesAdd()
        } else {
            await failedAdd()
        }
        setLoading(false)
    }

    return (
        <>
            <form className="px-5 w-full" onSubmit={loading ? null : onAddTask}>
                <div className="pb-5">
                    <p className="text-[#F8F9FA] text-[14px] pb-3">Task</p>
                    <input type="text" placeholder="New Task" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem]" value={task} onChange={(e) => setTask(e.target.value)} />
                </div>
                {taskError && <p className='text-[#DC3545] text-[14px] pb-5'>{taskErrorMessage}</p>}
                <button type="submit" className='text-[#F8F9FA] rounded w-full mb-5 mt-3 h-[2rem] bg-[#0B5ED7]'>{loading ? 'Loading ...' : 'Add Task'}</button>
            </form>
        </>
    )
}

export default TodoListAdd