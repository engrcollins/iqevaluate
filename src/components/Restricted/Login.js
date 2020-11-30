import React, { useState } from "react";
import { Container, Spinner } from "reactstrap";
import { MDBIcon, MDBAlert } from "mdbreact";
import axios from "axios";
import business_decisions from "../Asset/svg/business_decisions.svg";
import { SOURCE } from "../Source";
import BackDrop from "../Modal/BackDrop";
import AdminPanel from "./AdminPanel";
import Header from "../Header";
import logo from "../Asset/img/iqlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [islogged, setIslogged] = useState(false);

  const nav = [
    { title: "Create Account", link: "/organization/signup", type: "int" },
    { title: "Demo", link: "https://gse-prep.herokuapp.com", type: "ext" },
  ];
  const [focus, setFocus] = useState({
    email: false,
    password: false,
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
      case "password":
        if (type === "focus") {
          return setFocus({ ...focus, password: true });
        }
        if (type === "blur") {
          if (password.length === 0)
            return setFocus({ ...focus, password: false });
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
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    if (!password || !email) return setError("All fields are required");
    setLoading(true);
    // console.log('continue')
    axios
      .post(SOURCE.siteAdmin, { email, password })
      .then((res) => {
        sessionStorage.setItem("auth", `${res.data.auth}`);
        setLoading(false);
        setIslogged(true);
      })
      .catch((err) => {
        setLoading(false);
        setError("Invalid login details");
      });
  };
  return (
    <>
      {islogged ? (
        <AdminPanel setIslogged={setIslogged} />
      ) : (
        <>
          <Header active="" />
          {/* <!-- Header ends --> */}
          <div className="hero" id="target">
            <section className="banner-in-up" id="hero">
              <div className="containerized-custom">
                <div>
                  <div className="login-div" onChange={handleChange}>
                    <div className="logo-line-div">
                      <img
                        src={logo}
                        alt="logo"
                        style={{ width: 50 }}
                        className={loading ? "rotate" : ""}
                      />
                    </div>
                    <h3 className="text-white">
                      {loading ? "Please wait" : "Login"}
                    </h3>
                    <div className="mt-5 inputs-labels-contents">
                      <label
                        for="email"
                        className={
                          focus.email ? " label-up" : "text-white label-down"
                        }
                      >
                        email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className=""
                        onFocus={(e) => handleFocusEvent("focus", "email")}
                        onBlur={(e) => handleFocusEvent("blur", "email")}
                        autoComplete="off"
                        required
                        readOnly={loading ? true : false}
                      />
                    </div>
                    <div className="mt-5 inputs-labels-contents">
                      <label
                        for="email"
                        className={
                          focus.password ? " label-up" : "text-white label-down"
                        }
                      >
                        accessId
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        className=""
                        onFocus={(e) => handleFocusEvent("focus", "password")}
                        onBlur={(e) => handleFocusEvent("blur", "password")}
                        autoComplete="off"
                        readOnly={loading ? true : false}
                        required
                      />
                    </div>
                    <div className="mt-2">
                      {error ? <MDBAlert color="danger">{error}</MDBAlert> : ""}
                    </div>

                    <button
                      className="btn signup-cta mt-5 pt-1 pb-1"
                      onClick={handleSubmit}
                      disabled={loading ? true : false}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
