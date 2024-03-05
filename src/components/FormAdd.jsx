import { Button } from 'react-bootstrap'
import { FaPlus } from "react-icons/fa";
import ResponsivePlacerholder from './ResponsivePlaceholder';

const FormAdd = () => {
    return (
        <>
            <div className="d-flex justify-content-between mb-2 task-area">
                <div className="pe-2 ps-2 pt-3 area-input border mx-auto">
                    <ResponsivePlacerholder />
                </div>
                <div className="pe-2 ps-2 mx-auto">
                    <div className="border rounded-circle btn-add-task pt-2">
                        <FaPlus />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row mb-3">
                <div className="p-2">
                    <Button variant="primary" className='btn-576'>Primary</Button>{' '}
                </div>
            </div>
        </>
    )
}

export default FormAdd