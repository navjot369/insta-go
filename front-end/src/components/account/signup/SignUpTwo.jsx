export default function SignUpTwo({
  stepDecrease,
  stepIncrease,
  handleChange,
  formData,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    stepIncrease();
  };

  const handleAddressChange = (e) => {
    const target = e.target;
    const newAddress = {...formData.address, [target.name]:target.value};
    handleChange({target: {name: "address", value: newAddress}})
  };

  return (
    <form onSubmit={handleSubmit} className="form-inner-cont step-cont">
      <h1 className="curr-step-title">Enter Contact Details</h1>
      <label className="form-label" htmlFor="phone">
        Phone Number
      </label>
      <input
        type="text"
        name="phone"
        onChange={handleChange}
        value={formData.phone}
        className="form-input"
        id="phone"
      />
      <label className="form-label" htmlFor="addressLine">
        Address Line
      </label>
      <input
        type="text"
        name="line"
        onChange={handleAddressChange}
        value={formData.address.line}
        className="form-input"
        id="addressLine"
      />
      <label className="form-label" htmlFor="city">
        City
      </label>
      <input
        name="city"
        onChange={handleAddressChange}
        value={formData.address.city}
        className="form-input"
        id="city"
      />
      <label className="form-label" htmlFor="state">
        State
      </label>
      <input
        name="state"
        onChange={handleAddressChange}
        value={formData.address.state}
        className="form-input"
        id="state"
      />
      <div className="continue-outer-cont">
        <button className="back-button" type="button" onClick={() => {stepDecrease()}}>
          &larr;
        </button>
        <button className="continue-button" type="submit">
          Next &rarr;
        </button>
      </div>
    </form>
  );
}
