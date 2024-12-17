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
import axios from "axios";

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
  const [labels, setLabels] = useState([]);
  const [lineDataPoints, setLineDataPoints] = useState([]);
  const [tripDataPoints, setTripDataPoints] = useState([]);

  const timeRangeMapping = {
    "Hôm qua": "yesterday",
    "Hôm nay": "today",
    "Tuần này": "week",
    "Tháng này": "month",
    "Tháng trước": "lastMonth",
    "Năm nay": "thisYear",
    "Năm trước": "lastYear",
  };

  const fetchStatistics = async (range) => {
    try {
      const mappedRange = timeRangeMapping[range];
      const response = await axios.get(
        `https://xehang.site/driver/${driverId}/statistics?range=${range}`
      );
      const data = response.data;

      setStatistics({
        tripsThisWeek: data.tripsThisWeek || 0,
        tripsThisMonth: data.tripsThisMonth || 0,
        earnings: data.balance || 0,
      });

      let newLabels = [];
      let newTripDataPoints = [];
      let newLineDataPoints = [];

      switch (mappedRange) {
        case "yesterday":
        case "today": {
          newLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
          const selectedData =
            mappedRange === "today" ? data.today : data.yesterday;

          if (selectedData && Array.isArray(selectedData)) {
            newTripDataPoints = newLabels.map((hour) => {
              const hourData = selectedData.find((item) => item.hour === hour);
              return hourData ? hourData.trips : 0;
            });

            newLineDataPoints = newLabels.map((hour) => {
              const hourData = selectedData.find((item) => item.hour === hour);
              return hourData ? hourData.earnings : 0;
            });
          }
          break;
        }

        case "week": {
          const daysOfWeek = [
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
            "CN",
          ];
          const dayMapping = {
            Monday: "Thứ 2",
            Tuesday: "Thứ 3",
            Wednesday: "Thứ 4",
            Thursday: "Thứ 5",
            Friday: "Thứ 6",
            Saturday: "Thứ 7",
            Sunday: "CN",
          };

          newLabels = daysOfWeek;
          newTripDataPoints = Array(7).fill(0);
          newLineDataPoints = Array(7).fill(0);

          if (data.week && Array.isArray(data.week)) {
            data.week.forEach((item) => {
              if (item && item.day) {
                // Chuyển đổi từ tiếng Anh sang tiếng Việt
                const vietnameseDay = dayMapping[item.day];
                const dayIndex = daysOfWeek.indexOf(vietnameseDay);

                if (dayIndex !== -1) {
                  newTripDataPoints[dayIndex] = item.trips;
                  newLineDataPoints[dayIndex] = item.earnings;
                }
              }
            });
          }

          break;
        }

        case "month":
        case "lastMonth": {
          const now = new Date();
          const daysInMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0
          ).getDate();

          newLabels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
          const selectedData =
            mappedRange === "month" ? data.month : data.lastMonth;

          if (selectedData && Array.isArray(selectedData)) {
            newTripDataPoints = Array(daysInMonth).fill(0);
            newLineDataPoints = Array(daysInMonth).fill(0);

            selectedData.forEach((item) => {
              if (item.date) {
                const day = new Date(item.timestamp).getDate();
                if (day >= 1 && day <= daysInMonth) {
                  newTripDataPoints[day - 1] = item.trips;
                  newLineDataPoints[day - 1] = item.earnings;
                }
              }
            });
          }
          break;
        }

        case "thisYear":
        case "lastYear": {
          const monthNames = [
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
          ];

          newLabels = monthNames;
          newTripDataPoints = Array(12).fill(0);
          newLineDataPoints = Array(12).fill(0);

          const yearData =
            mappedRange === "thisYear" ? data.thisYear : data.lastYear;

          if (yearData && Array.isArray(yearData)) {
            yearData.forEach((item) => {
              if (item && item.month) {
                const monthStr = item.month.split("-")[1];
                const monthNumber = parseInt(monthStr) - 1;

                if (monthNumber >= 0 && monthNumber < 12) {
                  newTripDataPoints[monthNumber] = item.trips;
                  newLineDataPoints[monthNumber] = item.earnings;
                }
              }
            });
          }
          break;
        }

        default:
          console.warn(`Không có dữ liệu cho phạm vi: ${range}`);
      }

      setLabels(newLabels);
      setTripDataPoints(newTripDataPoints);
      setLineDataPoints(newLineDataPoints);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    }
  };

  useEffect(() => {
    fetchStatistics(timeRange);
  }, [timeRange, driverId]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const barData = {
    labels: labels.length > 0 ? labels : ["Không có dữ liệu"],
    datasets: [
      {
        label: "Số chuyến đi",
        data: tripDataPoints.length > 0 ? tripDataPoints : [0],
        backgroundColor: "#36a2eb",
      },
    ],
  };

  const lineData = {
    labels: labels.length > 0 ? labels : ["Không có dữ liệu"],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: lineDataPoints.length > 0 ? lineDataPoints : [0],
        borderColor: "#ff6384",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const totalTrip = tripDataPoints.reduce((sum, value) => sum + value, 0);

  return (
    <div className="statistical-container">
      <h2>Thống Kê Tài Xế</h2>
      <div className="time-range-buttons">
        {Object.keys(timeRangeMapping).map((range) => (
          <button
            key={range}
            onClick={() => handleTimeRangeChange(range)}
            style={{
              backgroundColor: timeRange === range ? "#007bff" : "#f0f0f0",
              color: timeRange === range ? "#fff" : "#000",
            }}
          >
            {range}
          </button>
        ))}
      </div>
      <div className="chart-container">
        <h4 style={{ marginTop: "15px" }}>Số chuyến đi: {totalTrip}</h4>
        <Bar key={timeRange} data={barData} options={{ responsive: true }} />
      </div>
      <div className="chart-container" style={{ marginTop: "30px" }}>
        <h4>Doanh thu (VND)</h4>
        <Line key={timeRange} data={lineData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Statistical;
