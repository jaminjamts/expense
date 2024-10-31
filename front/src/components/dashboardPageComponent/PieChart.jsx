import {
  Chart,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";

// Register required components with Chart.js
Chart.register(PieController, ArcElement, Title, Tooltip, Legend);

export const PieChart = () => {
  useEffect(() => {
    const ctx = document.getElementById("myPieChart").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Food", "Saving", "Rent", "Car"],
        datasets: [
          {
            data: [30, 40, 20, 10],
            backgroundColor: [
              "rgba(109, 253, 181, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(255, 205, 86, 0.7)",
              "rgba(255, 99, 132, 0.7)",
            ],
            borderColor: [
              "rgb(109, 253, 181)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right", // Position the legend at the bottom
            labels: {
              color: "#333", // Darker font color for better readability
              font: {
                size: 14, // Set font size for legend items
              },
              padding: 20,
              generateLabels: (chart) => {
                const data = chart.data;
                return data.labels.map((label, index) => {
                  const value = data.datasets[0].data[index];
                  const backgroundColor =
                    data.datasets[0].backgroundColor[index];
                  return {
                    text: `${label}: ${value}`,
                    fillStyle: backgroundColor,
                    strokeStyle: backgroundColor,
                    lineWidth: 2,
                  };
                });
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker tooltip background
            bodyFont: {
              size: 14, // Tooltip font size
            },
            callbacks: {
              label: (tooltipItem) => {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                const label = dataset.label || tooltipItem.label;
                return `${label}: ${currentValue}`;
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="h-full w-full flex gap-3 justify-between flex-col p-5 rounded-lg ">
      <h1 className="w-full mx-auto text-xl font-semibold capitalize text-center text-gray-700">
        Show the expense percentage for each category.
      </h1>
      <div className="w-full flex justify-center mx-auto my-auto">
        <div className="pt-0 rounded-xl w-full h-full flex justify-center ">
          <canvas
            id="myPieChart"
            style={{ height: "200px", width: "200px" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
