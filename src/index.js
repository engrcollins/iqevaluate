import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./components/Asset/styles/styles.css";
import "./components/Asset/styles/admin.css";
import "./components/Asset/styles/scroll.css";
import "./components/candidates/styles/candidate.css";
import "./components/Asset/styles/custome.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

// disable react-dev-tools for this project
if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  for (let [key, value] of Object.entries(
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  )) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
      typeof value == "function" ? () => {} : null;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ParallaxProvider>
      <Router>
        <App />
      </Router>
    </ParallaxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
