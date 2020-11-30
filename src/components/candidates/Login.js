import React, { useState } from "react";
import { Container, Spinner } from "reactstrap";
import { MDBIcon, MDBAlert } from "mdbreact";
import axios from "axios";
import { SOURCE } from "../Source";
import Candidateboard from "./candidateboard/Candidateboard";
import { Base64 } from "js-base64";
import Notification from "../Modal/Notification";
import Header from "../Header";
import logo from "../Asset/img/iqlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [evaluationId, setEvaluationId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [islogged, setIslogged] = useState(false);
  const nav = [];

  const [focus, setFocus] = useState({
    email: false,
    id: false,
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
      case "id":
        if (type === "focus") {
          return setFocus({ ...focus, id: true });
        }
        if (type === "blur") {
          if (evaluationId.length === 0)
            return setFocus({ ...focus, id: false });
        }
        break;
      default:
        break;
    }
  };

  //notification
  const [notification, setNofication] = useState({
    state: false,
    msg: "",
    type: "",
  });

  const handleChange = (e) => {
    setError("");
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "id":
        setEvaluationId(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // clear previous session if any
    sessionStorage.clear();
    if (!email || !evaluationId)
      return setNofication({
        state: true,
        msg: "All fields are required",
        type: "error",
      });
    setLoading(true);
    axios
      .get(`${SOURCE.loginParticipants}/${evaluationId}/${email}`)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.data.msg === "success") {
          const cat = res.data.user.summary.category;
          //console.log(cat);
          let path = [];

          cat.forEach((address) => {
            path.push({ category: address.category, alias: address.alias });
          });

          sessionStorage.setItem("menu", Base64.btoa(JSON.stringify(path)));
          sessionStorage.setItem(
            "question",
            JSON.stringify(res.data.questions)
          );
          sessionStorage.setItem(
            "summary",
            JSON.stringify({
              title: res.data.user.summary.title,
              id: res.data.user.summary._id,
              duration: res.data.user.summary.duration,
              category: res.data.user.summary.category,
            })
          );
          sessionStorage.setItem(
            "candidate",
            JSON.stringify({
              name: res.data.user.participant.lastName,
              email: res.data.user.participant.email,
              id: res.data.user.participant._id,
            })
          );
          sessionStorage.setItem("auth2", res.data.token);
          // window.location.assign("/myevaluationpanel");
          setLoading(false);
          setIslogged(true);
          return;
        } else {
          setNofication({
            state: true,
            msg: res.data.msg,
            type: res.data.type,
          });
          return;
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {islogged ? (
        <Candidateboard setIslogged={setIslogged} />
      ) : (
        <>
          <Header active="evaluation" />
          <div className="hero" id="target">
            <section className="banner-in-up" id="hero">
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
                  {loading ? "Please wait" : "My Evaluation"}
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
                    className={focus.id ? " label-up" : "text-white label-down"}
                  >
                    evaluation Id
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={evaluationId}
                    className=""
                    onFocus={(e) => handleFocusEvent("focus", "id")}
                    onBlur={(e) => handleFocusEvent("blur", "id")}
                    autoComplete="off"
                    required
                    readOnly={loading ? true : false}
                  />
                </div>

                <div className="mt-2">
                  {error ? <MDBAlert color="danger">{error}</MDBAlert> : ""}
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn signup-cta mt-5 pt-1 pb-1"
                  disabled={loading ? true : false}
                >
                  Login
                </button>

                <Notification
                  open={notification.state}
                  setOpen={setNofication}
                  notification={notification}
                />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
