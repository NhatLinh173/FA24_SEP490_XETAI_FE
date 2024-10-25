import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistical = ({ driverId }) => {
  const [statistics, setStatistics] = useState({
    tripsThisWeek: 0,
    tripsThisMonth: 0,
    earnings: 0,
  });
  const [timeRange, setTimeRange] = useState("Hôm nay");
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/driver/statistics/${driverId}`
        );
        const data = await response.json();
        setStatistics({
          tripsThisWeek: data.tripsThisWeek,
          tripsThisMonth: data.tripsThisMonth,
          earnings: data.balance,
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      }
    };

    fetchStatistics();
  }, [driverId]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };
  const barData = {
    labels: ["Chuyến đi trong tuần", "Chuyến đi trong tháng"],
    datasets: [
      {
        label: "Số chuyến đi",
        data: [statistics.tripsThisWeek, statistics.tripsThisMonth],
        backgroundColor: ["#36a2eb", "#ffcd56"],
      },
    ],
  };

  const lineData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Số tiền (VND)",
        data: [
          1000000,
          1500000,
          1200000,
          5000000,
          1800000,
          4000000,
          10000000,
          statistics.earnings,
        ],
        borderColor: "#ff6384",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const totalTrip = statistics.tripsThisWeek + statistics.tripsThisMonth;

  return (
    <div className="statistical-container">
      <h2>Thống Kê Tài Xế</h2>
      <div className="chart-container">
        <h4 style={{ marginTop: "15px" }}>Số chuyến đi: {totalTrip}</h4>
        <Bar data={barData} options={{ responsive: true }} />
      </div>
      <div className="chart-container" style={{ marginTop: "20px" }}>
        <h4>Doanh thu</h4>
        <div className="time-range-buttons">
          <button onClick={() => handleTimeRangeChange("Hôm qua")}>
            Hôm qua
          </button>
          <button onClick={() => handleTimeRangeChange("Hôm nay")}>
            Hôm nay
          </button>
          <button onClick={() => handleTimeRangeChange("Tuần này")}>
            Tuần này
          </button>
          <button onClick={() => handleTimeRangeChange("Tháng này")}>
            Tháng này
          </button>
          <button onClick={() => handleTimeRangeChange("Năm này")}>
            Năm này
          </button>
        </div>
        <h3 style={{ marginTop: "15px" }}>Tổng doanh thu: </h3>
        <Line data={lineData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Statistical;
