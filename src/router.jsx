import {createBrowserRouter} from "react-router-dom";
import Alert from "./components/Alert.jsx";
import Layout from "./components/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Product from "./pages/products/Product.jsx";
import Account from "./pages/account/Account.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Login from "./pages/auth/login/Login.jsx";
import ProductList from "./pages/products/ProductList.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <ProductList/>
            },
            {
                path: "/",
                element: <PrivateRoute/>,
                children: [
                    {
                        path: "cart",
                        element: <h1>Cart</h1>
                    },
                    {
                        path: "account",
                        element: <Account/>
                    },
                    {
                        path: "orders",
                        children: [
                            {
                                path: "",
                                element: <Orders/>
                            },
                            {
                                path: "new",
                                element: <h1>New Order</h1>
                            }
                        ]
                    },
                    {
                        path: "products",
                        children: [
                            {
                                path: "list",
                                element: <ProductList/>
                            },
                            {
                                path: ":productId",
                                element: <Product/>
                            }
                        ]
                    }
                ]
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