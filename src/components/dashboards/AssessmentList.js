import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";

const mainListItems = ({
  name,
  handleChange,
  checker,
  label,
  secondary,
  listClickAction,
}) => {
  return (
    <div style={{ fontSize: "16px" }}>
      <List style={{ color: "#280B0B", fontSize: 25 }}>
        <ListItem button onClick={() => listClickAction(name)}>
          <ListItemIcon>
            <Checkbox checked={checker} onChange={handleChange} name={name} />
          </ListItemIcon>
          <ListItemText primary={label} />
          <ListItemText
            secondary={secondary > 0 ? ` ${secondary} marks` : ""}
          />
        </ListItem>
      </List>
    </div>
  );
};
export default mainListItems;
