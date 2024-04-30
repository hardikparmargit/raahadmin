import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ViewService() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchService = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/getService`);
            const data = response.data;
            setData(data.services || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchService();
    }, []);

    const handleDelete = async (serviceId) => {
        try {
            await axios.post(`${process.env.BACKEND_URL}/deleteService`, {
                serviceId,
            });
            toast.success("Service Deleted Successfully!!", {
                autoClose: 1500,
                onClose: () => fetchService(),
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    const confirmDelete = (serviceId) => {
        const deleteToastId = toast(
            <div>
                <p>Are you sure you want to delete this Service?</p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        toast.dismiss(deleteToastId); // Dismiss the confirmation toast
                        handleDelete(serviceId); // Handle delete operation
                    }}
                >
                    Confirm
                </button>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={() => toast.dismiss(deleteToastId)}
                >
                    Cancel
                </button>
            </div>,
            { autoClose: false, closeButton: false, position: "top-center" }
        );
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
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                            {loading ? (
                                <p>Loading...</p>
                            ) : data.length === 0 ? (
                                <p>No Service found</p>
                            ) : (
                                data.map((service, index) => (
                                    <div key={service._id}>
                                        <div
                                            className="card shadow"
                                            key={index}
                                        >
                                            <img 
                                                style={{ height: "200px", objectFit: "cover" }}
                                                className="card-img-top img-fluid"
                                                src={`http://localhost:8000/images/servicePics/${service.servicePic}`}
                                                alt={service.serviceName}
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{service.serviceName}</h5>
                                                <div className="row justify-content-center gap-1">
                                                    <Link
                                                        to={"/editService"}
                                                        state={service}
                                                        className="btn btn-primary me-2"
                                                        style={{ width: "100px" }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <br />
                                                    <Link
                                                        onClick={() => confirmDelete(service._id)}
                                                        className="btn btn-danger me-2"
                                                        style={{ width: "100px" }}
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewService;
