const category = document.querySelector(".category");
const season = document.querySelector(".season");

let data = {};
let seasonSelected = "";
let categorySelected = "";
let chartInstance = "";

async function fetchData() {
  try {
    const response = await fetch("../ipl_data.json");
    data = await response.json();
  } catch (err) {
    console.log("Error" + err);
  }
}

function displayData() {
  const labels = data[seasonSelected][categorySelected].map(
    (row) => row.Player
  );
  let key = "";
  const graphData = data[seasonSelected][categorySelected].map((row) => {
    key = categorySelected.split(" ")[1];
    if (categorySelected === "Orange Cap") key = "Runs";
    return row[key];
  });
  // console.log(labels, graphData);
  if (labels.length > 0 && graphData.length > 0) {
    buildChart(labels, graphData, key);
  }
}

function buildChart(labels, graphData, key) {
  const ctx = document.getElementById("myChart");
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: `No. Of ${key}`,
          data: graphData,
          borderWidth: 1,
        },
      ],
    },
  });
}

async function main() {
  await fetchData();
  category.addEventListener("change", () => {
    categorySelected = category.value;
    if (categorySelected && seasonSelected) displayData();
  });

  season.addEventListener("change", () => {
    seasonSelected = season.value;
    if (categorySelected && seasonSelected) displayData();
  });
}

main();
