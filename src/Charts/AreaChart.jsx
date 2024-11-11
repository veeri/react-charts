import React, { useEffect } from "react";
import * as d3 from "d3";

const data = [
  { label: "Jan", value: 30 },
  { label: "Feb", value: 80 },
  { label: "Mar", value: 45 },
  { label: "Apr", value: 60 },
  { label: "May", value: 20 },
  { label: "Jun", value: 90 },
  { label: "Jul", value: 55 },
];

const AreaChart = () => {
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    drawChart();
  }, []);

  function drawChart() {
    // Remove the old SVG if it exists
    d3.select("#area-chart").select("svg").remove();

    // Create new SVG element
    const svg = d3
      .select("#area-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create the scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);

    // Create a color scale for the data points
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(d3.schemeCategory10);

    // Create the area generator
    // The d3.area() function generates the d attribute of the <path> element, which defines the shape of the area.
    // The x() function positions the points along the x-axis.
    // The y0() function sets the baseline (bottom) of the area, usually at the bottom of the chart.
    // The y1() function sets the top of the area based on the data values.
    const area = d3
      .area()
      .x((d) => x(d.label) + x.bandwidth() / 2)
      .y0(height)
      .y1((d) => y(d.value));

    data.forEach((d, i) => {
      svg
        .append("path")
        .datum([d])
        .attr("fill", colorScale(d.label))
        .attr("d", area);
    });
    // Append the area path
    svg.append("path").datum(data).attr("fill", "steelblue").attr("d", area);

    // Create the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Create the y-axis
    svg.append("g").call(d3.axisLeft(y));
  }

  return (
    <>
      <h1>Area Chart</h1>
      <div id="area-chart" />
    </>
  );
};

export default AreaChart;
