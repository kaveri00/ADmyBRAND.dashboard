import { useState } from 'react';
import { motion } from 'framer-motion';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import { KPICard } from './KPICard';
import { DeviceChart } from './Charts/DeviceChart';
import { RegionsChart } from './Charts/RegionsChart';
import { PerformanceChart } from './Charts/PerformanceChart';
import { Sidebar } from './Sidebar';
import { DateRangePicker } from './DateRangePicker';
import { FilterTabs } from './FilterTabs';
import { ExportButton } from './ExportButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  LogOut, 
  Bell,
  Settings,
  Target,
  MousePointer,
  Menu
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeChannel, setActiveChannel] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const kpiData = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: '4.7%',
      change: '+0.8%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Impressions',
      value: '12.8M',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      title: 'Cost per Acquisition',
      value: '$24.50',
      change: '-12.5%',
      changeType: 'positive' as const,
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 80 : 256 }}
      >
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Track your brand performance across all channels
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {['1d', '7d', '30d', '90d'].map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                      className={timeRange === range ? 'bg-gradient-primary' : ''}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
                
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8 space-y-8">
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
                <p className="text-muted-foreground">
                  Here's what's happening with your brand this {timeRange === '1d' ? 'day' : timeRange === '7d' ? 'week' : 'month'}.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <DateRangePicker 
                  date={dateRange} 
                  onDateChange={setDateRange}
                />
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                    Live Data
                  </Badge>
                  <ExportButton />
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              activeChannel={activeChannel}
              onChannelChange={setActiveChannel}
            />
          </motion.div>

          {/* KPI Cards */}
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <KPICard {...kpi} />
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Grid */}
          <motion.div 
            className="grid gap-6 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <DeviceChart />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <RegionsChart />
            </motion.div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <PerformanceChart />
          </motion.div>

          {/* Quick Insights */}
          <motion.div 
            className="grid gap-6 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Top Campaign</CardTitle>
              <CardDescription>Best performing this {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Summer Sale 2024</span>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>
                </div>
                <div className="text-2xl font-bold">$12,543</div>
                <div className="text-xs text-muted-foreground">+23% vs last period</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Engagement Rate</CardTitle>
              <CardDescription>Across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">4.7%</div>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '47%' }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">47/100</span>
                </div>
                <div className="text-xs text-green-400">+0.3% from last {timeRange}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Next Milestone</CardTitle>
              <CardDescription>Achievement progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">25K Users</span>
                  <span className="text-xs text-muted-foreground">98%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
                <div className="text-xs text-muted-foreground">424 users remaining</div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}