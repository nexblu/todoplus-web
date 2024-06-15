import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormLogin = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const failedLogin = () => {
        toast.error('Failed Login', {
            position: 'bottom-right'
        });
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
    };

    const emailSend = async (email) => {
        const now = new Date();
        now.setHours(now.getHours() + 7);
        const timestamp = now.getTime() / 1000;
        try {
            const response = await fetch('http://localhost:5000/todoplus/v1/user/email-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, expired_at: timestamp })
            });
            const resp = await response.json();
            return resp.status_code === 201;
        } catch (error) {
            return false;
        }
    };

    const userLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5000/todoplus/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const resp = await response.json();
            if (resp.status_code === 200) {
                const decodedToken = jwtDecode(resp.data.token.access_token);
                if (decodedToken.is_active) {
                    return { status: true, token: resp.data.token, message: resp.message };
                } else {
                    return { status: false, token: null, message: 'user not active' };
                }
            } else {
                return { status: false, token: null, message: resp.message };
            }
        } catch (error) {
            return { status: false, token: null, message: error.message };
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const checkUserLogin = await userLogin(username, password);
        if (checkUserLogin.status) {
            Cookies.set('access_token', checkUserLogin.token.access_token);
            Cookies.set('refresh_token', checkUserLogin.token.refresh_token);
            navigate('/dashboard');
            setLoading(false);
            clearForm();
        } else {
            if (checkUserLogin.message === 'user not active') {
                const decodedToken = jwtDecode(checkUserLogin.token.access_token);
                await emailSend(decodedToken.email);
            }
            failedLogin();
            setLoading(false);
        }
    };

    return (
        <>
            <form className="px-5" onSubmit={loading ? null : handleLogin}>
                <div>
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Username</p>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Password</p>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem] pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <a href="/reset-password" className="text-[#808080] text-[14px]">
                    Forgot Password
                </a>
                <br />
                <button
                    type="submit"
                    className="text-[#F8F9FA] rounded w-full mb-5 mt-3 h-[2rem] bg-[#0B5ED7]"
                >
                    {loading ? 'Loading ...' : 'Login'}
                </button>
                <ToastContainer theme={'dark'} />
            </form>
        </>
    );
};

export default FormLogin;
