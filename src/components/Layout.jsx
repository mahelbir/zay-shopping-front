import {NavLink, Outlet} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import {Helmet} from "react-helmet-async";

const Layout = () => {

    const isLoggedIn = useIsAuthenticated()

    return (
        <>
            <Helmet>
                <title>{ import.meta.env.VITE_NAME }</title>
            </Helmet>
            <div className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-lg navbar-light shadow">
                    <div className="container d-flex justify-content-between align-items-center">
                        <NavLink className="navbar-brand text-success logo h1 align-self-center" to="/">
                            { import.meta.env.VITE_NAME }
                        </NavLink>
                        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                                data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
                            id="templatemo_main_nav">
                            <div className="flex-fill">
                                <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/"}>Products</NavLink>
                                    </li>
                                    {isLoggedIn() && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to={"/orders"}>Orders</NavLink>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="navbar align-self-center d-flex">
                                {isLoggedIn() ? (
                                    <NavLink className="nav-icon position-relative text-decoration-none"
                                             to={"/account"}>
                                        <i className="fa fa-fw fa-user text-dark mr-3"></i>
                                    </NavLink>
                                ) : (
                                    <NavLink className="nav-icon position-relative text-decoration-none"
                                             to={"/auth/login"}>
                                        <i className="fa fa-fw fa-sign-in-alt text-dark mr-3"></i>
                                    </NavLink>
                                )}
                                <NavLink className="nav-icon position-relative text-decoration-none" to={"/cart"}>
                                    <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container my-5">
                    <Outlet/>
                </div>

                <footer className="bg-dark text-lg-start text-light mt-auto">
                    <div className="container p-2 text-center">
                        <span>Copyright &copy; 2024 { import.meta.env.VITE_NAME }</span>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Layout