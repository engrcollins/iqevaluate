import React, { Fragment, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert, AlertTitle } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { SOURCE } from "../Source";
//import {ENDPOINT} from './Endpoint'

const Notification = ({ open, setOpen, close, notification }) => {
  const handleClose = (e, reason) => {
    if (reason === "backdropClick" || reason === "escapekeyDown") return;
    setOpen({ state: false, msg: "", type: "" });
  };
  return (
    <Fragment>
      <Dialog open={open} onClose={(e, reason) => handleClose(e, reason)}>
        <DialogTitle className="mt-0 mb-0">
          <Alert severity={notification.type}>
            <AlertTitle>{notification.type.toUpperCase()}</AlertTitle>
            {notification.msg}
          </Alert>
        </DialogTitle>
        {/* <DialogContent></DialogContent> */}
        <DialogActions className="cta-modal-err mt-0">
          <button
            color=""
            className="btn cta-ok"
            onClick={(e) => setOpen({ state: false, msg: "", type: "" })}
          >
            OK
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Notification;
