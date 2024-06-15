import { useEffect } from "react"
import Cookies from 'js-cookie';

const CountTodo = (prop) => {
    let { length, setLength, isDone, setIsDone } = prop

    useEffect(() => {
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
                setLength(resp.data.length);
            } else {
                setLength(0);
            }
        };

        const getTodoIsDone = async () => {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:5000/todoplus/v1/todolist/is-done`, {
                method: 'GET',
                headers: headers
            });
            const resp = await response.json();
            if (resp.success) {
                setIsDone(resp.data.length);
            } else {
                setIsDone(0)
            }
        };
        getTodo();
        getTodoIsDone();
    }, [setLength, setIsDone]);

    return (
        <>
            <h1 className="text-[40px] flex items-center">{`${isDone}/${length}`}</h1>
        </>
    )
}

export default CountTodo