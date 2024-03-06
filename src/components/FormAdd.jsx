import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import ResponsivePlaceholder from './ResponsivePlaceholder';
import Cookies from 'js-cookie';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const FormAdd = () => {
    const [task, setTask] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            const decodedToken = jwtDecode(accessToken);
            setUser(decodedToken)
        } catch (error) {
            // error
        }
    }, []);

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

    const userAddTodo = async (username, task) => {
        try {
            const data = {
                username: username,
                task: task,
            };
            const response = await fetch('http://localhost:5000/todoplus/v1/todolist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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
        if (task !== '') {
            const result = await userAddTodo(user['username'], task);
            if (result) {
                clearForm();
                successAdd('Success Add Todo.');
            } else {
                errorAdd('Failed Add Todo.');
            }
        } else {
            errorAdd('Failed Add Todo.');
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2 task-area">
                <div className="pe-2 ps-2 pt-3 area-input border mx-auto">
                    <ResponsivePlaceholder task={task} setTask={setTask} />
                </div>
                <div className="pe-2 ps-2 mx-auto">
                    <Form onSubmit={handleTask}>
                        <div className="border rounded-circle btn-add-task pt-2" onClick={handleTask}>
                            <FaPlus />
                        </div>
                    </Form>
                </div>
            </div>
            <div className="d-flex flex-row mb-3">
                <div className="p-2">
                    <Form onSubmit={handleTask}>
                        <Button variant="primary" type="submit" className='btn-576' onClick={handleTask}>Add</Button>{' '}
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default FormAdd;
