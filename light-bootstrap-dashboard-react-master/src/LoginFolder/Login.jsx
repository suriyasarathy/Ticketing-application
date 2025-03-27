import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const  response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("LoggedIn", "true");
        localStorage.setItem("role_id", data.user.role_id); // Store role_id
        localStorage.setItem("role", data.user.role);       // Store role name
      
        // Log the value directly from localStorage
  // Check what's stored in localStorage
      
        // Redirect based on role_id
        if (Number(data.user.role_id) === 5) {
          navigate("/admin/dashboard"); // Admin
        } else {
          navigate("/ProjectList"); // Normal User
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
      
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
 


  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Redirect to the forgot password page
  };
console.log(localStorage.getItem("user_id"));
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4" style={{ color: "#333" }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-100 ${loading ? "disabled" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <div className="alert alert-danger text-center mt-3" role="alert">
            {error}
          </div>
        )}
        <div className="text-center mt-3">
          <button
            className="btn btn-link p-0"
            style={{ textDecoration: "none", color: "#007bff" }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
