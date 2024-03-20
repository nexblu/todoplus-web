import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const FormForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [messageEmailError, setMessageEmailError] = useState('');
    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(false);

    const userEmail = async (email) => {
        const response = await fetch(`https://web-production-56f81.up.railway.app/todoplus/v1/user/email/${email}`);
        const data = await response.json();
        return data;
    }

    const resetPasword = async (email) => {
        const data = {
            email: email,
        };
        const response = await fetch(`https://web-production-56f81.up.railway.app/todoplus/v1/user/reset/email-reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resp = await response.json();
        return resp
    }

    const clearForm = async () => {
        setEmail('');
        setEmailError(false);
        setMessageEmailError('');
    }

    const errorForgotPassword = async (text) => {
        toast.error(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    const successForgotPassword = async (text) => {
        toast.success(text, {
            position: "bottom-right",
            className: 'bg-dark'
        });
    };

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            const decodedToken = jwtDecode(accessToken);
            setUser(decodedToken);
        } catch (error) {
            // error handling
        }
    }, []);

    const validationForm = async () => {
        let valid = true;

        if (email === '') {
            setEmailError(true);
            setMessageEmailError('Email Is Required.');
            valid = false;
        } else {
            const userData = await userEmail(email);
            if (userData['status_code'] === 404) {
                setEmailError(true);
                setMessageEmailError('Email Not Found.');
                valid = false;
            } else {
                setEmailError(false);
                setMessageEmailError('');
            }
        }

        return valid;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const isValid = await validationForm();
            if (isValid) {
                await resetPasword(email, user['username'], user['password'])
                await successForgotPassword('Check Your Email.');
                await clearForm();
            } else {
                await errorForgotPassword('Failed Send Email.');
            }
        } catch (error) {
            console.error("Error in validation:", error);
            errorForgotPassword('An error occurred.');
        }
        setLoading(false);
    }

    return (
        <>
            <Form className='m-3 text-light' onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <Form.Text className="text-danger">{messageEmailError}</Form.Text>}
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3' disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
                <ToastContainer />
            </Form>
        </>
    );
}

export default FormForgotPassword;
