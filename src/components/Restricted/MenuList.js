import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";

const mainListItems = ({ render }) => {
  return (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {render.map((item) => (
          <Link keys={item.assign} to={item.assign} className="d-flex">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary={item.name.toUpperCase()}
                style={{ color: "#280B0B" }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};
export default mainListItems;
