import { Helmet } from "react-helmet";
import icon from '../assets/icon.png'
import IconTodoPlus from "../assets/icon-text.png";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import avatar from '../assets/default_avatar.webp'

const Account = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUser({
                username: decodedToken.username,
                email: decodedToken.email,
                password: decodedToken.password,
                is_active: decodedToken.is_active
            })
        }
    }, [setUser]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="icon" type="image/svg+xml" href={icon} />
            </Helmet>
            <div className="flex-grow p-8 bg-[#171823] flex flex-col items-center justify-center relative">
                <section className="thumbnail-account rounded-t-lg shadow-lg bg-[#1F2937] flex items-center justify-center h-[8rem] w-[50%]">
                    <div className="rounded-t-lg rounded-b-lg bg-[#0B5ED7] flex justify-center items-center w-full h-full">
                        <img src={IconTodoPlus} alt="todoplus" className='h-[100px] w-[100px] mx-auto' />
                    </div>
                </section>
                <div className="content-account rounded-b-lg border bg-[#1F2937] border-none w-[50%] relative">
                    <img src={avatar} alt="todoplus" className='h-[90px] w-[90px] mx-auto rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 right-0' style={{ top: 'calc(50% - 5rem)', float: 'right', marginLeft: '10px'}} />
                    <div className="ms-3 mt-[4.8rem] text-left text-white" >
                        <h1 className="font-bold">USERNAME</h1>
                    </div>
                    <div className="ms-3 mb-3 text-left text-white">
                        <p className="text-[15px]">{user.username}</p>
                    </div>
                    <div className="ms-3 mt-3 text-left text-white">
                        <h1 className="font-bold">EMAIL</h1>
                    </div>
                    <div className="ms-3 mb-3 text-left text-white">
                        <p className="text-[15px]">{user.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account
