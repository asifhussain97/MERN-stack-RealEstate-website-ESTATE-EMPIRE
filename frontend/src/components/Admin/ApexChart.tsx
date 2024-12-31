import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ApexChartProps {}

const ApexChart: React.FC<ApexChartProps> = () => {
  const [series] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ]);

  const [options] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    title: {
      text: "Product Trends by Month",
      align: "left"
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // Takes an array that will be repeated on columns
        opacity: 0.5
      }
    },
    tooltip: {
      x: {
        show: true,
        format: "dd MMM",
        formatter: () => {
          return "333"; // Adjusted to return a string instead of number
        }
      }
    },
    xaxis: {
      labels: {
        show: true,
        rotate: -45,
        hideOverlappingLabels: true,
        style: {
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400
        },
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm"
        }
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep"
      ]
    }
  });

  return (
    <div id="chart" className="sm:w-full lg:w-1/2 mt-10 ms-16">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ApexChart;
