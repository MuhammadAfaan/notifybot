import React, { useState, useEffect } from 'react';
import { format, subDays, addDays, parse, startOfMonth, endOfMonth, isWithinInterval, isSameDay } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { 
  Calendar as CalendarIcon, 
  FilterIcon, 
  PlusCircle, 
  HelpCircle,
  LineChart as LineChartIcon,
  ChevronDown
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const generateDataForDateRange = (startDate: Date, endDate: Date) => {
  let currentDate = new Date(startDate);
  const data = [];
  
  while (currentDate <= endDate) {
    const dateKey = currentDate.getTime();
    const created = 5 + Math.floor((dateKey % 17) / 3) + Math.floor(dateKey % 11);
    const fulfilled = Math.max(2, Math.floor(created * 0.7));
    const canceled = Math.max(0, Math.floor(created * 0.15));
    
    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      created,
      fulfilled,
      canceled
    });
    
    currentDate = addDays(currentDate, 1);
  }
  
  return data;
};

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (startDate && endDate) {
      const newData = generateDataForDateRange(startDate, endDate);
      setAnalyticsData(newData);
    }
  }, [startDate, endDate]);
  
  const dateRanges = [
    { label: 'Last 7 Days', startDate: subDays(new Date(), 7), endDate: new Date() },
    { label: 'Last 30 Days', startDate: subDays(new Date(), 30), endDate: new Date() },
    { label: 'This Month', startDate: startOfMonth(new Date()), endDate: new Date() }
  ];
  
  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
    
    toast({
      title: "Date range selected",
      description: `${format(startDate, 'PPP')} to ${format(endDate, 'PPP')}`,
    });
  };
  
  const handleFilterClick = () => {
    setCalendarOpen(false);
    toast({
      title: "Filters applied",
      description: `Data filtered from ${startDate ? format(startDate, 'MMMM d, yyyy') : 'start'} to ${endDate ? format(endDate, 'MMMM d, yyyy') : 'end'}`,
    });
  };

  const formatDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM dd');
  };

  const getPercentageChange = (dataKey: 'created' | 'fulfilled' | 'canceled') => {
    if (analyticsData.length < 2) return 0;
    
    const currentValue = analyticsData[analyticsData.length - 1][dataKey];
    const previousValue = analyticsData[analyticsData.length - 2][dataKey];
    
    if (previousValue === 0) return currentValue > 0 ? 100 : 0;
    
    const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
    return Math.round(percentageChange);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">{entry.name}: </span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Welcome to NotifyBot</h1>
          <p className="text-gray-500">Monitor your order status and device connections</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto justify-between gap-2 border border-gray-300 bg-white"
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon size={16} className="text-gray-500" />
                  <span className="text-sm">
                    {startDate ? format(startDate, 'yyyy-MM-dd') : ''} to {endDate ? format(endDate, 'yyyy-MM-dd') : 'Select'}
                  </span>
                </div>
                <ChevronDown size={14} className="text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-2 border-b border-gray-200">
                {dateRanges.map((range, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
                    onClick={() => handleDateRangeSelect(range.startDate, range.endDate)}
                  >
                    {range.label}
                  </div>
                ))}
              </div>
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
                }}
                numberOfMonths={1}
              />
              <div className="flex justify-end p-2 border-t border-gray-200">
                <Button size="sm" onClick={handleFilterClick}>
                  Apply Range
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            onClick={handleFilterClick}
            className="bg-[#3D4A2D] hover:bg-[#4E5B3E] text-white"
          >
            <FilterIcon size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

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
            <div className="text-3xl font-bold">
              {analyticsData.length > 0 ? analyticsData[analyticsData.length - 1].created : 0}
            </div>
            <div className={`text-xs ${getPercentageChange('created') >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {getPercentageChange('created') >= 0 ? '+' : ''}{getPercentageChange('created')}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="bg-green-100 p-1 rounded">
                <LineChartIcon size={16} className="text-green-500" />
              </div>
              Order Fulfillments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {analyticsData.length > 0 ? analyticsData[analyticsData.length - 1].fulfilled : 0}
            </div>
            <div className={`text-xs ${getPercentageChange('fulfilled') >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {getPercentageChange('fulfilled') >= 0 ? '+' : ''}{getPercentageChange('fulfilled')}%
            </div>
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
            <div className="text-3xl font-bold">
              {analyticsData.length > 0 ? analyticsData[analyticsData.length - 1].canceled : 0}
            </div>
            <div className={`text-xs ${getPercentageChange('canceled') <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {getPercentageChange('canceled') >= 0 ? '+' : ''}{getPercentageChange('canceled')}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Day by Day Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {analyticsData.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData.map(item => ({
                    ...item,
                    date: formatDateString(item.date)
                  }))}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#56B155" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#56B155" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorFulfilled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorCanceled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="created" 
                    name="Created"
                    stroke="#56B155" 
                    fillOpacity={1}
                    fill="url(#colorCreated)" 
                    activeDot={{ r: 5 }}
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="fulfilled" 
                    name="Fulfilled"
                    stroke="#0EA5E9" 
                    fillOpacity={1}
                    fill="url(#colorFulfilled)"
                    activeDot={{ r: 5 }}
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="canceled" 
                    name="Canceled"
                    stroke="#EF4444" 
                    fillOpacity={1}
                    fill="url(#colorCanceled)"
                    activeDot={{ r: 5 }}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available for the selected period
            </div>
          )}
        </CardContent>
      </Card>

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
