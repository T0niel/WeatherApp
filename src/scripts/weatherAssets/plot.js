//This reqires https://cdn.plot.ly/plotly-latest.min.js
export default function (xDataArray, yDataArray, plotId = "weatherPlot" ,markerColor = "rgba(0,0,255,0.6)") {
  const data = [
    {
      x: xDataArray,
      y: yDataArray,
      type: "bar",
      orientation: "v",
      marker: { color: markerColor },
    },
  ];

  const layout = { title: "This weeks tempatures" };

  Plotly.newPlot(plotId, data, layout);
}
