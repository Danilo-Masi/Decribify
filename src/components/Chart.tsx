import { Dispatch, SetStateAction, useEffect, useRef } from "react";
//Apex-chart
import ApexCharts from 'apexcharts'

const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
        {
            name: "Generazioni",
            color: "#048353",
            data: [
                { x: "Lun", y: 5 },
                { x: "Mar", y: 10 },
                { x: "Mer", y: 36 },
                { x: "Gio", y: 2 },
                { x: "Ven", y: 122 },
                { x: "Sab", y: 78 },
                { x: "Dom", y: 7 },
            ],
        }
    ],
    chart: {
        type: "bar",
        height: "320px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "50%",
            borderRadiusApplication: "end",
            borderRadius: 4,
        },
    },
    tooltip: {
        shared: true,
        intersect: false,
        style: {
            fontFamily: "Inter, sans-serif",
        },
    },
    states: {
        hover: {
            filter: {
                type: "darken",
                value: 1,
            },
        },
    },
    stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -14
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    xaxis: {
        floating: false,
        labels: {
            show: true,
            style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    fill: {
        opacity: 1,
    },
};

interface ChartProps {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Chart({ setModalOpen }: ChartProps) {

    const chartRef = useRef(null);

    useEffect(() => {
        const chartElement = document.getElementById("column-chart");
        if (chartElement && typeof ApexCharts !== 'undefined') {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new ApexCharts(chartElement, options);
            chartRef.current.render();
        }

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full h-full bg-white rounded-lg shadow dark:bg-dark-elevation2 p-4 md:p-6">

            {/* Intestazione */}
            <div className="flex justify-between pb-4 mb-4 border-b border-custom-border dark:border-dark-border">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="leading-none text-2xl font-bold text-custom-textPrimary dark:text-dark-textPrimary pb-1">3.4k</h5>
                        <p className="text-sm font-normal text-custom-textSecondary dark:text-dark-textSecondary">Leads generated per week</p>
                    </div>
                </div>
            </div>

            {/* Intestazioni grafico */}
            <div className="grid grid-cols-2">
                <dl className="flex items-center">
                    <dt className="text-custom-textSecondary dark:text-dark-textSecondary text-sm font-normal me-1">Money spent:</dt>
                    <dd className="text-custom-textPrimary dark:text-dark-textPrimary text-sm font-semibold">$3,232</dd>
                </dl>
                <dl className="flex items-center justify-end">
                    <dt className="text-custom-textSecondary dark:text-dark-textSecondary text-sm font-normal me-1">Conversion rate:</dt>
                    <dd className="text-custom-textPrimary dark:text-dark-textPrimary text-sm font-semibold">1.2%</dd>
                </dl>
            </div>

            {/* Grafico */}
            <div id="column-chart"></div>

            {/* Footer grafico */}
            <div className="flex justify-between items-center pt-5  border-custom-border dark:border-dark-border border-t">
                <a  
                    onClick={() => setModalOpen(true)}
                    className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-custom-accent dark:text-dark-accent hover:text-custom-textPrimary dark:hover:text-dark-textPrimary px-2.5 py-3">
                    Leads Report
                    <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                </a>
            </div>

        </div>

    );
}
