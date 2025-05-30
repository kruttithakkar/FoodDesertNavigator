"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, TrendingDown, Users, MapPin, Calendar, Target } from "lucide-react"

// Sample data for the dashboard
const dashboardData = {
  all: {
    totalTracts: 13564,
    populationAffected: 23.5,
    totalPopulation: 54200000,
    affectedPopulation: 12747000,
    changeFromLastYear: -2.3,
    timeSeriesData: [
      { year: "2018", tracts: 15234, population: 26.8 },
      { year: "2019", tracts: 14892, population: 26.1 },
      { year: "2020", tracts: 14456, population: 25.4 },
      { year: "2021", tracts: 14123, population: 24.8 },
      { year: "2022", tracts: 13821, population: 24.2 },
      { year: "2023", tracts: 13564, population: 23.5 },
    ],
    interventionData: [
      { type: "Mobile Markets", count: 342, cost: 15.2, success: 78 },
      { type: "Transit Routes", count: 156, cost: 45.8, success: 65 },
      { type: "Community Gardens", count: 892, cost: 8.9, success: 82 },
      { type: "Grocery Incentives", count: 89, cost: 125.4, success: 71 },
      { type: "Corner Store Conv.", count: 234, cost: 12.3, success: 69 },
      { type: "Food Assistance", count: 567, cost: 23.7, success: 85 },
      { type: "Nutrition Education", count: 445, cost: 6.8, success: 74 },
      { type: "Delivery Co-ops", count: 178, cost: 4.2, success: 67 },
    ],
  },
  CA: {
    totalTracts: 2341,
    populationAffected: 19.2,
    totalPopulation: 8950000,
    affectedPopulation: 1718400,
    changeFromLastYear: -3.1,
    timeSeriesData: [
      { year: "2018", tracts: 2789, population: 22.8 },
      { year: "2019", tracts: 2654, population: 21.9 },
      { year: "2020", tracts: 2523, population: 21.1 },
      { year: "2021", tracts: 2445, population: 20.5 },
      { year: "2022", tracts: 2389, population: 19.8 },
      { year: "2023", tracts: 2341, population: 19.2 },
    ],
    interventionData: [
      { type: "Mobile Markets", count: 89, cost: 4.2, success: 81 },
      { type: "Transit Routes", count: 45, cost: 12.3, success: 72 },
      { type: "Community Gardens", count: 156, cost: 2.1, success: 85 },
      { type: "Grocery Incentives", count: 23, cost: 28.9, success: 75 },
      { type: "Corner Store Conv.", count: 67, cost: 3.4, success: 73 },
      { type: "Food Assistance", count: 134, cost: 6.8, success: 88 },
      { type: "Nutrition Education", count: 98, cost: 1.9, success: 79 },
      { type: "Delivery Co-ops", count: 45, cost: 1.1, success: 71 },
    ],
  },
  TX: {
    totalTracts: 2156,
    populationAffected: 28.7,
    totalPopulation: 7200000,
    affectedPopulation: 2066400,
    changeFromLastYear: -1.8,
    timeSeriesData: [
      { year: "2018", tracts: 2456, population: 31.2 },
      { year: "2019", tracts: 2389, population: 30.6 },
      { year: "2020", tracts: 2334, population: 30.1 },
      { year: "2021", tracts: 2278, population: 29.5 },
      { year: "2022", tracts: 2215, population: 29.1 },
      { year: "2023", tracts: 2156, population: 28.7 },
    ],
    interventionData: [
      { type: "Mobile Markets", count: 67, cost: 3.1, success: 75 },
      { type: "Transit Routes", count: 34, cost: 9.8, success: 62 },
      { type: "Community Gardens", count: 123, cost: 1.8, success: 79 },
      { type: "Grocery Incentives", count: 18, cost: 22.4, success: 68 },
      { type: "Corner Store Conv.", count: 45, cost: 2.1, success: 66 },
      { type: "Food Assistance", count: 98, cost: 4.9, success: 82 },
      { type: "Nutrition Education", count: 76, cost: 1.4, success: 71 },
      { type: "Delivery Co-ops", count: 34, cost: 0.8, success: 64 },
    ],
  },
  NY: {
    totalTracts: 1789,
    populationAffected: 15.3,
    totalPopulation: 6800000,
    affectedPopulation: 1040400,
    changeFromLastYear: -4.2,
    timeSeriesData: [
      { year: "2018", tracts: 2134, population: 18.9 },
      { year: "2019", tracts: 2045, population: 18.1 },
      { year: "2020", tracts: 1967, population: 17.4 },
      { year: "2021", tracts: 1898, population: 16.8 },
      { year: "2022", tracts: 1834, population: 16.1 },
      { year: "2023", tracts: 1789, population: 15.3 },
    ],
    interventionData: [
      { type: "Mobile Markets", count: 45, cost: 2.8, success: 83 },
      { type: "Transit Routes", count: 28, cost: 8.9, success: 78 },
      { type: "Community Gardens", count: 234, cost: 3.2, success: 87 },
      { type: "Grocery Incentives", count: 15, cost: 18.7, success: 81 },
      { type: "Corner Store Conv.", count: 89, cost: 4.5, success: 76 },
      { type: "Food Assistance", count: 156, cost: 7.8, success: 91 },
      { type: "Nutrition Education", count: 123, cost: 2.1, success: 82 },
      { type: "Delivery Co-ops", count: 67, cost: 1.8, success: 74 },
    ],
  },
  FL: {
    totalTracts: 1834,
    populationAffected: 26.1,
    totalPopulation: 5900000,
    affectedPopulation: 1539900,
    changeFromLastYear: -1.5,
    timeSeriesData: [
      { year: "2018", tracts: 2089, population: 28.4 },
      { year: "2019", tracts: 2023, population: 27.9 },
      { year: "2020", tracts: 1978, population: 27.3 },
      { year: "2021", tracts: 1923, population: 26.9 },
      { year: "2022", tracts: 1876, population: 26.5 },
      { year: "2023", tracts: 1834, population: 26.1 },
    ],
    interventionData: [
      { type: "Mobile Markets", count: 56, cost: 2.9, success: 77 },
      { type: "Transit Routes", count: 23, cost: 6.7, success: 59 },
      { type: "Community Gardens", count: 167, cost: 2.3, success: 80 },
      { type: "Grocery Incentives", count: 12, cost: 15.8, success: 69 },
      { type: "Corner Store Conv.", count: 34, cost: 1.8, success: 65 },
      { type: "Food Assistance", count: 89, cost: 4.2, success: 84 },
      { type: "Nutrition Education", count: 67, cost: 1.2, success: 72 },
      { type: "Delivery Co-ops", count: 23, cost: 0.6, success: 63 },
    ],
  },
}

