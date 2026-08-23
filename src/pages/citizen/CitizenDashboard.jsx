import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaClock,
    FaSpinner,
    FaCheckCircle,
    FaPlus,
    FaArrowRight
} from "react-icons/fa";

import { useNavigate, Link } from "react-router-dom";

import StatCard from "../../components/common/StatCard";
import CitizenComplaintService from "../../services/CitizenComplaintService";
import { useAuth } from "../../context/AuthContext";

function CitizenDashboard() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        loadComplaints();

    }, []);


    const loadComplaints = async () => {

        try {

            const response =
                await CitizenComplaintService.getMyComplaints();

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    const total = complaints.length;

    const pending =
        complaints.filter(
            c => c.status === "PENDING"
        ).length;

    const inProgress =
        complaints.filter(
            c => c.status === "IN_PROGRESS"
        ).length;

    const resolved =
        complaints.filter(
            c => c.status === "RESOLVED"
        ).length;


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
                        Welcome back, {user?.fullName || "Citizen"} 👋
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Track and manage your complaints from here.
                    </p>

                </div>


                <button
                    className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                    onClick={() => navigate("/citizen/new")}
                >

                    <FaPlus />

                    Register Complaint

                </button>

            </div>


            {/* Statistics */}

            <div className="row g-4">


                {/* Total */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Total Complaints"
                        value={total}
                        icon={<FaClipboardList />}
                        color="#2563eb"
                        onClick={() =>
                            navigate("/citizen/my-complaints")
                        }
                    />

                </div>


                {/* Pending */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Pending"
                        value={pending}
                        icon={<FaClock />}
                        color="#f59e0b"
                    />

                </div>


                {/* In Progress */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="In Progress"
                        value={inProgress}
                        icon={<FaSpinner />}
                        color="#0ea5e9"
                    />

                </div>


                {/* Resolved */}

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Resolved"
                        value={resolved}
                        icon={<FaCheckCircle />}
                        color="#10b981"
                    />

                </div>

            </div>


            {/* Recent Complaints */}

            <div
                className="card border-0 shadow-sm mt-5"
                style={{
                    borderRadius: "12px",
                    overflow: "hidden"
                }}
            >


                {/* Header */}

                <div
                    className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center"
                >

                    <div>

                        <h5
                            className="fw-bold mb-1"
                            style={{
                                color: "#1e293b"
                            }}
                        >
                            Recent Complaints
                        </h5>

                        <small
                            style={{
                                color: "#64748b"
                            }}
                        >
                            Your latest submitted complaints
                        </small>

                    </div>


                    <Link
                        to="/citizen/my-complaints"
                        className="text-decoration-none d-flex align-items-center gap-2"
                        style={{
                            color: "#2563eb",
                            fontWeight: "500"
                        }}
                    >
                        View All

                        <FaArrowRight size={13} />

                    </Link>

                </div>


                {/* Table */}

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">


                            <thead
                                style={{
                                    background: "#f8fafc"
                                }}
                            >

                                <tr>

                                    <th className="px-4 py-3">
                                        Complaint No.
                                    </th>

                                    <th>
                                        Title
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Priority
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {complaints.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center py-5"
                                        >

                                            <FaClipboardList
                                                size={35}
                                                color="#94a3b8"
                                            />

                                            <p
                                                className="mt-3 mb-1 fw-bold"
                                            >
                                                No complaints yet
                                            </p>

                                            <small
                                                style={{
                                                    color: "#64748b"
                                                }}
                                            >
                                                Your submitted complaints
                                                will appear here.
                                            </small>

                                        </td>

                                    </tr>

                                ) : (

                                    complaints
                                        .slice(0, 5)
                                        .map(c => (

                                            <tr
                                                key={c.complaintNumber}
                                            >

                                                <td className="px-4">

                                                    <Link
                                                        to={`/citizen/complaints/${c.complaintNumber}`}
                                                        className="text-decoration-none fw-bold"
                                                        style={{
                                                            color: "#2563eb"
                                                        }}
                                                    >
                                                        {c.complaintNumber}
                                                    </Link>

                                                </td>


                                                <td>

                                                    {c.title}

                                                </td>


                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            c.status === "RESOLVED"
                                                                ? "bg-success"
                                                                : c.status === "PENDING"
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-info text-dark"
                                                        }`}
                                                    >
                                                        {c.status}
                                                    </span>

                                                </td>


                                                <td>

                                                    <span
                                                        className="badge bg-light text-dark border"
                                                    >
                                                        {c.priority}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CitizenDashboard;