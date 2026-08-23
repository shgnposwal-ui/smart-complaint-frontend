import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    FaClipboardList,
    FaSearch,
    FaSave,
    FaEye
} from "react-icons/fa";

import OfficerService from "../../services/OfficerService";

function OfficerComplaints() {

    const [complaints, setComplaints] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [savingComplaint, setSavingComplaint] = useState(null);


    useEffect(() => {

        loadComplaints();

    }, []);


    const loadComplaints = async () => {

        try {

            setLoading(true);

            const response =
                await OfficerService.getAssignedComplaints();

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load complaints");

        } finally {

            setLoading(false);

        }

    };


    const handleStatusChange = (index, value) => {

        const updated = [...complaints];

        updated[index] = {
            ...updated[index],
            status: value
        };

        setComplaints(updated);

    };


    const handleRemarksChange = (index, value) => {

        const updated = [...complaints];

        updated[index] = {
            ...updated[index],
            officerRemarks: value
        };

        setComplaints(updated);

    };


    const saveComplaint = async (complaint) => {

        try {

            setSavingComplaint(
                complaint.complaintNumber
            );

            await OfficerService.updateComplaintStatus(
                complaint.complaintNumber,
                {
                    status: complaint.status,
                    remarks: complaint.officerRemarks
                }
            );

            toast.success(
                "Complaint updated successfully"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable to update complaint"
            );

        } finally {

            setSavingComplaint(null);

        }

    };


    const filteredComplaints =
        complaints.filter((complaint) => {

            const searchText =
                search.toLowerCase();

            return (

                complaint.complaintNumber
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                complaint.title
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                complaint.priority
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                complaint.status
                    ?.toLowerCase()
                    .includes(searchText)

            );

        });


    const getStatusBadge = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-warning text-dark";

            case "IN_PROGRESS":
                return "bg-info text-dark";

            case "RESOLVED":
                return "bg-success";

            default:
                return "bg-secondary";

        }

    };


    const getPriorityBadge = (priority) => {

        switch (priority) {

            case "HIGH":
                return "bg-danger";

            case "MEDIUM":
                return "bg-warning text-dark";

            case "LOW":
                return "bg-success";

            default:
                return "bg-secondary";

        }

    };


    return (

        <div
            className="container-fluid"
            style={{
                background: "#f8fafc",
                minHeight: "calc(100vh - 70px)",
                padding: "30px"
            }}
        >

            {/* Header */}

            <div
                className="d-flex justify-content-between align-items-center mb-4"
            >

                <div>

                    <div className="d-flex align-items-center gap-2">

                        <FaClipboardList
                            size={28}
                            color="#2563eb"
                        />

                        <h2
                            className="fw-bold mb-0"
                            style={{
                                color: "#1e293b"
                            }}
                        >
                            Assigned Complaints
                        </h2>

                    </div>

                    <p
                        className="mt-2 mb-0"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Review and manage complaints assigned to you.
                    </p>

                </div>

                <div
                    className="badge bg-primary"
                    style={{
                        fontSize: "14px",
                        padding: "10px 15px"
                    }}
                >
                    {complaints.length} Complaints
                </div>

            </div>


            {/* Search */}

            <div
                className="card border-0 shadow-sm mb-4"
                style={{
                    borderRadius: "12px"
                }}
            >

                <div className="card-body p-3">

                    <div
                        className="input-group"
                        style={{
                            maxWidth: "500px"
                        }}
                    >

                        <span className="input-group-text bg-white">

                            <FaSearch
                                color="#64748b"
                            />

                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search complaint number, title, priority..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

            </div>


            {/* Loading */}

            {loading ? (

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p
                        className="mt-3"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Loading assigned complaints...
                    </p>

                </div>

            ) : filteredComplaints.length === 0 ? (

                /* Empty State */

                <div
                    className="card border-0 shadow-sm text-center py-5"
                    style={{
                        borderRadius: "12px"
                    }}
                >

                    <FaClipboardList
                        size={45}
                        color="#94a3b8"
                    />

                    <h5 className="mt-3 fw-bold">
                        No complaints found
                    </h5>

                    <p
                        style={{
                            color: "#64748b"
                        }}
                    >
                        {search
                            ? "Try a different search term."
                            : "There are currently no complaints assigned to you."
                        }
                    </p>

                </div>

            ) : (

                /* Complaints Table */

                <div
                    className="card border-0 shadow-sm"
                    style={{
                        borderRadius: "12px",
                        overflow: "hidden"
                    }}
                >

                    <div className="table-responsive">

                        <table
                            className="table table-hover align-middle mb-0"
                        >

                            <thead
                                style={{
                                    background: "#0f172a",
                                    color: "white"
                                }}
                            >

                                <tr>

                                    <th className="px-4 py-3">
                                        Complaint No.
                                    </th>

                                    <th>
                                        Title
                                    </th>

                                    <th>
                                        Priority
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Officer Remarks
                                    </th>

                                    <th className="text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredComplaints.map(
                                    (complaint) => {

                                        const originalIndex =
                                            complaints.findIndex(
                                                c =>
                                                    c.complaintNumber ===
                                                    complaint.complaintNumber
                                            );

                                        return (

                                            <tr
                                                key={
                                                    complaint.complaintNumber
                                                }
                                            >

                                                {/* Complaint Number */}

                                                <td className="px-4">

                                                    <div
                                                        className="fw-bold"
                                                        style={{
                                                            color: "#2563eb"
                                                        }}
                                                    >
                                                        {
                                                            complaint.complaintNumber
                                                        }
                                                    </div>

                                                </td>


                                                {/* Title */}

                                                <td>

                                                    <div
                                                        className="fw-semibold"
                                                        style={{
                                                            color: "#334155"
                                                        }}
                                                    >
                                                        {
                                                            complaint.title
                                                        }
                                                    </div>

                                                </td>


                                                {/* Priority */}

                                                <td>

                                                    <span
                                                        className={`badge ${getPriorityBadge(
                                                            complaint.priority
                                                        )}`}
                                                    >
                                                        {
                                                            complaint.priority
                                                        }
                                                    </span>

                                                </td>


                                                {/* Status */}

                                                <td>

                                                    <select
                                                        className="form-select"
                                                        style={{
                                                            minWidth: "140px"
                                                        }}
                                                        value={
                                                            complaint.status
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                originalIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="PENDING">
                                                            Pending
                                                        </option>

                                                        <option value="IN_PROGRESS">
                                                            In Progress
                                                        </option>

                                                        <option value="RESOLVED">
                                                            Resolved
                                                        </option>

                                                    </select>

                                                    <span
                                                        className={`badge mt-2 ${getStatusBadge(
                                                            complaint.status
                                                        )}`}
                                                    >
                                                        {
                                                            complaint.status
                                                        }
                                                    </span>

                                                </td>


                                                {/* Remarks */}

                                                <td>

                                                    <textarea
                                                        className="form-control"
                                                        rows="2"
                                                        placeholder="Add remarks..."
                                                        value={
                                                            complaint.officerRemarks ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleRemarksChange(
                                                                originalIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: "220px",
                                                            resize: "vertical"
                                                        }}
                                                    />

                                                </td>


                                                {/* Action */}

                                                <td className="text-center">

                                                    <button
                                                        className="btn btn-success btn-sm d-inline-flex align-items-center gap-2"
                                                        disabled={
                                                            savingComplaint ===
                                                            complaint.complaintNumber
                                                        }
                                                        onClick={() =>
                                                            saveComplaint(
                                                                complaint
                                                            )
                                                        }
                                                    >

                                                        {savingComplaint ===
                                                        complaint.complaintNumber ? (

                                                            <>
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                />

                                                                Saving...

                                                            </>

                                                        ) : (

                                                            <>
                                                                <FaSave />

                                                                Save

                                                            </>

                                                        )}

                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>

    );

}

export default OfficerComplaints;