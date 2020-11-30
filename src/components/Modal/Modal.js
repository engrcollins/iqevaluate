import React, { Fragment, useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import Notification from "./Notification";
import Backdrop from "./BackDrop";

import { SOURCE } from "../Source";

const ModalForm = ({ open, setOpen, close, data, summary, resolve }) => {
  //console.log(summary)
  const token = sessionStorage.getItem("auth");
  const [disable, setDisable] = useState(true);

  const [notify, setNotify] = useState({ state: false, msg: "", type: "" }); // notification
  const [drop, setDrop] = useState(false);
  //handle modal resolve
  const [result, setResult] = useState(false);

  const handleCheck = (e) => {
    let checked = e.target.checked;
    //console.log(checked)
    setDisable(!checked);
  };
  const handleResolve = (type) => {
    resolve(type);
  };
  const handleSubmit = () => {
    setOpen(false);
    setDisable(true);
    setDrop(true);
    axios
      .post(SOURCE.participantsReg, data, { headers: { "auth-token": token } })
      .then((response) => {
        //console.log(response.data)
        setDrop(false);
        setNotify({
          state: true,
          msg: response.data.msg,
          type: response.data.msgType,
        });

        setDisable(true);
        setTimeout(() => {
          if (response.data.msgType == "success") {
            setResult(true);
            handleResolve("success");
          }
          // window.location.assign('/dashboard#/newschedule')
          return;
        }, 1000);
        //  console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };
  const handleClose = (e, reason) => {
    if (reason === "escapeKeyPress" || reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={(e, reason) => handleClose(e, reason)}>
        <DialogTitle className="text-center mb-0 mt-0 pt-1 pb-1 confirmation-head"></DialogTitle>
        <DialogContent className={result ? "d-none" : ""}>
          <div className="">
            {summary ? (
              <div style={{ width: 300 }} className="d-flex">
                <Typography>tick the box to continue</Typography>
                <Checkbox
                  type="checkbox"
                  onChange={handleCheck}
                  className="input-checkbox ml-3"
                />
              </div>
            ) : (
              <p className="pl-2 pr-2 text-white">loading...</p>
            )}
          </div>
        </DialogContent>
        <DialogActions className="cta-modal mt-0">
          <button
            color=""
            className="btn cta-close"
            onClick={() => {
              setOpen(false);
              setDisable(true);
            }}
          >
            Close
          </button>
          <button
            color=""
            className="btn cta-open"
            disabled={disable}
            onClick={handleSubmit}
          >
            submit
          </button>
        </DialogActions>
      </Dialog>
      <Notification
        open={notify.state}
        setOpen={setNotify}
        notification={{ msg: notify.msg, type: notify.type }}
      />
      <Backdrop open={drop} setOpen={setDrop} />
    </Fragment>
  );
};

export default ModalForm;
