import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";

// Register required components with Chart.js
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        datasets: [
          {
            data: [10, 20, 30, 10, 50, 10, 10],
            label: "EXPENSE",
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgba(109, 253, 181, 0.5)",
            borderWidth: 2,
          },
          {
            data: [100, 100, 100, 100, 100, 100, 100],
            label: "INCOME",
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="h-full w-full  rounded-xl ">
      <div className="flex">
        <h1 className="w-full mx-auto text-xl text-center font-semibold capitalize">
          Bar Chart
        </h1>
        <h1>date</h1>
      </div>
      <div className="w-full flex mx-auto my-auto">
        <div className=" pt-0 rounded-xl w-full my-auto">
          <canvas className=" w-full h-60" id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
};
