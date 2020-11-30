import React, { useEffect, useState } from "react";
import axios from "axios";
import { SOURCE } from "../../Source";
import Notification from "../../Modal/Notification";
import MaterialTable from "./MaterialTable";
import BackdropOnLoad from "../../Modal/BackDrop";
import FlipCards from "./FlipCards";
import CustomBackdrop from "./CustomBackdrop";

const ManageEvaluation = () => {
  const token = sessionStorage.getItem("auth");
  const [array, setArray] = useState([]);
  //MODAL
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    state: false,
    msg: "",
    type: "",
  });
  //Backdrop for network process
  const [backdrop, setBackdrop] = useState(false);

  //DELETE ACTION
  const [delId, setDelId] = useState("");

  //Participation details
  const [details, setDetails] = useState([]);

  const handleDel = (testId) => {
    console.log(testId);
    axios
      .delete(`${SOURCE.delEvaluation}/${testId}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        setNotification({
          state: true,
          msg: res.data.msg,
          type: res.data.msgType,
        });
        if (res.data.msgType === "success") {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleGetDetails = (testId) => {
    setBackdrop(true);
    axios
      .post(
        SOURCE.getParticipants,
        { testId: testId },
        { headers: { "auth-token": token } }
      )
      .then((response) => {
        //console.log(response.data)
        if (response.data.msgType == "success") {
          setDetails(response.data.msg);
          setBackdrop(false);
          setOpen(true);
        }

        //  console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
        setBackdrop(false);
        setOpen(false);
        return;
      });

    // console.log(testId)
  };

  const get = async () => {
    setBackdrop(true);
    const res = await axios.get(`${SOURCE.myEvaluations}/${token}`, {
      headers: { "auth-token": token },
    });
    const read = await res.data.msg;
    if (res.data.msgType === "success") {
      read.forEach((item, i) => (item.serial = i + 1));
      //console.log(read)
      setArray(read);
      setBackdrop(false);
      return;
    }
    setBackdrop(false);
    // alert('Server error')
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <div className="manage-evaluation-section">
      <h3 className="text-center manage-evaluation-h3">Manage Evaluations</h3>
      <div className="eval-table mt-4">
        {array.length !== 0 ? (
          <MaterialTable
            data={array}
            handleGetDetails={handleGetDetails}
            handleDel={handleDel}
          />
        ) : (
          <div>
            <p className="text-center">No events</p>
          </div>
        )}
        {details.length !== 0 ? (
          <CustomBackdrop open={open} setOpen={setOpen} details={details} />
        ) : (
          ""
        )}
      </div>
      <Notification
        open={notification.state}
        setOpen={setNotification}
        notification={notification}
      />
      <BackdropOnLoad open={backdrop} setOpen={setBackdrop} />
    </div>
  );
};

export default ManageEvaluation;
