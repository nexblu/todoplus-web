import { IoExit } from "react-icons/io5";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleRemoveCookie = () => {
        Cookies.remove('access_token');
        navigate('/login')
    };

    return (
        <>
            <IoExit onClick={handleRemoveCookie} />
        </>
    )
}

export default Logout