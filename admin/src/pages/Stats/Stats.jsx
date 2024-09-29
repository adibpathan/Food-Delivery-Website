// Stats.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { toast } from 'react-toastify';
import './Stats.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Stats = ({ url }) => {
  const [foodStats, setFoodStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);

  const fetchStats = async () => {
    try {
      // Fetch food stats
      const foodResponse = await axios.get(`${url}/api/food/list`);
      if (foodResponse.data.success) {
        setFoodStats(foodResponse.data.data);
      } else {
        toast.error('Failed to fetch food data');
      }

      // Fetch order stats
      const orderResponse = await axios.get(`${url}/api/order/list`);
      if (orderResponse.data.success) {
        setOrderStats(orderResponse.data.data);
      } else {
        toast.error('Failed to fetch order data');
      }
    } catch (error) {
      toast.error('Error fetching statistics');
    }
  };

  useEffect(() => {
    fetchStats();
  }, [url]);

  // Prepare data for the food chart
  const foodData = {
    labels: foodStats.map(food => food.name), // Use food names as labels
    datasets: [
      {
        label: 'Food Prices',
        data: foodStats.map(food => food.price), // Use food prices for the graph
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the order chart
  const orderData = {
    labels: orderStats.map((order, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: 'Order Amount',
        data: orderStats.map(order => order.amount),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2>Food and Order Statistics</h2>
      <div className="chart">
        <h3>Food Prices</h3>
        <Bar data={foodData} options={{ responsive: true }} />
      </div>
      <div className="chart">
        <h3>Order Amounts</h3>
        <Line data={orderData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Stats;
