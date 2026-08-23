import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CitizenLayout from "../../components/layout/CitizenLayout.jsx";
import ComplaintService from "../../services/ComplaintService";

function ComplaintDetails() {

    const { complaintNumber } = useParams();

    const [complaint, setComplaint] = useState(null);

    useEffect(() => {
        loadComplaint();
    }, []);

    const loadComplaint = async () => {
        try {
            const response = await ComplaintService.getComplaintByNumber(
                complaintNumber
            );

            setComplaint(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!complaint) {
        return (
            <CitizenLayout>
                <h4>Loading...</h4>
            </CitizenLayout>
        );
    }

    return (

        <CitizenLayout>

            <div className="container">

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h4 className="mb-0">
                            Complaint Details
                        </h4>

                    </div>

                    <div className="card-body">

                        <table className="table">

                            <tbody>

                                <tr>
                                    <th width="250">Complaint Number</th>
                                    <td>{complaint.complaintNumber}</td>
                                </tr>

                                <tr>
                                    <th>Title</th>
                                    <td>{complaint.title}</td>
                                </tr>

                                <tr>
                                    <th>Description</th>
                                    <td>{complaint.description}</td>
                                </tr>

                                <tr>
                                    <th>Category</th>
                                    <td>{complaint.category}</td>
                                </tr>

                                <tr>
                                    <th>Priority</th>
                                    <td>{complaint.priority}</td>
                                </tr>

                                <tr>
                                    <th>Status</th>
                                    <td>{complaint.status}</td>
                                </tr>

                                <tr>
                                    <th>Assigned Officer</th>
                                    <td>
                                        {complaint.assignedOfficer || "Not Assigned"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>Officer Remarks</th>
                                    <td>
                                        {complaint.officerRemarks || "No Remarks Yet"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>Address</th>
                                    <td>
                                        {complaint.address}<br />
                                        {complaint.city}<br />
                                        {complaint.state} - {complaint.pincode}
                                    </td>
                                </tr>

                                <tr>
                                    <th>Created At</th>
                                    <td>
                                        {new Date(complaint.createdAt).toLocaleString()}
                                    </td>
                                </tr>

                            </tbody>


                        </table>
                         <div className="mt-3">

                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => window.history.back()}
                                                >
                                                    ← Back
                                                </button>

                                            </div>

                    </div>

                </div>

            </div>

        </CitizenLayout>

    );

}

export default ComplaintDetails;