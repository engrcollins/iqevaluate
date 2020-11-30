import React, { useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import { MDBIcon } from "mdbreact";
//import "./Abstract.css"

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Questionnaire = ({ match }) => {
  const active = match.url.replace("/", "");

  // state for question number handler
  let [num, setNum] = useState(0);
  //get question from storage

  const [questions, setQuestion] = useState(
    JSON.parse(sessionStorage.getItem("question"))
      ? JSON.parse(sessionStorage.getItem("question"))
      : {}
  );

  const [activeQuestion, setActiveQuestion] = useState(
    questions[active] ? questions[active] : []
  );
  let [attempt, setAttempt] = useState(
    JSON.parse(sessionStorage.getItem(`${active}`))
      ? JSON.parse(sessionStorage.getItem(`${active}`))
      : []
  );

  // check if user has started
  const hasStart = sessionStorage.getItem("time");
  //if nt started, display instruction page
  useEffect(() => {
    if (!hasStart) window.location.assign("/myevaluationpanel#/");
  }, []);

  useEffect(() => {
    setActiveQuestion(questions[active] ? questions[active] : []);

    //Switch attempt when user switch questions
    setAttempt(
      JSON.parse(sessionStorage.getItem(`${active}`))
        ? JSON.parse(sessionStorage.getItem(`${active}`))
        : []
    );
    setNum(0);
  }, [active]);

  //ATTEMPT MODEL FOR MULTIPLE

  const AttemptedMultiple = (checked, serial, answers, num, id) => {
    // console.log(checked);
    if (checked) {
      setAttempt((attempt) => [...attempt, { serial, num, answers, id }]);

      sessionStorage.setItem(
        `${active}`,
        JSON.stringify([...attempt, { serial, num, answers, id }])
      );
      // attempt.push()
      return;
    } else {
      attempt = attempt.filter((item) => item.answers !== answers);
      setAttempt(attempt);
      sessionStorage.setItem(`${active}`, JSON.stringify(attempt));
      // attempt.push()
      //  console.log(attempt)
    }

    return;
  };
  //  console.log(attempt)

  const Attempted = (checked, serial, answers, num, id) => {
    if (checked) {
      setAttempt((attempt) => {
        attempt = attempt.filter((item) => item.id !== id);
        sessionStorage.setItem(
          `${active}`,
          JSON.stringify([...attempt, { serial, num, answers: answers, id }])
        );
        return [...attempt, { serial, num, answers: answers, id }];
      });
      // attempt.push()
    } else {
      setAttempt((attempt) => attempt.filter((item) => item.id !== id));
      // attempt.push()
      // console.log(attempt);
    }

    return;
  };

  //change num
  const ChangeNum = (number) => {
    setNum(number);
  };
  //
  const Select = (e, num) => {
    switch (e.target.name) {
      case "radio":
        Attempted(
          e.target.checked,
          activeQuestion[num].serial,
          e.target.value,
          num,
          activeQuestion[num]._id
        );
        break;
      case "checkbox":
        AttemptedMultiple(
          e.target.checked,
          activeQuestion[num].serial,
          e.target.value,
          num,
          activeQuestion[num]._id
        );
        break;

      default:
        break;
    }
  };
  // this function helps to retain answered questions on checkbox
  const checker = (item, id) => {
    const a = attempt.find(
      (element) => element.id === id && element.answers === item
    );
    // console.log(item);
    if (a) {
      return true;
    } else {
      return false;
    }
  };

  //CHECKER FOR MULITIPLE
  // this function helps to retain answered questions on checkbox
  const checkerMultiple = (item, id) => {
    const a = attempt.find(
      (element) => element.answers === item && element.id === id
    );
    // console.log(a)
    if (a) {
      return true;
    } else {
      return false;
    }
  };

  //CHECKER SWITCHER DIV Listener
  const checkSwitch = (e, num, item, id) => {
    //console.log(e.target.name);
    switch (e.target.name) {
      case "radio":
        Select(e, num);
        checker(item, id);
        break;
      case "checkbox":
        Select(e, num);
        checkerMultiple(item, id);
        break;

      default:
        break;
    }
  };

  // this function is to track attempted questions on pagination component
  const hasAnswered = (number) => {
    const ans = attempt.find((element) => element.num === number);
    if (ans && num === number) {
      return "yellowgreen";
    }
    //if a question number has been attemted, let d bg be green else let it b red
    if (ans) {
      return "green";
    }
    //if a user is on a number, let the pagination bg be white
    if (num === number) {
      return "#db7e01";
    } else {
      return "#dd4b39";
    }
  };
  return (
    <div className="candidate-question-display-div">
      <Divider />
      <p className="pt-2">{`Question ${num + 1} of ${
        activeQuestion.length
      }`}</p>
      <Divider className="mb-3" />
      <div className="dangerous-html">
        <p
          dangerouslySetInnerHTML={{ __html: activeQuestion[num].question }}
          className=""
        />
      </div>
      <div className="gmat-img-div-flex">
        {activeQuestion[num].options.map((item, i) =>
          item.length !== 0 ? (
            <div
              key={i}
              onChange={(e) =>
                checkSwitch(e, num, item, activeQuestion[num]._id)
              }
            >
              <input
                type={activeQuestion[num].answer_type}
                name={activeQuestion[num].answer_type}
                value={item}
                checked={checker(item, activeQuestion[num]._id)}
              />
              <label className="ml-4 option-label">{item}</label>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <div className="mt-4">
        <Pagination aria-label="Page navigation example">
          <PaginationItem className="pagination-web">
            <button
              className="btn btn-sm ml-0 align-center"
              disabled={num === 0 ? true : false}
              onClick={(e) => setNum(0)}
            >
              First
            </button>
          </PaginationItem>
          <PaginationItem className="pagination-web">
            <button
              className="btn btn-sm align-center"
              disabled={num === 0 ? true : false}
              onClick={(e) => setNum((num) => (num = num - 1))}
            >
              Previous
            </button>
          </PaginationItem>

          {activeQuestion.map((item, i) => {
            //  console.log(item)
            return (
              <PaginationItem className="page-numbers">
                <PaginationLink
                  key={i}
                  style={{ background: hasAnswered(i), color: "white" }}
                  onClick={() => ChangeNum(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem className="pagination-web">
            <button
              className="btn btn-sm align-center"
              disabled={num === activeQuestion.length - 1 ? true : false}
              onClick={(e) => setNum((num) => (num = num + 1))}
            >
              Next
            </button>
          </PaginationItem>
          <PaginationItem className="pagination-web">
            <button
              className="btn btn-sm align-center"
              disabled={num === activeQuestion.length - 1 ? true : false}
              onClick={(e) => setNum(activeQuestion.length - 1)}
            >
              Last
            </button>
          </PaginationItem>

          <div className="pagination-for-mobile-div mt-3">
            <MDBIcon
              icon="fast-backward"
              size="2x"
              style={{ color: num === 0 ? "white" : "" }}
              className={num === 0 ? "pointer-disable" : ""}
              onClick={(e) => setNum(0)}
            />

            <MDBIcon
              icon="step-backward"
              size="2x"
              style={{ color: num === 0 ? "white" : "" }}
              className={num === 0 ? "pointer-disable" : ""}
              onClick={(e) => setNum((num) => (num = num - 1))}
            />

            <MDBIcon
              icon="step-forward"
              size="2x"
              style={{
                color: num === activeQuestion.length - 1 ? "white" : "",
              }}
              className={
                num === activeQuestion.length - 1 ? "pointer-disable" : ""
              }
              onClick={(e) => setNum((num) => (num = num + 1))}
            />

            <MDBIcon
              icon="fast-forward"
              size="2x"
              style={{
                color: num === activeQuestion.length - 1 ? "white" : "",
              }}
              className={
                num === activeQuestion.length - 1 ? "pointer-disable" : ""
              }
              onClick={(e) => setNum(activeQuestion.length - 1)}
            />
          </div>
        </Pagination>
        <Divider />
      </div>
    </div>
  );
};

export default Questionnaire;
