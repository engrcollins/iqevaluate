import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  return (
    <div style={{ width: "700px", height: "800px" }}>
      <div>
        {/* <h2>Bar Example (custom size)</h2> */}
        <Bar
          data={data}
          //   width={100}
          //   height={50}
          //   options={{
          //     maintainAspectRatio: false,
          //   }}
        />
      </div>
    </div>
  );
};

export default BarChart;
