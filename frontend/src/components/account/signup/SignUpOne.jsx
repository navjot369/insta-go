export default function SignUpOne({ stepIncrease, handleChange, formData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    stepIncrease();
  };

  return (
    <form onSubmit={handleSubmit} className="form-inner-cont step-cont">
        <h1 className="curr-step-title">Enter Basic Details</h1>
      <label className="form-label" htmlFor="firstName">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        value={formData.firstName}
        className="form-input"
        id="firstName"
        required="true"
      />
      <label className="form-label" htmlFor="lastName">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        value={formData.lastName}
        className="form-input"
        id="lastName"
      />
      <label className="form-label" htmlFor="dob">
        Date of Birth
      </label>
      <input
        name="dob"
        type="date"
        onChange={handleChange}
        value={formData.dob}
        className="form-input"
        id="dob"
        required="true"
      />
      <label className="form-label" htmlFor="email">
        E-mail
      </label>
      <input
        name="email"
        onChange={handleChange}
        value={formData.email}
        className="form-input"
        id="email"
        required="true"
      />
      <button className="continue-button" type="submit">Next &rarr;</button>
    </form>
  );
}
