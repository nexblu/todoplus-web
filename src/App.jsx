import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <>
      <Routers>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-reset-password' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Routers>
    </>
  )
}

export default App
