import React, { useEffect } from "react";
import * as d3 from "d3";

const data = [
  { label: "Apples", value: 10 },
  { label: "Oranges", value: 20 },
  { label: "Papaya", value: 15 },
  { label: "Pineapple", value: 20 },
  { label: "Chikku", value: 20 },
];

const width = 800;
const height = 600;

function BubbleChart() {
  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // Remove the old svg
    d3.select("#bubble-container").select("svg").remove();

    // Create a new SVG element
    const svg = d3
      .select("#bubble-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create a scale for circle radii
    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([10, 50]); // Adjust range for circle sizes

    // Create a color scale
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([0, data.length]);

    // Create a simulation
    const simulation = d3
      .forceSimulation(data)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force(
        "collision",
        d3.forceCollide((d) => radiusScale(d.value) + 2)
      );

    // Draw the circles
    const nodes = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d) => radiusScale(d.value))
      .attr("fill", (_, i) => colorScale(i))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1);

    // Add labels
    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .style("fill", "#ffffff")
      .style("font-size", "12px");

    // Update the positions
    simulation.on("tick", () => {
      nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      svg
        .selectAll("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);
    });
  }

  return (
    <>
      <h1>Bubble Chart</h1>
      <div id="bubble-container" />
    </>
  );
}

export default BubbleChart;
