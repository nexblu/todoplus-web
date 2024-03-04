import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormRegister = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const successRegis = (text) => {
        toast.success(text, {
            position: "bottom-right"
        });
    };

    const errorRegis = (text) => {
        toast.error(text, {
            position: "bottom-right"
        });
    };

    const validationForm = () => {
        let valid = true;

        if (email === '') {
            setEmailError(true);
            valid = false;
        } else {
            setEmailError(false);
        }

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
        const isValid = validationForm();

        if (isValid) {
            successRegis('Success Register');
        } else {
            errorRegis('Failed Register');
        }
    }

    return (
        <>
            <Form className='m-3 text-light' onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <Form.Text className="text-danger">Email is required</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {usernameError && <Form.Text className="text-danger">Username is required</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <Form.Text className="text-danger">Password is required</Form.Text>}
                </Form.Group>
                <Button variant="primary" className='mt-3' type='submit'>
                    Register
                </Button>
                <ToastContainer />
            </Form>
        </>
    );
}

export default FormRegister;
