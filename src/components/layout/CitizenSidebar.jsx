import {
    FaHome,
    FaPlusCircle,
    FaClipboardList,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function CitizenSidebar() {

    const menus = [

        {
            name: "Dashboard",
            icon: <FaHome />,
            path: "/citizen"
        },

        {
            name: "New Complaint",
            icon: <FaPlusCircle />,
            path: "/citizen/new"
        },

        {
            name: "My Complaints",
            icon: <FaClipboardList />,
            path: "/citizen/my-complaints"
        },

        {
            name: "Profile",
            icon: <FaUser />,
            path: "/citizen/profile"
        }

    ];

    return (

        <div
            className="text-white p-3 shadow"
            style={{
                width: "250px",
                minHeight: "100vh",
                background: "#1e293b"
            }}
        >

            <h4 className="text-center mb-4 fw-bold">
                Citizen Panel
            </h4>

            {

                menus.map((menu) => (

                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                            `d-flex align-items-center gap-3 text-decoration-none p-3 mb-2 rounded ${
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-white"
                            }`
                        }
                    >

                        {menu.icon}

                        <span>{menu.name}</span>

                    </NavLink>

                ))

            }

            <div className="mt-auto pt-5">

                <button
                    className="btn btn-danger w-100"
                >

                    <FaSignOutAlt className="me-2" />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default CitizenSidebar;