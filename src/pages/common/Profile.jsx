import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileService from "../../services/ProfileService";

function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        console.log("EDIT MODE:", editMode);
    }, [editMode]);


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    // =========================
    // LOAD PROFILE
    // =========================

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);

            const response = await ProfileService.getProfile();

            console.log("PROFILE RESPONSE:", response.data);

            setProfile(response.data);

            setFormData({
                firstName: response.data.firstName || "",
                lastName: response.data.lastName || "",
                phoneNumber: response.data.phoneNumber || "",
                address: response.data.address || "",
                city: response.data.city || "",
                state: response.data.state || "",
                pincode: response.data.pincode || ""
            });

        } catch (error) {

            console.log("PROFILE ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to load profile"
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // HANDLE INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        console.log("CHANGED:", name, value);

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // =========================
    // UPDATE PROFILE
    // =========================

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            console.log("UPDATING PROFILE:", formData);

            const response =
                await ProfileService.updateProfile(formData);

            console.log("UPDATED PROFILE:", response.data);

            setProfile(response.data);

            setFormData({
                firstName: response.data.firstName || "",
                lastName: response.data.lastName || "",
                phoneNumber: response.data.phoneNumber || "",
                address: response.data.address || "",
                city: response.data.city || "",
                state: response.data.state || "",
                pincode: response.data.pincode || ""
            });

            setEditMode(false);

            toast.success("Profile updated successfully");

        } catch (error) {

            console.log("UPDATE PROFILE ERROR:", error);

            console.log(
                "STATUS:",
                error.response?.status
            );

            console.log(
                "DATA:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to update profile"
            );

        }

    };


    // =========================
    // CANCEL EDITING
    // =========================

    const handleCancel = () => {

        if (profile) {

            setFormData({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                phoneNumber: profile.phoneNumber || "",
                address: profile.address || "",
                city: profile.city || "",
                state: profile.state || "",
                pincode: profile.pincode || ""
            });

        }

        setEditMode(false);

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="text-center mt-5">
                <h4>Loading Profile...</h4>
            </div>
        );

    }


    // =========================
    // PROFILE NOT FOUND
    // =========================

    if (!profile) {

        return (
            <div className="text-center mt-5">
                <h4>Profile not available</h4>
            </div>
        );

    }


    // =========================
    // PAGE
    // =========================

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        My Profile
                    </h2>

                    <p className="text-muted">
                        View and manage your account information
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

            </div>


            {/* PROFILE CARD */}

            <div className="card shadow-sm">

                <div className="card-body p-4">


                    {/* PROFILE HEADER */}

                    <div className="d-flex align-items-center mb-4">

                        <div
                            className="rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                width: "80px",
                                height: "80px",
                                background: "#2563eb",
                                color: "white",
                                fontSize: "35px"
                            }}
                        >
                            {profile.firstName
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </div>


                        <div className="ms-3">

                            <h4 className="mb-1">

                                {profile.firstName}{" "}
                                {profile.lastName}

                            </h4>

                            <p className="text-muted mb-0">

                                {profile.email}

                            </p>

                        </div>

                    </div>


                    {/* FORM */}

                    <form onSubmit={handleUpdate}>

                        <div className="row">


                            {/* FIRST NAME */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    First Name
                                </label>

                               <input
                                   type="text"
                                   className="form-control"
                                   name="firstName"
                                   value={formData.firstName}
                                   onChange={handleChange}
                                   readOnly={false}
                               />
                            </div>


                            {/* LAST NAME */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={profile.email}
                                    readOnly
                                />

                            </div>


                            {/* PHONE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    readOnly={false}
                                />
                            </div>


                            {/* ADDRESS */}

                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />

                            </div>


                            {/* CITY */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    City
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />

                            </div>


                            {/* STATE */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    State
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />

                            </div>


                            {/* PINCODE */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="mt-3">

                            {!editMode ? (

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("EDIT BUTTON CLICKED");
                                        setEditMode(true);
                                    }}
                                >
                                    Edit Profile
                                </button>

                            ) : (

                                <>

                                    <button
                                        type="submit"
                                        className="btn btn-success me-2"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>

                                </>

                            )}

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Profile;