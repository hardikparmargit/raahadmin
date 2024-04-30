import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ViewVolunteerDetail() {
    const [volunteer, setVolunteer] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const reqId = location.pathname.split("/")[2];
    console.log(reqId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${process.env.BACKEND_URL}/getVolunteerDetailById`, {
                    reqId: reqId,
                })
                setVolunteer(response.data.volunteer || null);
                console.log(response.data.volunteer);
            } catch (error) {
                console.error("Error fetching data:", error);
                setVolunteer(null);
            }
        };

        fetchData();

    }, [reqId]);

    const approveRequest = async (status) => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/approveVolunteerRequest`, {
                reqId,
                status
            });

            console.log(response);

            toast.success(response.data.message, {
                autoClose: (1500),
                onClose: () => navigate("/viewVolunteers"),
            })



        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                autoClose: (1500),
            })
        }
    }
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
                        <section>
                            <div className="container pb-5">
                                {volunteer ? (<div className="row">
                                    <div className="col-lg-4">
                                        <div className="card mb-4 shadow">
                                            <div className="card-body text-center">
                                                <img
                                                    src={`http://localhost:8000/images/profilePics/${volunteer.profilePic}`}
                                                    alt="avatar"
                                                    className="rounded-circle img-fluid"
                                                    style={{ width: 150, height: 150 }}
                                                />
                                                {/* <h5 className="my-3">{volunteer.name}</h5> */}
                                                <br />
                                                <br />
                                                <p className="text-muted mb-1"><i className="fa fa-calendar" /> {volunteer.city}</p>
                                                <p className="text-muted mb-4">
                                                    <i className="fa fa-map-marker-alt me-2"></i>   {volunteer.state}
                                                </p>
                                                {
                                                    volunteer.status === "Pending" ? (
                                                        <div className="d-flex justify-content-center mb-2 gap-3">
                                                            <button type="button" className="btn btn-primary" onClick={() => approveRequest("approved")}>
                                                                Accept
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger ms-1"
                                                                onClick={() => approveRequest("rejected")}
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card mb-4 shadow">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">UID</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{volunteer._id}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Full Name</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{volunteer.name}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Gender</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{volunteer.gender}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Email</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">
                                                            {volunteer.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Mobile</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{volunteer.phoneNo}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Address</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">
                                                            {volunteer.address}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>) : (<div className="h3 text-center">No volunteer found</div>)
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewVolunteerDetail;
