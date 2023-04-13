//initialize the noise chart
const noiseChartCtx = document.getElementById("myChart").getContext("2d");

const noiseChartData = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Coughing",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  },
};

const noiseChart = new Chart(noiseChartCtx, noiseChartData);

//Updates charts and the readings and the button text
function updateCharts() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      // Extract the readings
      var noise_live = data.noise[data.noise.length - 1];
      console.log(noise_live);

      // Add the latest data and labels to the chart datasets
      noiseChart.data.labels.push(data.time);
      noiseChart.data.datasets[0].data.push(noise_live);

      // Remove the oldest data and labels from the chart datasets if they exceed 20 points
      if (noiseChart.data.labels.length > 20) {
        noiseChart.data.labels.shift();
        noiseChart.data.datasets[0].data.shift();
      }

      // Update the charts
      noiseChart.update();
      console.log("success");
    })
    .catch((error) => console.error(error));
}

setInterval(updateCharts, 4000);

//progress bar

// Set progress percentage (0-100) here
var progressPercentage = 65;
var progressFill = document.getElementById("progressFill");
var progressText = document.getElementById("progressText");
var warning_tab = document.getElementById("warning_tab");

setInterval(() => {
  if (progressPercentage > 50) {
    progressFill.style.backgroundColor = "rgb(238, 197, 197)";
    warning_tab.style.color = "red";
    warning_tab.style.backgroundColor = "rgb(238, 197, 197)";
    warning_tab.innerText = "Suspected Respiratory disease";
  } else {
    warning_tab.style.color = "green";
    warning_tab.style.backgroundColor = "lightgreen";
    warning_tab.innerText = "Optimal Animal Health";
  }
  // Update progress bar
  progressFill.style.width = progressPercentage + "%";
  progressText.innerText = progressPercentage + "%";
}, 1000);
