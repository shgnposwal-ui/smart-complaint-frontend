import { useEffect, useState } from "react";

import {
    FaClipboardList,
    FaClock,
    FaSpinner,
    FaCheckCircle,
    FaArrowRight
} from "react-icons/fa";

import {
    useNavigate,
    Link
} from "react-router-dom";

import OfficerService from "../../services/OfficerService";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../context/AuthContext";

function OfficerDashboard() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const response =
                await OfficerService.getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    if (!dashboard) {

        return (

            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "70vh"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    />

                    <h5
                        style={{
                            color: "#475569"
                        }}
                    >
                        Loading Officer Dashboard...
                    </h5>

                </div>

            </div>

        );

    }


    return (

        <div
            className="container-fluid"
            style={{
                background: "#f8fafc",
                minHeight: "calc(100vh - 70px)",
                padding: "30px"
            }}
        >


            {/* Welcome Section */}

            <div
                className="d-flex justify-content-between align-items-center mb-4"
            >

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#1e293b"
                        }}
                    >
                        Welcome back, {user?.fullName || "Officer"} 👋
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Here's an overview of your assigned complaints.
                    </p>

                </div>


                <button
                    className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                    onClick={() =>
                        navigate("/officer/complaints")
                    }
                >

                    <FaClipboardList />

                    View Complaints

                </button>

            </div>


            {/* Statistics */}

            <div className="row g-4">


                {/* Assigned */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Assigned Complaints"
                        value={dashboard.assignedComplaints}
                        icon={<FaClipboardList />}
                        color="#2563eb"
                        onClick={() =>
                            navigate("/officer/complaints")
                        }
                    />

                </div>


                {/* Pending */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Pending"
                        value={dashboard.pendingComplaints}
                        icon={<FaClock />}
                        color="#f59e0b"
                    />

                </div>


                {/* In Progress */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="In Progress"
                        value={dashboard.inProgressComplaints}
                        icon={<FaSpinner />}
                        color="#0ea5e9"
                    />

                </div>


                {/* Resolved */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Resolved"
                        value={dashboard.resolvedComplaints}
                        icon={<FaCheckCircle />}
                        color="#10b981"
                    />

                </div>

            </div>


            {/* Work Summary */}

            <div className="row mt-5 g-4">


                {/* Left Card */}

                <div className="col-lg-8">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "12px"
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5
                                        className="fw-bold mb-1"
                                        style={{
                                            color: "#1e293b"
                                        }}
                                    >
                                        Complaint Management
                                    </h5>

                                    <p
                                        className="mb-0"
                                        style={{
                                            color: "#64748b"
                                        }}
                                    >
                                        Review and manage complaints assigned to you.
                                    </p>

                                </div>

                                <FaClipboardList
                                    size={35}
                                    color="#2563eb"
                                />

                            </div>


                            <hr />


                            <div className="row text-center mt-4">

                                <div className="col-4">

                                    <h3
                                        className="fw-bold"
                                        style={{
                                            color: "#f59e0b"
                                        }}
                                    >
                                        {dashboard.pendingComplaints}
                                    </h3>

                                    <small
                                        style={{
                                            color: "#64748b"
                                        }}
                                    >
                                        Pending
                                    </small>

                                </div>


                                <div className="col-4">

                                    <h3
                                        className="fw-bold"
                                        style={{
                                            color: "#0ea5e9"
                                        }}
                                    >
                                        {dashboard.inProgressComplaints}
                                    </h3>

                                    <small
                                        style={{
                                            color: "#64748b"
                                        }}
                                    >
                                        In Progress
                                    </small>

                                </div>


                                <div className="col-4">

                                    <h3
                                        className="fw-bold"
                                        style={{
                                            color: "#10b981"
                                        }}
                                    >
                                        {dashboard.resolvedComplaints}
                                    </h3>

                                    <small
                                        style={{
                                            color: "#64748b"
                                        }}
                                    >
                                        Resolved
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Right Card */}

                <div className="col-lg-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "12px"
                        }}
                    >

                        <div className="card-body p-4">

                            <h5
                                className="fw-bold"
                                style={{
                                    color: "#1e293b"
                                }}
                            >
                                Quick Actions
                            </h5>

                            <p
                                style={{
                                    color: "#64748b"
                                }}
                            >
                                Manage your assigned complaints.
                            </p>


                            <Link
                                to="/officer/complaints"
                                className="btn btn-primary w-100 mb-3"
                            >

                                <FaClipboardList className="me-2" />

                                View Assigned Complaints

                            </Link>


                            <button
                                className="btn btn-outline-primary w-100"
                                onClick={() =>
                                    navigate("/profile")
                                }
                            >

                                My Profile

                                <FaArrowRight
                                    className="ms-2"
                                    size={12}
                                />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OfficerDashboard;