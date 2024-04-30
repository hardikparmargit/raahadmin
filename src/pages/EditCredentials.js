import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import axios from "axios";
import { toast } from "react-toastify";

function EditCredentials() {
    const [data, setData] = useState({
        oldEmail: "",
        newEmail: "",
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${process.env.BACKEND_URL}/editCredentials`, data);
            toast.success("Credentials Edited Successfully", {
                autoClose: 1500,
                onClose: () => handleLogout(),
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout');
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div
                className="page-wrapper "
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
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title fw-semibold mb-4">Edit Credentials</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleInputEmail1"
                                                    className="form-label"
                                                >
                                                    Old Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="oldEmail"
                                                    onChange={handleChange}
                                                    value={data.oldEmail}
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleInputEmail2"
                                                    className="form-label"
                                                >
                                                    New Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="newEmail"
                                                    onChange={handleChange}
                                                    value={data.newEmail}
                                                    className="form-control"
                                                    id="exampleInputEmail2"
                                                    aria-describedby="emailHelp"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="exampleInputPassword1"
                                                    className="form-label"
                                                >
                                                    Old Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="oldPassword"
                                                    onChange={handleChange}
                                                    value={data.oldPassword}
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="exampleInputPassword2"
                                                    className="form-label"
                                                >
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    onChange={handleChange}
                                                    value={data.newPassword}
                                                    className="form-control"
                                                    id="exampleInputPassword2"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                                            >
                                                Update
                                            </button>

                                        </form>
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

export default EditCredentials;
