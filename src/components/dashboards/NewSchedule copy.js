import React, { useState, useEffect } from "react";
import { MDBAlert, MDBIcon } from "mdbreact";
import axios from "axios";
import Upload from "./Upload";
import Modal from "../Modal/Modal";
import Notification from "../Modal/Notification";
import { SOURCE } from "../Source";
import InputCustom from "../accounts/Input";

const NewEvaluation = ({ match }) => {
  sessionStorage.setItem("navigate", match.url);
  const token = sessionStorage.getItem("auth");
  ////uploads
  const [candidate, setCandidate] = useState([]);

  const [uploadErr, setUploadErr] = useState({ state: false, message: "" });

  //Basic info
  const [info, setInfo] = useState({
    title: "",
    testId: "",
    duration: "",
    date: "",
  });

  //Form stage
  const [stage, setStage] = useState(0);

  //inputs
  const [abstract, setAbstract] = useState({
    state: false,
    num: "",
    author: "preload",
    refId: "preload",
  });
  const [gmat, setGmat] = useState({
    state: false,
    num: "",
    author: "preload",
    refId: "preload",
  });
  const [verbal, setVerbal] = useState({
    state: false,
    num: "",
    author: "preload",
    refId: "preload",
  });
  const [numerical, setNumerical] = useState({
    state: false,
    num: "",
    author: "preload",
    refId: "preload",
  });
  const [mechanical, setMechanical] = useState({
    state: false,
    num: "",
    author: "preload",
    refId: "preload",
  });

  const [userQtn, setUserQtn] = useState([]);

  //Notification
  const [notification, setNotify] = useState({
    state: false,
    msg: "",
    type: "",
  });

  //modal
  const [open, setOpen] = useState(false);

  // Axios Call DATA
  const [data, setData] = useState();
  const [dataSummary, setDataSummary] = useState();

  //get userdefined questions info
  const [refId, setRefId] = useState(null);
  const [refIdAll, setRefIdAll] = useState([]);

  const userQuestion = () => {
    setUserQtn([]);
    if (!refId) return null;
    axios
      .get(`${SOURCE.getUserDefinedQtnCategory}/${refId}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.length === 0)
          return setNotify({
            state: true,
            msg: "no ref question",
            type: "error",
          });
        setUserQtn(res.data);
        //  console.log(userInput, userQtn);
      })
      .catch((err) => alert("Error occured"));
  };
  const userQuestionRefs = async () => {
    setUserQtn([]);
    axios
      .get(`${SOURCE.getUserDefinedQtnCategory}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.length === 0)
          return setNotify({
            state: false,
            msg: "no ref question",
            type: "error",
          });
        setRefIdAll(res.data);
        // console.log(res.data);
      })
      .catch((err) => alert("An error occured"));
  };

  useEffect(() => {
    userQuestionRefs();
  }, []);

  const selectRefHandler = (e) => {
    if (e.target.value) {
      setRefId(e.target.value);
      //  userQuestion();
    }
  };
  useEffect(() => {
    if (refId !== "Select") {
      userQuestion();
      // console.log(refId);
    }
  }, [refId]);

  const userInputQtnHandler = (e) => {
    let checked = e.target.checked;
    let name = e.target.name;
    let index;
    let value = userQtn.find((item, i) => {
      //get the index value
      index = i;
      return item.category === name;
    });
    //set the state property
    if (checked) {
      userQtn[index].state = true;
      setUserQtn([...userQtn]);
      return;
    } else {
      userQtn[index].state = false;
      userQtn[index].num = "";
      setUserQtn([...userQtn]);
      return;
    }
  };
  //handle initial values for userdefined questions input
  const userInputValueHandler = (category) => {
    let value = userQtn.find((item) => item.category === category);
    return value.num;
  };
  //handle onchange values for userdefined questions input
  const userInputonChangeHandler = (e) => {
    let name = e.target.name;
    let index;
    let value = userQtn.find((item, i) => {
      //get the index value
      index = i;
      return item.category === name;
    });

    if (Number(e.target.value) > userQtn[index].total) {
      setNotify({
        state: true,
        msg: `Cannot exceed ${userQtn[index].total}`,
        type: "error",
      });
      return;
    } else {
      //set the num property
      userQtn[index].num = e.target.value;
      setUserQtn([...userQtn]);
    }
  };

  //preloaded question
  const categories = [
    { label: "Abstract Reasoning", name: "abstract", state: abstract.state },
    { label: "General Mathematics", name: "gmat", state: gmat.state },
    {
      label: "Mechanical Reasoning",
      name: "mechanical",
      state: mechanical.state,
    },
    { label: "Numerical Reasoning", name: "numerical", state: numerical.state },
    { label: "Verbal Reasoning", name: "verbal", state: verbal.state },
  ];

  const inputVal = (name) => {
    if (name === "abstract") return abstract.num;
    if (name === "gmat") return gmat.num;
    if (name === "mechanical") return mechanical.num;
    if (name === "numerical") return numerical.num;
    if (name === "verbal") return verbal.num;
  };

  const handleModalResolve = (type) => {
    if (type == "success") {
      window.location.reload();
    }
  };
  const handleChange = (e) => {
    let checked = e.target.checked;
    let name = e.target.name;
    switch (e.target.name) {
      case "abstract":
        checked === true
          ? setAbstract({ ...abstract, state: true })
          : setAbstract({ ...abstract, num: "", state: false });
        break;
      case "gmat":
        checked === true
          ? setGmat({ ...gmat, state: true })
          : setGmat({ ...gmat, num: "", state: false });
        break;
      case "numerical":
        checked === true
          ? setNumerical({ ...numerical, state: true })
          : setNumerical({ ...numerical, num: "", state: false });
        break;
      case "mechanical":
        checked === true
          ? setMechanical({ ...mechanical, state: true })
          : setMechanical({ ...mechanical, num: "", state: false });
        break;
      case "verbal":
        checked === true
          ? setVerbal({ ...verbal, state: true })
          : setVerbal({ ...verbal, num: "", state: false });
        break;
      default:
        break;
    }
  };
  const handleChangeInfo = (e) => {
    switch (e.target.name) {
      case "title":
        setInfo({ ...info, title: e.target.value });
        break;
      case "testId":
        setInfo({ ...info, testId: e.target.value });
        break;
      case "date":
        setInfo({ ...info, date: e.target.value });
        break;
      case "duration":
        let value = e.target.value;
        if (value > 60)
          return setNotify({
            ...notification,
            state: true,
            msg: "Maximun duration is 60min",
            type: "error",
          });
        setInfo({ ...info, duration: e.target.value });
        break;
      default:
        break;
    }
  };
  const handleChangeQty = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value > 10)
      return setNotify({
        ...notification,
        state: true,
        msg: "Maximun number is 10",
        type: "error",
      });
    switch (e.target.name) {
      case "abstract":
        setAbstract({ ...abstract, num: e.target.value });
        break;
      case "gmat":
        setGmat({ ...gmat, num: e.target.value });
        break;
      case "numerical":
        setNumerical({ ...numerical, num: e.target.value });
        break;
      case "mechanical":
        setMechanical({ ...mechanical, num: e.target.value });
        break;
      case "verbal":
        setVerbal({ ...verbal, num: e.target.value });
        break;
      default:
        break;
    }
  };

  const onContinue = () => {
    let totalQuestion = 0;
    let totalCandidate = 0;
    if (info.title.length === 0)
      return setNotify({
        ...notification,
        state: true,
        msg: "Please specify a name for this evaluation",
        type: "error",
      });
    if (info.date.length === 0)
      return setNotify({
        ...notification,
        state: true,
        msg: "Please specify a date for this evaluation",
        type: "error",
      });
    if (info.duration.length === 0)
      return setNotify({
        ...notification,
        state: true,
        msg: "Please specify the duration for this evaluation",
        type: "error",
      });
    if (info.testId.length === 0)
      return setNotify({
        ...notification,
        state: true,
        msg: "Please specify a unique Id evaluation",
        type: "error",
      });
    if (candidate.length === 0)
      return setNotify({
        ...notification,
        state: true,
        msg: "Please upload list of participants",
        type: "error",
      });
    let evalAreas = [];
    let error = false;
    let errorOf = [];
    let testAreas = [
      {
        ...abstract,
        category: "abstract",
        alias: "Abstract Reasoning",
      },
      { ...gmat, category: "gmat", alias: "General mathematics" },
      {
        ...numerical,
        category: "numerical",
        alias: "Numerical Reasoning",
      },
      { ...verbal, category: "verbal", alias: "Verbal Reasoning" },
      {
        ...mechanical,
        category: "mechanical",
        alias: "Mechanical Reasoning",
      },
      ...userQtn,
    ];
    testAreas = testAreas.filter((area) => area.state === true);
    if (testAreas.length === 0)
      return setNotify({
        ...notification,
        state: true,
        msg: "Please select atleast one area of evaluation",
        type: "error",
      });
    testAreas.forEach((test) => {
      if (test.num.length === 0) {
        error = true;
        errorOf.push(test.alias);
      }
      totalQuestion = totalQuestion + Number(test.num);
      evalAreas.push(test.alias);
    });
    if (error)
      return setNotify({
        ...notification,
        state: true,
        msg: `Please indicate the number of questions to answer on ${[
          ...errorOf,
        ]}.`,
        type: "error",
      });
    let participant = candidate;
    totalCandidate = participant.length;
    setDataSummary({
      candidates: totalCandidate,
      areas: evalAreas,
      duration: info.duration,
      date: info.date,
      testId: info.testId,
      title: info.title,
    });

    let participants = [];
    candidate.forEach((element) => {
      element.testId = info.testId;
      element.hasTaken = false;
      element.duration = info.duration;
      element.date = info.date;
      element.score = "0";
      participants.push(element);
    });
    setCandidate(participants);
    let parameters = {
      participants: candidate,
      category: testAreas,
      duration: info.duration,
      date: info.date,
      testId: info.testId,
      title: info.title,
    };
    setData(parameters);
    // console.log(parameters);
    setOpen(true);
  };

  return (
    <section className="new-evaluation-container">
      <h3 className="">New Evaluation</h3>
      <Modal
        open={open}
        setOpen={setOpen}
        data={data}
        summary={dataSummary}
        resolve={handleModalResolve}
      />
      <Notification
        open={notification.state}
        notification={notification}
        setOpen={setNotify}
        msg={notification.msg}
        type={notification.type}
      />
      <div className="data-capture-container mt-4">
        {stage === 0 ? (
          <div className="first-info d-flex flex-column">
            <div onChange={handleChangeInfo}>
              <InputCustom
                value={info.title}
                onChange={handleChangeInfo}
                label={"Evaluation Name"}
                name={"title"}
                type={"text"}
                maxLength={20}
              />
              <InputCustom
                value={info.testId}
                onChange={handleChangeInfo}
                label={"Evaluation ID"}
                name={"testId"}
                type={"text"}
                maxLength={20}
              />
              <InputCustom
                value={info.date}
                onChange={handleChangeInfo}
                label={""}
                name={"date"}
                type={"date"}
                maxLength={""}
              />

              <InputCustom
                value={info.duration}
                onChange={handleChangeInfo}
                label={"Duration(min)"}
                name={"duration"}
                type={"number"}
                maxLength={2}
              />
            </div>
            <button onClick={() => setStage(1)} className="btn stage-0-btn">
              Next
            </button>
          </div>
        ) : null}
        {stage === 1 ? (
          <div className="stage-1">
            <div className="assessment-details mt-4">
              <div className="d-flex preload-heading">
                <MDBIcon
                  size="2x"
                  far
                  icon="bookmark"
                  style={{ color: "#004d40" }}
                  className="mr-2"
                />
                <h6>Preloaded</h6>
              </div>
              <div>
                {categories.map((item) => (
                  <div className="table d-flex assessment-selects-container">
                    <div>
                      <input
                        type="checkbox"
                        name={item.name}
                        onChange={handleChange}
                        className="checker"
                        style={{ color: "red" }}
                        checked={item.state}
                      />
                      <label className="ml-4">{item.label}</label>
                    </div>
                    {item.state ? (
                      <div className="">
                        <label className="mr-4">Total:</label>
                        <input
                          type="text"
                          className="qty-input"
                          autoFocus={item.state}
                          value={inputVal(item.name)}
                          onChange={handleChangeQty}
                          name={item.name}
                          maxLength={2}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="uploads-area">
              <div className="d-flex">
                <MDBIcon
                  size="2x"
                  far
                  icon="bookmark"
                  style={{ color: "#004d40" }}
                  className="mr-2"
                />
                <h6>My Collection</h6>
              </div>
              <select
                className="select-refIds"
                onChange={(e) => selectRefHandler(e)}
                value={refId}
              >
                <option value={null}>Select</option>
                {refIdAll.length !== 0
                  ? refIdAll.map((refs) => (
                      <option value={refs} keys={refs}>
                        {refs.toUpperCase()}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="uploads-area">
              <div className="">
                {userQtn.map((item) => (
                  <div className="table d-flex assessment-selects-container">
                    <div>
                      <input
                        type="checkbox"
                        name={`${item.category}`}
                        onChange={(e) => userInputQtnHandler(e)}
                        checked={item.state}
                      />
                      <label className="ml-4">
                        {item.category.toUpperCase()}
                      </label>
                    </div>
                    <div className={item.state === true ? null : "d-none"}>
                      <label>Total:</label>
                      <input
                        type="number"
                        className="input-qty"
                        value={userInputValueHandler(item.category)}
                        onChange={(e) => userInputonChangeHandler(e)}
                        name={`${item.category}`}
                        maxLength={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {uploadErr.state ? (
                <MDBAlert color="danger">
                  {uploadErr.message}
                  <button>&times;</button>
                </MDBAlert>
              ) : null}
            </div>{" "}
            <div className="stage-1-cta-div">
              <button
                className="btn stage-1-btn"
                onClick={() => setStage(stage - 1)}
              >
                Prev
              </button>
              <button
                className="btn stage-1-btn"
                onClick={() => setStage(stage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
        {/* stage 1 ends */}
        {stage === 2 ? (
          <>
            <div className="stage-2 upload-participant">
              <div className="d-flex">
                <Upload
                  setItem={setCandidate}
                  setUploadErr={setUploadErr}
                  setOpen={setNotify}
                  item="candidate"
                />
                {candidate.length > 0 ? (
                  <MDBIcon style={{ color: "#DB7E01" }} icon="check-double" />
                ) : (
                  ""
                )}
              </div>
              <div className="cta-new-div">
                <button
                  className="btn pt-1 pb-1"
                  onClick={() => setStage(stage - 1)}
                >
                  Prev
                </button>
                <button className="btn pt-1 pb-1" onClick={onContinue}>
                  Continue
                </button>
              </div>{" "}
            </div>
          </>
        ) : null}
        {/* stage 2 ends */}
      </div>
    </section>
  );
};

export default NewEvaluation;
