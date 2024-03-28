import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import ResponsivePlaceholder from './ResponsivePlaceholder';
import Cookies from 'js-cookie';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const FormAdd = (prop) => {
    let { setList } = prop
    const [task, setTask] = useState('');
    const [user, setUser] = useState({});
    const [fetching, setFetching] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            const decodedToken = jwtDecode(accessToken);
            setUser(decodedToken)
            setToken(accessToken)
        } catch (error) {
            // error
        }
    }, [setUser, setToken]);

    const clearForm = async () => {
        setTask('');
    }

    const successAdd = (text) => {
        toast.success(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const errorAdd = (text) => {
        toast.error(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const getTodo = async () => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);

            const response = await fetch(`http://127.0.0.1:5000/todoplus/v1/todolist/${user.username}`, {
                method: 'GET',
                headers: headers
            });

            const json = await response.json();
            setList(json[0]['result']);
        } catch (error) {
            // error handling
        }
    };

    const userAddTodo = async (username, task) => {
        console.log(token)
        try {
            const url = 'http://localhost:5000/todoplus/v1/todolist';
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        username: username,
                        task: task
                    }
                )
            });
            const resp = await response.json();
            if (resp['status_code'] === 201) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            return false;
        }
    };

    const handleTask = async (e) => {
        e.preventDefault();
        setFetching(true)
        if (task !== '') {
            const result = await userAddTodo(user['username'], task);
            if (result) {
                await getTodo()
                clearForm();
                successAdd('Success Add Todo.');
            } else {
                errorAdd('Failed Add Todo.');
            }
        } else {
            errorAdd('Failed Add Todo.');
        }
        setFetching(false)
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2 task-area">
                <div className="pe-2 ps-2 pt-3 area-input border mx-auto border-0">
                    <ResponsivePlaceholder task={task} setTask={setTask} />
                </div>
                <div className="pe-2 ps-2 mx-auto">
                    <Form onSubmit={fetching === false ? handleTask : ''}>
                        <div className="border rounded-circle btn-add-task border-0 btn-add-task-light" onClick={fetching === false ? handleTask : ''}>
                            <FaPlus type="button" />
                        </div>
                    </Form>
                </div>
            </div>
            <div className="d-flex flex-row mb-3">
                <div className="p-2">
                    <Form onSubmit={fetching === false ? handleTask : ''}>
                        <Button variant="primary" type="submit" className='btn-576' onClick={fetching === false ? handleTask : ''}>Add</Button>{' '}
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default FormAdd;
