import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { MDBIcon, MDBAnimation } from "mdbreact";
import BarChartIcon from "@material-ui/icons/BarChart";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PinterestIcon from "@material-ui/icons/Pinterest";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import CastConnectedOutlinedIcon from "@material-ui/icons/CastConnectedOutlined";
import CameraOutlinedIcon from "@material-ui/icons/CameraOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import CountUp from "react-countup";
import Header from "../Header";
import { Parallax } from "react-scroll-parallax";

import ipadTop from "../Asset/img/ipad-top.png";

import promotional from "../Asset/img/promotional.jpg";

const NewLanding = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="hero" id="target">
        <section className="banner" id="hero">
          <div className="containerized-custom">
            <div className="introduction">
              <h2 className="sub-headline"></h2>
              <h1 className="headline">We are Pioneers of Digital Future</h1>
              <div className="headline-description">
                <div className="seperator">
                  <div className="asterisk">
                    <i className="fas fa-asterisk"></i>
                  </div>
                </div>
                <div className="single-animation mt-4">
                  <h5>Site is under construction.</h5>
                  <a href="#" className="btn cta-btn">
                    explore
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/*  */}
      <section className="wrapper">
        <div className="containerized-custom">
          <div className="core-divs">
            <div className="core-one">
              <div className="icon-containerized-custom animate-up">
                <Icon
                  className="fas fa-bolt"
                  style={{ color: "#DC143C", fontSize: 40 }}
                />
              </div>
              <div className="core-description-containerized-custom">
                <h2 className="core-headline">Speed Up</h2>
                <p className="core-p">
                  We help you get things done faster and efficient. Organize
                  your workers and applicants evaluation/assessments processes
                  on our trusted platform.
                </p>
              </div>
            </div>
            <div className="core-two">
              <div className="icon-containerized-custom">
                <Icon
                  className="fas fa-hourglass-start"
                  style={{ color: "#4B5052", fontSize: 40 }}
                />
              </div>
              <div className="core-description-containerized-custom">
                <h2 className="core-headline">Ease Time</h2>
                <p className="core-p">
                  Selecting the best among thousands of applicant or workforce
                  can be very tasky. Not to worry, cut some slack and lets
                  handle that for you with ease.
                </p>
              </div>
            </div>
            <div className="core-three">
              <div className="icon-containerized-custom">
                <Icon
                  className="fas fa-universal-access"
                  style={{ color: "#004d40", fontSize: 38 }}
                />
              </div>
              <div className="core-description-containerized-custom">
                <h2 className="core-headline">Easy Access</h2>

                <p className="core-p">
                  Access our industrial based standard technical and basic
                  evaluation questions. Giving you a head start into your
                  targets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="service-hero">
        <div className="service-banner-container">
          <h1 className="headline">What We Do</h1>
          <p className="text-white text-center">
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.{" "}
          </p>
        </div>
      </section>
      <section className="wrapper" id="services">
        <div className="containerized-custom">
          <div className="core-divs">
            <div className="core-one">
              <div className="icon-containerized-custom">
                <CastConnectedOutlinedIcon
                  className="fa fa-edge"
                  style={{ color: "#DC143C", fontSize: 40 }}
                  aria-hidden="true"
                />
              </div>
              <div className="core-description-containerized-custom">
                <h2 className="core-headline">
                  <span>e-</span>Evaluation
                </h2>
                <p className="core-p">
                  Curabitur non nulla sit amet nisl tempus convallis quis ac
                  lectus. Praesent sapien massa, convallis a pellentesque nec,
                  egestas non nisi. Cras ultricies ligula sed magna dictum
                  porta. Praesent sapien massa, convallis a pellentesque nec,
                  egestas non nisi.
                </p>
              </div>
            </div>
            <div className="core-two">
              <div className="icon-containerized-custom">
                <Icon
                  className="fas fa-handshake-o"
                  style={{ color: "#4B5052", fontSize: 40 }}
                />
              </div>
              <div className="core-description-containerized-custom">
                <h2 className="core-headline">
                  <span>e-</span>Recruitment
                </h2>
                <p className="core-p">
                  Curabitur non nulla sit amet nisl tempus convallis quis ac
                  lectus. Praesent sapien massa, convallis a pellentesque nec,
                  egestas non nisi. Cras ultricies ligula sed magna dictum
                  porta. Praesent sapien massa, convallis a pellentesque nec,
                  egestas non nisi.
                </p>
              </div>
            </div>
            <div className="core-three">
              <div className="icon-containerized-custom">
                <BusinessCenterOutlinedIcon
                  className="fa fa-shield"
                  style={{ color: "#004d40", fontSize: 40 }}
                />
              </div>
              <div className="core-description-containerized-custom">
                <h2 className="core-headline">
                  <span>e-</span>
                  <strong>Management</strong>
                </h2>
                <p className="core-p">
                  Curabitur non nulla sit amet nisl tempus convallis quis ac
                  lectus. Praesent sapien massa, convallis a pellentesque nec,
                  egestas non nisi. Cras ultricies ligula sed magna dictum
                  porta. Praesent sapien massa, convallis a pellentesque nec,
                  egestas non nisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-hero" id="features">
        <div className="service-banner-container">
          <h1 className="text-center headline">Go beyond your limitations</h1>
          <p className="text-white">A better approach to how you do things. </p>
          <div className="ipad-img">
            <img src={ipadTop} alt="img" />
          </div>
        </div>
      </section>
      <section className="wrapper">
        <div className="containerized-custom">
          <div className="core-divs">
            <div className="translate-y">
              <div className="row">
                <div className="feature-cards card-one row-first-child col-lg-3  col-md-6 col-sm-6 col-xs-12">
                  <div className="card card-div ">
                    <div className="cards-feature-color-1"></div>
                    <div className="cards-contents">
                      <Icon
                        className="fas fa-database"
                        style={{ color: "#DC143C", fontSize: 50 }}
                      />
                      <div className=" cards-contents-main mt-4">
                        <h3 className="text-center cards-contents-title">
                          Preloaded Assessments
                        </h3>
                        <div className="cards-contents-paragraph-container">
                          <p className="mt-3 cards-contents-paragraph">
                            Over 1000+ collections of evaluation: Abstract
                            Reasoning, Logical Reasoning, Numerical Reasoning,
                            General Aptitude, Verbal Reasoning e.t.c
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-cards card-two col-lg-3 row-first-child  col-md-6 col-sm-6 col-xs-12">
                  <div className="card card-div ">
                    <div className="cards-feature-color-2"></div>
                    <div className="cards-contents">
                      <CategoryOutlinedIcon
                        className="fas fa-bolt"
                        style={{ color: "#4B5052", fontSize: 50 }}
                      />
                      <div className=" cards-contents-main mt-4">
                        <h3 className="text-center cards-contents-title">
                          Flexible Options
                        </h3>
                        <br></br>
                        <div className="cards-contents-paragraph-container">
                          <p className="mt-2 cards-contents-paragraph">
                            Go beyond limitations of preloaded assessment.
                            Upload your question with ease,
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-cards card-three col-lg-3  col-md-6 col-sm-6 col-xs-12">
                  <div className="card card-div">
                    <div className="cards-feature-color-3"></div>
                    <div className="cards-contents">
                      <BarChartIcon
                        className="fas fa-line-chart"
                        style={{ color: "#4B5052", fontSize: 50 }}
                      />
                      <div className=" cards-contents-main mt-4">
                        <h3 className="text-center cards-contents-title">
                          Performance Charts
                        </h3>
                        <div className="cards-contents-paragraph-container">
                          <p className="mt-3 cards-contents-paragraph">
                            Easily carryout visual analysis of candidate
                            performance with our customized tools.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-cards card-four last-child col-lg-3  col-md-6 col-sm-6 col-xs-12">
                  <div className="card card-div">
                    <div className="cards-feature-color-4"></div>
                    <div className="cards-contents">
                      <CameraOutlinedIcon
                        className="fas"
                        style={{ color: "#004d40", fontSize: 50 }}
                      />
                      <div className=" cards-contents-main mt-4">
                        <h3 className="text-center cards-contents-title">
                          Livestream
                        </h3>
                        <br></br>
                        <div className="cards-contents-paragraph-container">
                          <p className="mt-3 cards-contents-paragraph">
                            Capture evaluations on the go with our webcam
                            features.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Promotional video */}
      <section className="feature-hero-promo">
        <div className="service-banner-container">
          <img src={promotional} alt="img" className="promo-video" />
        </div>
      </section>
      <section className="feature-hero-counter">
        <div className="service-banner-container">
          <div className="text-white d-flex counter-all">
            <div className="counter-single">
              <h1 className="headline">1</h1>
              <p>Platform</p>
            </div>
            <div className="counter-single">
              <h1 className="headline">
                <CountUp start={0} end={10} duration={10} />K
              </h1>
              {/* <h1>+10k</h1> */}
              <p>Evaluations</p>
            </div>
            <div className="counter-single">
              <h1 className="headline">
                <CountUp start={0} end={99} duration={5} />%
              </h1>
              <p>Satisfaction</p>
            </div>
          </div>
          <div className="social-medias">
            <FacebookIcon
              className="fa  ml-0"
              style={{ color: "white", fontSize: 30 }}
            />
            <TwitterIcon
              className="fa "
              style={{ color: "white", fontSize: 30 }}
            />
            <YouTubeIcon
              className="fa "
              style={{ color: "white", fontSize: 30 }}
            />
            <LinkedInIcon
              className="fa "
              style={{ color: "white", fontSize: 30 }}
            />
            <PinterestIcon
              className="fa "
              style={{ color: "white", fontSize: 30 }}
            />
          </div>
        </div>
      </section>
      {/* Sign Up */}
      <section className="feature-hero-sign-up">
        <div className="dark-banner">
          <div className="service-banner-container-sign-up">
            <h2 className="text-center headline">
              Why choose the hardway when you have us ?
            </h2>
            <p className="text-white text-center">
              Go pro, join thousands of organizations using our platform...{" "}
            </p>

            <Link to="/organization/signup" className="btn sign-up cta-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
      {/* Price */}
      <section className="wrapper mt-0" id="pricing">
        <div className="containerized-custom">
          <div className="core-divs">
            <div className="translate">
              <div className="row">
                <div className="feature-cards row-first-child col-lg-4  col-md-6 col-sm-6 col-xs-12">
                  <div className="card card-div">
                    <div className="cards-feature-color-1"></div>
                    <div className="cards-contents">
                      <span
                        className="text-center"
                        style={{ color: "#DC143C", fontSize: 50 }}
                      >
                        <s>N</s> 0
                      </span>
                      <div className=" cards-contents-main mt-4">
                        <h3 className="text-center cards-contents-title">
                          Basic
                        </h3>
                        <ul className="mt-4 ">
                          <li>
                            <p>1 Evaluation/Month</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#Dc143c" }}
                            />
                          </li>
                          <li>
                            <p>30 Candidate Max. / Evaluation</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#Dc143c" }}
                            />
                          </li>
                          <li>
                            <p>3 Preloaded Assessments</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#Dc143c" }}
                            />
                          </li>
                          <li>
                            <p>User based Assessments</p>
                            <Icon
                              className="fa fa-times-circle"
                              style={{ fontSize: 15, color: "#Dc143c" }}
                            />
                          </li>
                          <li>
                            <p>Livestream</p>
                            <Icon
                              className="fa fa-times-circle"
                              style={{ fontSize: 15, color: "#Dc143c" }}
                            />
                          </li>
                        </ul>
                        <div
                          className="price-cta-div"
                          style={{ background: "#DC143C", color: "white" }}
                        >
                          <Icon className="fa fa-arrow-right" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-cards col-lg-4 row-first-child col-md-6 col-sm-6 col-xs-12">
                  <div className="card card-div">
                    <div className="cards-feature-color-2"></div>
                    <div className="cards-contents">
                      <span
                        className=" text-center"
                        style={{ color: "#4B5052", fontSize: 50 }}
                      >
                        <s>N</s> 20,000
                      </span>
                      <div className=" cards-contents-main mt-4">
                        <h3 className="text-center cards-contents-title">
                          Midi
                        </h3>
                        <ul className="mt-4 ">
                          <li>
                            <p>10 Evaluation/Month</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#4B5052" }}
                            />
                          </li>
                          <li>
                            <p>50 Candidate Max. / Evaluation</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#4B5052" }}
                            />
                          </li>
                          <li>
                            <p>5 Preloaded Assessments</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#4B5052" }}
                            />
                          </li>
                          <li>
                            <p>2 User based Assessments</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#4B5052" }}
                            />
                          </li>
                          <li>
                            <p>Livestream (photo-caption)</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#4B5052" }}
                            />
                          </li>
                        </ul>
                        <div
                          className="price-cta-div"
                          style={{ background: "#4B5052", color: "white" }}
                        >
                          <Icon className="fa fa-arrow-right" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-cards last-child col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  <div className="card card-div">
                    <div className="cards-feature-color-4"></div>
                    <div className="cards-contents">
                      <span
                        className=" text-center"
                        style={{ color: "#004d40", fontSize: 50 }}
                      >
                        <s>N</s> 100,000
                      </span>
                      <div className=" cards-contents-main mt-4">
                        <h3 className="text-center cards-contents-title">
                          Super
                        </h3>
                        <ul className="mt-4 ">
                          <li>
                            <p>50 Evaluation/Month</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#004d40" }}
                            />
                          </li>
                          <li>
                            <p>100 Candidate Max. / Evaluation</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#004d40" }}
                            />
                          </li>
                          <li>
                            <p>7 Preloaded Assessments</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#004d40" }}
                            />
                          </li>
                          <li>
                            <p>7 User based Assessments</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#004d40" }}
                            />
                          </li>
                          <li>
                            <p>Livestream (photo-caption)</p>
                            <Icon
                              className="fa fa-check"
                              style={{ fontSize: 15, color: "#004d40" }}
                            />
                          </li>
                        </ul>
                        <div
                          className="price-cta-div"
                          style={{ background: "#004d40", color: "white" }}
                        >
                          <Icon className="fa fa-arrow-right" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <section className="footer-section-main-area">
        <a className="arrow-up" href="#target">
          <Icon className="fa fa-arrow-up" />
        </a>
        <div className="containerized-custom">
          <div className="core-divs footer-main-containerized">
            <div className="about-us-footer">
              <h1>About Us</h1>
              <p className="mt-4">
                <span style={{ color: "#DC143C", fontSize: "20px" }}>
                  I.Q-Evaluate
                </span>{" "}
                is an e-platform intended for both recruiters and organizations
                in private and public sector to carry out general evaluations of
                staff and job seekers in a more convenient, energy ant time
                saving experience.
              </p>
            </div>
            <div className="links-footer">
              <h1>Links</h1>
              <ul>
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>Services</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
                <li>
                  <a>About Us</a>
                </li>
                <li>
                  <a>FAQ</a>
                </li>
              </ul>
            </div>
            <div className="explore-us-footer">
              <h1>Explore</h1>
              <ul>
                <li>
                  <a>Cookies</a>
                </li>
                <li>
                  <a>Privacy Policy</a>
                </li>
                <li>
                  <a>Licenses</a>
                </li>
                <li>
                  <a>Insight</a>
                </li>
              </ul>
            </div>
            <div className="contact-us-footer">
              <h1 className="">Contact Us</h1>
              <div className="info mt-2">
                <MDBIcon
                  icon="phone mr-4 pt-1"
                  style={{ color: "white", fontSize: 14 }}
                />
                <p className="text-white">+2347069452633</p>
              </div>
              <div className="info">
                <MDBIcon
                  icon="phone mr-4 pt-1"
                  style={{ color: "white", fontSize: 14 }}
                />
                <p className="text-white">+2349062172163</p>
              </div>
              <div className="info">
                <MDBIcon
                  icon="at mr-4 pt-1"
                  style={{ color: "white", fontSize: 14 }}
                />
                <p className="text-white">info@iqevaluate.com</p>
              </div>
            </div>
          </div>
          <div className="end-line-footer"></div>

          <footer className="footer text-white">&copy; 2020 </footer>
        </div>
        <p className="text-center" style={{ color: "white", fontSize: 14 }}>
          {" "}
          Made with
          <i
            className="fa fa-heart"
            style={{ color: "#Dc143c" }}
            aria-hidden="true"
          ></i>
        </p>
      </section>
    </>
  );
};

export default NewLanding;
