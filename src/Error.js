import React from "react";
import Header from "./components/Header";

const Error = () => {
  return (
    <>
      <Header />
      <div className="hero" id="target">
        <section className="banner" id="hero">
          <div className="containerized-custom">
            <div className="introduction">
              <h2 className="sub-headline"></h2>
              <h1 className="headline">404</h1>
              <div className="headline-description">
                <div className="single-animation mt-4">
                  <h5>Oops ! page not found</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Error;
