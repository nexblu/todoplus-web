import { TrashOutline } from 'react-ionicons'
import { Form } from 'react-bootstrap'

const TodoList = () => {
    return (
        <>
            <div className="d-flex flex-row justify-content-between me-3 ms-3 mt-3 mb-3">
                <Form.Check aria-label="option 1" />
                <p>abcd</p>
                <TrashOutline
                    color={'#00000'}
                    title={''}
                    height="25px"
                    width="25px"
                />
            </div>
            <div className="d-flex flex-row justify-content-between me-3 ms-3 mt-3 mb-3">
                <Form.Check aria-label="option 1" />
                <p>abcd</p>
                <TrashOutline
                    color={'#00000'}
                    title={''}
                    height="25px"
                    width="25px"
                />
            </div>
            <div className="d-flex flex-row justify-content-between me-3 ms-3 mt-3 mb-3">
                <Form.Check aria-label="option 1" />
                <p>abcd</p>
                <TrashOutline
                    color={'#00000'}
                    title={''}
                    height="25px"
                    width="25px"
                />
            </div>
        </>
    )
}

export default TodoList