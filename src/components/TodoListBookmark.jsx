import { FaBookmark } from "react-icons/fa";
import { useState } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const TodoListBookmark = (prop) => {
    let { todo } = prop

    const [loading, setLoading] = useState(false)
    const [bookmark, setBookmark] = useState(todo.bookmark)

    const succesAdd = async () => {
        toast.success(`Succes Add Bookmark`, {
            position: "bottom-right"
        });
    }

    const failedAdd = async () => {
        toast.error(`Failed Add Bookmark`, {
            position: "bottom-right"
        });
    }

    const succesRemove = async () => {
        toast.success(`Succes Remove Bookmark`, {
            position: "bottom-right"
        });
    }

    const failedRemove = async () => {
        toast.error(`Failed Remove Bookmark`, {
            position: "bottom-right"
        });
    }

    const apiAddBookmark = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/bookmark/${todo.task_id}`, {
                method: 'POST',
                headers: headers,
            });
            const resp = await response.json();
            return resp.success
        } catch (error) {
            return false
        }
    }

    const apiRemoveBookmark = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/bookmark/${todo.task_id}`, {
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
        if (!bookmark) {
            const result = await apiAddBookmark()
            if (result) {
                setBookmark(true)
                await succesAdd()
            } else {
                await failedAdd()
            }
        } else {
            const result = await apiRemoveBookmark()
            if (result) {
                setBookmark(false)
                await succesRemove()
            } else {
                await failedRemove()
            }
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