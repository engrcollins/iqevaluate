import React, { useState, useEffect } from "react";
import axios from "axios";
import { SOURCE } from "../../Source";
import MaterialTable from "./MaterialTable";
import BackdropOnLoad from "../../Modal/BackDrop";
import InputCustum from "../../accounts/Input";
import Notification from "../../Modal/Notification";

const ManageCandidate = () => {
  const [testId, setTestId] = useState("");

  const [candidates, setCandidates] = useState([]);

  const [email, setEmail] = useState("");
  //Backdrop for network process
  const [backdrop, setBackdrop] = useState(false);

  const [getId, setGetId] = useState(
    sessionStorage.getItem("id") ? sessionStorage.getItem("id") : ""
  );
  const [data, setData] = useState([]);

  //Notification
  const [notification, setNotify] = useState({
    state: false,
    msg: "",
    type: "",
  });

  const token = sessionStorage.getItem("auth");

  const handleGet = (testId) => {
    setCandidates([]);
    setBackdrop(true);
    axios
      .post(
        SOURCE.getParticipants,
        { testId: testId },
        { headers: { "auth-token": token } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.msgType == "success") {
          setCandidates(res.data.msg);
          setBackdrop(false);
        } else if (res.data.msgType == "error") {
          console.log(`ERROR: ${res.data.msg}`);
          setBackdrop(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setBackdrop(false);
      });
  };
  //useEffect on page load, fetch list of evaluation to map as nav buttons
  const getVault = async () => {
    setBackdrop(true);
    const res = await axios.get(`${SOURCE.myEvaluations}/${token}`, {
      headers: { "auth-token": token },
    });
    const read = await res.data.msg;
    if (res.data.msgType === "success") {
      setData(read);
      setBackdrop(false);
      if (read.length !== 0) {
        //initalizing table with data
        //call handle get to display the first evaluation

        let id = sessionStorage.getItem("id"); // This if block code is impportant in add functionality
        if (id) {
          handleGet(id);
          //set the getId instance
          setGetId(id);
          return;
        }
        // if its a fresh Login
        handleGet(read[0].testId);
        //set the getId instance
        setGetId(read[0].testId);
      }
      return;
    }
    setBackdrop(false);
    // alert('Server error')
  };
  useEffect(() => {
    getVault();
  }, []);

  //control info to display on table
  const handleIdNav = (e) => {
    setGetId(e.target.value);
    handleGet(e.target.value);
    sessionStorage.setItem("id", e.target.value);
  };
  //DELETE ACTIONS
  const handleDel = (email, getId) => {
    let exist = candidates.find((candidate) => candidate.email === email);
    if (!exist) {
      setEmail("");
      return setNotify({ state: true, msg: "User not found", type: "error" });
    }
    //console.log(email, getId);
    setBackdrop(true);
    axios
      .delete(`${SOURCE.delParticipants}/${getId}/${email}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        //  console.log(res);
        setBackdrop(false);
        setNotify({ msg: res.data.msg, type: res.data.type, state: true });
        //reload table of same testId
        handleGet(getId);
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
        setBackdrop(false);
        //reload table of same testId
        handleGet(getId);
      });
  };
  //HANDLE ADD ACTION
  const handleAdd = (newRecord, data) => {
    const category = data[0].category;
    const companyId = data[0].companyId;
    const date = data[0].date;
    const duration = data[0].duration;
    const testId = data[0].testId;
    newRecord.category = category;
    newRecord.companyId = companyId;
    newRecord.date = date;
    newRecord.duration = duration;
    newRecord.testId = testId;
    newRecord.hastaken = false;
    newRecord.score = "0";
    setBackdrop(true);
    setCandidates([]);
    axios
      .post(
        SOURCE.addParticipants,
        { participants: [newRecord], testId: testId },
        { headers: { "auth-token": token } }
      )
      .then((res) => {
        //console.log(res);
        setBackdrop(false);
        sessionStorage.setItem("id", testId); // creating an instannce if the table snapshort before reload
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setBackdrop(false);
      });
    // console.log(newRecord)
  };
  return (
    <div className="candidate-section-container-main">
      <div className="manage-candidate-section">
        <h3 className="manage-candidate-h3">Manage Participant</h3>
        <div className="testId-switcher-div mb-4 ml-0">
          <select onChange={(e) => handleIdNav(e)}>
            <option disabled={true}>select</option>
            {data.length !== 0
              ? data.map((item) => (
                  <option
                    className={`${item.testId}`}
                    keys={item.testId}
                    // onClick={() => handleIdNav(item.testId)}
                    value={item.testId}
                  >
                    {item.testId}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className="current-id-banner">
          <p>{getId}</p>
        </div>
      </div>
      <div className="table-visible-larger">
        {candidates.length !== 0 ? (
          <MaterialTable
            data={candidates}
            type={getId}
            setGetId={setGetId}
            handleAdd={handleAdd}
            handleDel={handleDel}
          />
        ) : (
          <div>
            <p className="text-center">No Data</p>
          </div>
        )}
      </div>
      <BackdropOnLoad open={backdrop} setOpen={setBackdrop} />
      <Notification
        open={notification.state}
        notification={notification}
        setOpen={setNotify}
        msg={notification.msg}
        type={notification.type}
      />
    </div>
  );
};

export default ManageCandidate;
