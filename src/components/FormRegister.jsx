import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormRegister = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [messageEmailError, setMessageEmailError] = useState('');
    const [messageUsernameError, setMessageUsernameError] = useState('');
    const [messagePasswordError, setMessagePasswordError] = useState('');
    const [confirmMessagePasswordError, setConfirmMessagePasswordError] = useState('');

    const [loading, setLoading] = useState(false);

    const userLogin = async (username, password) => {
        const response = await fetch(`https://web-production-56f81.up.railway.app/todoplus/v1/login/${username}/${password}`);
        const data = await response.json();
        return data;
    }

    const userRegister = async (email, username, password) => {
        try {
            const data = {
                username: username,
                email: email,
                password: password
            };
            const response = await fetch(`https://web-production-56f81.up.railway.app/todoplus/v1/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resp = await response.json();
            console.table(resp)
            if (resp['status_code'] === 201) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            return false;
        }
    }

    const validateEmail = async (email) => {
        try {
            const response = await fetch(`https://web-production-56f81.up.railway.app/todoplus/v1/email/${email}`);
            const data = await response.json();
            if (data['status_code'] === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            return false;
        }
    }

    const clearForm = async () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    const successRegis = async (text) => {
        toast.success(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const errorRegis = async (text) => {
        toast.error(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const validationForm = async () => {
        let valid = true;

        if (email === '') {
            setEmailError(true);
            valid = false;
            setMessageEmailError('Email Is Required.')
        } else {
            const isValidEmail = await validateEmail(email);
            if (isValidEmail) {
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

        if (password === '' && confirmPassword === '') {
            setPasswordError(true);
            valid = false;
            setMessagePasswordError('Password Is Required.')
            setConfirmMessagePasswordError('Password Is Required.')
        } else {
            if (password === confirmPassword) {
                setPasswordError(false);
                setConfirmPasswordError(false);
            } else {
                setPasswordError(true);
                setConfirmPasswordError(true)
                valid = false;
                setMessagePasswordError('Password And Confirm Password Are Different.')
                setConfirmPasswordError('Password And Confirm Password Are Different.')
            }
        }

        return valid;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        const isValid = await validationForm();

        if (isValid) {
            const login = await userLogin(username, password);
            if (login['status_code'] === 404) {
                const register = await userRegister(email, username, password);
                console.log(register);
                if (register) {
                    successRegis('Success Register.');
                    clearForm();
                    setLoading(false)
                } else {
                    errorRegis('Failed Register.');
                    setLoading(false)
                }
            } else {
                errorRegis('Failed Register.');
                setLoading(false)
            }
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
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {confirmPasswordError && <Form.Text className="text-danger">{confirmMessagePasswordError}</Form.Text>}
                </Form.Group>
                <Button variant="primary" className='mt-3' type='submit' disabled={loading}>
                {loading ? 'Loading...' : 'Register'}
                </Button>
                <ToastContainer />
            </Form>
        </>
    );
}

export default FormRegister;
