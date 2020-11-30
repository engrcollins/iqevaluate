import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";

import { yellow, teal, blueGrey, amber, red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";

const mainListItems = ({ user, active }) => {
  return (
    <div style={{ fontSize: "16px" }}>
      <List style={{ color: "#280B0B", fontSize: 25 }}>
        <ListItem button>
          <ListItemIcon>
            <Icon
              className="fa fa-user"
              style={{ color: "#280B0B", fontSize: 25 }}
            />
            {/* <DashboardIcon /> */}
          </ListItemIcon>
          <ListItemText primary={user} />
        </ListItem>
        <Link to="/newschedule" className="d-flex">
          <ListItem button>
            <ListItemIcon>
              <Icon
                className="fa fa-bolt"
                style={{ color: blueGrey[500], fontSize: 25 }}
              />
            </ListItemIcon>
            <ListItemText
              primary="New Evaluation"
              style={{ color: "#280B0B", fontSize: 25 }}
              className="text"
            />
          </ListItem>
        </Link>
        <Link to="/manage_evaluation" className="d-flex">
          <ListItem button>
            <ListItemIcon>
              <Icon
                className="fa fa-bolt"
                style={{ color: "#db7e01", fontSize: 25 }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Manage Evaluations"
              style={{ color: "#280B0B" }}
            />
          </ListItem>
        </Link>
        <Link to="/manage_candidate" className="d-flex">
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon className="fa fa-users" style={{ fontSize: 25 }} />
            </ListItemIcon>
            <ListItemText
              primary="Manage Candidates"
              style={{ color: "#280B0B" }}
            />
          </ListItem>
        </Link>
        <Link to="/myquestions" className="d-flex">
          <ListItem button>
            <ListItemIcon>
              <Icon
                className="fa fa-plus-circle"
                style={{ color: teal[500], fontSize: 30 }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Add Questions"
              style={{ color: "#280B0B" }}
            />
          </ListItem>
        </Link>
        <Link to="/charts" className="d-flex">
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon style={{ color: red[900], fontSize: 25 }} />
            </ListItemIcon>
            <ListItemText primary="Charts" style={{ color: "#280B0B" }} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};
export default mainListItems;
