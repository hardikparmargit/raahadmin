import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../DatatableStyles";
import axios from "axios";
import { Link } from "react-router-dom";

function AddVolunteer() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/getVolunteerRequest`);
            setData(response.data.requests.reverse());
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchData();

        // Refresh data every 1 second
        // const interval = setInterval(fetchData, 5000);

        // // Clear interval on component unmount
        // return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    const columns = [{
        name: "Sr. No.",
        selector: (row, index) => index + 1,
        sortable: true,
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "Phone No",
        selector: (row) => row.phoneNo,
        sortable: true,
    },
    {
        name: "Status",
        selector: (row) => <span className="badge badge-warning fs-2 p-2">{row.status}</span>,
        sortable: true,
    },
    {
        name: "Profile Pic",
        selector: (row) => (
            <div
                className="img-fluid rounded shadow"
                style={{ width: "100px", height: "100px" }}
            >
                <img
                    src={`http://localhost:8000/images/profilePics/${row.profilePic}`}
                    alt={row.profilePic}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
        ),
    },
    {
        name: "Action",
        selector: (row) => (
            <Link
                className="btn btn-primary"
                to={`/viewVolunteerDetail/${row._id}`}
            >
                View Details
            </Link>
        ),
        sortable: true,
        style: {
            color: "rgba(0,0,0,.54)",
        },
    },
    ];

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
                                <DataTable
                                    title="Volunteer Details"
                                    columns={columns}
                                    data={data}
                                    progressPending={loading}
                                    progressComponent={<p>Loading...</p>}
                                    customStyles={customStyles}
                                    highlightOnHover
                                    pagination
                                    responsive={true}
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 25, 50, 100]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddVolunteer;
