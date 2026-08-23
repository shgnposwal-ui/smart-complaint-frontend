import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminNavbar() {

    return (

        <nav
            className="navbar px-4 py-3 shadow-sm"
            style={{
                background: "#ffffff",
                borderBottom: "1px solid #e5e7eb"
            }}
        >

            <div className="container-fluid">

                {/* Brand */}

                <Link
                    to="/admin"
                    className="text-decoration-none"
                >

                    <div className="d-flex align-items-center gap-2">

                        <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{
                                width: "42px",
                                height: "42px",
                                background: "#2563eb",
                                color: "#ffffff",
                                fontWeight: "bold",
                                fontSize: "20px"
                            }}
                        >
                            S
                        </div>

                        <div>

                            <div
                                className="fw-bold"
                                style={{
                                    color: "#1e293b",
                                    fontSize: "18px"
                                }}
                            >
                                Smart Complaint Portal
                            </div>

                            <small
                                style={{
                                    color: "#64748b"
                                }}
                            >
                                Administration Portal
                            </small>

                        </div>

                    </div>

                </Link>


                {/* Right Section */}

                <div className="d-flex align-items-center gap-4">

                    {/* Notification */}

                    <div
                        className="position-relative"
                        style={{
                            cursor: "pointer"
                        }}
                        title="Notifications"
                    >

                        <FaBell
                            size={21}
                            color="#475569"
                        />

                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{
                                fontSize: "9px"
                            }}
                        >
                            2
                        </span>

                    </div>


                    {/* Admin Profile */}

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
                                size={36}
                                color="#2563eb"
                            />

                            <div className="d-none d-md-block">

                                <div
                                    className="fw-bold"
                                    style={{
                                        color: "#1e293b"
                                    }}
                                >
                                    Administrator
                                </div>

                                <small
                                    style={{
                                        color: "#64748b"
                                    }}
                                >
                                    Admin
                                </small>

                            </div>

                        </div>

                    </Link>

                </div>

            </div>

        </nav>

    );
}

export default AdminNavbar;