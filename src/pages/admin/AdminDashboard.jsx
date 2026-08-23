import { useEffect, useState } from "react";

import DashboardService from "../../services/DashboardService";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";

import {
    FaClipboardList,
    FaClock,
    FaSpinner,
    FaCheckCircle,
    FaExclamationTriangle,
    FaUsers,
    FaUserTie
} from "react-icons/fa";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalComplaints: 0,
        pendingComplaints: 0,
        inProgressComplaints: 0,
        resolvedComplaints: 0,
        highPriorityComplaints: 0,
        totalCitizens: 0,
        totalOfficers: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const response =
                await DashboardService.getAdminDashboard();

            setStats(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div
                className="container-fluid"
                style={{
                    background: "#f8fafc",
                    minHeight: "calc(100vh - 70px)",
                    padding: "30px"
                }}
            >

                {/* Header */}

                <div className="mb-4">

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#1e293b"
                        }}
                    >
                        Admin Dashboard
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Monitor complaints, citizens and officers from one place.
                    </p>

                </div>


                {/* Loading */}

                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p
                            className="mt-3"
                            style={{
                                color: "#64748b"
                            }}
                        >
                            Loading dashboard...
                        </p>

                    </div>

                ) : (

                    <>

                        {/* Complaint Statistics */}

                        <div className="mb-4">

                            <h5
                                className="fw-bold mb-3"
                                style={{
                                    color: "#334155"
                                }}
                            >
                                Complaint Overview
                            </h5>

                            <div className="row g-4">

                                <div className="col-xl-3 col-md-6">

                                    <StatCard
                                        title="Total Complaints"
                                        value={stats.totalComplaints}
                                        icon={<FaClipboardList />}
                                        color="linear-gradient(135deg,#2563eb,#1d4ed8)"
                                    />

                                </div>


                                <div className="col-xl-3 col-md-6">

                                    <StatCard
                                        title="Pending"
                                        value={stats.pendingComplaints}
                                        icon={<FaClock />}
                                        color="linear-gradient(135deg,#f59e0b,#d97706)"
                                    />

                                </div>


                                <div className="col-xl-3 col-md-6">

                                    <StatCard
                                        title="In Progress"
                                        value={stats.inProgressComplaints}
                                        icon={<FaSpinner />}
                                        color="linear-gradient(135deg,#8b5cf6,#6d28d9)"
                                    />

                                </div>


                                <div className="col-xl-3 col-md-6">

                                    <StatCard
                                        title="Resolved"
                                        value={stats.resolvedComplaints}
                                        icon={<FaCheckCircle />}
                                        color="linear-gradient(135deg,#10b981,#059669)"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Priority */}

                        <div className="mb-4">

                            <h5
                                className="fw-bold mb-3"
                                style={{
                                    color: "#334155"
                                }}
                            >
                                Priority & Users
                            </h5>

                            <div className="row g-4">

                                <div className="col-xl-4 col-md-6">

                                    <StatCard
                                        title="High Priority"
                                        value={stats.highPriorityComplaints}
                                        icon={<FaExclamationTriangle />}
                                        color="linear-gradient(135deg,#ef4444,#dc2626)"
                                    />

                                </div>


                                <div className="col-xl-4 col-md-6">

                                    <StatCard
                                        title="Citizens"
                                        value={stats.totalCitizens}
                                        icon={<FaUsers />}
                                        color="linear-gradient(135deg,#06b6d4,#0891b2)"
                                    />

                                </div>


                                <div className="col-xl-4 col-md-6">

                                    <StatCard
                                        title="Officers"
                                        value={stats.totalOfficers}
                                        icon={<FaUserTie />}
                                        color="linear-gradient(135deg,#6366f1,#4338ca)"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Admin Quick Actions */}

                        <div
                            className="card border-0 shadow-sm mt-4"
                            style={{
                                borderRadius: "12px"
                            }}
                        >

                            <div className="card-body p-4">

                                <h5
                                    className="fw-bold mb-1"
                                    style={{
                                        color: "#1e293b"
                                    }}
                                >
                                    Administration
                                </h5>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: "#64748b"
                                    }}
                                >
                                    Use the sidebar to manage complaints,
                                    citizens and officers.
                                </p>

                            </div>

                        </div>

                    </>

                )}

            </div>

        </DashboardLayout>

    );
}

export default AdminDashboard;