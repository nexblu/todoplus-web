import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FormResetPassword = () => {
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState(false);

    const [messageEmailError, setMessageEmailError] = useState('');

    const succesReset = async () => {
        toast.success(`Check Your Email`, {
            position: "bottom-right"
        });
    }

    const failedReset = async () => {
        toast.error(`Failed Reset Password`, {
            position: "bottom-right"
        });
    }

    const clearForm = async () => {
        setEmail('')
        setEmailError(false)
        setMessageEmailError('')
    }

    const emailVerify = async (email) => {
        if (email.trim().length === 0) {
            setMessageEmailError('Email Not Valid')
            setEmailError(true)
            return false
        }
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/email-validator/${email}`, {
                method: 'GET',
                headers: headers
            });
            const resp = await response.json();
            if (resp.status_code === 200) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    };

    const apiResetPassword = async (email) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const data = {
                email: email
            };
            const response = await fetch(`https://web-production-b0d3.up.railway.app/todoplus/v1/user/reset/email-reset-password`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(
                    data
                )
            });
            const resp = await response.json();
            if (resp['status_code'] === 201) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true)
        const emailCheck = await emailVerify(email)
        if (emailCheck) {
            const sendResetPassword = await apiResetPassword(email)
            if (sendResetPassword) {
                await succesReset()
                await clearForm()
            } else {
                await failedReset()
            }
        } else {
            await failedReset()
        }
        setLoading(false)
    }

    return (
        <>
            <form className="px-5" onSubmit={loading ? null : handleReset}>
                <div>
                    <p className="text-[#F8F9FA] text-[14px] pb-3">Email</p>
                    <input type="text" placeholder="Email" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem]" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {emailError && <p className='text-[#DC3545] text-[14px] pt-1'>{messageEmailError}</p>}
                <button type="submit" className='text-[#F8F9FA] rounded w-full mb-5 mt-3 h-[2rem] bg-[#0B5ED7]'>{loading ? 'Loading ...' : 'Reset Password'}</button>
            </form>
            <ToastContainer theme={'dark'} />
        </>
    )
}

export default FormResetPassword;
