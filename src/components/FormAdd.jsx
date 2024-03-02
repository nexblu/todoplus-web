import { Button, Form } from 'react-bootstrap'

const FormAdd = () => {
    return (
        <>
            <Form className='me-3 ms-3 mt-3 mb-3'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className="d-flex flex-row mb-3">
                        <Form.Control type="text" placeholder="Your Task" />
                        <Button variant="primary" className='button-home'>
                            Submit
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </>
    )
}

export default FormAdd