import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("");

    const handleSidebar = () => {
        document.getElementById('main-wrapper').setAttribute('data-sidebartype', 'full');
        document.getElementById('main-wrapper').classList.remove('show-sidebar');
        document.getElementById('main-wrapper').classList.add('mini-sidebar');

    }

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setActiveItem("Home");
                break;
            case "/gallery":
                setActiveItem("Gallery");
                break;
            case "/addEvent":
                setActiveItem("Add Event");
                break;
            case "/viewEvents":
                setActiveItem("View Event");
                break;
            case "/editEvent":
                setActiveItem("Edit Event");
                break;
            case "/addVolunteer":
                setActiveItem("Add Volunteer");
                break;
            case "/viewVolunteers":
                setActiveItem("View Volunteer");
                break;
            case "/viewContactUs":
                setActiveItem("View Contact Us");
                break;
            case "/viewFeedback":
                setActiveItem("View Feedback");
                break;

            case "/addService":
                setActiveItem("Add Service");
                break;

            case "/viewServices":
                setActiveItem("View Services");
                break;

            case "/addMember":
                setActiveItem("Add Member");
                break;

            case "/viewMember":
                setActiveItem("View Member");
                break;

            default:
                setActiveItem("");
                break;
        }
    }, [location.pathname]);
    return (
        <>
            <aside className="left-sidebar shadow-lg">
                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between">
                        <Link to={"/"} className="text-nowrap logo-img" style={{ textDecoration: "none" }}>
                            <p className="mb-0 h2 text-primary" >Raah Admin</p>
                        </Link>
                        <div
                            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                            id="sidebarCollapse"
                        >
                            <i className="ti ti-x fs-8" onClick={handleSidebar} />
                        </div>
                    </div>
                    <nav className="sidebar-nav scroll-sidebar" data-simplebar>
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                <span className="hide-menu">Home</span>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "Home" ? "active" : ""
                                        }`}
                                    to={"/"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-layout-dashboard" />
                                    </span>
                                    <span className="hide-menu">Dashboard</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "Gallery" ? "active" : ""
                                        }`}
                                    to={"/gallery"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-layout-dashboard" />
                                    </span>
                                    <span className="hide-menu">Gallery</span>
                                </Link>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                <span className="hide-menu">EVENTS</span>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "View Event" ? "active" : ""
                                        }`}
                                    to={"/viewEvents"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-article" />
                                    </span>
                                    <span className="hide-menu">VIEW EVENTS</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "Add Event" ? "active" : ""
                                        }`}
                                    to={"/addEvent"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-alert-circle" />
                                    </span>
                                    <span className="hide-menu">ADD EVENT</span>
                                </Link>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                <span className="hide-menu">VOLUNTEERS</span>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "View Volunteer" ? "active" : ""
                                        }`}
                                    to={"/viewVolunteers"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-login" />
                                    </span>
                                    <span className="hide-menu">VIEW VOLUNTEERS</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "Add Volunteer" ? "active" : ""
                                        }`}
                                    to={"/addVolunteer"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-user-plus" />
                                    </span>
                                    <span className="hide-menu">ADD VOLUNTEER</span>
                                </Link>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                <span className="hide-menu">SERVICES</span>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "View Services" ? "active" : ""
                                        }`}
                                    to={"/viewServices"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-login" />
                                    </span>
                                    <span className="hide-menu">VIEW SERVICES</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "Add Service" ? "active" : ""
                                        }`}
                                    to={"/addService"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-user-plus" />
                                    </span>
                                    <span className="hide-menu">ADD SERVICE</span>
                                </Link>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                <span className="hide-menu">MEMBERS</span>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "View Member" ? "active" : ""
                                        }`}
                                    to={"/viewMember"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-login" />
                                    </span>
                                    <span className="hide-menu">VIEW MEMBERS</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link
                                    className={`sidebar-link ${activeItem === "Add Member" ? "active" : ""
                                        }`}
                                    to={"/addMember"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-user-plus" />
                                    </span>
                                    <span className="hide-menu">ADD MEMBER</span>
                                </Link>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                <span className="hide-menu">QUERIES</span>
                            </li>
                            <li className="sidebar-item ">
                                <Link
                                    className={`sidebar-link ${activeItem === "View Contact Us" ? "active" : ""
                                        }`}
                                    to={"/viewContactUs"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-mood-happy" />
                                    </span>
                                    <span className="hide-menu">CONTACT US</span>
                                </Link>
                            </li>
                            <li className="sidebar-item ">
                                <Link
                                    className={`sidebar-link ${activeItem === "View Feedback" ? "active" : ""
                                        }`}
                                    to={"/viewFeedback"}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-aperture" />
                                    </span>
                                    <span className="hide-menu">FEEDBACK</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
