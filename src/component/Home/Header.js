import React, {useState} from "react";
import './Header.css';
import {Link, useLocation, useNavigate} from "react-router-dom";

function Header() {
    const [navList, setNavList] = useState(false);
    const isLogin = localStorage.getItem("isLogin");
    const nameAccount = localStorage.getItem("nameAccount");
    const avatarUrl = localStorage.getItem("avatarUrl");
    const idAccount = localStorage.getItem("idAccount");
    const role = localStorage.getItem('role')
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        localStorage.setItem("isLogin", false);
        localStorage.clear();
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
                                    <Link to="/">
                                        <img className="logo"
                                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1olsWkdamjPXXgP-nRHqwpUZbchXSviBzvQ&usqp=CAU"
                                             alt="Logo"/>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" aria-current="page" href="/">Trang Chủ</a>
                                </li>
                                {(role == 'ROLE_ADMIN') && (
                                    <>

                                        <li className="nav-item">
                                            <a className="nav-link" href="/host">Quản lý chủ nhà</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/user">Quản lý khách hàng</a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" href={`/owner/${idAccount}`}>Danh sách nhà của mình
                                            </a>
                                        </li>
                                    </>
                                )}
                                {(role == 'ROLE_ADMIN' || role == 'ROLE_HOST') && (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/owner/${idAccount}`}>Danh sách nhà của mình
                                            </a>
                                        </li>
                                    </>
                                )}
                                {location.pathname.startsWith("/owner") && isLogin && (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/ownerRented/${idAccount}`}>Danh sách nhà đã
                                                cho
                                                thuê</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/ownerMaintenance/${idAccount}`}>Danh sách
                                                nhà đang
                                                bảo trì</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/ownerAvailable/${idAccount}`}>Danh sách nhà
                                                còn
                                                trống</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/postHouse`}>Đăng nhà cho thuê</a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="avatar-container">
                            {isLogin ? (
                                <div className="dropdown">
                                    <div className="user-info" onClick={() => setNavList(!navList)}>
                                        {avatarUrl && <img src={avatarUrl} alt="Avatar" className="avatar" />}
                                        <span className="username">{nameAccount}</span>
                                    </div>
                                    {navList && (
                                        <div className="dropdown-content">
                                            <Link to={`/account/profile2/${idAccount}`}>Thông Tin</Link>
                                            {(role === "ROLE_HOST" ||  role === "ROLE_USER")&& (
                                                <Link to={`/history/${idAccount}`}>Lịch sử thuê nhà</Link>
                                            )}
                                            {(role == 'ROLE_ADMIN' || role == 'ROLE_HOST') && (
                                                <Link to={`/api/host/${idAccount}`}>Lịch đặt thuê nhà</Link>
                                            )}
                                            {role === "ROLE_HOST" && (
                                                <Link to={`/totalIncome`}>Thống kê thu nhập</Link>
                                            )}
                                            <a onClick={logout}>Đăng xuất</a>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-outline-primary me-2">Đăng nhập</Link>
                                    <Link to="/register/user" className="btn btn-outline-success">Đăng Kí thuê nhà</Link>
                                    <Link to="/register/host" className="btn btn-outline-success">Đăng kí làm chủ nhà</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <hr/>
        </div>
    );
}

export default Header;