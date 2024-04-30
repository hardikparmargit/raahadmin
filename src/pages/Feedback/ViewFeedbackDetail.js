import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { useLocation } from "react-router-dom";

function ViewFeedbackDetail() {
    const location = useLocation();
    const [data] = useState({
        username: location.state?.username || "",
        email: location.state?.email || "",
        phone: location.state?.phone || "",
        subject: location.state?.subject || "",
        message: location.state?.message || "",
        date: location.state?.date || "",
    });
    return (
        <>
            <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            >
                <Sidebar />
                <div className="body-wrapper">
                    {/*  Header Start */}
                    <Header />
                    {/*  Header End */}
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">View Feedback Detail</h5>
                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            value={data.username}
                                            className="form-control"
                                            id="name"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            className="form-control"
                                            id="email"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            className="form-control"
                                            id="phone"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="text"
                                            value={new Date(data.date).toLocaleString()}
                                            className="form-control"
                                            id="date"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="date">Subject</label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        className="form-control"
                                        id="date"
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        className="form-control textarea-contact"
                                        defaultValue={data.message}
                                        id="message"
                                        placeholder="Type Your Message/Feedback here..."
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewFeedbackDetail;
