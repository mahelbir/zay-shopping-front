import {createBrowserRouter} from "react-router-dom";
import Alert from "./components/Alert.jsx";
import Layout from "./components/Layout.jsx";
import Loadable from "./components/Loadable.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";


const Login = Loadable("pages/auth/login/Login")
const Account = Loadable("pages/auth/account/Account")

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <h1>Home</h1>
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <Login/>
                    },
                    {
                        path: "register",
                        element: <h1>Register</h1>
                    },
                    {
                        path: "account",
                        element: <PrivateRoute><Account/></PrivateRoute>
                    },
                ]
            },
            {
                path: "orders",
                element: <PrivateRoute/>,
                children: [
                    {
                        path: "",
                        element: <h1>Orders</h1>
                    },
                    {
                        path: "new",
                        element: <h1>New Order</h1>
                    }
                ]
            },
            {
                path: "*",
                element: <Alert type="error" className="h5">Page Not Found</Alert>
            }
        ],
        errorElement: <Alert type="error" className="m-5 h5">{import.meta.env.VITE_ERROR}</Alert>
    }
])

export default router