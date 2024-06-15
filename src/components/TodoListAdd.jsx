import { useState } from "react"
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const TodoListAdd = (prop) => {
    let { setIsDone, setLength } = prop
    const [task, setTask] = useState('')
    const [taskError, setTaskError] = useState(false)
    const [taskErrorMessage, setTaskErrorMessage] = useState('')

    const [loading, setLoading] = useState(false)

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

    const getTodoIsDone = async () => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/is-done`, {
            method: 'GET',
            headers: headers
        });
        const resp = await response.json();
        if (resp.status) {
            setIsDone(resp.data.length)
        } else {
            setIsDone(0)
        }
    };

    const getTodo = async () => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`http://localhost:5000/todoplus/v1/todolist`, {
            method: 'GET',
            headers: headers
        });
        const resp = await response.json();
        if (resp.success) {
            setLength(resp.data.length)
        } else {
            setLength(0)
        }
    };

    const apiAddTask = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const data = {
                task: task,
                tags: ["programming"],
            };
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(
                    data
                )
            });
            const resp = await response.json();
            return resp.success
        } catch (error) {
            return false
        }
    }

    const onAddTask = async (e) => {
        e.preventDefault();
        setLoading(true)
        const result = await apiAddTask()
        if (result) {
            await clearForm()
            await getTodoIsDone()
            await getTodo()
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