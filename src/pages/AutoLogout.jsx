import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Modal, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AlertComponent = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const accessToken = Cookies.get('access_token');
            const decodedToken = jwtDecode(accessToken);
            setUser(decodedToken);
        } catch (error) {
            // error handling
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const accessToken = Cookies.get('access_token');
            if (accessToken) {
                setShowAlert(true);
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    const userLogin = async (username, password) => {
        const response = await fetch(`https://web-production-56f81.up.railway.app/todoplus/v1/login/${username}/${password}`);
        const data = await response.json();
        return data;
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const result = await userLogin(user.username, user.password)
        if (result['status_code'] === 200) {
            setShowAlert(false);
            Cookies.set('access_token', result['result']['token']);
        }
    }

    const onLogout = async (e) => {
        e.preventDefault();
        try {
            Cookies.remove('access_token');
            navigate('/login')
        } catch (error) {
            // error handling
        }
    }

    const showModal = () => {
        if (showAlert) {
            return (
                <>
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <Modal.Dialog>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Modal body text goes here.</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={onLogin}>Stay</Button>
                                <Button variant="primary" onClick={onLogout}>Logout</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </>
            ) // Mengubah bagian ini agar fungsi showModal mengembalikan elemen JSX
        }
    }

    return (
        <div>
            {showModal()} {/* Memanggil fungsi showModal di dalam JSX */}
        </div>
    );
};

export default AlertComponent;
