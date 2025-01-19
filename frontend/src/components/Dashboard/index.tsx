import React from 'react';
import { Card } from '../../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type DashboardProps = {
  data: {
    buildNumber: string;
    passRate: number;
    totalScenarios: number;
    timestamp: string;
  }[];
};

const Dashboard: React.FC<DashboardProps> = ({ data = [] }) => {
  const latestBuild = data[data.length - 1] || {
    passRate: 0,
    totalScenarios: 0,
    timestamp: new Date().toISOString()
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Test Execution Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Latest Build</h3>
            <p className="text-3xl font-bold mt-2">{latestBuild.buildNumber || 'N/A'}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(latestBuild.timestamp).toLocaleString()}
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Pass Rate</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {latestBuild.passRate.toFixed(1)}%
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Total Scenarios</h3>
            <p className="text-3xl font-bold mt-2">
              {latestBuild.totalScenarios}
            </p>
          </div>
        </Card>
      </div>

      {/* Pass Rate Trend */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Pass Rate Trend</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="buildNumber" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="passRate" 
                  stroke="#10b981" 
                  name="Pass Rate %" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;