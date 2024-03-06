import { Container } from 'react-bootstrap'
import { Helmet } from "react-helmet";
import FormRegister from '../components/FormRegister';
import IconLoginRegis from '../components/IconLoginRegis';
import '../static/css/register.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Register = () => {
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
                <title>Register</title>
            </Helmet>
            <Container fluid className='register'>
                <br />
                <br />
                <br />
                <section className="border border-register rounded bg-dark mx-auto shadow-lg">
                    <IconLoginRegis/>
                    <h1 className='text-light me-3 ms-3 mt-3 mb-3 text-center fw-bold title-register'>Welcome Back</h1>
                    <p className='me-3 ms-3 mt-3 mb-3 text-center description-register'>Please Enter Your Account Details</p>
                    <FormRegister />
                    <div className="d-flex flex-row mb-3 text-light m-3 justify-content-center footer-border-register">
                        <p className="p-1">{"You Have Account?"}</p>
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

export default Register