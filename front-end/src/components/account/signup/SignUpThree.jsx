import {useState} from "react";

export default function SignUpThree({ stepDecrease, handleChange, handleSubmit, formData }) {
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSubmitStep = (e) => {
    e.preventDefault();
    
  }

  return (
    <form onSubmit={handleSubmit} className="form-inner-cont step-cont">
      <h1 className="curr-step-title">Set password</h1>
      <label className="form-label" htmlFor="firstName">
        New Password
      </label>
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        value={formData.firstName}
        className="form-input"
        id="firstName"
      />
      
      <div className="continue-outer-cont">
        <button
          className="back-button"
          type="button"
          onClick={() => {
            stepDecrease();
          }}
        >
          &larr;
        </button>
        <button className="continue-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
