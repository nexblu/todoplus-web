import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';

const ResponsivePlacerholder = (prop) => {
    let {task, setTask} = prop;

    const [placeholder, setPlaceholder] = useState('Write Your New Task');

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 576) {
                setPlaceholder('New Task');
            } else {
                setPlaceholder('Write Your New Task');
            }
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Form.Control type="text" placeholder={placeholder} className='task-input' value={task} onChange={(e) => setTask(e.target.value)}/>
        </>
    )
}

export default ResponsivePlacerholder