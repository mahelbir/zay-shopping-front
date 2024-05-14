import {createBrowserRouter} from "react-router-dom";
import Alert from "./components/Alert.jsx";
import Layout from "./components/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Account from "./pages/account/Account.jsx";
import Login from "./pages/auth/login/Login.jsx";
import Products from "./pages/products/Products.jsx";
import Product from "./pages/product/Product.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Order from "./pages/order/Order.jsx";
import Register from "./pages/auth/register/Register.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Products/>
            },
            {
                path: "/products",
                element: <Products/>
            },
            {
                path: "/product/:productId",
                element: <Product/>
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
                        element: <Register/>
                    }
                ]
            },
            {
                path: "/",
                element: <PrivateRoute/>,
                children: [
                    {
                        path: "account",
                        element: <Account/>
                    },
                    {
                        path: "cart",
                        element: <Cart/>
                    },
                    {
                        path: "orders",
                        element: <Orders/>
                    },
                    {
                        path: "order/:orderId",
                        element: <Order/>
                    },
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