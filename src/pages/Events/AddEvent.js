import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddEvent() {
    const navigate = useNavigate();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState("");
    const [data, setData] = useState({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventDescription: "",
        eventAddress: "",
        eventCity: "",
        eventState: "",
        eventPic: "",
    });

    
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch(
                    "https://cdn-api.co-vin.in/api/v2/admin/location/states"
                );
                const data = await response.json();
                setStates(data.states);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchStates();
    }, []);

    useEffect(() => {
        if (data.selectedStateId) {
            fetchCities(data.selectedStateId);
        }
        // eslint-disable-next-line
    }, [data.selectedStateId]);

    const fetchCities = async () => {
        try {
            const response = await fetch(
                `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateId}`
            );
            const data = await response.json();
            setCities(data.districts);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleStateChange = (event) => {
        const selectedStateName = event.target.value;
        const selectedState = states.find((state) => state.state_name === selectedStateName);
        const selectedStateId = selectedState ? selectedState.state_id : "";
        setSelectedStateId(selectedStateId);
        setData((prevData) => ({
            ...prevData,
            eventState: selectedStateName,
            selectedStateId: selectedStateId
        }));
    };

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
            eventPic: file
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(data);
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const response = await axios.post(`${process.env.BACKEND_URL}/addEvent`, formData);
            if (response.data.success) {
                toast.success("Event Added Successfully!!", {
                    autoClose: 1500,
                    onClose: () => navigate("/viewEvents"),
                });
            } else {
                toast.error("Event Not Added!!", {
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
                                <h5 className="card-title fw-semibold mb-4">Add Event</h5>
                                <form className="row g-3" onSubmit={handleSubmit} enctype="multipart/form-data">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">Event Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="eventName"
                                                value={data.eventName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label mb-0 mt-2">Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="eventDate"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={data.eventDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label mb-0 mt-2">Time</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                name="eventTime"
                                                value={data.eventTime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">Address</label>
                                            <textarea
                                                type="text"
                                                rows={4}
                                                className="form-control"
                                                name="eventAddress"
                                                value={data.eventAddress}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">State</label>
                                            <select
                                                className="form-control"
                                                name="eventState"
                                                value={data.eventState}
                                                onChange={handleStateChange}
                                                required
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state.state_id} value={state.state_name}>
                                                        {state.state_name}
                                                    </option>
                                                ))}
                                            </select>
                                            <label className="form-label mb-0 mt-2">City</label>
                                            <select
                                                className="form-control"
                                                name="eventCity"
                                                value={data.eventCity}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city) => (
                                                    <option key={city.district_id} value={city.district_name}>
                                                        {city.district_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label mb-0 mt-2">
                                                Event Description
                                            </label>
                                            <textarea
                                                type="text"
                                                rows={4}
                                                className="form-control"
                                                name="eventDescription"
                                                value={data.eventDescription}
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
                                                <button type="submit" className="btn btn-primary mt-4 w-100">
                                                    Add Event
                                                </button>
                                            </div>
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

export default AddEvent;
