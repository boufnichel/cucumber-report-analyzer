import React from 'react';
import { Card } from '../../ui/Card';
import { useNavigate } from 'react-router-dom';

type Build = {
  id: string;
  buildNumber: string;
  timestamp: string;
  summary: {
    passRate: number;
    totalScenarios: number;
    passedScenarios: number;
  };
};

type BuildListProps = {
  builds: Build[];
};

const BuildList: React.FC<BuildListProps> = ({ builds = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Build History</h2>
      <div className="space-y-2">
        {builds.map(build => (
          <Card 
            key={build.id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/builds/${build.id}`)}
          >
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">{build.buildNumber}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(build.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`font-bold ${getPassRateColor(build.summary.passRate)}`}>
                    {build.summary.passRate.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">
                    {build.summary.passedScenarios}/{build.summary.totalScenarios} passed
                  </p>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const getPassRateColor = (rate: number): string => {
  if (rate >= 80) return 'text-emerald-600';
  if (rate >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export default BuildList;