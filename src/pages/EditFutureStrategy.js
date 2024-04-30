import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Add quill styles
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditFutureStrategy() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await axios.post(
            `${process.env.BACKEND_URL}/getFutureStrategy`
        );
        setData(response.data.strategy || null);
    };
    useEffect(() => {
        fetchData();
    }, []);


    const handleChange = (value) => {
        if (value === "<p><br></p>") {
            value = ""; // Set to empty string if editor is empty
        }
        setData((prevData) => ({
            ...prevData,
            strategy: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/editFutureStrategy",
                data
            );
            if (response.data.success) {
                toast.success("Future Strategy Edited Successfully!!", {
                    autoClose: 1500,
                    onClose: () => navigate("/"),
                });
            } else {
                toast.error("Future Strategy Not Edited!!", {
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
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
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Edit Future Strategy</h5>
                                <form onSubmit={handleSubmit}>
                                    <ReactQuill
                                        value={data.strategy || ""}
                                        onChange={handleChange}
                                        placeholder="Enter Service Description"
                                        modules={{
                                            toolbar: [
                                                [{ 'list': 'bullet' }],
                                                ['bold', 'italic', 'underline'],
                                                ['link'],
                                                [{ 'color': [] }],
                                                [{ 'align': [] }],// Text color dropdown
                                            ]
                                        }}
                                        formats={[
                                            'header',
                                            'bold', 'italic', 'underline',
                                            'color', // Text color format
                                            'list', 'bullet',
                                            'link',
                                            'align',
                                        ]}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-3"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditFutureStrategy;
