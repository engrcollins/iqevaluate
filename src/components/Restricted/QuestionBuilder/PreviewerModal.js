import React, { Fragment, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert, AlertTitle } from "@material-ui/lab";
import { SOURCE } from "../../Source";
//import {ENDPOINT} from './Endpoint'

const ModalForm = ({ open, setPreview, close, data, setNotify }) => {
  const token = sessionStorage.getItem("auth");

  const handleSubmit = () => {
    axios
      .post(SOURCE.postQtnAdmin, data, { headers: { "auth-token": token } })
      .then((res) => {
        console.log(res);
        setNotify({ state: true, msg: res.data.msg, type: res.data.msgType });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = (e, reason) => {
    if (reason === "escapeKeyPress" || reason === "backdropClick") {
      return;
    }
    setPreview({ state: false, data: null });
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={(e, reason) => handleClose(e, reason)}>
        <DialogTitle>
          <h6 className="text-center pt-2 pb-2">Confirmation</h6>
        </DialogTitle>
        <DialogContent className={""}></DialogContent>
        <DialogActions className="cta-modal">
          <button
            color=""
            className="btn cta-close"
            onClick={() => setPreview({ state: false, data: "" })}
          >
            Close
          </button>
          <button color="" className="btn cta-open" onClick={handleSubmit}>
            submit
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ModalForm;
