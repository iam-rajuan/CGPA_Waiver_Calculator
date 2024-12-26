import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Semester } from '../types';
import { calculateGPA } from '../utils/gradeCalculator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProgressChartProps {
  semesters: Semester[];
  isDarkMode: boolean;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ semesters, isDarkMode }) => {
  const validSemesters = semesters.filter(semester =>
    semester.courses.some(course => course.name && course.grade && course.credits)
  );

  const labels = validSemesters.map(sem => `Semester ${sem.id}`);
  const gpaData = validSemesters.map(sem => calculateGPA(sem.courses));

  const data = {
    labels,
    datasets: [
      {
        label: 'GPA Progression',
        data: gpaData,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 4,
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <Line options={options} data={data} />
    </div>
  );
};

export default ProgressChart;