export default function (plotFun, weatherThisWeek, moreWeatherInfoContainer) {
  const biggerHeader = document.createElement("h1");
  biggerHeader.classList.add("bigger-header");
  biggerHeader.textContent = "This week";
  moreWeatherInfoContainer.appendChild(biggerHeader);

  const chartData = document.createElement("div");
  chartData.classList.add("chart-data");

  const plot = document.createElement("div");
  plot.classList.add("plot");
  plot.id = "weatherPlot";
  plot.style = "width: 100%; max-width: 700px";

  chartData.appendChild(plot);

  moreWeatherInfoContainer.append(chartData);

  plotFun(
    [
      "Monday",
      "Tuesday",
      "Wensday",
      "Thursday",
      "Friday",
      "Saterday",
      "Sunday",
    ],
    [
      weatherThisWeek[0],
      weatherThisWeek[1],
      weatherThisWeek[2],
      weatherThisWeek[3],
      weatherThisWeek[4],
      weatherThisWeek[5],
      weatherThisWeek[6],
    ]
  );
}
