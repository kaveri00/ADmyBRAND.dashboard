import { useState } from 'react';
import { KPICard } from './KPICard';
import { DeviceChart } from './Charts/DeviceChart';
import { RegionsChart } from './Charts/RegionsChart';
import { PerformanceChart } from './Charts/PerformanceChart';
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
  Calendar,
  Download
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('7d');

  const kpiData = [
    {
      title: 'Total Users',
      value: '24,576',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Revenue',
      value: '$89,432',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Impressions',
      value: '1.2M',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.8%',
      changeType: 'negative' as const,
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">ADmyBRAND</h1>
                  <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
                </div>
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
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2 animate-fade-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">
                Here's what's happening with your brand this {timeRange === '1d' ? 'day' : timeRange === '7d' ? 'week' : 'month'}.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                Live Data
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={kpi.title}
              {...kpi}
              className={`animate-fade-up delay-${(index + 1) * 100}`}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="animate-fade-up delay-300">
            <DeviceChart />
          </div>
          <div className="animate-fade-up delay-400">
            <RegionsChart />
          </div>
        </div>

        {/* Performance Chart */}
        <div className="animate-fade-up delay-500">
          <PerformanceChart />
        </div>

        {/* Quick Insights */}
        <div className="grid gap-6 md:grid-cols-3 animate-fade-up delay-600">
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
        </div>
      </main>
    </div>
  );
}