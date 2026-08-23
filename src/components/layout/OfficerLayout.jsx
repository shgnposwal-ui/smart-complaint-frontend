import OfficerNavbar from "./OfficerNavbar";
import OfficerSidebar from "./OfficerSidebar";

function OfficerLayout({ children }) {

    return (

        <div>

            <OfficerNavbar />

            <div className="d-flex">

                <OfficerSidebar />

                <div
                    className="flex-grow-1 p-4"
                    style={{
                        background: "#f8fafc",
                        minHeight: "100vh"
                    }}
                >

                    {children}

                </div>

            </div>

        </div>

    );

}

export default OfficerLayout;