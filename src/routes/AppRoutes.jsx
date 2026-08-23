import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import CitizenDashboard from "../pages/citizen/CitizenDashboard";
import OfficerDashboard from "../pages/officer/OfficerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ComplaintManagement from "../pages/admin/ComplaintManagement";
import RegisterComplaint from "../pages/citizen/RegisterComplaint";
import MyComplaints from "../pages/citizen/MyComplaints";
import CitizenManagement from "../pages/admin/CitizenManagement";
import OfficerComplaints from "../pages/officer/OfficerComplaints";
import ComplaintDetails from "../pages/citizen/ComplaintDetails";
import OfficerManagement from "../pages/admin/OfficerManagement";
import Profile from "../pages/common/Profile";



function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Default Route */}
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />


                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Citizen Routes */}
                <Route
                    path="/citizen"
                    element={<CitizenDashboard />}
                />

                <Route
                    path="/citizen/new"
                    element={<RegisterComplaint />}
                />

                <Route
                    path="/citizen/my-complaints"
                    element={<MyComplaints />}
                />



                {/* Officer Routes */}
                <Route
                    path="/officer"
                    element={<OfficerDashboard />}
                />


                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/complaints"
                    element={<ComplaintManagement />}
                />
                 <Route
                                     path="/admin/citizens"
                                    element={<CitizenManagement />}
                                />
                  <Route
                                                     path="/officer/complaints"
                                                     element={<OfficerComplaints />}
                                                 />


                                                 <Route
                                                     path="/citizen/complaints/:complaintNumber"
                                                     element={<ComplaintDetails />}
                                                 />
                                                 <Route
                                                     path="/profile"
                                                     element={<Profile />}
                                                 />


                {/* Invalid Route Handling */}
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
                <Route
                    path="/admin/officers"
                    element={<OfficerManagement />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;