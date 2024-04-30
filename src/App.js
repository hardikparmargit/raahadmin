import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SamplePage from "./pages/SamplePage";
import ViewEvents from "./pages/Events/ViewEvents";
import AddEvent from "./pages/Events/AddEvent";
import ViewVolunteer from "./pages/Volunteers/ViewVolunteer";
import AddVolunteer from "./pages/Volunteers/AddVolunteer";
import ViewContactUs from "./pages/ContactUs/ViewContactUs";
import ViewFeedbacks from "./pages/Feedback/ViewFeedbacks";
import Login from "./pages/Login";
import ViewVolunteerDetail from "./pages/Volunteers/ViewVolunteerDetail";
import { useEffect, useState } from "react";
import checkSession from "./auth/authService";
import axios from "axios";
import EditEvent from "./pages/Events/EditEvent";
import AddService from "./pages/Services/AddService";
import ViewService from "./pages/Services/ViewService";
import EditService from "./pages/Services/EditService";
import AddMember from "./pages/Members/AddMember";
import EditMember from "./pages/Members/EditMember";
import ViewMember from "./pages/Members/ViewMember";
import EditContactDetails from "./pages/EditContactDetails";
import EditFutureStrategy from "./pages/EditFutureStrategy";
import ViewContactDetail from "./pages/ContactUs/ViewContactDetail";
import ViewFeedbackDetail from "./pages/Feedback/ViewFeedbackDetail";
import EditCredentials from "./pages/EditCredentials";
import AddMediaImages from "./pages/MediaImages/AddMediaImages";
import ViewMediaImages from "./pages/MediaImages/ViewMediaImages";
import EditMediaImages from "./pages/MediaImages/EditMediaImages";

function App() {
  axios.defaults.withCredentials = true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const checkAuth = await checkSession();
        console.log(checkAuth);
        setIsAuthenticated(checkAuth);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/editProfile"
            element={isAuthenticated ? <EditCredentials /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/gallery"
            element={isAuthenticated ? <ViewMediaImages /> : <Navigate to="/login" />}
          />
          <Route
            path="/addMediaImages"
            element={isAuthenticated ? <AddMediaImages /> : <Navigate to="/login" />}
          />
          <Route
            path="/editMediaImages"
            element={isAuthenticated ? <EditMediaImages /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewEvents"
            element={
              isAuthenticated ? <ViewEvents /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addEvent"
            element={isAuthenticated ? <AddEvent /> : <Navigate to="/login" />}
          />
          <Route
            path="/editEvent"
            element={isAuthenticated ? <EditEvent /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewVolunteers"
            element={
              isAuthenticated ? <ViewVolunteer /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewVolunteerDetail/:id"
            element={
              isAuthenticated ? (
                <ViewVolunteerDetail />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/addVolunteer"
            element={
              isAuthenticated ? <AddVolunteer /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addService"
            element={
              isAuthenticated ? <AddService /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewServices"
            element={
              isAuthenticated ? <ViewService /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/editService"
            element={
              isAuthenticated ? <EditService /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addMember"
            element={
              isAuthenticated ? <AddMember /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/editMember"
            element={
              isAuthenticated ? <EditMember /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewMember"
            element={
              isAuthenticated ? <ViewMember /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/editContactDetail"
            element={
              isAuthenticated ? <EditContactDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/editFutureStrategy"
            element={
              isAuthenticated ? <EditFutureStrategy /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewContactUs"
            element={
              isAuthenticated ? <ViewContactUs /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewContactUsDetail"
            element={
              isAuthenticated ? <ViewContactDetail /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewFeedback"
            element={
              isAuthenticated ? <ViewFeedbacks /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewFeedbackDetail"
            element={
              isAuthenticated ? <ViewFeedbackDetail /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/sample"
            element={
              isAuthenticated ? <SamplePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <h3 className="text-center">Page Not Found</h3>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
