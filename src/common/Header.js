import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function Header() {
    const handleSidebar = () => {
        document.getElementById('main-wrapper').setAttribute('data-sidebartype', 'mini-sidebar');
        document.getElementById('main-wrapper').classList.add('show-sidebar');
        document.getElementById('main-wrapper').classList.remove('mini-sidebar');

    }

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.BACKEND_URL}/logout`);
            toast.success('Logout Successful', {
                autoClose: 1500,
                onClose: () => window.location.reload(false),
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <header className="app-header">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item d-block d-xl-none">
                            <Link className="nav-link sidebartoggler nav-icon-hover" onClick={handleSidebar} id="headerCollapse" >
                                <i className="ti ti-menu-2" />
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link nav-icon-hover" >
                                <i className="ti ti-bell-ringing" />
                                <div className="notification bg-primary rounded-circle" />
                            </Link>
                        </li> */}
                    </ul>
                    <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">

                            <li className="nav-item dropdown">
                                <Link className="nav-link nav-icon-hover" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="../assets/images/profile/user-1.jpg" alt='' width={35} height={35} className="rounded-circle" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                    <div className="message-body px-2">
                                        <Link to={"/editFutureStrategy"} className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="ti ti-user fs-6" />
                                            <p className="mb-0 fs-3">Edit Future Strategy</p>
                                        </Link>
                                        <Link to={"/editContactDetail"} className="d-flex align-items-center gap-2 dropdown-item ">
                                            <i className="ti ti-mail fs-6" />
                                            <p className="mb-0 fs-3">Edit Contact Detail</p>
                                        </Link>
                                        <Link to={"/editProfile"} className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="ti ti-lock fs-6"></i>
                                            <p className="mb-0 fs-3">Edit Credentials</p>
                                        </Link>
                                        <Link onClick={handleLogout} className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header