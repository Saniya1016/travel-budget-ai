import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetGraph({ budget, spent }) {
    const remaining = budget - spent;

    const data = {
        labels: ['Spent', 'Remaining'], // Labels for the sections
        datasets: [
            {
                data: [spent, remaining], // Values for the sections
                backgroundColor: ['#FF6384', '#4CAF50'], // Colors for each section (green for remaining)
                hoverBackgroundColor: ['#FF4384', '#45A049'], // Hover effect colors (darker green for remaining)
                borderWidth: 1,
            },
        ],
    };
    

    // Options for the Doughnut chart
    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
            label: (tooltipItem) => {
                const label = tooltipItem.label;
                const value = tooltipItem.raw;
                return `${label}: $${value.toFixed(2)}`;
            },
            },
        },
        },
    };

    return (
        <div className="w-64 h-64 mx-auto">
            <Doughnut data={data} options={options} />
        </div>
    );
}
