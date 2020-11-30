import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data }) => {
  return (
    <div>
      <h2>Doughnut Example</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
