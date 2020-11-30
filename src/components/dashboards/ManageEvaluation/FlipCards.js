import React, { useState } from "react";
import ReactFlipCard from "react-card-flip";

const FlipCards = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  //console.log(data);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactFlipCard isFlipped={isFlipped} flipDirection="horizontal">
      <div className="cards-container" onClick={handleFlip}>
        <h3>{data.title}</h3>
        <h5>{data.testId}</h5>
        <button>More</button>
      </div>
      <div className="cards-container" onClick={handleFlip}>
        <h3>{data.testId}</h3>
        <h5>{data.duration}min</h5>
        <h6>{data.date}</h6>
        <button>Ok</button>
      </div>
    </ReactFlipCard>
  );
};

export default FlipCards;
