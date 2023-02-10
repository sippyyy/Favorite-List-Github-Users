import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SinginPage from './pages/SigninPage';
import ProtectedRoutes from './protectedRoutes';

function Views() {

    return (
        <Routes>
            <Route path='/signin' element={<SinginPage />} />
            <Route element={<ProtectedRoutes />}>
                {/* Private Routes is wrapped by another big Route to control routes by rule from Protected Routed Element */}
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Home />} />
            </Route>
        </Routes>
    );
}

export default Views;