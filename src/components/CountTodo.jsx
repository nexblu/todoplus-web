import { useEffect } from "react"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const CountTodo = (prop) => {
    let { length, setLength, isDone, setIsDone } = prop

    useEffect(() => {
        const getTodo = async (token, username) => {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/todolist/${username}`, {
                method: 'GET',
                headers: headers
            });
            const json = await response.json();
            setLength(json['result'].length);
        };

        const getTodoIsDone = async (token, username) => {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/todolist/completed/${username}`, {
                method: 'GET',
                headers: headers
            });
            const json = await response.json();
            if (json['status_code'] === 200) {
                setIsDone(json['result'].length);
            } else {
                setIsDone(0)
            }
        };

        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            getTodo(accessToken, decodedToken.username);
            getTodoIsDone(accessToken, decodedToken.username);
        }
    }, [setLength, setIsDone]);

    return (
        <>
            <h1 className="text-[40px] flex items-center">{`${isDone}/${length}`}</h1>
        </>
    )
}

export default CountTodo