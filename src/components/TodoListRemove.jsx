import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const TodoListRemove = (prop) => {
    let { todo, list, setList } = prop

    const [loading, setLoading] = useState(false)

    const successRemove = async () => {
        toast.success(`Succes Remove Task`, {
            position: "bottom-right"
        });
    }

    const failedRemove = async () => {
        toast.error(`Failed Remove Task`, {
            position: "bottom-right"
        });
    }

    const todoDelete = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/${todo.task_id}`, {
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
        const result = await todoDelete()
        if (result) {
            let updatedTasks = list.filter(task => task.task_id !== todo.task_id);
            setList(updatedTasks)
            await successRemove()
        } else {
            await failedRemove()
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