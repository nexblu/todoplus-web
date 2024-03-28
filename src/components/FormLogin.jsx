import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const FormLogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loading, setLoading] = useState(false);

    const userLogin = async (username, password) => {
        const response = await fetch(`http://127.0.0.1:5000/todoplus/v1/login/${username}/${password}`);
        const data = await response.json();
        return data;
    }

    const clearForm = async () => {
        setUsername('');
        setPassword('');
    }

    const errorLogin = (text) => {
        toast.error(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const validationForm = () => {
        let valid = true;

        if (username === '') {
            setUsernameError(true);
            valid = false;
        } else {
            setUsernameError(false);
        }

        if (password === '') {
            setPasswordError(true);
            valid = false;
        } else {
            setPasswordError(false);
        }

        return valid;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        const isValid = validationForm();
        if (isValid) {
            userLogin(username, password)
                .then(data => {
                    if (data['status_code'] === 200) {
                        const decodedToken = jwtDecode(data['result']['token']);
                        if (decodedToken['is_active'] === true) {
                            navigate('/')
                            clearForm()
                            Cookies.set('access_token', data['result']['token']);
                            setLoading(false);
                        } else {
                            setLoading(false);
                            errorLogin('Failed Login.');
                        }
                    } else {
                        setLoading(false);
                        errorLogin('Failed Login.');
                    }
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                    setLoading(false);
                    errorLogin('Failed Login.');
                });
        } else {
            setLoading(false);
            errorLogin('Failed Login.');
        }
    }

    return (
        <>
            <Form className='m-3 text-light' onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {usernameError && <Form.Text className="text-danger">Username Is Required.</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <Form.Text className="text-danger">Password Is Required.</Form.Text>}
                </Form.Group>
                <a href="/forget-reset-password" className='text-light'>Forgot Password</a>
                <Button variant="primary" type="submit" className='mt-3' disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </Button>
                <ToastContainer />
            </Form>
        </>
    );
}

export default FormLogin;