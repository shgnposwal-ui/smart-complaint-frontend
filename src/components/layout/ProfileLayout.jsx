import CitizenLayout from "./CitizenLayout";
import OfficerLayout from "./OfficerLayout";
import DashboardLayout from "./DashboardLayout";

function ProfileLayout({ children }) {

    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
        return (
            <DashboardLayout>
                {children}
            </DashboardLayout>
        );
    }

    if (role === "OFFICER") {
        return (
            <OfficerLayout>
                {children}
            </OfficerLayout>
        );
    }

    return (
        <CitizenLayout>
            {children}
        </CitizenLayout>
    );

}

export default ProfileLayout;