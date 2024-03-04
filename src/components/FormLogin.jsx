import { Button, Form } from 'react-bootstrap'

const FormLogin = () => {
    return (
        <>
            <Form className='m-3 text-light'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <a href="/" className='text-light'>Forgot Password</a>
                <Button variant="primary" type="submit" className='mt-3'>
                    Login
                </Button>
            </Form>
        </>
    );
}

export default FormLogin;