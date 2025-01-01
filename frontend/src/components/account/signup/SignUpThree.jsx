import { useState, useEffect} from "react";
import clsx from "clsx";

export default function SignUpThree({
  stepDecrease,
  handleChange,
  handleSubmit,
  formData,
}) {
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validatePassword, setValidatePassword] = useState({
    length: false,
    capital: false,
    small: false,
    symbol: false,
    number: false,
    same: false
  });
  const [continueEnable, setContinueEnable] = useState(false);

  const validation = (pass, passV) => {
    const obj = {
      length: pass.length >= 8,
      capital: /[A-Z]/.test(pass),
      small: /[a-z]/.test(pass),
      symbol: /[@#$%&!*]/.test(pass),
      number: /[\d]/.test(pass),
      same: pass !== "" && pass === passV,
    };
    setValidatePassword(obj);
  };
  
  useEffect(() => {
    setContinueEnable(Object.values(validatePassword).every(i => i));
  }, [validatePassword])

  // const handleSubmitStep = (e) => {
  //   e.preventDefault();
  //   handleSubmit();
  // };

  return (
    <form onSubmit={handleSubmit} className="form-inner-cont step-cont">
      <h1 className="curr-step-title">Set password</h1>
      <label className="form-label" htmlFor="password">
        New Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        onChange={(e) => {
          handleChange(e);
          validation(e.target.value, verifyPassword);
        }}
        value={formData.password}
        className="form-input"
        id="password"
        required="true"
      />
      <label className="form-label" htmlFor="confirm-password">
        Confirm Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        name="confirm-password"
        onChange={(e) => {
          setVerifyPassword(e.target.value);
          validation(formData.password, e.target.value);
        }}
        value={verifyPassword}
        className="form-input"
        id="confirm-password"
        required="true"
      />
      <div className="show-password-cont">
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setShowPassword(!showPassword);
            }}
          />{" "}
          Show Password
        </label>
      </div>
      <div className="validate-password-outer">
        {validate.map((item, ind) => (
          <p key={ind} className={clsx("validate-password", {
            "done-validate-password": validatePassword[item.name]
          })}>{item.message}</p>
        ))}
      </div>

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
        <button className="continue-button" type="submit" disabled={!continueEnable}>
          Submit
        </button>
      </div>
    </form>
  );
}

const validate = [
  {
    name: "length",
    message: "Password should contain atleast 8 letters",
  },
  {
    name: "capital",
    message: "Password should contain capital letters",
  },
  {
    name: "small",
    message: "Password should contain small letters",
  },
  {
    name: "symbol",
    message: "Password should contain special symbols",
  },
  {
    name: "number",
    message: "Password should contain numbers",
  },
  {
    name: "same",
    message: "Both passwords should be same",
  },
];
