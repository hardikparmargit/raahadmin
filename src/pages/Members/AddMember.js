import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddMember() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        memberName: "",
        aboutMember: "",
        memberRole: "",
        memberPic: ""
    }); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData((prevData) => ({
            ...prevData,
            memberPic: file
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const response = await axios.post(`${process.env.BACKEND_URL}/addMember`, formData);
            if (response.data.success) {
                toast.success("Member Added Successfully!!", {
                    autoClose: 1500,
                    onClose: () => navigate("/viewMember"),
                });
            } else {
                toast.error("Member Not Added!!", {
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
                                <h5 className="card-title fw-semibold mb-4">Add Member</h5>
                                <form className="row g-3" onSubmit={handleSubmit} enctype="multipart/form-data">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">Member Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="memberName"
                                                value={data.memberName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">Member Role</label>
                                            <select
                                                className="form-control"
                                                name="memberRole"
                                                value={data.memberRole}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Role</option>
                                                <option value="Advisory Committee">Advisory Committee</option>
                                                <option value="Team Member">Team Member</option>
                                                <option value="Thanks">Thanks</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-6">
                                            <div>
                                                <label
                                                    htmlFor="formFile"
                                                    className="form-label mb-0 mt-2"
                                                >
                                                    Event Picture
                                                </label>
                                                <input
                                                    className="form-control "
                                                    type="file"
                                                    id="formFile"
                                                    name="eventPic"
                                                    onChange={handleFileChange}
                                                    required
                                                />

                                            </div>


                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="form-label mb-0 mt-2">About Member</label>
                                            <textarea
                                                type="text"
                                                rows={3}
                                                className="form-control"
                                                name="aboutMember"
                                                value={data.aboutMember}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button type="submit" className="btn btn-primary mt-4">
                                                Add Member
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

export default AddMember;
