import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';

function ViewMediaImages() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/getMedia`);
            const data = response.data;
            setData(data.media || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (mediaId) => {
        try {
            await axios.post(`${process.env.BACKEND_URL}/deleteMedia`, {
                mediaId,
            });
            toast.success("Media Deleted Successfully!!", {
                autoClose: 1500,
                onClose: () => fetchData(),
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    const confirmDelete = (mediaId) => {
        const deleteToastId = toast(
            <div>
                <p>Are you sure you want to delete this Image?</p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        toast.dismiss(deleteToastId); // Dismiss the confirmation toast
                        handleDelete(mediaId); // Handle delete operation
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
                        <Link to={"/addMediaImages"} className="btn btn-primary mb-3"> Add Media</Link>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                            {loading ? (
                                <p>Loading...</p>
                            ) : data.length === 0 ? (
                                <p>No media found</p>
                            ) : (
                                data.map((media, index) => (
                                    <div key={media._id}>
                                        <div
                                            className="card shadow"
                                            key={index}
                                        >
                                            <img
                                                style={{ height: "200px", objectFit: "cover" }}
                                                className="card-img-top img-fluid"
                                                src={`http://localhost:8000/images/mediaPics/${media.mediaImage}`}
                                                alt={media.mediaImage}
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <p className="card-text">{media.mediaCaption}</p>
                                                <div className="row justify-content-center gap-1">
                                                    <Link
                                                        to={"/editMediaImages"}
                                                        state={media}
                                                        className="btn btn-primary me-2"
                                                        style={{ width: "100px" }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <br />
                                                    <Link
                                                        onClick={() => confirmDelete(media._id)}
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
    )
}

export default ViewMediaImages