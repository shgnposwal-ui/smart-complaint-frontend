import {
    FaHome,
    FaClipboardList,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function OfficerSidebar() {

    const menus = [

        {
            name: "Dashboard",
            icon: <FaHome />,
            path: "/officer"
        },

        {
            name: "Assigned Complaints",
            icon: <FaClipboardList />,
            path: "/officer/complaints"
        },

        {
            name: "Profile",
            icon: <FaUser />,
            path: "/officer/profile"
        }

    ];

    return (

        <div
            className="text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh",
                background: "#1e293b"
            }}
        >

            <h4 className="text-center mb-4">
                Officer Panel
            </h4>

            {

                menus.map((menu) => (

                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className="d-flex align-items-center gap-3 text-decoration-none text-white p-3 mb-2 rounded"
                    >

                        {menu.icon}

                        {menu.name}

                    </NavLink>

                ))

            }

            <button
                className="btn btn-danger w-100 mt-5"
            >

                <FaSignOutAlt className="me-2" />

                Logout

            </button>

        </div>

    );

}

export default OfficerSidebar;