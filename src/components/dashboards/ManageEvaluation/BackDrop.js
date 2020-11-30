import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTableModal from "./MaterialTableModal";
import { Typography } from "@material-ui/core";
import Charts from "./Charts/ChartMan";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    overflow: "scroll",
  },
}));

export default function BackDrop({ open, setOpen, details }) {
  const classes = useStyles();

  // console.log(details)
  let title = details[0].testId;
  let hadTaken = 0;
  let totalParticipant = details.length;
  details.forEach((participant) => {
    if (participant.hasTaken === true) hadTaken = hadTaken + 1;
  });

  //console.log(evalAreas)
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <section className="mt-2 backdrop-content">
        <Typography className="text-center pt-2 pb-2">
          Details for {title} evaulation
        </Typography>
        <div>
          <Divider className="mb-2" />
          <div className="modal-tabulator-details-contents">
            <div className="d-flex summary">
              <h6>Total participants</h6>
              <span>{totalParticipant}</span>
            </div>
            <Divider className="mb-2" />
            <div className="d-flex summary">
              <h6>Number participated </h6>
              <span>{hadTaken}</span>
            </div>
            <Divider className="mb-2" />
          </div>
          {/* <MaterialTableModal data={details} /> */}
          <Charts />
        </div>
        <div className="">
          <span
            color=""
            className="cta"
            onClick={() => {
              setOpen(false);
            }}
          >
            &times;
          </span>
        </div>
      </section>
    </Backdrop>
  );
}
