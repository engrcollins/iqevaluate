import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import MyEditor from "./MyEditor";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import axios from "axios";
import { SOURCE } from "../../Source";
import Notification from "../../Modal/Notification";
import Backdrop from "../../Modal/BackDrop";

const Builder = ({ match }) => {
  const pathname = match.url.replace("/", "");

  const token = sessionStorage.getItem("auth");

  const [builder, setBuilder] = useState(pathname);
  const [question, setQuestion] = useState("");
  const [ansType, setAnsType] = useState("radio");
  const [ans, setAns] = useState([]);
  const [inputsVal, setInputVal] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
  });
  const [basic, setBasic] = useState({
    serial: "",
    category: builder,
    refId: "preload",
    author: "preload",
  });

  const input = [
    { label: "A", name: "a", value: inputsVal["a"] },
    { label: "B", name: "b", value: inputsVal["b"] },
    { label: "C", name: "c", value: inputsVal["c"] },
    { label: "D", name: "d", value: inputsVal["d"] },
    { label: "E", name: "e", value: inputsVal["e"] },
    { label: "F", name: "f", value: inputsVal["f"] },
  ];

  //MODALS;
  const [notify, setNotify] = useState({ state: false, msg: "", type: "" }); // notification
  const [drop, setDrop] = useState(false); //

  const handleChange = (e) => {
    let name = e.target.name;
    let clist;
    switch (e.target.name) {
      case "a":
        clist = document.getElementsByClassName("a");
        for (let i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
        field("a");
        inputsVal[`${name}`] = e.target.value;
        setInputVal({ ...inputsVal });
        break;
      case "b":
        clist = document.getElementsByClassName("b");
        for (let i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
        field("b");
        inputsVal[`${name}`] = e.target.value;
        setInputVal({ ...inputsVal });
        break;
      case "c":
        clist = document.getElementsByClassName("c");
        for (let i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
        field("c");
        inputsVal[`${name}`] = e.target.value;
        setInputVal({ ...inputsVal });
        break;
      case "d":
        clist = document.getElementsByClassName("d");
        for (let i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
        field("d");
        inputsVal[`${name}`] = e.target.value;
        setInputVal({ ...inputsVal });
        break;
      case "e":
        clist = document.getElementsByClassName("e");
        for (let i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
        field("e");
        inputsVal[`${name}`] = e.target.value;
        setInputVal({ ...inputsVal });
        break;
      case "f":
        clist = document.getElementsByClassName("f");
        for (let i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
        field("f");
        inputsVal[`${name}`] = e.target.value;
        setInputVal({ ...inputsVal });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setBuilder(pathname);
    //window.location.reload()
  }, [match]);

  const ansTypeController = (e) => {
    setAns([]);
    Reset();
    switch (e.target.value) {
      case "radio":
        setAnsType("radio");
        break;
      case "checkbox":
        setAnsType("checkbox");
        break;
      default:
        break;
    }
  };
  const Reset = () => {
    //reset all check box
    let clist = document.getElementsByClassName("opts");
    for (let i = 0; i < clist.length; ++i) {
      clist[i].checked = false;
    }
  };
  const field = (field) => {
    // for resetting a single check box when input its corres input is onChanged
    setAns(ans.filter((str) => str !== inputsVal[`${field}`]));
  };
  const basicHandler = (e) => {
    switch (e.target.name) {
      case "refId":
        setBasic({ ...basic, refId: e.target.value });
        break;
      case "title":
        setBasic({ ...basic, category: e.target.value });
        break;
      case "serial":
        setBasic({ ...basic, serial: e.target.value });
        break;

      default:
        break;
    }
  };

  const correctController = (e) => {
    let checked = e.target.checked;
    // console.log(checked)
    switch (e.target.name) {
      case "checkbox":
        if (checked) {
          setAns([...ans, inputsVal[`${e.target.value}`]]);
        } else {
          setAns(ans.filter((str) => str !== inputsVal[`${e.target.value}`]));
        }
        break;
      case "radio":
        if (checked) {
          setAns([]);
          setAns([inputsVal[`${e.target.value}`]]);
          // correctRadio[0]=e.target.value
          // console.log('radio')
        } else {
          // console.log('unchecked radio')
        }
        break;
      default:
        break;
    }
  };
  const optionController = (vals) => {
    let optionArr = [];
    let keys = Object.keys(vals);
    for (let key of keys) {
      optionArr.push(vals[`${key}`]);
    }
    return optionArr;
  };
  const handleDiv = (element) => {
    if (element) {
      element.innerHTML = `${question}`;
    }
  };
  const handleContinue = () => {
    if (question.length === 0)
      return setNotify({
        state: true,
        msg: "Question has not been saved or empty",
        type: "error",
      });
    const data = {
      question: question,
      options: optionController(inputsVal),
      correct_answer: ans,
      serial: basic.serial,
      answer_type: ansType,
      category: builder.toLocaleLowerCase(),
      refId: basic.refId.toLocaleLowerCase(),
      author: basic.author,
    };
    // console.log(question); //
    setDrop(true);
    axios
      .post(SOURCE.postQtnAdmin, data, { headers: { "auth-token": token } })
      .then((res) => {
        setDrop(false);
        setNotify({ state: true, msg: res.data.msg, type: res.data.msgType });
        //console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const clearField = () => {
    setInputVal({ a: "", b: "", c: "", d: "", e: "", f: "" });
    setQuestion("");
    setBasic({ ...basic, serial: "" });
    setAns([]);
    setAnsType("radio");
    Reset();
  };

  return (
    <section className="builder-container-main">
      <div className="builder-header mb-4" onChange={(e) => basicHandler(e)}>
        <label>Collection Name</label>
        <input
          type="text"
          placeholder="collection"
          value={basic.refId}
          name="refId"
          className="mb-2 collection"
          readOnly={true}
        />
        <label>Title</label>
        <input
          type="text"
          placeholder="title"
          value={builder}
          className="mb-2"
          name="title"
          readOnly={true}
        />
        <label>Serial No.</label>
        <input type="text" value={basic.serial} name="serial" />
      </div>
      <div className="builder-question-type-field">
        <div className="editor-div">
          <MyEditor setQuestion={setQuestion} />
        </div>

        <Paper className="builder-paper-options">
          <div className="options-container">
            <h6 className="pt-2">Options</h6>
            {input.map((field) => (
              <div className="">
                <label className="mr-2">{field.label}</label>
                <input
                  name={field.name}
                  type="text"
                  value={field.value}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
          </div>
          <div className="settings-container">
            <div className="pl-2 pr-2">
              <h6 className="pt-2">Answers type</h6>
              <div className="d-flex" onChange={(e) => ansTypeController(e)}>
                <div>
                  <label>Multiple</label>
                  <input name="choice" value="checkbox" type="radio" />
                </div>
                <div className="ml-2">
                  <label>Single</label>
                  <input
                    checked={ansType === "radio" ? true : false}
                    value="radio"
                    name="choice"
                    type="radio"
                  />
                </div>
              </div>
              <h6>Correct option</h6>
              <section
                className="d-flex"
                onChange={(e) => correctController(e)}
              >
                <div className="">
                  <div>
                    <label className="mr-2">A</label>
                    <input
                      className="a opts"
                      name={ansType}
                      value="a"
                      type={ansType}
                    />
                  </div>
                  <div>
                    <label className="mr-2">B</label>
                    <input
                      className="b opts"
                      name={ansType}
                      value="b"
                      type={ansType}
                    />
                  </div>
                  <div>
                    <label className="mr-2">C</label>
                    <input
                      className="c opts"
                      name={ansType}
                      value="c"
                      type={ansType}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <div>
                    <label className="mr-2">D</label>
                    <input
                      className="d opts"
                      name={ansType}
                      value="d"
                      type={ansType}
                    />
                  </div>
                  <div>
                    <label className="mr-2">E</label>
                    <input
                      className="e opts"
                      name={ansType}
                      value="e"
                      type={ansType}
                    />
                  </div>
                  <div>
                    <label className="mr-2">F</label>
                    <input
                      className="f opts"
                      name={ansType}
                      value="f"
                      type={ansType}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Paper>
      </div>
      <div className="cta-builder mt-4">
        <button className="btn clear" onClick={clearField}>
          Clear field
        </button>
        <button className="btn continue" onClick={handleContinue}>
          submit
        </button>
      </div>
      <div
        className="dangerous-html"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      {/* <div className="custum-inner" ref={(element) => handleDiv(element)}></div> */}
      <Notification
        open={notify.state}
        setOpen={setNotify}
        notification={{ msg: notify.msg, type: notify.type }}
      />
      <Backdrop open={drop} setOpen={setDrop} />
    </section>
  );
};

export default Builder;
