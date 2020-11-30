import React, { useState } from "react";
import Webcam from "./Webcam";
import Timer from "./Timer";
import TimerPreset from "./TimerPreset";
import { Base64 } from "js-base64";
import axios from "axios";
import { SOURCE } from "../../../Source";
import Notification from "./Notification";
import Backdrop from "../../../Modal/BackDrop";

const Header = ({ setTimeInitiated, setIslogged }) => {
  const [start, setStart] = useState(false);
  const [drop, setDrop] = useState(false);

  //notification
  const [notification, setNofication] = useState({
    state: false,
    msg: "",
    type: "",
  });

  const summary = JSON.parse(sessionStorage.getItem("summary"));
  const duration = summary.duration;
  const vaultID = summary.id;
  const scoreParams = summary.category;

  const candidate = JSON.parse(sessionStorage.getItem("candidate"));
  const candidateID = candidate.id;

  const menuKeys = JSON.parse(Base64.atob(sessionStorage.getItem("menu")));
  const categories = [];

  menuKeys.forEach((item) => {
    categories.push(item.category);
  });

  const handleTimeStart = () => {
    sessionStorage.setItem("time", duration * 1000 * 60);
    setStart(!start);
    setTimeInitiated(true);
    window.location.assign(`/myevaluationpanel#/${categories[0]}`);
  };
  //Handler /// Resolving answers in each category to be in arrays
  const resolver = (arr) => {
    let resolved_ans = [];
    let resolved_container = [];

    arr.map((element) => {
      let qtnId = element.id;
      //checkin if this question had been resolved
      let exist = resolved_ans.find((item) => item.id === qtnId);
      // if it has not been rsolved
      if (!exist) {
        // get the sets of answers from the same question
        let sets = arr.filter((item) => item.id === qtnId);
        for (let j = 0; j < sets.length; ++j) {
          resolved_container.push(`${sets[j].answers}`);
        }
        resolved_ans.push({
          serial: element.serial,
          // num: numIndex,
          answers: resolved_container,
          id: element.id,
        });
        // empty the container to avoid duplicates
        resolved_container = [];
      }
    });
    return resolved_ans;
  };

  const handleEnd = () => {
    //setStart(!start)
    //get from sessions
    let data = {};
    let answers = {};
    let token = sessionStorage.getItem("auth2");
    categories.forEach((item) => {
      answers[`${item}`] = JSON.parse(sessionStorage.getItem(`${item}`));
      answers[`${item}`] = JSON.parse(sessionStorage.getItem(`${item}`))
        ? resolver(answers[`${item}`])
        : [];
    });
    data.candidateID = candidateID;
    data.vaultID = vaultID;
    data.answers = answers;
    data.token = token;
    data.scoreParams = scoreParams;
    // console.log(data);
    setDrop(true);

    axios
      .post(SOURCE.myScores, data)
      .then((response) => {
        if (response.data.type === "success") {
          setNofication({
            state: true,
            msg: response.data.msg,
            type: response.data.type,
          });
          setDrop(false);
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="header-candidate">
        <div className="timer-cta">
          {start ? <Timer handleEnd={handleEnd} /> : <TimerPreset />}
          {start ? (
            <button className="btn end ml-0" onClick={handleEnd}>
              END
            </button>
          ) : (
            <button className="btn start ml-0" onClick={handleTimeStart}>
              Start
            </button>
          )}
        </div>
        {/* <h1>{title}</h1> */}
        <Webcam />
      </div>
      <Notification
        open={notification.state}
        setOpen={setNofication}
        notification={notification}
        setIslogged={setIslogged}
      />
      <Backdrop open={drop} setOpen={setDrop} />
    </>
  );
};

export default Header;
