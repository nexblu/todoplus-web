import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
    const [messageConfirmPasswordError, setMessageConfirmPasswordError] = useState('');

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = async () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = async () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const failedRegister = async () => {
        toast.error("Failed Register", {
            position: "bottom-right"
        });
    }

    const successRegister = async () => {
        toast.success("Check Your Email", {
            position: "bottom-right"
        });
    }

    const clearForm = async () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmailError(false)
        setUsernameError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
        setMessageEmailError('')
        setMessageUsernameError('')
        setMessagePasswordError('')
        setMessageConfirmPasswordError('')
    }

    const userLogin = async (username, password) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/login/${username}/${password}`, {
            method: 'GET',
            headers: headers
        });
        const data = await response.json();
        if (data['status_code'] === 404) {
            return false
        } else {
            return true
        }
    }

    const emailSend = async (email) => {
        const now = new Date();
        now.setHours(now.getHours() + 7);
        const timestamp = now.getTime() / 1000;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        try {
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

    const validationForm = async () => {
        let valid = true;

        if (email === '') {
            setEmailError(true);
            valid = false;
            setMessageEmailError('Email Is Required.')
        } else {
            setEmailError(false)
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
            setConfirmPasswordError(true)
            valid = false;
            setMessagePasswordError('Password Is Required.')
            setMessageConfirmPasswordError('Password Is Required.')
        } else {
            if (password === confirmPassword) {
                setPasswordError(false);
                setConfirmPasswordError(false);
            } else {
                setPasswordError(true);
                setConfirmPasswordError(true);
                valid = false;
                setMessagePasswordError('Password And Confirm Password Are Different.')
                setMessageConfirmPasswordError('Password And Confirm Password Are Different.')
            }
        }

        return valid;
    }

    const userRegister = async (email, username, password, confirmPassword) => {
        try {
            const data = {
                username: username,
                email: email,
                password: password,
                confirm_password: confirmPassword
            };
            const response = await fetch(`https://web-production-795c.up.railway.app/todoplus/v1/register`, {
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
            return false;
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        const checkUserLogin = await userLogin(username, password)
        if (checkUserLogin === false) {
            const validateForm = await validationForm()
            if (validateForm) {
                const result = await userRegister(email, username, password, confirmPassword)
                if (result) {
                    setLoading(false)
                    await clearForm()
                    await emailSend(email)
                    await successRegister()
                } else {
                    setLoading(false)
                    await failedRegister()
                }
            } else {
                setLoading(false)
                await failedRegister()
            }
        } else {
            setLoading(false)
            await failedRegister()
        }
    }

    return (
        <>
            <form className="px-5" onSubmit={loading ? () => { } : handleRegister}>
                <div className="pb-1">
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Email</p>
                    <input type="text" placeholder="Email" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem]" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {emailError && <p className='text-[#DC3545] text-[14px]'>{messageEmailError}</p>}
                <div className="pb-1">
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Username</p>
                    <input type="text" placeholder="Username" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem]" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                {usernameError && <p className='text-[#DC3545] text-[14px]'>{messageUsernameError}</p>}
                <div className="pb-1 relative">
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Password</p>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem] pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                {passwordError && <p className='text-[#DC3545] text-[14px]'>{messagePasswordError}</p>}
                <div className="pb-1 relative">
                    <p className="text-[#F8F9FA] text-[14px] pb-3 pt-3">Confirm Password</p>
                    <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem] pr-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                {confirmPasswordError && <p className='text-[#DC3545] text-[14px]'>{messageConfirmPasswordError}</p>}
                <button type="submit" className='text-[#F8F9FA] rounded w-full mb-5 mt-3 h-[2rem] bg-[#0B5ED7]'>{loading ? 'Loading ...' : 'Register'}</button>
                <ToastContainer theme={'dark'} />
            </form>
        </>
    )
}

export default FormRegister;
