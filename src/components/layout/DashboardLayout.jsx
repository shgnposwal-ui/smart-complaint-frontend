import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {

    return (

        <div>

            <AdminNavbar />

            <div className="d-flex">

                <Sidebar />

                <div
                    className="flex-grow-1"
                    style={{
                        background: "#f1f5f9",
                        minHeight: "100vh",
                        padding: "25px"
                    }}
                >

                    {children}

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;