import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMessage(""); // Clear previous error messages
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, formData,{
      headers: {
        'Content-Type' : "application/json"
      }
    }).then((res) => {
      if(res.status === 200) { // Use strict equality for status check
        localStorage.setItem("user", `Bearer ${res.data.token}`);
        window.location.href = "/";
      } else {
        // Handle cases where status is not 200 but not an error caught by .catch
        setErrMessage(res.data.message || "Login failed. Please try again.");
      }
    }).catch((err) => {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrMessage(err.response.data.message);
      } else if (err.response && err.response.status === 400) {
        setErrMessage("Invalid Credentials");
      } else if (err.request) {
        setErrMessage("Network error. Please check your connection.");
      } else {
        setErrMessage("An unexpected error occurred. Please try again.");
      }
    }).finally(() => {
      setLoading(false); // This will run whether the promise is resolved or rejected
    });
  };

  return (
    <div className="form-outer-cont">
      {isLoading && <div className="loader-cont">
        <div className="loader"></div>
      </div>}
      <p className="error-message">{errMessage}</p>
      <form className="form-inner-cont" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="email-input">
          E-mail
        </label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="form-input"
          id="email-input"
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
      <div className="other-opt-cont">
        <p>
          Don&apos;t have an account?
          <Link to="/account/signup" className="other-link">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
