import React, { useState } from "react";
import { MDBIcon, MDBAlert } from "mdbreact";
import Header from "../Header";
import axios from "axios";
import { SOURCE } from "../Source";
import logo from "../Asset/img/iqlogo.png";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";

const SignUp = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //sign up steps
  const [step, setStep] = useState(1);
  const [focus, setFocus] = useState({
    companyName: false,
    email: false,
    id: false,
    address: false,
    phoneNumber: false,
    password: false,
    password2: false,
  });

  const handleFocusEvent = (type, name) => {
    switch (name) {
      case "email":
        if (type === "focus") {
          return setFocus({ ...focus, email: true });
        }
        if (type === "blur") {
          if (email.length === 0) return setFocus({ ...focus, email: false });
        }
        break;
      case "address":
        if (type === "focus") {
          return setFocus({ ...focus, address: true });
        }
        if (type === "blur") {
          if (address.length === 0)
            return setFocus({ ...focus, address: false });
        }
        break;
      case "phoneNumber":
        if (type === "focus") {
          return setFocus({ ...focus, phoneNumber: true });
        }
        if (type === "blur") {
          if (phoneNumber.length === 0)
            return setFocus({ ...focus, phoneNumber: false });
        }
        break;
      case "name":
        if (type === "focus") {
          return setFocus({ ...focus, companyName: true });
        }
        if (type === "blur") {
          if (companyName.length === 0)
            return setFocus({ ...focus, companyName: false });
        }
        break;
      case "password":
        if (type === "focus") {
          return setFocus({ ...focus, password: true });
        }
        if (type === "blur") {
          if (password.length === 0)
            return setFocus({ ...focus, password: false });
        }
        break;
      case "id":
        if (type === "focus") {
          return setFocus({ ...focus, id: true });
        }
        if (type === "blur") {
          if (companyId.length === 0) return setFocus({ ...focus, id: false });
        }
        break;
      case "password-2":
        if (type === "focus") {
          return setFocus({ ...focus, password2: true });
        }
        if (type === "blur") {
          if (password2.length === 0)
            return setFocus({ ...focus, password2: false });
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    setError("");
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password-2":
        setPassword2(e.target.value);
        break;
      case "phone":
        if (e.target.value === "0") return setPhoneNo(e.target.value);
        if (!Number(e.target.value) && phoneNumber.length !== 1) return;
        setPhoneNo(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "name":
        setCompanyName(e.target.value);
        break;
      case "id":
        setCompanyId(e.target.value);
        break;

      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    if (password !== password2) return setError("password do not match");
    // if (
    //   !password ||
    //   !email ||
    //   !companyId ||
    //   !companyName ||
    //   !phoneNumber ||
    //   !address
    // )
    //   return setError("All fields are required");

    setLoading(true);
    axios
      .post(SOURCE.register, {
        companyId,
        companyName,
        email,
        password,
        address,
        phoneNumber,
      })
      .then((res) => {
        if (res.data.status === 400) {
          setLoading(false);
          return setError(res.data.msg);
        }
        if (res.data.status === 401) {
          setLoading(false);
          return setError("This email/Id has been used");
        }
        console.log(res);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError("server error");
        setLoading(false);
      });
  };
  return (
    <>
      <Header active="signup" />

      <div className="hero-signup" id="target">
        <section className="banner-in-up" id="hero">
          {/* <div className="signup-container"> */}
          {success ? (
            <div className="success2login-div">
              <p className="text-white">Account created successfully</p>
              <Link to="/organization/login" className="cta-btn">
                Login
              </Link>
            </div>
          ) : (
            <div //steps start
              className={"signup-div"}
              onChange={handleChange}
            >
              <div className={loading ? "logo-line-div m-auto" : "d-none"}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: 50 }}
                  className={loading ? "rotate" : "d-none"}
                />
                <p className="text-white">please wait...</p>
              </div>
              <h3 className="text-white">{loading ? "" : "Create Account"}</h3>
              <p className="text-white">{`step ${step} of 2`}</p>
              {step === 1 ? (
                <>
                  <div //steps 0
                    className={
                      !loading ? "mt-2 inputs-labels-contents" : "d-none"
                    }
                  >
                    <label
                      for="email"
                      className={
                        focus.companyName
                          ? " label-up"
                          : "text-white label-down"
                      }
                    >
                      organization name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={companyName}
                      className=""
                      onFocus={(e) => handleFocusEvent("focus", "name")}
                      onBlur={() => handleFocusEvent("blur", "name")}
                      autoComplete="off"
                      required
                      minLength={5}
                      maxLength={20}
                    />
                  </div>
                  <div
                    className={
                      !loading ? "mt-2 inputs-labels-contents mt-3" : "d-none"
                    }
                  >
                    <label
                      for="email"
                      className={
                        focus.email ? " label-up" : "text-white label-down"
                      }
                    >
                      organization email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      className=""
                      onFocus={(e) => handleFocusEvent("focus", "email")}
                      autoComplete="off"
                      required
                      onBlur={(e) => handleFocusEvent("blur", "email")}
                    />
                  </div>
                  <div
                    className={
                      !loading ? "mt-2 inputs-labels-contents mt-3" : "d-none"
                    }
                  >
                    <label
                      for="email"
                      className={
                        focus.id ? " label-up" : "text-white label-down"
                      }
                    >
                      organization Id
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={companyId}
                      className=""
                      onFocus={(e) => handleFocusEvent("focus", "id")}
                      onBlur={() => handleFocusEvent("blur", "id")}
                      autoComplete="off"
                      required
                      minLength={5}
                      maxLength={10}
                    />
                  </div>
                  <div
                    className={
                      !loading ? "mt-2 inputs-labels-contents mt-3" : "d-none"
                    }
                  >
                    <label
                      for="email"
                      className={
                        focus.address ? " label-up" : "text-white label-down"
                      }
                    >
                      address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={address}
                      className=""
                      onFocus={(e) => handleFocusEvent("focus", "address")}
                      onBlur={() => handleFocusEvent("blur", "address")}
                      autoComplete="off"
                      required
                      minLength={5}
                      maxLength={30}
                    />
                  </div>
                </>
              ) : null}
              {/* step one ends */}
              {step === 2 ? (
                <>
                  <div
                    className={
                      !loading ? "mt-2 inputs-labels-contents" : "d-none"
                    }
                  >
                    <label
                      for="email"
                      className={
                        focus.phoneNumber
                          ? " label-up"
                          : "text-white label-down"
                      }
                    >
                      phone No
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={phoneNumber}
                      className=""
                      onFocus={(e) => handleFocusEvent("focus", "phoneNumber")}
                      onBlur={() => handleFocusEvent("blur", "phoneNumber")}
                      autoComplete="off"
                      required
                      minLength={8}
                      maxLength={11}
                    />
                  </div>
                  <div
                    className={
                      !loading ? "mt-2 inputs-labels-contents" : "d-none"
                    }
                  >
                    <label
                      for="email"
                      className={
                        focus.password ? " label-up" : "text-white label-down"
                      }
                    >
                      password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      className=""
                      onFocus={(e) => handleFocusEvent("focus", "password")}
                      onBlur={() => handleFocusEvent("blur", "password")}
                      autoComplete="off"
                      required
                      minLength={8}
                      maxLength={15}
                    />
                  </div>
                  <div
                    className={
                      !loading ? "mt-2 inputs-labels-contents" : "d-none"
                    }
                  >
                    <label
                      for="password"
                      className={
                        focus.password2 ? " label-up" : "text-white label-down"
                      }
                    >
                      confirm password
                    </label>
                    <input
                      type="password"
                      name="password-2"
                      value={password2}
                      className=""
                      onFocus={(e) => handleFocusEvent("focus", "password-2")}
                      onBlur={() => handleFocusEvent("blur", "password-2")}
                      autoComplete="off"
                      required
                      minLength={8}
                      maxLength={15}
                    />
                  </div>
                  <div className="mt-2">
                    {error ? <MDBAlert color="danger">{error}</MDBAlert> : ""}
                  </div>
                </>
              ) : null}
              {/* step 1 ends */}

              <div className={loading ? "d-none " : "signup-steps"}>
                {step === 2 ? (
                  <Icon
                    className="fa fa-arrow-left text-white ml-3 float-left "
                    onClick={() => setStep(1)}
                  />
                ) : null}
                {step === 2 ? (
                  <button
                    className="btn  signup-cta-reg"
                    onClick={handleSubmit}
                    disabled={loading ? true : false}
                  >
                    Sign up
                  </button>
                ) : (
                  <Icon
                    className="fa fa-arrow-right text-white next"
                    onClick={() => setStep(2)}
                  />
                )}
              </div>
            </div>
          )}
          {/* </div> */}
        </section>
      </div>
    </>
  );
};

export default SignUp;
