import icon from '../assets/icon.png'
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import Task from '../pages/Task';
import Account from '../pages/Account';
import AddTask from '../pages/AddTask';
import History from '../pages/History';
import { BiSolidExit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import TodoListBookmark from '../pages/TodoListBookmark';
import { useMediaQuery } from 'react-responsive';
import avatar from '../assets/default_avatar.webp'

const SideBar = () => {
    const navigate = useNavigate()

    const [token, setToken] = useState('');

    const [open, setOpen] = useState(false)

    const [content, setContent] = useState('')

    const [page, setPage] = useState('')

    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            setToken(accessToken)
        }
    }, [setToken]);

    useEffect(() => {
        setContent(<Account />)
    }, [setContent]);

    const getUsername = () => {
        if (token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.username;
        }
        return 'Unknown';
    };

    const getEmail = () => {
        if (token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.email;
        }
        return 'Unknown';
    };

    const onDropDown = () => {
        setOpen(!open)
    }

    const setTask = () => {
        setContent(<Task />)
        setPage('Task')
    }

    const setAddTask = () => {
        setContent(<AddTask />)
        setPage('AddTask')
    }

    const setHistory = () => {
        setContent(<History />)
        setPage('History')
    }

    const setBookmark = () => {
        setContent(<TodoListBookmark />)
        setPage('Bookmark')
    }

    const setAccount = () => {
        setContent(<Account />)
        setPage('Account')
    }

    const onLogout = () => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            Cookies.remove('access_token');
            navigate('/login');
        }
    }

    return (
        <>
            {isMobile ? '' : <>
                <div className="max-h-screen w-[280px] bg-gray-800 text-white overflow-y-auto overflow-x-hidden">
                    <div className="p-4">
                        <div className="flex items-center">
                            <img src={icon} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                            <h1 className="text-xl font-bold">todoplus</h1>
                        </div>
                    </div>
                    <hr className='me-3 ms-3' />
                    <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#68A4F1]">
                        <FaClipboardList />
                        <div className="flex justify-between w-full items-center" onClick={onDropDown}>
                            <span className="text-[15px] ml-4 text-gray-200">Todo</span>
                            <span className="text-sm rotate-180" id="arrow">
                                {open ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </span>
                        </div>
                    </div>
                    {open ? <div className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto" id="submenu">
                        <span>
                            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1" onClick={page === 'Task' ? null : setTask}>Task</h1>
                        </span>
                        <span>
                            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1" onClick={page === 'Bookmark' ? null : setBookmark}>Bookmarks</h1>
                        </span>
                        <span>
                            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1" onClick={page === 'AddTask' ? null : setAddTask}>Add Task</h1>
                        </span>
                        <span>
                            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1" onClick={page === 'History' ? null : setHistory}>History</h1>
                        </span>
                    </div> : ''}
                    <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#68A4F1]">
                        <span className="flex items-center w-full">
                            <CgProfile onClick={page === 'Account' ? null : setAccount} />
                            <p className="text-[15px] ml-4 text-gray-200" onClick={page === 'Account' ? null : setAccount}>Account</p>
                        </span>
                    </div>
                    <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#68A4F1]">
                        <span className="flex items-center w-full">
                            <SlCalender />
                            <p className="text-[15px] ml-4 text-gray-200">Calender</p>
                        </span>
                    </div>
                    <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#68A4F1]">
                        <IoLogOut />
                        <span className="text-[15px] ml-4 text-gray-200" onClick={onLogout}>Logout</span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 w-full max-w-[280px] bg-[#374151] rounded-lg">
                        <div className="flex items-center">
                            <img src={avatar} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                            <div>
                                <h1 className="text-[10px] font-semi-bold">{getUsername()}</h1>
                                <h1 className="text-[10px] font-semi-bold">{getEmail()}</h1>
                            </div>
                            <div className='bg-[#0B5ED7] ms-auto rounded'>
                                <BiSolidExit className='text-[20px] m-1 cursor-pointer' onClick={onLogout} />
                            </div>
                        </div>
                    </div>
                </div>
                {content}
            </>}
        </>
    )
}

export default SideBar
