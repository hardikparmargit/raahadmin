import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Add quill styles

function AddService() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        serviceName: "",
        serviceDescription: "",
        serviceOutcome: "",
        servicePic: "",
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
        if (!data.serviceDescription.trim()) {

            toast.error("Service Description cannot be empty!", {
                autoClose: 1500,
            });
            return;
        }
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const response = await axios.post(
                `${process.env.BACKEND_URL}/addService`,
                formData
            );
            if (response.data.success) {
                toast.success("Service Added Successfully!!", {
                    autoClose: 1500,
                    onClose: () => navigate("/viewServices"),
                });
            } else {
                toast.error("Service Not Added!!", {
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
                                <h5 className="card-title fw-semibold mb-4">Add Service</h5>
                                <form
                                    className="row g-3"
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
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
                                            Add Service
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

export default AddService;
