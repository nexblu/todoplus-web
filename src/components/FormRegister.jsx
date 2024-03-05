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

    const [messageEmailError, setMessageEmailError] = useState('');
    const [messageUsernameError, setMessageUsernameError] = useState('');
    const [messagePasswordError, setMessagePasswordError] = useState('');

    const validateEmail = (email) => {
        return fetch(`http://localhost:5000/todoplus/v1/email/${email}`)
            .then(response => response.json())
            .then(data => {
                if (data['status_code'] === 200) {
                    return true;
                } else {
                    console.log(data['status_code']);
                    return false;
                }
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
                return false;
            });
    }

    const successRegis = (text) => {
        toast.success(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const errorRegis = (text) => {
        toast.error(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const validationForm = () => {
        let valid = true;

        if (email === '') {
            setEmailError(true);
            valid = false;
            setMessageEmailError('Email Is Required.')
        } else {
            const validate = validateEmail(email);
            if (validate) {
                setEmailError(false)
            } else {
                setEmailError(true)
                valid = false
                setMessageEmailError('Email Is Not Valid.')
            }
        }

        if (username === '') {
            setUsernameError(true);
            valid = false;
            setMessageUsernameError('Username Is Required.')
        } else {
            setUsernameError(false);
        }

        if (password === '') {
            setPasswordError(true);
            valid = false;
            setMessagePasswordError('Password Is Required.')
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
                    {emailError && <Form.Text className="text-danger">{messageEmailError}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {usernameError && <Form.Text className="text-danger">{messageUsernameError}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <Form.Text className="text-danger">{messagePasswordError}</Form.Text>}
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
