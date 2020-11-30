import React from "react";
import { Link } from "react-router-dom";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const mainListItems = ({ render, timeState }) => {
  const { name, email } = JSON.parse(sessionStorage.getItem("candidate"));

  return (
    <div style={{ fontSize: "16px" }}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={name.toUpperCase()} />
          <ListItemText secondary={email} />
          <Divider />
        </ListItem>
        <Link to={"/instruction"} className="d-flex">
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Instruction" style={{ color: "#280B0B" }} />
          </ListItem>
        </Link>
        {timeState ? (
          <>
            {render.map((item) => (
              <Link keys={item.assign} to={item.assign} className="d-flex">
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    style={{ color: "#280B0B" }}
                  />
                </ListItem>
              </Link>
            ))}
          </>
        ) : (
          ""
        )}
      </List>
    </div>
  );
};
export default mainListItems;
