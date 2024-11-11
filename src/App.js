import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LinePlot from "./Charts/Line";
import Barchart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import BubbleChart from "./Charts/BubbleChart";
import AreaChart from "./Charts/AreaChart";

import * as d3 from "d3";

function App() {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  console.log("data", data);
  return (
    <div className="App">
      {/* <LinePlot data={data} /> */}
      {/* <Barchart /> */}
      {/* <PieChart /> */}
      {/* <BubbleChart /> */}
      <AreaChart />
    </div>
  );
}

export default App;
