import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// Essential for Chart.js to work with React
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Simple color generator function
const generateColors = (num) => {
    const baseColors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#20c997', '#fd7e14', '#00bcd4', '#607d8b'];
    let colors = [];
    for(let i = 0; i < num; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
};

const SpendingSummary = ({ summaryData }) => {
  if (!summaryData || summaryData.length === 0) {
    return <div className="chart-box">No spending data available to summarize.</div>;
  }

  // Filter out non-positive expenses (like income, if included) for a spending chart
  const spendingOnly = summaryData.filter(item => item.total_spent > 0);
  
  const labels = spendingOnly.map(s => s.category);
  const dataPoints = spendingOnly.map(s => s.total_spent);
  const colors = generateColors(labels.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Spent (Rs.)',
        data: dataPoints,
        backgroundColor: colors,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Spending Distribution by Category' },
    },
  };

  return (
    <div className="chart-box">
        {/* ChartJS component */}
        <Doughnut data={data} options={options} />
    </div>
  );
};

export default SpendingSummary;