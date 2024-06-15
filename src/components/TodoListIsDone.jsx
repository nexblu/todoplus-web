import { useState } from "react"
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const TodoListIsDone = (prop) => {
    let { todo, setList, list } = prop

    const [loading, setLoading] = useState(false)

    const succesAdd = async () => {
        toast.success(`Succes Mark As Done Task`, {
            position: "bottom-right"
        });
    }

    const failedAdd = async () => {
        toast.error(`Failed Mark As Done Task`, {
            position: "bottom-right"
        });
    }

    const succesRemove = async () => {
        toast.success(`Succes Un Mark As Done Task`, {
            position: "bottom-right"
        });
    }

    const failedRemove = async () => {
        toast.error(`Failed Un Mark As Done Task`, {
            position: "bottom-right"
        });
    }

    const markAsDoneAPI = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/is-done/${todo.task_id}`, {
                method: 'POST',
                headers: headers
            });
            const resp = await response.json();
            return resp.success
        } catch (error) {
            return false
        }
    } 

    const unMarkAsDoneAPI = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/is-done/${todo.task_id}`, {
                method: 'DELETE',
                headers: headers
            });
            const resp = await response.json();
            return resp.success
        } catch (error) {
            return false
        }
    }

    const handleClick = async () => {
        setLoading(true)
        if (todo.is_done) {
            const result = await unMarkAsDoneAPI()
            if (result) {
                let updatedTasks = list.map(task => {
                    if (task.task_id === todo.task_id) {
                        return { ...task, is_done: false };
                    }
                    return task;
                });
                await setList(updatedTasks)
                await succesRemove()
            } else {
                failedRemove()
            }
        } else {
            const result = await markAsDoneAPI()
            if (result) {
                let updatedTasks = list.map(task => {
                    if (task.task_id === todo.task_id) {
                        return { ...task, is_done: true };
                    }
                    return task;
                });
                setList(updatedTasks)
                await succesAdd()
            } else {
                await failedAdd()
            }
        }
        setLoading(false)
    }

    return (
        <>
            <div className="flex items-center">
                <input type="checkbox" id="flexCheckDefault" className="form-checkbox border-[transparent] cursor-pointer" checked={todo.is_done} onChange={loading ? null : handleClick}/>
            </div>
        </>
    )
}

export default TodoListIsDone