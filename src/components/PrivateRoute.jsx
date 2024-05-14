import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";

const PrivateRoute = ({fallbackPath = "/auth/login", children}) => {
    const isLoggedIn = useIsAuthenticated()
    const navigate = useNavigate()

    useEffect(() => {
        !isLoggedIn() && navigate(fallbackPath)
    }, [isLoggedIn]);

    if (isLoggedIn()) {
        return children || <Outlet/>
    } else {
        return <></>
    }

}

export default PrivateRoute