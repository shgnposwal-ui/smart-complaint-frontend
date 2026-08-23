import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState({
       firstName: "",
       lastName: "",
       email: "",
       password: "",
       phoneNumber: "",
       address: "",
       city: "",
       state: "",
       pincode: "",
       role: "CITIZEN"
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
            console.log(formData);

            await AuthService.register(formData);

            toast.success("Registration Successful");

            navigate("/login");

      } catch (error) {

          console.log("Complete Error:", error);

          if (error.response) {
              console.log("Status:", error.response.status);
              console.log("Response:", error.response.data);
          }

          toast.error("Registration Failed");

      } finally {

          setLoading(false);

      }

    };

    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >

            <div
                className="card shadow-lg p-4"
                style={{
                    width: "700px",
                    borderRadius: "18px"
                }}
            >

                <h2 className="text-center mb-4">
                    Smart Complaint Portal
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>First Name</label>

                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Last Name</label>

                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Phone Number</label>

                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-12 mb-3">

                            <label>Address</label>

                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-4 mb-3">

                            <label>City</label>

                            <input
                                type="text"
                                name="city"
                                className="form-control"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-4 mb-3">

                            <label>State</label>

                            <input
                                type="text"
                                name="state"
                                className="form-control"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-4 mb-3">

                            <label>Pincode</label>

                            <input
                                type="text"
                                name="pincode"
                                className="form-control"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <button
                        className="btn btn-primary w-100 mt-3"
                        disabled={loading}
                    >

                        {

                            loading

                                ?

                                "Registering..."

                                :

                                "Register"

                        }

                    </button>

                    <p className="text-center mt-3">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ms-2"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Register;