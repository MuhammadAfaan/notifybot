
import React, { useState } from 'react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { 
  Calendar,
  FilterIcon, 
  PlusCircle, 
  HelpCircle, 
  LineChart,
  BarChart2
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  Line, 
  LineChart as RechartsLineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample data for the line chart, typically this would come from API
// This is just placeholder data where actual API integration would happen
const sampleAnalyticsData = [
  { date: '2025-03-28', created: 0, fulfilled: 0, canceled: 0 },
  { date: '2025-03-29', created: 0, fulfilled: 0, canceled: 0 },
  { date: '2025-03-30', created: 0, fulfilled: 0, canceled: 0 },
  { date: '2025-03-31', created: 0, fulfilled: 0, canceled: 0 },
  { date: '2025-04-01', created: 0, fulfilled: 0, canceled: 0 },
  { date: '2025-04-02', created: 0, fulfilled: 0, canceled: 0 },
  { date: '2025-04-03', created: 0, fulfilled: 0, canceled: 0 },
];

const Dashboard = () => {
  // State for date range and filter
  const [startDate, setStartDate] = useState<Date | undefined>(new Date('2025-03-27'));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date('2025-04-03'));
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Function to handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else {
      if (date && date >= startDate) {
        setEndDate(date);
        setCalendarOpen(false);
        
        // In a real app, we would make an API call here to fetch data for the selected date range
        // fetchDataForDateRange(startDate, date);
      } else {
        setStartDate(date);
        setEndDate(undefined);
      }
    }
  };
  
  // Function to handle filter button click - would trigger data refresh based on filters
  const handleFilterClick = () => {
    // In a real app, this would apply additional filters beyond date range
    // applyFilters();
    console.log('Applying filters for date range:', startDate, endDate);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Welcome to NotifyBot</h1>
          <p className="text-gray-500">Monitor your order status and device connections</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Date Range Selector */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer">
                <span className="text-sm text-gray-600 hidden sm:inline">Showing Data For:</span>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar size={14} />
                  <span>{startDate ? format(startDate, 'yyyy-MM-dd') : ''} to {endDate ? format(endDate, 'yyyy-MM-dd') : 'Select'}</span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={startDate}
                selected={{
                  from: startDate,
                  to: endDate,
                }}
                onSelect={(range) => {
                  if (range?.from) setStartDate(range.from);
                  if (range?.to) setEndDate(range.to);
                  if (range?.to) setCalendarOpen(false);
                }}
                numberOfMonths={1}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          {/* Filter Button */}
          <Button 
            onClick={handleFilterClick}
            className="bg-notifybot-blue text-white hover:bg-notifybot-blue/90"
          >
            <FilterIcon size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="bg-blue-100 p-1 rounded">
                <PlusCircle size={16} className="text-blue-500" />
              </div>
              Order Creations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <div className="text-xs text-green-500">0%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="bg-green-100 p-1 rounded">
                <LineChart size={16} className="text-green-500" />
              </div>
              Order Fulfillments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <div className="text-xs text-green-500">0%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="bg-red-100 p-1 rounded">
                <HelpCircle size={16} className="text-red-500" />
              </div>
              Order Cancellations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <div className="text-xs text-green-500">0%</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Day by Day Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {/* This would be conditionally rendered based on whether data is available */}
          {sampleAnalyticsData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={sampleAnalyticsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-green-600">Created: {payload[0].value}</p>
                            <p className="text-sm text-blue-600">Fulfilled: {payload[1].value}</p>
                            <p className="text-sm text-red-600">Canceled: {payload[2].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="created" 
                    stroke="#56B155" 
                    activeDot={{ r: 8 }} 
                    name="Created"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fulfilled" 
                    stroke="#0EA5E9" 
                    name="Fulfilled"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="canceled" 
                    stroke="#EF4444" 
                    name="Canceled"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available for the selected period
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                  No data available in table
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
