import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import AuthService from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            toast.error("Please fill all fields");

            return;
        }

        try {

            setLoading(true);

            const response = await AuthService.login(formData);

            console.log("========== LOGIN RESPONSE ==========");
            console.log(response.data);

            login(response.data);

            toast.success("Login Successful");

            switch (response.data.role) {

                case "ADMIN":
                    navigate("/admin");
                    break;

                case "OFFICER":
                    navigate("/officer");
                    break;

                case "CITIZEN":
                default:
                    navigate("/citizen");
                    break;
            }

        } catch (error) {

            console.log("========== LOGIN ERROR ==========");
            console.log(error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Response Data:", error.response.data);

            } else {

                console.log("No response received");
                console.log("Message:", error.message);
            }

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-wrapper">

                {/* LEFT SIDE */}

                <div className="login-left">

                    <div className="login-logo">
                        🏛️
                    </div>

                    <h1>
                        Smart Complaint Portal
                    </h1>

                    <p>
                        A smart and transparent platform for
                        submitting, tracking and managing
                        public complaints efficiently.
                    </p>

                    <div className="login-features">

                        <div className="login-feature">
                            <span>✓</span>
                            <span>Submit complaints easily</span>
                        </div>

                        <div className="login-feature">
                            <span>✓</span>
                            <span>Track complaint status</span>
                        </div>

                        <div className="login-feature">
                            <span>✓</span>
                            <span>Connect with responsible officers</span>
                        </div>

                        <div className="login-feature">
                            <span>✓</span>
                            <span>Transparent complaint management</span>
                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="login-right">

                    <h2 className="login-title">
                        Welcome Back
                    </h2>

                    <p className="login-subtitle">
                        Login to access your account
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* EMAIL */}

                        <div className="mb-4">

                            <label className="login-label">
                                Email Address
                            </label>

                            <input
                                type="email"
                                className="login-input"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* PASSWORD */}

                        <div className="mb-4">

                            <label className="login-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="login-input"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Logging In..."
                                : "Login"
                            }

                        </button>

                    </form>

                    {/* REGISTER */}

                    <div className="login-register">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="ms-2"
                        >
                            Create Account
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;