const regions = [
  { value: "all", label: "All Regions" },
  { value: "CA", label: "California" },
  { value: "TX", label: "Texas" },
  { value: "NY", label: "New York" },
  { value: "FL", label: "Florida" },
]

interface DashboardProps {
  className?: string
}

export default function Dashboard({ className }: DashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const currentData = dashboardData[selectedRegion as keyof typeof dashboardData]

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const chartConfig = {
    tracts: {
      label: "Food Desert Tracts",
      color: "hsl(var(--chart-1))",
    },
    population: {
      label: "Population Affected (%)",
      color: "hsl(var(--chart-2))",
    },
  }

  const interventionChartConfig = {
    count: {
      label: "Number of Interventions",
      color: "hsl(var(--chart-3))",
    },
    success: {
      label: "Success Rate (%)",
      color: "hsl(var(--chart-4))",
    },
  }

  return (
    <div className={`space-y-6 p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Food Desert Dashboard</h1>
          <p className="text-muted-foreground">Monitor food access trends and intervention effectiveness</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Updated: December 2023</span>
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="region-select" className="text-sm font-medium">
          Filter by Region:
        </label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Food Desert Tracts</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.totalTracts.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {currentData.changeFromLastYear < 0 ? (
                <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={currentData.changeFromLastYear < 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(currentData.changeFromLastYear)}%
              </span>
              <span className="ml-1">from last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Population Affected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.populationAffected}%</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(currentData.affectedPopulation)} of {formatNumber(currentData.totalPopulation)} people
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Interventions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentData.interventionData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across {currentData.interventionData.length} strategy types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                currentData.interventionData.reduce((sum, item) => sum + item.success, 0) /
                  currentData.interventionData.length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Intervention effectiveness</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Food Desert Trends Over Time</CardTitle>
            <CardDescription>Changes in food desert tracts and affected population</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="tracts"
                    stroke="var(--color-tracts)"
                    strokeWidth={2}
                    name="Food Desert Tracts"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="population"
                    stroke="var(--color-population)"
                    strokeWidth={2}
                    name="Population Affected (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Interventions Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Interventions by Type</CardTitle>
            <CardDescription>Number of active interventions and their success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={interventionChartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.interventionData} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} fontSize={12} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="count"
                    fill="var(--color-count)"
                    name="Number of Interventions"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="success"
                    fill="var(--color-success)"
                    name="Success Rate (%)"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Intervention Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Intervention Strategy Details</CardTitle>
          <CardDescription>Comprehensive overview of intervention strategies and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Strategy Type</th>
                  <th className="text-right p-2">Count</th>
                  <th className="text-right p-2">Total Cost ($M)</th>
                  <th className="text-right p-2">Success Rate</th>
                  <th className="text-right p-2">Cost per Success</th>
                </tr>
              </thead>
              <tbody>
                {currentData.interventionData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{item.type}</td>
                    <td className="text-right p-2">{item.count}</td>
                    <td className="text-right p-2">${item.cost}M</td>
                    <td className="text-right p-2">
                      <Badge
                        variant={item.success >= 80 ? "default" : item.success >= 70 ? "secondary" : "destructive"}
                      >
                        {item.success}%
                      </Badge>
                    </td>
                    <td className="text-right p-2">
                      ${((item.cost * 1000000) / (item.count * (item.success / 100))).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
