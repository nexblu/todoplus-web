import SideBar from "../components/SideBar"
import { Helmet } from "react-helmet";
import icon from '../assets/icon.png'
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="icon" type="image/svg+xml" href={icon} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />
                <style>
                    {
                        `
                            * {
                                font-family: 'Poppins', sans-serif;
                            }
                        `
                    }
                </style>
            </Helmet>
            <div className="flex h-screen">
                <SideBar />
            </div>
            <ToastContainer theme={'dark'} />
        </>
    )
}

export default Dashboard
