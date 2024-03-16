import {NavLink, Outlet} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";

const Layout = () => {

    const isLoggedIn = useIsAuthenticated()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow">
                <div className="container d-flex justify-content-between align-items-center">
                    <a className="navbar-brand text-success logo h1 align-self-center" href="#">
                        OTS
                    </a>
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
                                    <NavLink className="nav-link" to={"/"}>Home</NavLink>
                                </li>
                                {isLoggedIn() && (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/orders"}>Orders</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="navbar align-self-center d-flex">
                            {isLoggedIn() && (
                                <NavLink className="nav-icon position-relative text-decoration-none"
                                         to={"/auth/account"}>
                                    <i className="fa fa-fw fa-user text-dark mr-3"></i>
                                </NavLink>
                            )}
                            <NavLink className="nav-icon position-relative text-decoration-none" to={"/cart"}>
                                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                                <span
                                    className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container my-5">
                <Outlet/>
            </div>

            <footer className="bg-dark" id="tempaltemo_footer">
                <div className="w-100 bg-black py-3">
                    <div className="container">
                        <div className="row pt-2">
                            <div className="col-12">
                                <p className="text-left text-light">
                                    Copyright &copy; 2024 OTS
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Layout