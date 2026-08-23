import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OfficerManagementService from "../../services/OfficerManagementService";

function OfficerManagement() {

    const [officers, setOfficers] = useState([]);

    useEffect(() => {
        loadOfficers();
    }, []);

    const loadOfficers = async () => {

        try {

            const response =
                await OfficerManagementService.getAllOfficers();

            setOfficers(response.data);

        } catch (error) {

            console.log(error);
            toast.error("Unable to load officers");

        }

    };

    const handleStatusChange = async (officer) => {

        try {

            await OfficerManagementService.updateOfficerStatus(
                officer.id,
                !officer.isActive
            );

            toast.success(
                officer.isActive
                    ? "Officer deactivated successfully"
                    : "Officer activated successfully"
            );

            loadOfficers();

        } catch (error) {

            console.log(error);

            toast.error("Unable to update officer status");

        }

    };

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Officer Management
                        </h2>

                        <p className="text-muted mb-0">
                            View and manage registered officers
                        </p>

                    </div>

                    <span className="badge bg-primary fs-6">
                        Total Officers: {officers.length}
                    </span>

                </div>

                <div className="card shadow-sm">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                <tr>

                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Status</th>
                                    <th>Action</th>

                                </tr>

                                </thead>

                                <tbody>

                                {officers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center text-muted py-4"
                                        >
                                            No officers found
                                        </td>

                                    </tr>

                                ) : (

                                    officers.map((officer) => (

                                        <tr key={officer.id}>

                                            <td className="fw-semibold">
                                                {officer.fullName}
                                            </td>

                                            <td>
                                                {officer.email}
                                            </td>

                                            <td>
                                                {officer.phoneNumber}
                                            </td>

                                            <td>
                                                {officer.city}
                                            </td>

                                            <td>
                                                {officer.state}
                                            </td>

                                            <td>

                                                {officer.isActive ? (

                                                    <span className="badge bg-success">
                                                        Active
                                                    </span>

                                                ) : (

                                                    <span className="badge bg-danger">
                                                        Inactive
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <button
                                                    className={
                                                        officer.isActive
                                                            ? "btn btn-sm btn-danger"
                                                            : "btn btn-sm btn-success"
                                                    }
                                                    onClick={() =>
                                                        handleStatusChange(officer)
                                                    }
                                                >

                                                    {officer.isActive
                                                        ? "Deactivate"
                                                        : "Activate"}

                                                </button>

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

        </DashboardLayout>

    );

}

export default OfficerManagement;