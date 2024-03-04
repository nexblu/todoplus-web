import '../static/css/home.css'
import { Container, Button } from 'react-bootstrap'
import FormAdd from '../components/FormAdd'
import { Helmet } from "react-helmet";
import TodoList from '../components/TodoList';

const Home = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
            <Container fluid className='home'>
                <br />
                <section className="border rounded bg-dark border-home text-light">
                    <h1 className='text-center me-3 ms-3 mt-3 mb-3 fs-3 fw-bold shadow-lg'>To Do List</h1>
                    <FormAdd />
                    <hr className='me-3 ms-3 mb-3' />
                    <TodoList />
                    <hr className='me-3 ms-3 mb-3' />
                    <Container className='text-center mb-3'>
                        <div className="row justify-content-center">
                            <div className="col-md-4 mb-3 mt-3">
                                <Button variant="primary" className='button-home'>
                                    Clear All
                                </Button>
                            </div>
                            <div className="col-md-4 mb-3 mt-3">
                                <Button variant="primary" className='button-home'>
                                    Change Password
                                </Button>
                            </div>
                            <div className="col-md-4 mt-3">
                                <Button variant="primary" className='button-home'>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </Container>
                </section>
            </Container>
        </>
    )
}

export default Home