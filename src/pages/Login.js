import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
        role: "0",
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
            await axios.post(`${process.env.BACKEND_URL}/login`, data);

            window.location.reload(false);
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
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <p

                                            className="text-nowrap logo-img text-center d-block py-3 w-100 mb-0 text-primary fw-bold" style={{ fontSize: "30px" }}
                                        >
                                            Raah Admin
                                        </p>
                                        <form onSubmit={handleSubmit} >
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleInputEmail1"
                                                    className="form-label"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={data.email}
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="exampleInputPassword1"
                                                    className="form-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={data.password}
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    required
                                                />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-end mb-4">
                                                <a className="text-primary fw-bold" href="./index.html">
                                                    Forgot Password ?
                                                </a>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                                            >
                                                Sign In
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

export default Login;
