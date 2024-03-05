import { Button, Form } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import ResponsivePlacerholder from './ResponsivePlaceholder';
import { useState } from 'react';
import todo from '../todo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormAdd = () => {
    const [task, setTask] = useState('');

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

    const handleTask = (e) => {
        e.preventDefault();
        console.log('klik')
        if (task !== '') {
            todo.push(task);
            successAdd('Success Add Todo.');
        } else {
            errorAdd('Failed Add Todo.');
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2 task-area">
                <div className="pe-2 ps-2 pt-3 area-input border mx-auto">
                    <ResponsivePlacerholder task={task} setTask={setTask} />
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
