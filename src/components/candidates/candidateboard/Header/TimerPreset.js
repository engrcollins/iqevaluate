import React, { useState } from "react";
import Countdown from "react-countdown";

const Timer = ({ handleFinished }) => {
  //keeping track of timer state with sessio storage

  const [present, setPresent] = useState(Date.now());

  // Random component
  const Completionist = () => (
    <span className="counter-span-candidate">00:00:00</span>
  );

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
  return (
    <div className="counter-div">
      <Countdown date={present} renderer={renderer} />
    </div>
  );
};

export default Timer;
