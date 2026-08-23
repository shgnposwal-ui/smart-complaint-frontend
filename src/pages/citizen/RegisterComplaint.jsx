import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ComplaintService from "../../services/ComplaintService";

function RegisterComplaint() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await ComplaintService.createComplaint(formData);

            toast.success("Complaint Registered Successfully");

            navigate("/citizen/complaints");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to Register Complaint"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="container py-4">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div className="card shadow border-0 rounded-4">

                            <div className="card-body p-5">

                                <h2 className="fw-bold text-primary mb-4">

                                    Register New Complaint

                                </h2>

                                <form onSubmit={handleSubmit}>

                                    {/* Complaint Title */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Complaint Title

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter complaint title"
                                            required
                                        />

                                    </div>

                                    {/* Category */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Category

                                        </label>

                                        <select
                                            className="form-select"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Category

                                            </option>

                                            <option value="ROAD">Road</option>

                                            <option value="WATER">Water</option>

                                            <option value="ELECTRICITY">

                                                Electricity

                                            </option>

                                            <option value="SANITATION">

                                                Sanitation

                                            </option>

                                            <option value="GARBAGE">

                                                Garbage

                                            </option>

                                            <option value="STREET_LIGHT">

                                                Street Light

                                            </option>

                                            <option value="DRAINAGE">

                                                Drainage

                                            </option>

                                            <option value="PUBLIC_TRANSPORT">

                                                Public Transport

                                            </option>

                                            <option value="OTHER">

                                                Other

                                            </option>

                                        </select>

                                    </div>

                                    {/* Priority */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Priority

                                        </label>

                                        <select
                                            className="form-select"
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Priority

                                            </option>

                                            <option value="LOW">

                                                Low

                                            </option>

                                            <option value="MEDIUM">

                                                Medium

                                            </option>

                                            <option value="HIGH">

                                                High

                                            </option>

                                            <option value="URGENT">

                                                Urgent

                                            </option>

                                        </select>

                                    </div>

                                    {/* Description */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Description

                                        </label>

                                        <textarea
                                            rows="5"
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe your complaint..."
                                            required
                                        />

                                    </div>

                                    {/* Address */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Address

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter address"
                                            required
                                        />

                                    </div>

                                    {/* City & State */}

                                    <div className="row">

                                        <div className="col-md-6">

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    City

                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    placeholder="City"
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    State

                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    placeholder="State"
                                                    required
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* Pincode */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Pincode

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="Enter pincode"
                                            required
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-bold"
                                        disabled={loading}
                                    >

                                        {

                                            loading

                                                ? "Submitting Complaint..."

                                                : "Submit Complaint"

                                        }

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default RegisterComplaint;