"use client";

import { BACKEND_ENDPOINT } from "@/constants/Constants";
import {
  Chart,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

// Register necessary components for chart.js
Chart.register(PieController, ArcElement, Title, Tooltip, Legend);

export const PieChart = ({ userID }) => {
  const [categories, setCategories] = useState([]);
  const [chartInstance, setChartInstance] = useState(null); // To store the chart instance

  // Fetch categories data from the backend
  const fetchCategoriesData = async () => {
    if (!userID) return;
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/categories/${userID}`);
      const data = await response.json();
      setCategories(data.data || []); // Update state with fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchCategoriesData(); // Fetch data when component mounts or userID changes
    }
  }, [userID]); // Re-fetch when userID changes

  useEffect(() => {
    if (categories.length === 0) return;

    const ctx = document.getElementById("myPieChart").getContext("2d");

    // If chart already exists, destroy it before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories.map((category) => category.name), // Dynamically set labels based on categories
        datasets: [
          {
            data: [12, 210, 21, 20, 42, 30], // Dynamically set data based on categories
            backgroundColor: categories.map((_, index) => {
              const colors = [
                "rgba(109, 253, 181, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(255, 205, 86, 0.7)",
                "rgba(255, 99, 132, 0.7)",
              ];
              return colors[index % colors.length]; // Cycle through colors
            }),
            borderColor: categories.map((_, index) => {
              const colors = [
                "rgb(109, 253, 181)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ];
              return colors[index % colors.length]; // Cycle through border colors
            }),
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#333",
              font: {
                size: 14,
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            bodyFont: {
              size: 14,
            },
            callbacks: {
              label: (tooltipItem) => {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                const label = tooltipItem.label;
                return `${label}: ${currentValue}`;
              },
            },
          },
        },
      },
    });

    setChartInstance(newChart); // Save the chart instance for cleanup later
  }, [categories]); // Re-run this effect when categories data changes

  return (
    <div className="h-full w-full flex gap-3 justify-between flex-col p-5 rounded-lg">
      <h1 className="w-full mx-auto text-xl font-semibold capitalize text-center text-gray-700">
        Last month expense percentage for each category.
      </h1>
      <div className="w-full flex justify-center mx-auto my-auto">
        <div className="pt-0 rounded-xl w-full h-full flex justify-center">
          <canvas
            id="myPieChart"
            style={{ height: "200px", width: "200px" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
