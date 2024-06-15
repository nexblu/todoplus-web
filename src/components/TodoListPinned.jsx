import { TbPinnedFilled } from "react-icons/tb";
import { useState } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const TodoListPinned = (prop) => {
    let { todo } = prop

    const [loading, setLoading] = useState(false)
    const [isPin, setIsPin] = useState(todo.is_pin)

    const succesAdd = async () => {
        toast.success(`Succes Pinned Task`, {
            position: "bottom-right"
        });
    }

    const failedAdd = async () => {
        toast.error(`Failed Pinned Task`, {
            position: "bottom-right"
        });
    }

    const succesRemove = async () => {
        toast.success(`Succes Un Pinned Task`, {
            position: "bottom-right"
        });
    }

    const failedRemove = async () => {
        toast.error(`Failed Un Pinned Task`, {
            position: "bottom-right"
        });
    }

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
            const result = await apiPinnedTask()
            if (result) {
                setIsPin(true)
                await succesAdd()
            } else {
                await failedAdd()
            }
        } else {
            const result = await apiUnPinnedTask()
            if (result) {
                setIsPin(false)
                await succesRemove()
            } else {
                await failedRemove()
            }
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