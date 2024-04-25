import React, { useEffect, useState } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [navList, setNavList] = useState(false)
    const isLogin = localStorage.getItem("isLogin");
    const nameAccount = localStorage.getItem("nameAccount");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("isLogin", false);
        localStorage.clear();
        // Sau khi đăng xuất, chuyển hướng về trang đăng nhập
        navigate("/login");
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body">
                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-target="#navbarExample01"
                            aria-controls="navbarExample01"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarExample01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item active">
                                    <a className="nav-link" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/host"><Link to="/host">Host</Link></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center">
                            {isLogin ? (
                                <div>
                                    <span className="me-2">{nameAccount}</span>
                                    <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-outline-primary me-2">Đăng nhập</Link>
                                    <Link to="/register/user" className="btn btn-outline-success">Đăng Kí thuê nhà </Link>
                                    <Link to="/register/host" className="btn btn-outline-success">Đăng kí làm chủ nhà</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;