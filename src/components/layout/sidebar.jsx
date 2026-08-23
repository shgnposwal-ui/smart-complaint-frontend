import {
    FaTachometerAlt,
    FaClipboardList,
    FaUsers,
    FaUserTie,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        {
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/admin"
        },
        {
            name: "Complaints",
            icon: <FaClipboardList />,
            path: "/admin/complaints"
        },
        {
            name: "Citizens",
            icon: <FaUsers />,
            path: "/admin/citizens"
        },
        {
            name: "Officers",
            icon: <FaUserTie />,
            path: "/admin/officers"
        },
        {
            name: "Reports",
            icon: <FaChartBar />,
            path: "/admin/reports"
        }
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <div
            className="d-flex flex-column shadow-lg"
            style={{
                width: "250px",
                minHeight: "100vh",
                background: "linear-gradient(180deg,#0f172a,#1e293b)",
                color: "white"
            }}
        >

            {/* Logo */}

            <div
                className="text-center py-4 border-bottom"
                style={{
                    borderColor: "rgba(255,255,255,0.1)"
                }}
            >

                <h3 className="fw-bold mb-0">
                    Admin Panel
                </h3>

                <small className="text-secondary">
                    Smart Complaint Portal
                </small>

            </div>

            {/* Menu */}

            <div className="mt-3 px-2">

                {

                    menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/admin"}
                            className={({ isActive }) =>

                                `d-flex align-items-center gap-3 mb-2 px-3 py-3 rounded text-decoration-none
                                ${isActive ? "bg-primary text-white shadow" : "text-light"}`
                            }

                            style={{
                                transition: "0.3s"
                            }}
                        >

                            <span style={{ fontSize: "18px" }}>
                                {item.icon}
                            </span>

                            <span className="fw-semibold">
                                {item.name}
                            </span>

                        </NavLink>

                    ))

                }

            </div>

            {/* Logout */}

            <div className="mt-auto p-3">

                <button
                    className="btn btn-danger w-100"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt className="me-2" />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Sidebar;