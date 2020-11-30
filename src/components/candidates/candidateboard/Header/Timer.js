import React, { useState } from "react";
import Countdown from "react-countdown";

const Timer = ({ handleEnd }) => {
  //keeping track of timer state with sessio storage
  const time = sessionStorage.getItem("time");
  const [present, setPresent] = useState(Date.now() + Number(time));

  // Random component
  const Completionist = () => <span className="counter-span">Submit</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="counter-span-candidate">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  //thicker function to store the remainin time on session storage
  const thicker = (e) => {
    //  setting remaining time on sessionstorage (persistence). note in milliseconds
    sessionStorage.setItem("time", `${present - Date.now()}`);
  };

  return (
    <div className="counter-div-candidate">
      <Countdown
        date={present}
        renderer={renderer}
        onComplete={(e) => handleEnd(e)}
        onTick={(e) => thicker(e)}
      />
    </div>
  );
};

export default Timer;
