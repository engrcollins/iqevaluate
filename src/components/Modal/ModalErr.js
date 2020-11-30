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

const ModalErr = ({ open, setNumErr, numErr, close, type, msg }) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => setNumErr({ state: false, msg: "", type: "" })}
      >
        <DialogTitle>
          <Alert severity={type}>
            <AlertTitle>{type.toUpperCase()}</AlertTitle>
            {msg}
          </Alert>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions className="cta-modal-err">
          <button
            color=""
            className="btn cta-ok"
            onClick={() =>
              setNumErr({ ...numErr, state: false, msg: "", type: "" })
            }
          >
            OK
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ModalErr;
