import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./Asset/img/iqlogo.png";

const Header = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="containerized-custom">
        <nav className={isOpen ? "open nav-custum" : "nav-custum"}>
          <div className="menu-toggle">
            <i
              onClick={() => setIsOpen(!isOpen)}
              className={isOpen ? "open fas fa-bars" : "fas fa-bars"}
            >
              {" "}
            </i>
            <i
              onClick={() => setIsOpen(!isOpen)}
              className={isOpen ? "open fas fa-times" : "fas fa-times"}
            >
              {" "}
            </i>
          </div>
          <a className="logo text-white nav-custum-link">
            <Link to="/" className="logo text-white nav-custum-link">
              <img src={logo} alt="img" style={{ width: 30 }} />
              IQ-Evaluate
            </Link>
          </a>
          <ul className={isOpen ? "open nav-custum-list" : "nav-custum-list"}>
            <li className="nav-custum-item">
              <Link
                to="/myevaluationpanel"
                className={
                  active === "evaluation"
                    ? "active nav-custum-link"
                    : "nav-custum-link"
                }
              >
                my Evaluation
              </Link>
            </li>
            <li className="nav-custum-item">
              <Link
                to="/organization/login"
                className={
                  active === "login"
                    ? "active nav-custum-link"
                    : "nav-custum-link"
                }
              >
                Login
              </Link>
            </li>
            <li className="nav-custum-item">
              <Link
                to="/organization/signup"
                className={
                  active === "signup"
                    ? "active nav-custum-link"
                    : "nav-custum-link"
                }
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-custum-item">
              <a href="/#services" className="nav-custum-link">
                Services
              </a>
            </li>
            <li className="nav-custum-item">
              <a href="/#pricing" className="nav-custum-link">
                Pricing
              </a>
            </li>
            <li className="nav-custum-item">
              <Link
                to="/demo"
                className={
                  active === "demo"
                    ? "active nav-custum-link"
                    : "nav-custum-link"
                }
              >
                Demo
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
