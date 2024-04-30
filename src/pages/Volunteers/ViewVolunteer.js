import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../DatatableStyles';

function ViewVolunteer() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/getVolunteers`);
            setData(response.data.volunteers.reverse());
            setOriginalData(response.data.volunteers.reverse());
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
        id: "srNo",
        name: "Sr. No.",
        selector: (row, index) => index + 1,
        sortable: false,
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        format: (row) => row.name,
        comparator: (a, b) => a.name.localeCompare(b.name),
    },
    {
        name: "Phone No",
        selector: (row) => row.phoneNo,
        sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.status === "approved" ? <span className="badge badge-success fs-2 p-2">{row.status}</span> : <span className="badge badge-danger fs-2 p-2">{row.status}</span>,
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
    },
    ];



    const handleFilter = (event) => {
        const filterValue = event.target.value.toLowerCase();
        if (filterValue === "") {
            setData(originalData);
        } else {
            const newData = originalData.filter((row) =>
                Object.entries(row).some(([key, value]) =>
                    key === "date"
                        ? new Date(value)
                            .toLocaleString()
                            .toLowerCase()
                            .includes(filterValue)
                        : String(value).toLowerCase().includes(filterValue)
                )
            );
            setData(newData);
        }
    };

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    {/*  Header Start */}
                    <Header />
                    {/*  Header End */}
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">

                                <div className="form-group col-3">
                                    <input
                                        type="text"
                                        onChange={handleFilter}
                                        className="form-control"
                                        id="basicInput"
                                        placeholder="Search..."
                                    />
                                </div>
                                <DataTable
                                    title="Volunteers"
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
    )
}

export default ViewVolunteer