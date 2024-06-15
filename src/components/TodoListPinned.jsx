import { TbPinnedFilled } from "react-icons/tb";
import { useState } from "react";
import Cookies from 'js-cookie';

const TodoListPinned = (prop) => {
    let { todo } = prop

    const [loading, setLoading] = useState(false)
    const [isPin, setIsPin] = useState(todo.is_pin)

    const apiPinnedTask = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/is-pin/${todo.task_id}`, {
                method: 'POST',
                headers: headers,
            });
            const resp = await response.json();
            return resp.success
        } catch (error) {
            return false
        }
    }

    const apiUnPinnedTask = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/is-pin/${todo.task_id}`, {
                method: 'DELETE',
                headers: headers,
            });
            const resp = await response.json();
            return resp.success
        } catch (error) {
            return false
        }
    }

    const handleClick = async () => {
        setLoading(true)
        if (isPin === false) {
            await apiPinnedTask()
            setIsPin(true)
        } else {
            await apiUnPinnedTask()
            setIsPin(false)
        }
        setLoading(false)
    }

    return (
        <>
            <TbPinnedFilled className="text-[#FFFFFF] me-1 ms-1 cursor-pointer" onClick={loading ? null : handleClick} />
        </>
    )
}

export default TodoListPinned