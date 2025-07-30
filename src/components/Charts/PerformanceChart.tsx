import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { date: 'Jan', impressions: 4000, clicks: 240, conversions: 24 },
  { date: 'Feb', impressions: 3000, clicks: 180, conversions: 18 },
  { date: 'Mar', impressions: 5000, clicks: 300, conversions: 35 },
  { date: 'Apr', impressions: 4500, clicks: 270, conversions: 28 },
  { date: 'May', impressions: 6000, clicks: 360, conversions: 42 },
  { date: 'Jun', impressions: 5500, clicks: 330, conversions: 38 }
];

export function PerformanceChart() {
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-glass-border">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>
          Monthly performance metrics across all campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="impressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(266, 100%, 65%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(266, 100%, 65%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="clicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(200, 100%, 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(200, 100%, 60%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="conversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(266, 100%, 75%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(266, 100%, 75%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 15.9%)" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(240 5% 64.9%)', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(240 3.7% 15.9%)' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(240 5% 64.9%)', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(240 3.7% 15.9%)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="impressions" 
                stroke="hsl(266, 100%, 65%)" 
                fill="url(#impressions)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stroke="hsl(200, 100%, 60%)" 
                fill="url(#clicks)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="hsl(266, 100%, 75%)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(266, 100%, 75%)', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}