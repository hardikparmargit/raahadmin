import React, { useState, useEffect } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { customStyles } from "../../DatatableStyles";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ViewFeedbacks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/getFeedback`);
      setData(response.data.feedback.reverse() || []);
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

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link
          className="btn btn-primary"
          to={`/viewFeedbackDetail`}
          state={row}
        >
          View Details
        </Link>
      ),
    }
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
                  title="Feedback Details"
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

export default ViewFeedbacks;
