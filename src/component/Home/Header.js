import React, { useEffect, useState } from "react";
import './Header.css';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
    const [navList, setNavList] = useState(false);
    const isLogin = localStorage.getItem("isLogin");
    const nameAccount = localStorage.getItem("nameAccount");
    const idAccount = localStorage.getItem("idAccount");
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    let menuRef
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
                                    <a className="nav-link" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/host"><Link to="/host">Host</Link></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/owner/${idAccount}`}>Danh sách nhà của mình</a>
                                </li>
                                {location.pathname.startsWith("/owner") && isLogin && (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/ownerRented/${idAccount}`}>Danh sách nhà đã cho thuê</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/ownerMaintenance/${idAccount}`}>Danh sách nhà đang bảo trì</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/ownerAvailable/${idAccount}`}>Danh sách nhà còn trống</a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="d-flex align-items-center">
                            {isLogin ? (
                                <div className="dropdown">
                                    <button className="dropbtn">{nameAccount}</button>
                                    <div className="dropdown-content">
                                        <Link to={`/account/profile2/${idAccount}`}>Profile</Link>
                                        <Link to={`/account/profile/${idAccount}`}>Profile</Link>
                                        <Link to={`/detail/${idAccount}`}>Detail profile </Link>
                                        <a onClick={logout}>Logout</a>
                                    </div>
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