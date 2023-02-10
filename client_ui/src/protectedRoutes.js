import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { loginStatus } from './redux/selectors'
import SinginPage from './pages/SigninPage'

const ProtectedRoutes = () => {
    const status = useSelector(loginStatus)
    return status ? <Outlet /> : <SinginPage />
}

export default ProtectedRoutes