import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditContactDetails() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        address: "",
        phone_1: "",
        phone_2: "",
        email_1: "",
        email_2: "",
    });

    const fetchData = async () => {
        const response = await axios.post(`${process.env.BACKEND_URL}/getContactDetail`);
        setData(response.data.contactDetail || null);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/editContactDetail",
                data
            );
            if (response.data.success) {
                toast.success("Contact Detail Edited Successfully!!", {
                    autoClose: 1500,
                    onClose: () => navigate("/"),
                });
            } else {
                toast.error("Contact Detail Not Added!!", {
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

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
                                <h5 className="card-title fw-semibold mb-4">Edit Contact Details</h5>
                                <form
                                    className="row g-3"
                                    onSubmit={handleSubmit}
                                    enctype="multipart/form-data"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">
                                                Phone No 1:
                                            </label>
                                            <input
                                                type="tel"
                                                maxLength={10}
                                                minLength={10}
                                                className="form-control"
                                                name="phone_1"
                                                value={data.phone_1 || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">
                                                Phone No 2:
                                            </label>
                                            <input
                                                type="tel"
                                                maxLength={10}
                                                minLength={10}
                                                className="form-control"
                                                name="phone_2"
                                                value={data.phone_2 || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">
                                                Email 1:
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email_1"
                                                value={data.email_1 || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">
                                                Email 2:
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email_2"
                                                value={data.email_2 || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="form-label mb-0 mt-2">
                                                Address
                                            </label>
                                            <textarea
                                                type="text"
                                                rows={3}
                                                className="form-control"
                                                name="address"
                                                value={data.address || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button type="submit" className="btn btn-primary mt-4">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditContactDetails;
