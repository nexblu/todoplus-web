import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { jwtVerify } from 'jose';
import Cookies from 'js-cookie';

const verifyToken = async (accessToken, refreshToken) => {
  try {
    const { payload: payloadAccessToken } = await jwtVerify(accessToken, new TextEncoder().encode('D3V1N4634824ATKTP'));
    const { payload: payloadRefreshToken } = await jwtVerify(refreshToken, new TextEncoder().encode('D3V1N4634824ATKTP'));
    const now = Date.now() / 1000;
    return payloadAccessToken.exp > now && payloadRefreshToken.exp > now;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

const refreshTokenAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/todoplus/v1/user/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: Cookies.get('refresh_token') })
    });

    const resp = await response.json();

    if (resp.status_code === 201) {
      Cookies.set('access_token', resp.data.token.access_token);
      return { refreshed: true };
    } else {
      return { refreshed: false };
    }
  } catch (error) {
    return { refreshed: false };
  }
};

const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      const refreshToken = Cookies.get('refresh_token');

      if (!accessToken || !refreshToken) {
        setAuth(false);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        return;
      }

      const isValid = await verifyToken(accessToken, refreshToken);

      if (isValid) {
        setAuth(true);
      } else {
        const refreshTokenResult = await refreshTokenAPI();

        if (refreshTokenResult.refreshed) {
          setAuth(true);
        } else {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          setAuth(false);
        }
      }
    };

    checkAuth();
  }, []);

  return auth;
};

const PrivateRoute = (prop) => {
  let {element} = prop
  const auth = useAuth();

  if (auth === null) {
    return null;
  }

  return auth ? element : <Navigate to="/" />;
};

const App = () => {
  const auth = useAuth();

  if (auth === null) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/dashboard/*' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
