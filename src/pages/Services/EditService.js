import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Add quill styles

function EditService() {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({
        serviceId: location.state._id,
        serviceName: location.state.serviceName,
        serviceDescription: location.state.serviceDescription,
        serviceOutcome: location.state.serviceOutcome,
        servicePic: location.state.servicePic,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOutcomeChange = (value) => {
        if (value === "<p><br></p>") {
            value = ""; // Set to empty string if editor is empty
        }
        setData((prevData) => ({
            ...prevData,
            serviceOutcome: value
        }));
    };

    const handleDescriptionChange = (value) => {
        if (value === "<p><br></p>") {
            value = ""; // Set to empty string if editor is empty
        }
        setData((prevData) => ({
            ...prevData,
            serviceDescription: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData((prevData) => ({
            ...prevData,
            servicePic: file,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(data);
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const response = await axios.post(
                `${process.env.BACKEND_URL}/editService`,
                formData
            );
            if (response.data.success) {
                toast.success("Service Edited Successfully!!", {
                    autoClose: 1500,
                    onClose: () => navigate("/viewServices"),
                });
            } else {
                toast.error("Service Not Edited!!", {
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
                        <div className="card overflow-hidden shadow">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Edit Service</h5>
                                <form
                                    className="row g-3"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">Service Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="serviceName"
                                                value={data.serviceName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div>
                                                <label
                                                    htmlFor="formFile"
                                                    className="form-label mb-0 mt-2"
                                                >
                                                    Service Picture
                                                </label>
                                                <input
                                                    className="form-control "
                                                    type="file"
                                                    id="formFile"
                                                    name="servicePic"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="form-label mb-0 mt-2">
                                                Service Description
                                            </label>
                                            <ReactQuill
                                                value={data.serviceDescription}
                                                onChange={handleDescriptionChange}
                                                placeholder="Enter Service Description"
                                                modules={{
                                                    toolbar: [

                                                        [{ 'list': 'bullet' }],
                                                        ['bold', 'italic', 'underline'],
                                                        ['link']
                                                    ]
                                                }}
                                                formats={[
                                                    'header',
                                                    'font',
                                                    'bold', 'italic', 'underline',
                                                    'list', 'bullet',
                                                    'link'
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="form-label mb-0 mt-2">
                                                Service Outcome
                                            </label>
                                            <ReactQuill
                                                value={data.serviceOutcome}
                                                onChange={handleOutcomeChange}
                                                placeholder="Enter Service Outcome"
                                                modules={{
                                                    toolbar: [
                                                        [{ 'list': 'bullet' }],
                                                        ['bold', 'italic', 'underline'],
                                                        ['link']
                                                    ]
                                                }}
                                                formats={[
                                                    'header',
                                                    'font',
                                                    'bold', 'italic', 'underline',
                                                    'list', 'bullet',
                                                    'link'
                                                ]}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary mt-4 w-25 mx-auto"
                                        >
                                            Edit Service
                                        </button>
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

export default EditService;
