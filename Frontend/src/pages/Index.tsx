import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import { setPageTitle } from '../store/themeConfigSlice';
import axios from 'axios';
import PaymentsUser from './Apps/PaymentsUser';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    const [incomeData, setIncomeData] = useState<number[]>([]);
    const [totalProfit, setTotalProfit] = useState<number>(0);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                // Get the Bearer token from localStorage

                // Fetch the user role from the API
                const response = await axios.get('http://localhost:8070/user/getRole', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRole(response.data);
            } catch (err) {
                console.log('An error occurred while fetching the role.');
            }
        };

        fetchRole();
    }, []);

    // Fetch the monthly income data
    const fetchIncomeData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/payment/getMonthlyPayments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;

            // Map the payments data to an array of totals for each month
            const monthlyIncome = Array(12).fill(0); // Initialize with 12 months of 0
            data.forEach((item: any) => {
                monthlyIncome[item._id - 1] = item.totalIncome; // _id represents the month (1 for Jan, etc.)
            });

            return monthlyIncome;
        } catch (error) {
            console.error('Error fetching payment data', error);
            return Array(12).fill(0); // Return an array of 0s in case of error
        }
    };

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const monthlyIncome = await fetchIncomeData();

                // Calculate total income and total expenses for profit calculation
                const totalIncome = monthlyIncome.reduce((acc, cur) => acc + cur, 0);

                // Calculate total profit
                const profit = totalIncome;
                setTotalProfit(profit);

                setIncomeData(monthlyIncome);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchRevenueData();
    }, []);

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Total Income',
                data: incomeData.length > 0 ? incomeData : Array(12).fill(0), // Use the fetched income data
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],

            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    const [salesData, setSalesData] = useState<any[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/payment/getTotalSalesByPackage', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;

                // Map the sales data to match the series
                const salesSeries = data.map((item: any) => item.totalSales);
                setSalesData(salesSeries);
            } catch (error) {
                console.error('Error fetching sales data', error);
            }
        };

        fetchSalesData();
    }, []);

    //Sales By Category
    const salesByCategory: any = {
        series: salesData.length > 0 ? salesData : [0, 0],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '24px',
                                formatter: (w: any) => {
                                    const total = w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                    return `LKR ${total.toLocaleString()}`; // Adds 'LKR' in front and formats the total with commas
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Regular', 'Premium'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    const [dailySalesData, setdailySalesData] = useState<any[]>([]);

    useEffect(() => {
        const fetchdailySalesData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/payment/getDailyPayments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;

                // Map the sales data to match the series
                const salesSeries = data.map((item: any) => item.totalSales);
                setdailySalesData(salesSeries);
            } catch (error) {
                console.error('Error fetching sales data', error);
            }
        };

        fetchdailySalesData();
    }, []);

    //Daily Sales
    const dailySales: any = {
        series: [
            {
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 21],
            },
            {
                name: 'Last Week',
                data: [13, 23, 20, 8, 13, 27, 33],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
    const totalOrders: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };

    return (
        <div>
            {role === 'admin' || role === 'expert' ? (
                <div className="pt-5">
                    <div className="grid xl:grid-cols-3 gap-6 mb-6">
                        <div className="panel h-full xl:col-span-2">
                            <div className="flex items-center justify-between dark:text-white-light mb-5">
                                <h5 className="font-semibold text-lg">Revenue</h5>
                            </div>
                            <p className="text-lg dark:text-white-light/90">
                                Total Profit <span className="text-primary ml-2">LKR {totalProfit.toLocaleString()}</span>
                            </p>
                            <div className="relative">
                                <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                    {loading ? (
                                        <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                        </div>
                                    ) : (
                                        <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="panel h-full">
                            <div className="flex items-center mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Sales By Package Category</h5>
                            </div>
                            <div>
                                <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                    {loading ? (
                                        <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                        </div>
                                    ) : (
                                        <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <PaymentsUser />
            )}
        </div>
    );
};

export default Index;
