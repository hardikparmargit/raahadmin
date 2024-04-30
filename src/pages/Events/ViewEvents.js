import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ViewEvents() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/getEvents`);
      const data = response.data;
      setData(data.events || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.post(`${process.env.BACKEND_URL}/deleteEvent`, {
        eventId,
      });
      toast.success("Event Deleted Successfully!!", {
        autoClose: 1500,
        onClose: () => fetchEvents(),
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  const confirmDelete = (eventId) => {
    const deleteToastId = toast(
      <div>
        <p>Are you sure you want to delete this Event?</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            toast.dismiss(deleteToastId); // Dismiss the confirmation toast
            handleDelete(eventId); // Handle delete operation
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
                <p>No events found</p>
              ) : (
                data.map((event, index) => (
                  <div key={event._id}>
                    <div
                      className="card shadow"
                      key={index}
                    >
                      <img
                        style={{ height: "200px", objectFit: "cover" }}
                        className="card-img-top img-fluid"
                        src={`http://localhost:8000/images/eventPics/${event.eventPic}`}
                        alt={event.eventName}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{event.eventName}</h5>
                        <p className="card-text">{event.eventAddress}</p>
                        <hr className="bg-secondary" />
                        <p className="card-text">
                          {new Date(event.eventDate).toLocaleString()}
                        </p>
                        <div className="row justify-content-center gap-1">
                          <Link
                            to={"/editEvent"}
                            state={event}
                            className="btn btn-primary me-2"
                            style={{ width: "100px" }}
                          >
                            Edit Event
                          </Link>
                          <br />
                          <Link
                            onClick={() => confirmDelete(event._id)}
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

export default ViewEvents;
