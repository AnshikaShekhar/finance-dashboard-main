import React, { useMemo } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    Line,
    CartesianGrid,
    Legend,
    LineChart,
    BarChart,
    Bar,
} from "recharts";
import { useTheme } from "@mui/material";
import DashboardBox from "../../components/DashboardBox";
import { useGetKpisQuery } from "../../state/api";
import BoxHeader from "../../components/BoxHeader";

const Row1 = () => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();

    // Log data to verify its structure
    console.log("Fetched KPI data:", data);

    const revenue = useMemo(() => {
        return (
            data &&
            data[0]?.monthlyData.map(({ month, revenue }) => ({
                name: month.substring(0, 3),
                revenue: revenue,
            }))
        );
    }, [data]);

    const revenueExpenses = useMemo(() => {
        return (
            data &&
            data[0]?.monthlyData.map(({ month, revenue, expenses }) => ({
                name: month.substring(0, 3),
                revenue: revenue,
                expenses: expenses.toFixed(2),
            }))
        );
    }, [data]);

    const revenueProfit = useMemo(() => {
        return (
            data &&
            data[0]?.monthlyData.map(({ month, revenue, expenses }) => ({
                name: month.substring(0, 3),
                revenue: revenue,
                profit: (revenue - expenses).toFixed(2),
            }))
        );
    }, [data]);

    console.log("Formatted revenue:", revenue);
    console.log("Formatted revenueExpenses:", revenueExpenses);
    console.log("Formatted revenueProfit:", revenueProfit);

    return (
        <>
            <DashboardBox gridArea="a">
                <BoxHeader
                    title="Revenue and Expenses"
                    subtitle="Top line represents revenue, bottom line represents expenses."
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpenses}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="colorRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="colorExpenses"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={palette.secondary[300]}
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.secondary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke={palette.primary.main}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke={palette.secondary.main}
                            fillOpacity={1}
                            fill="url(#colorExpenses)"
                        />
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="b">
                <BoxHeader
                    title="Profit and Revenue"
                    subtitle="Top line represents revenue, bottom line represents profit."
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={400}
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="profit"
                            stroke={palette.primary.main}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke={palette.secondary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="c">
                <BoxHeader
                    title="Revenue Month by Month"
                    subtitle="Bar chart representing revenue month by month."
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={400}
                        data={revenue}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -10,
                            bottom: 58,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="revenue"
                            fill={palette.secondary.main}
                        />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    );
};

export default Row1;
