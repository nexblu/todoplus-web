import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';


const Add = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '60%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);

    const [task, setTask] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className="flex justify-center">
                <button type="button" onClick={handleOpen} className='text-[#F8F9FA] rounded mb-5 mt-3 h-[2rem] bg-[#0B5ED7] w-[55%]'>
                    <p className="font-bold">
                        +
                    </p>
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className='rounded-lg flex justify-center shadow-lg'>
                        <form className="px-5 bg-red-500 w-[90%]">
                            <div className="pb-5">
                                <p className="text-[#F8F9FA] text-[14px] pb-3">Task</p>
                                <input type="text" placeholder="New Task" className="border-0 focus:outline-none rounded w-full px-4 h-[2.4rem]" value={task} onChange={(e) => setTask(e.target.value)} />
                            </div>
                            <button type="submit" className='text-[#F8F9FA] rounded mb-5 mt-3 h-[2rem] w-[8rem] bg-[#0B5ED7] flex items-center justify-center mx-auto'>Submit</button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default Add