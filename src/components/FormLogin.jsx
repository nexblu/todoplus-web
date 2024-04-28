import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FormLogin = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [messageUsernameError, setMessageUsernameError] = useState('');
    const [messagePasswordError, setMessagePasswordError] = useState('');

    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = async () => {
        setShowPassword(!showPassword);
    };

    const failedLogin = async () => {
        toast.error("Failed Login", {
            position: "bottom-right"
        });
    }

    const clearForm = async () => {
        setUsername('');
        setPassword('');
        setUsernameError(false)
        setPasswordError(false)
        setMessageUsernameError('')
        setMessagePasswordError('')
    }

    const emailSend = async (email) => {
        const now = new Date();
        now.setHours(now.getHours() + 7);
        const timestamp = now.getTime() / 1000;
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const data = {
                email: email,
                expired_at: timestamp
            };
            const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/user/email-verify`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            const resp = await response.json();
            if (resp['status_code'] === 201) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    const userLogin = async (username, password) => {
        const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/login/${username}/${password}`);
        const data = await response.json();
        if (data['status_code'] === 200) {
            const decodedToken = jwtDecode(data['result']['token']);
            if (decodedToken['is_active'] === true) {
                return {
                    status: true,
                    token: data['result']['token'],
                    message: 'user is valid'
                }
            } else {
                return {
                    status: false,
                    token: data['result']['token'],
                    message: 'user is not active'
                }
            }
        } else {
            return {
                status: false,
                token: null,
                message: 'user is not found'
            }
        }
    }

    const validationForm = async () => {
        let valid = true;

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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        const validateForm = await validationForm()
        if (validateForm) {
            const checkUserLogin = await userLogin(username, password)
            if (checkUserLogin.status) {
                Cookies.set('access_token', checkUserLogin.token);
                navigate('/dashboard')
                setLoading(false)
                await clearForm()
            } else {
                if (checkUserLogin.status === false && checkUserLogin.message === 'user is not active') {
                    const decodedToken = jwtDecode(checkUserLogin.token);
                    await emailSend(decodedToken.email)
                    setLoading(false)
                    await failedLogin()
                } else {
                    setLoading(false)
                    await failedLogin()
                }
            }
        } else {
            setLoading(false)
        }
    }

    return (
        <>
            <form className="px-5" onSubmit={loading ? null : handleLogin}>
                <div>
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Username</p>
                    <input type="text" placeholder="Username" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem]" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                {usernameError && <p className='text-[#DC3545] text-[14px]'>{messageUsernameError}</p>}
                <div className="relative">
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Password</p>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem] pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                {passwordError && <p className='text-[#DC3545] text-[14px]'>{messagePasswordError}</p>}
                <a href="https://todoplus-web.vercel.app/reset-password" className='text-[#808080] text-[14px]'>Forgot Password</a>
                <br />
                <button type="submit" className='text-[#F8F9FA] rounded w-full mb-5 mt-3 h-[2rem] bg-[#0B5ED7]'>{loading ? 'Loading ...' : 'Login'}</button>
                <ToastContainer theme={'dark'} />
            </form>
        </>
    )
}

export default FormLogin;
