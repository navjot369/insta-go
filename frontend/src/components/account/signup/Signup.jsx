import { useState, useEffect, useRef } from "react";
import SignUpOne from "./SignUpOne";
import SignUpTwo from "./SignUpTwo";
import SignUpThree from "./SignUpThree";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    address: {
      line: "",
      city: "",
      state: "",
    },
    password: "",
  });
  const [step, setStep] = useState(0);
  const StepCont = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (StepCont != null) {
      StepCont.current.style.marginLeft = "-" + 250 * step + "px";
    }
  }, [step]);

  const stepIncrease = () => {
    if (step < 2) setStep(step + 1);
  };

  const stepDecrease = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (e) => {
    const target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`,
      formData,{
        headers:{
          'Content-type' : 'application/json'
        }
      }
    ).then(res => {
      if(res.status == 200) {
        setErrMessage("Account created successfully");
        setTimeout(() => {
          window.location.href = "/account/login";
        })
      }
    }).catch(err => {
      if(err.status == 400) {
        setErrMessage("Input not valid");
      }else if(err.status == 500) {
        setErrMessage("Internal server error");
      }
    })
  };

  return (
    <div className="form-outer-cont">
      <div className="step-circle-outer-cont">
        <div className="step-background-bar">
          <div></div>
        </div>
        <div className="step-circle-inner-cont">
          {[0, 1, 2].map((num) =>
            num < step ? (
              <div className="step-circle done-circle" key={num}>
                {num + 1}
              </div>
            ) : (
              <div className="step-circle not-done-circle" key={num}>
                {num + 1}
              </div>
            )
          )}
        </div>
      </div>
      {isLoading && <div className="loader-cont">
        <div className="loader"></div>
      </div>}
      <p className="error-message">{errMessage}</p>
      <div className="step-outer-cont" ref={StepCont}>
        <SignUpOne
          formData={formData}
          handleChange={handleChange}
          stepIncrease={stepIncrease}
        />
        <SignUpTwo
          formData={formData}
          handleChange={handleChange}
          stepIncrease={stepIncrease}
          stepDecrease={stepDecrease}
        />
        <SignUpThree
          formData={formData}
          handleChange={handleChange}
          stepDecrease={stepDecrease}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="other-opt-cont">
        <p>
          Already have an account?
          <Link to="/account/login" className="other-link">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
