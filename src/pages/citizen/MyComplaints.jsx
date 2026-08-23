import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CitizenComplaintService from "../../services/CitizenComplaintService";

function MyComplaints() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {

        try {

            const response =
                await CitizenComplaintService.getMyComplaints();

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-warning";

            case "IN_PROGRESS":
                return "bg-primary";

            case "RESOLVED":
                return "bg-success";

            default:
                return "bg-secondary";
        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    My Complaints
                </h2>

                <Link
                    to="/citizen/new"
                    className="btn btn-primary"
                >
                    + Register Complaint
                </Link>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-dark">

                        <tr>

                            <th>Complaint No</th>

                            <th>Title</th>

                            <th>Priority</th>

                            <th>Status</th>

                            <th>Assigned Officer</th>

                            <th>Officer Remarks</th>

                            <th>Created</th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            complaints.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >

                                            No complaints found.

                                        </td>

                                    </tr>

                                )

                                :

                                complaints.map((complaint) => (

                                    <tr key={complaint.complaintNumber}>

                                        <td>
                                            <Link
                                                to={`/citizen/complaints/${complaint.complaintNumber}`}
                                                className="text-decoration-none fw-bold"
                                            >
                                                {complaint.complaintNumber}
                                            </Link>
                                        </td>

                                        <td>
                                            {complaint.title}
                                        </td>

                                        <td>
                                            {complaint.priority}
                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${getStatusBadge(
                                                    complaint.status
                                                )}`}
                                            >

                                                {complaint.status}

                                            </span>

                                        </td>

                                        <td>

                                            {
                                                complaint.assignedOfficer ||
                                                "Not Assigned"
                                            }

                                        </td>

                                        <td>

                                            {
                                                complaint.officerRemarks ||
                                                "-"
                                            }

                                        </td>

                                        <td>

                                            {
                                                complaint.createdAt
                                                    ? new Date(
                                                        complaint.createdAt
                                                    ).toLocaleDateString()
                                                    : "-"
                                            }

                                        </td>

                                    </tr>

                                ))

                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default MyComplaints;