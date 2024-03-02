import '../static/css/home.css'
import { Container } from 'react-bootstrap'
import FormAdd from '../components/FormAdd'

const Home = () => {
    return (
        <>
            <Container fluid>
                <br />
                <section className="border rounded bg-dark border-home text-light">
                    <h1 className='text-center me-3 ms-3 mt-3 mb-3 fs-3 fw-bold shadow-lg'>To Do List</h1>
                    <FormAdd />
                </section>
            </Container>
        </>
    )
}

export default Home