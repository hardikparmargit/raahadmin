import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import axios from "axios";

function Home() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/getCounts`);
            setData(response.data.counts || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                    <Header />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="card overflow-hidden hover-zoom shadow">
                                    <div className="card-body p-4 bg-gray">
                                        <h5 className="card-title mb-9 fw-semibold">
                                            Total Events Done
                                        </h5>
                                        <div className="row align-items-center">
                                            <h4 className="fw-semibold mb-3">
                                                {data && data.doneEventCount ? data.doneEventCount : 0}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="card overflow-hidden hover-zoom shadow">
                                    <div className="card-body p-4">
                                        <h5 className="card-title mb-9 fw-semibold">
                                            Total Volunteers
                                        </h5>
                                        <div className="row align-items-center">
                                            <h4 className="fw-semibold mb-3">
                                                {data && data.approvedVolunteerCount ? data.approvedVolunteerCount : 0}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="card overflow-hidden hover-zoom shadow">
                                    <div className="card-body p-4">
                                        <h5 className="card-title mb-9 fw-semibold">
                                            Pending Volunteer Requests
                                        </h5>
                                        <div className="row align-items-center">
                                            <h4 className="fw-semibold mb-3">
                                                {data && data.pendingVolunteerCount ? data.pendingVolunteerCount : 0}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
