import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import { Base64 } from "js-base64";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import MenuList from "./MenuList";

import Header from "./Header/Header";
import Questionnaire from "./Category/Questionnaire";
import Instruction from "./Instruction";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a color="inherit" href="https://totaldatalimited.com/">
        iqevaluate.com
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const user = sessionStorage.getItem("user");
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: "25px",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard({ setIslogged }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  // Evaluation Title
  const { title, duration } = JSON.parse(sessionStorage.getItem("summary"));

  // Make a case for time starts, pass this to header component to handle menuList enable
  const [timeInitiated, setTimeInitiated] = useState(false);

  // check if user has started
  const hasStart = sessionStorage.getItem("time");
  //if nt started, display instruction page
  useEffect(() => {
    if (!hasStart) window.location.assign("/myevaluationpanel#/");
  }, []);

  //log out
  const signOut = () => {
    sessionStorage.clear();
    setIslogged(false);
    window.location.assign("/myevaluationpanel");
  };
  //creating a custom routing
  const path = [];

  const pathname = JSON.parse(Base64.atob(sessionStorage.getItem("menu")));

  pathname.forEach((rout) => {
    path.push({
      assign: `/${rout.category}`,
      name: `${rout.category}`,
      component: Questionnaire,
      alias: `${rout.alias}`,
    });
  });

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          style={{ background: "#004d40" }}
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {title}
            </Typography>
            <IconButton color="inherit" onClick={signOut}>
              <Typography>{"Log Out"}</Typography> <ChevronRightIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => setOpen(!open)} className="">
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <MenuList render={path} timeState={timeInitiated} />
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="md" className={classes.container}>
            <Box className="switch-area">
              <Header
                setTimeInitiated={setTimeInitiated}
                setIslogged={setIslogged}
              />
              <Switch>
                {path.map((item) => (
                  <Route
                    exact
                    path={`${item.assign}`}
                    component={item.component}
                  ></Route>
                ))}
                <Route path={"/instruction"} component={Instruction}></Route>
                <Route component={Instruction}></Route>
              </Switch>
            </Box>
            <Box pt={4} className="copyright-area">
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}
