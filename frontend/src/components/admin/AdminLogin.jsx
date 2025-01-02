import "./admin.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/admin/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("adminToken", res.data.token);
          window.location.href = "/admin/users";
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 400) {
          setErrMessage("Invalid Credentials");
        }
      });

    setLoading(false);
    // console.log(res);
  };

  return (
    <div className="admin-login-body">
        <div className="admin-navbar">
            <h1>InstaGO</h1>
            <Link to="/">Home</Link>
        </div>
    <div className="form-outer-cont admin-body-inner">
        <h2 className="admin-login-heading">Admin Login</h2>
      {isLoading && (
        <div className="loader-cont">
          <div className="loader"></div>
        </div>
      )}
      <p className="error-message">{errMessage}</p>
      <form className="form-inner-cont" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="username-input">
          Username
        </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          className="form-input"
          id="username-input"
        />
        <label className="form-label" htmlFor="password-input">
          Password
        </label>
        <div className="password-input-cont">
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="password"
            value={formData.password}
            className="form-input"
            id="password-input"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="eye-button"
          >
            <img
              src={
                showPassword ? "/icons/eye-open.svg" : "/icons/eye-close.svg"
              }
              className="password-show-eye"
            />
          </div>
        </div>
        <div className="forget-pass-cont">Forget Password?</div>
        <button className="continue-button" type="submit">
          Log in
        </button>
      </form>
    </div>
    </div>
  );
}
