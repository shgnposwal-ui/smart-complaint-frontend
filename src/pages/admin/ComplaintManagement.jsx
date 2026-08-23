import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ComplaintService from "../../services/ComplaintService";
import OfficerService from "../../services/OfficerService";
import { toast } from "react-toastify";

function ComplaintManagement() {

    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [priorityFilter, setPriorityFilter] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [officers, setOfficers] = useState([]);

    const [selectedOfficer, setSelectedOfficer] = useState("");

    const [showAssignModal, setShowAssignModal] = useState(false);

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {

        try {

            const response = await ComplaintService.getAllComplaints();

            console.log("========== RESPONSE ==========");
            console.log(response);

            console.log("========== DATA ==========");
            console.log(response.data);

            console.log("========== LENGTH ==========");
            console.log(response.data.length);

            setComplaints(response.data);

        } catch (error) {

            console.log("========== ERROR ==========");
            console.log(error);

        }
    };
    const filteredComplaints = complaints.filter((complaint) => {

        const matchesSearch =
            complaint.complaintNumber.toLowerCase().includes(search.toLowerCase()) ||
            complaint.citizenName.toLowerCase().includes(search.toLowerCase()) ||
            complaint.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "" || complaint.category === categoryFilter;

        const matchesStatus =
            statusFilter === "" || complaint.status === statusFilter;

        const matchesPriority =
            priorityFilter === "" || complaint.priority === priorityFilter;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesPriority
        );

    });
    const getStatusBadge = (status) => {

        switch (status) {

            case "PENDING":
                return <span className="badge bg-warning text-dark">Pending</span>;

            case "IN_PROGRESS":
                return <span className="badge bg-primary">In Progress</span>;

            case "RESOLVED":
                return <span className="badge bg-success">Resolved</span>;

            case "REJECTED":
                return <span className="badge bg-danger">Rejected</span>;

            default:
                return <span className="badge bg-secondary">{status}</span>;
        }

    };
    const getPriorityBadge = (priority) => {

        switch (priority) {

            case "HIGH":
                return <span className="badge bg-danger">High</span>;

            case "MEDIUM":
                return <span className="badge bg-warning text-dark">Medium</span>;

            case "LOW":
                return <span className="badge bg-success">Low</span>;

            default:
                return <span className="badge bg-secondary">{priority}</span>;
        }

    };
    const handleViewComplaint = (complaint) => {

        setSelectedComplaint(complaint);

        setShowModal(true);

    };
    const loadOfficers = async () => {

        try {

            const response = await OfficerService.getAllOfficers();

            setOfficers(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const handleAssignClick = (complaint) => {

        setSelectedComplaint(complaint);

        setSelectedOfficer("");

        loadOfficers();

        setShowAssignModal(true);

    };
    const assignOfficer = async () => {

        if (!selectedOfficer) {

            toast.error("Please select an officer");

            return;

        }

        try {

            await ComplaintService.assignOfficer(
                selectedComplaint.complaintNumber,
                selectedOfficer
            );

            toast.success("Officer Assigned Successfully");

            setShowAssignModal(false);

            loadComplaints();

        } catch (error) {

            console.log(error);

            toast.error("Failed to assign officer");

        }

    };

    return (
        <DashboardLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">
                        Complaint Management
                    </h2>

                </div>

                <div className="card shadow border-0">

                    <div className="card-body">
                    <div className="row mb-4">

                        <div className="col-md-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search Complaint"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >

                                <option value="">All Categories</option>
                                <option value="ROAD">Road</option>
                                <option value="WATER">Water</option>
                                <option value="SANITATION">Sanitation</option>
                                <option value="STREET_LIGHT">Street Light</option>

                            </select>

                        </div>

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >

                                <option value="">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="RESOLVED">Resolved</option>

                            </select>

                        </div>

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                            >

                                <option value="">All Priority</option>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>

                            </select>

                        </div>

                    </div>

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                            <tr>

                                <th>Complaint No.</th>

                                <th>Citizen</th>

                                <th>Category</th>

                                <th>Priority</th>

                                <th>Status</th>

                                <th>Officer</th>
                                <th className="text-center">Action</th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                filteredComplaints.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >

                                                No Complaints Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    (

                                        filteredComplaints.map((complaint) => (

                                            <tr key={complaint.id}>

                                                <td>{complaint.complaintNumber}</td>

                                                <td>{complaint.citizenName}</td>

                                                <td>{complaint.category}</td>

                                                <td>{getPriorityBadge(complaint.priority)}</td>

                                                <td>{getStatusBadge(complaint.status)}</td>

                                               <td>
                                                   {complaint.assignedOfficer || "Not Assigned"}
                                               </td>

                                               <td className="text-center">

                                                  <button
                                                      className="btn btn-sm btn-outline-primary me-2"
                                                      onClick={() => handleViewComplaint(complaint)}
                                                  >
                                                      View
                                                  </button>

                                                   <button
                                                       className="btn btn-sm btn-outline-success"
                                                       onClick={() => handleAssignClick(complaint)}
                                                   >
                                                       Assign
                                                   </button>

                                               </td>

                                            </tr>

                                        ))

                                    )

                            }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
            {
                showModal && selectedComplaint && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            background: "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-lg">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h4>

                                        Complaint Details

                                    </h4>

                                    <button
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="row">

                                        <div className="col-md-6">

                                            <p><strong>Complaint No:</strong></p>
                                            <p>{selectedComplaint.complaintNumber}</p>

                                            <p><strong>Citizen:</strong></p>
                                            <p>{selectedComplaint.citizenName}</p>

                                            <p><strong>Category:</strong></p>
                                            <p>{selectedComplaint.category}</p>

                                            <p><strong>Priority:</strong></p>
                                            <p>{selectedComplaint.priority}</p>

                                        </div>

                                        <div className="col-md-6">

                                            <p><strong>Status:</strong></p>
                                            <p>{selectedComplaint.status}</p>

                                            <p><strong>Officer:</strong></p>
                                            <p>
                                                {selectedComplaint.assignedOfficer ||
                                                    "Not Assigned"}
                                            </p>

                                            <p><strong>City:</strong></p>
                                            <p>{selectedComplaint.city}</p>

                                            <p><strong>Pincode:</strong></p>
                                            <p>{selectedComplaint.pincode}</p>

                                        </div>

                                    </div>

                                    <hr />

                                    <h6>Description</h6>

                                    <p>

                                        {selectedComplaint.description}

                                    </p>

                                    <hr />

                                    <h6>Officer Remarks</h6>

                                    <p>

                                        {selectedComplaint.officerRemarks ||
                                            "No Remarks"}

                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >

                                        Close

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }
            {
                showAssignModal && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            background: "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h4>

                                        Assign Officer

                                    </h4>

                                    <button
                                        className="btn-close"
                                        onClick={() => setShowAssignModal(false)}
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Complaint

                                        </label>

                                        <input
                                            className="form-control"
                                            value={selectedComplaint?.complaintNumber || ""}
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Select Officer

                                        </label>

                                        <select
                                            className="form-select"
                                            value={selectedOfficer}
                                            onChange={(e) =>
                                                setSelectedOfficer(e.target.value)
                                            }
                                        >

                                            <option value="">

                                                Select Officer

                                            </option>

                                            {

                                                officers.map((officer) => (

                                                    <option
                                                        key={officer.id}
                                                        value={officer.id}
                                                    >

                                                        {officer.fullName}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowAssignModal(false)}
                                    >

                                        Cancel

                                    </button>

                                    <button
                                        className="btn btn-success"
                                        onClick={assignOfficer}
                                    >

                                        Assign Officer

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

        </DashboardLayout>
    );
}

export default ComplaintManagement;