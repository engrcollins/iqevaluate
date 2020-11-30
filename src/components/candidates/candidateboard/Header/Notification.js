import React, { Fragment, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert, AlertTitle } from "@material-ui/lab";

const Notification = ({ open, setOpen, close, notification, setIslogged }) => {
  const handleClose = (e, reason) => {
    if (reason === "backdropClick" || reason === "escapekeyDown") return;
    setOpen({ state: false, msg: "", type: "" });
    setIslogged(false);
    sessionStorage.clear();
  };
  const handleConfirm = () => {
    setOpen({ state: false, msg: "", type: "" });
    window.location.assign("/myevaluationpanel#/");
    setIslogged(false);
    sessionStorage.clear();
  };
  return (
    <Fragment>
      <Dialog open={open} onClose={(e, reason) => handleClose(e, reason)}>
        <DialogTitle>
          <Alert severity={notification.type}>
            <AlertTitle>{notification.type.toUpperCase()}</AlertTitle>
            {notification.msg}
          </Alert>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions className="cta-modal-err">
          <button color="" className="btn cta-ok" onClick={handleConfirm}>
            OK
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Notification;
