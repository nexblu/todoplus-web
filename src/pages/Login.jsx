import { Container } from 'react-bootstrap'
import { Helmet } from "react-helmet";
import FormLogin from '../components/FormLogin';
import IconLoginRegis from '../components/IconLoginRegis';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import '../static/css/login.css'

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            if (accessToken) {
                navigate('/')
            }
        } catch (error) {
            // error
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
            <Container fluid className='login'>
                <br />
                <br />
                <br />
                <section className="border border-login rounded bg-dark mx-auto shadow-lg">
                    <IconLoginRegis />
                    <h1 className='text-light me-3 ms-3 mt-3 mb-3 text-center fw-bold title-login'>Welcome Back</h1>
                    <p className='me-3 ms-3 mt-3 mb-3 text-center description-login'>Please Enter Your Account Details</p>
                    <FormLogin />
                    <div className="d-flex flex-row mb-3 text-light m-3 justify-content-center footer-border-login">
                        <p className="p-1">{"Don't Have Account?"}</p>
                        <p className="p-1"><a href="/register">Register</a></p>
                    </div>
                </section>
                <br />
                <br />
                <br />
            </Container>
        </>
    )
}

export default Login