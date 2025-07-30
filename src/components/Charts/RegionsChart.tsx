import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { region: 'North America', users: 2400, revenue: 1200 },
  { region: 'Europe', users: 1398, revenue: 900 },
  { region: 'Asia Pacific', users: 3800, revenue: 1800 },
  { region: 'Latin America', users: 800, revenue: 400 },
  { region: 'Middle East', users: 600, revenue: 300 }
];

export function RegionsChart() {
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-glass-border">
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-xs text-blue-400">
            Users: {payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-purple-400">
            Revenue: ${payload[1].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle>Top Regions</CardTitle>
        <CardDescription>
          User distribution and revenue by geographic region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 15.9%)" />
              <XAxis 
                dataKey="region" 
                tick={{ fill: 'hsl(240 5% 64.9%)', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(240 3.7% 15.9%)' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(240 5% 64.9%)', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(240 3.7% 15.9%)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="users" fill="hsl(200, 100%, 60%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="hsl(266, 100%, 65%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}