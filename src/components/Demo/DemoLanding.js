import React, { useState } from "react";
import { Container, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { MDBIcon, MDBAlert } from "mdbreact";
import axios from "axios";
import { SOURCE } from "../Source";
import Notification from "../Modal/Notification";
import logo from "../Asset/img/iqlogo.png";
import Header from "../Header";

const DemoLanding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  //notification
  const [notification, setNofication] = useState({
    state: false,
    msg: "",
    type: "",
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
      .post(SOURCE.login, { email, password })
      .then((res) => {
        sessionStorage.setItem("auth", `${res.data.auth}`);
        sessionStorage.setItem("user", `${res.data.user}`);
        window.location.assign("/dashboard");
        setLoading(false);
        //console.log(res)
      })
      .catch((err) => {
        setLoading(false);
        setError("Invalid login details");
      });
  };
  return (
    <>
      <Header active="demo" />
      {/* <!-- Header ends --> */}
      <div className="hero" id="target">
        <section className="banner-in-up" id="hero">
          {/* <div className="containerized-custom"> */}
          <div className="login-div" onChange={handleChange}>
            <div className="logo-line-div">
              <img
                src={logo}
                alt="logo"
                style={{ width: 50 }}
                className={loading ? "rotate" : ""}
              />
            </div>
            <h3 className="text-white">{loading ? "Please wait" : "Login"}</h3>
            <div className="mt-5 inputs-labels-contents">
              <label
                for="email"
                className={focus.email ? " label-up" : "text-white label-down"}
              >
                Organization email
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
                password
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

          {/* </div> */}
        </section>
      </div>
      {/*  */}
      <Notification
        open={notification.state}
        setOpen={setNofication}
        notification={notification}
      />
    </>
  );
};

export default DemoLanding;
