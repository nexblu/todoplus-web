import { Helmet } from "react-helmet";
import IconForm from "../components/IconForm";
import FormRegister from "../components/FormRegister";
import icon from '../assets/icon.png'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            navigate('/task')
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="icon" type="image/svg+xml" href={icon} />
            </Helmet>
            <section className="h-screen w-full bg-[#FBFBFB]">
                <br />
                <br />
                <br />
                <section className="rounded me-[30%] ms-[30%] bg-[#212529] shadow-2xl">
                    <IconForm />
                    <section className="isi-login">
                        <h1 className="text-center text-[#F8F9FA] font-bold pt-3 pb-3 text-[1.5rem]">Welcome Back</h1>
                        <p className="text-center text-[#808080] text-[14px] pb-3">Please Enter Your Account Details</p>
                    </section>
                    <FormRegister />
                    <div className="flex flex-row px-5 text-center justify-center items-center">
                        <div className="text-[#808080] text-[14px] me-1">{"Have Account?"}</div>
                        <div><a href="https://todoplus-web.vercel.app/login" className="text-[#F8F9FA] text-[14px] ms-1">Login</a></div>
                    </div>
                    <br />
                </section>
                <br />
                <br />
                <br />
            </section>
        </>
    )
}

export default Register