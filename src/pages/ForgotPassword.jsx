import { Container } from 'react-bootstrap'
import { Helmet } from "react-helmet";
import FormForgotPassword from '../components/FormForgotPassword';
import IconLoginRegis from '../components/IconLoginRegis';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import '../static/css/forgot-password.css'
import icon from '../static/image/Screenshot_2024-03-10_23-25-16-removebg-preview.png'

const ForgotPassword = () => {
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
                <title>Forgot Password</title>
                <link rel="icon" type="image/svg+xml" href={icon} />
            </Helmet>
            <Container fluid className='fogot-password'>
                <br />
                <br />
                <br />
                <section className="border border-forgot-password rounded bg-dark mx-auto shadow-lg">
                    <IconLoginRegis />
                    <h1 className='text-light me-3 ms-3 mt-3 mb-3 text-center fw-bold title-forgot-password'>Forgot Password</h1>
                    <p className='me-3 ms-3 mt-3 mb-3 text-center description-forgot-password'>Please Enter Your Account Details</p>
                    <FormForgotPassword />
                    <div className="d-flex flex-row mb-3 text-light m-3 justify-content-center footer-border-forgot-password">
                        <p className="p-1">{"Back Login?"}</p>
                        <p className="p-1"><a href="/login">Login</a></p>
                    </div>
                </section>
                <br />
                <br />
                <br />
            </Container>
        </>
    )
}

export default ForgotPassword