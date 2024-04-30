import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function EditMediaImages() {
    const navigate = useNavigate();
    const location = useLocation();
    const { _id, mediaImage, mediaCaption } = location.state;
    const [data, setData] = useState({
        mediaId: _id,
        mediaImage: mediaImage,
        mediaCaption: mediaCaption,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData((prevData) => ({
            ...prevData,
            mediaImage: file,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const response = await axios.post(
                `${process.env.BACKEND_URL}/editMedia`,
                formData
            );
            if (response.data.success) {
                toast.success("Image Edited Successfully!!", {
                    autoClose: 1500,
                    onClose: () => navigate("/gallery"),
                });
            } else {
                toast.error("Image Not Edited!!", {
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
                                <h5 className="card-title fw-semibold mb-4">Add Media Image</h5>
                                <form
                                    className="row g-3"
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">Image Caption</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="mediaCaption"
                                                value={data.mediaCaption}
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
                                                    Upload Image
                                                </label>
                                                <input
                                                    className="form-control "
                                                    type="file"
                                                    id="formFile"
                                                    name="mediaImage"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button
                                            type="submit"
                                            className="btn btn-primary mt-4 w-25 mx-auto"
                                        >
                                            Edit Image
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

export default EditMediaImages;
