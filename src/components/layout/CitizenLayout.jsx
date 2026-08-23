import CitizenNavbar from "./CitizenNavbar";
import CitizenSidebar from "./CitizenSidebar";

function CitizenLayout({ children }) {
    return (
        <div>
            <CitizenNavbar />

            <div className="d-flex">

                <CitizenSidebar />

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

export default CitizenLayout;