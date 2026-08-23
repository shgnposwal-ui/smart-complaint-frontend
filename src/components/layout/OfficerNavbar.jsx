import {
    FaBell,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function OfficerNavbar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav
            className="navbar navbar-expand-lg shadow-sm px-4"
            style={{
                background: "#ffffff",
                minHeight: "70px",
                borderBottom: "1px solid #e5e7eb"
            }}
        >

            {/* Brand */}

            <Link
                to="/officer"
                className="text-decoration-none"
            >

                <div className="d-flex align-items-center">

                    <div
                        className="d-flex align-items-center justify-content-center me-2"
                        style={{
                            width: "42px",
                            height: "42px",
                            background: "#2563eb",
                            color: "white",
                            borderRadius: "10px",
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}
                    >
                        S
                    </div>

                    <div>

                        <h5
                            className="fw-bold mb-0"
                            style={{
                                color: "#1e3a8a"
                            }}
                        >
                            Smart Complaint Portal
                        </h5>

                        <small
                            style={{
                                color: "#64748b"
                            }}
                        >
                            Officer Portal
                        </small>

                    </div>

                </div>

            </Link>


            {/* Right Section */}

            <div className="ms-auto d-flex align-items-center gap-4">


                {/* Dashboard */}

                <Link
                    to="/officer"
                    className="text-decoration-none d-none d-md-block"
                    style={{
                        color: "#475569",
                        fontWeight: "500"
                    }}
                >
                    Dashboard
                </Link>


                {/* Notifications */}

                <div
                    style={{
                        position: "relative",
                        cursor: "pointer"
                    }}
                    title="Notifications"
                >

                    <FaBell
                        size={21}
                        color="#475569"
                    />

                    <span
                        style={{
                            position: "absolute",
                            top: "-7px",
                            right: "-8px",
                            background: "#ef4444",
                            color: "white",
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold"
                        }}
                    >
                        0
                    </span>

                </div>


                {/* Profile */}

                <Link
                    to="/profile"
                    className="text-decoration-none"
                >

                    <div
                        className="d-flex align-items-center gap-2"
                        style={{
                            cursor: "pointer"
                        }}
                    >

                        <FaUserCircle
                            size={34}
                            color="#2563eb"
                        />

                        <div className="d-none d-md-block">

                            <div
                                className="fw-bold"
                                style={{
                                    color: "#1e293b",
                                    fontSize: "14px"
                                }}
                            >
                                {user?.fullName || "Officer"}
                            </div>

                            <small
                                style={{
                                    color: "#64748b"
                                }}
                            >
                                Officer
                            </small>

                        </div>

                    </div>

                </Link>


                {/* Logout */}

                <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                >

                    <FaSignOutAlt />

                    <span className="d-none d-md-inline">
                        Logout
                    </span>

                </button>

            </div>

        </nav>

    );

}

export default OfficerNavbar;