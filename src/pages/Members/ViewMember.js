import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ViewMember() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/getMembers`);
            const data = response.data;
            setData(data.members || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (memberId) => {
        try {
            await axios.post(`${process.env.BACKEND_URL}/deleteMember`, {
                memberId,
            });
            toast.success("Member Deleted Successfully!!", {
                autoClose: 1500,
                onClose: () => fetchMembers(),
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    const confirmDelete = (memberId) => {
        const deleteToastId = toast(
            <div>
                <p>Are you sure you want to delete this Member?</p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        toast.dismiss(deleteToastId); // Dismiss the confirmation toast
                        handleDelete(memberId); // Handle delete operation
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
                                <p>No members found</p>
                            ) : (
                                data.map((member, index) => (
                                    <div key={member._id}>
                                        <div
                                            className="card shadow"
                                            key={index}
                                        >
                                            <img
                                                style={{ height: "200px", objectFit: "cover" }}
                                                className="card-img-top img-fluid"
                                                src={`http://localhost:8000/images/memberPics/${member.memberPic}`}
                                                alt={member.memberName}
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{member.memberName}</h5>
                                                <p className="card-text">{member.aboutMember}</p>
                                                <hr className="bg-secondary" />
                                                <p className="card-text">
                                                    {member.memberRole}
                                                </p>
                                                <div className="row justify-content-center gap-1">
                                                    <Link
                                                        to={"/editMember"}
                                                        state={member}
                                                        className="btn btn-primary me-2"
                                                        style={{ width: "100px" }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <br />
                                                    <Link
                                                        onClick={() => confirmDelete(member._id)}
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

export default ViewMember;
