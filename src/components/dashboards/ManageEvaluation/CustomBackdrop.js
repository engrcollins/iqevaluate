import React, { useEffect, useState } from "react";
import Chart from "./Charts/ChartMan";

const CustomBackdrop = ({ open, setOpen, details }) => {
  //console.log(details);
  let title = details[0].testId;
  let totalObtainable = details[0].totalObtainable;
  let hadTaken = 0;
  // const [scoreCard, setScoreCard] = useState({
  //   _0_40: 0,
  //   _41_50: 0,
  //   _51_60: 0,
  //   _61_70: 0,
  //   _71_80: 0,
  //   _81_100: 0,
  // });
  let scoreCard = {
    _0_40: 0,
    _41_50: 0,
    _51_60: 0,
    _61_70: 0,
    _71_80: 0,
    _81_100: 0,
  };
  let totalParticipant = details.length;
  const percentFunction = (percentageScore) => {
    //console.log(percentageScore);
    if (percentageScore <= 40) return "less 40";
    if (percentageScore > 40 && percentageScore <= 50) return "40-50";
    if (percentageScore > 50 && percentageScore <= 60) return "_51_60";
    if (percentageScore > 60 && percentageScore <= 70) return "_61_70";
    if (percentageScore > 70 && percentageScore <= 80) return "_71_80";
    if (percentageScore > 80) return "_81_100";
  };
  details.forEach((participant) => {
    if (participant.hasTaken === true) hadTaken = hadTaken + 1;
    //cal percentages
    let candidateScore = participant.score;
    let percentageScoreRaw =
      (Number(candidateScore) * 100) / Number(totalObtainable);
    let percentageScore = Number(percentageScoreRaw.toFixed(0));
    // console.log(percentageScore.toFixed(1));
    // console.log(scoreCard[`_0_40`]);
    const score = percentFunction(percentageScore);
    //console.log(score);
    switch (score) {
      case "less 40":
        // setScoreCard({ ...scoreCard, _0_40: scoreCard[`_0_40`] + 1 });
        scoreCard[`_0_40`] += 1;
        break;
      case "40-50":
        scoreCard[`_41_50`] += 1;
        // setScoreCard({ ...scoreCard, _41_50: scoreCard[`_41_50`] + 1 });
        break;
      case "_51_60":
        scoreCard[`_51_60`] += 1;
        // setScoreCard({ ...scoreCard, _51_60: scoreCard[`_51_60`] + 1 });
        break;
      case "_61_70":
        scoreCard[`_61_70`] += 1;
        // setScoreCard({ ...scoreCard, _61_70: scoreCard[`_61_70`] + 1 });
        break;
      case "_71_80":
        scoreCard[`_71_80`] += 1;
        // setScoreCard({ ...scoreCard, _71_80: scoreCard[`_71_80`] + 1 });
        break;
      case "_81_100":
        scoreCard[`_81_100`] += 1;
        // setScoreCard({ ...scoreCard, _81_100: scoreCard[`_81_100`] + 1 });
        break;
      default:
        break;
    }
  });
  // console.log(scoreCard);

  let scoreKeys = Object.keys(scoreCard);
  let scoreCardValues = [];
  scoreKeys.forEach((score) => {
    scoreCardValues.push(scoreCard[score]);
  });
  //console.log(scoreCardValues);
  const dataBarChart = {
    labels: ["0-40%", "41%-50%", "51%-60%", "61%-70%", "71%-80%", "81%-100%"],
    datasets: [
      {
        data: scoreCardValues,
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
      },
    ],
  };
  const dataDoughnut = {
    labels: ["Taken", "Not Taken"],
    datasets: [
      {
        data: [hadTaken, Number(totalParticipant - hadTaken)],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  return (
    <>
      <section
        className={open ? "custom-backdrop-open" : "custom-backdrop-close"}
      >
        <div className="custom-backdrop-contents">
          <h1>{title} contents</h1>
          <span
            color=""
            className="close-btn text-white"
            onClick={() => {
              setOpen(false);
            }}
          >
            &times;
          </span>

          <Chart doughnut={dataDoughnut} barChart={dataBarChart} />
        </div>
      </section>
    </>
  );
};

export default CustomBackdrop;
