import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Search, X } from 'lucide-react';

type Step = {
  keyword: string;
  name: string;
  status: string;
  duration: number;
  errorMessage?: string;
};

type Scenario = {
  name: string;
  status: string;
  steps: Step[];
  totalDuration: number;
};

type Feature = {
  name: string;
  tags: string[];
  scenarios: Scenario[];
};

type BuildDetailsProps = {
  build: {
    buildNumber: string;
    timestamp: string;
    summary: {
      passRate: number;
      totalScenarios: number;
      totalDuration: number;
    };
    features: Feature[];
  };
};

const BuildDetails: React.FC<BuildDetailsProps> = ({ build }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSlowestScenarios, setShowSlowestScenarios] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      build.features.flatMap(feature => feature.tags)
    )
  ).sort();

  // Filter tags based on search query
  const filteredTags = allTags.filter(tag => 
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get 10 slowest scenarios
  const slowestScenarios = build.features
    .flatMap(feature =>
      feature.scenarios.map(scenario => ({
        ...scenario,
        featureName: feature.name,
        tags: feature.tags
      }))
    )
    .sort((a, b) => b.totalDuration - a.totalDuration)
    .slice(0, 10);

  // Filter features based on selected tags
  const filteredFeatures = build.features.filter(feature =>
    selectedTags.length === 0 || selectedTags.some(tag => feature.tags.includes(tag))
  );

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchQuery('');
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{build.buildNumber}</h2>
        <p className="text-gray-500">
          {new Date(build.timestamp).toLocaleString()}
        </p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Filter by Tags</label>
          <div className="flex flex-wrap gap-2 items-start">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tags..."
                className="pl-8 pr-4 py-2 w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <div className="absolute w-64 mt-1 max-h-48 overflow-y-auto bg-white border rounded-md shadow-lg">
                  {filteredTags.map(tag => (
                    <div
                      key={tag}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-blue-600"
                    onClick={() => removeTag(tag)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <button
            className={`px-4 py-2 rounded-md ${
              showSlowestScenarios 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
            onClick={() => setShowSlowestScenarios(!showSlowestScenarios)}
          >
            {showSlowestScenarios ? "Show All Scenarios" : "Show 10 Slowest Scenarios"}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Pass Rate</h3>
            <p className="text-3xl font-bold text-emerald-600">
              {build.summary.passRate.toFixed(1)}%
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Total Scenarios</h3>
            <p className="text-3xl font-bold">
              {build.summary.totalScenarios}
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Duration</h3>
            <p className="text-3xl font-bold">
              {(build.summary.totalDuration / 1000000000).toFixed(1)}s
            </p>
          </div>
        </Card>
      </div>

      {/* Slowest Scenarios Section */}
      {showSlowestScenarios && slowestScenarios.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">10 Slowest Scenarios</h3>
          {slowestScenarios.map((scenario, index) => (
            <Card key={`${scenario.featureName}-${scenario.name}-${index}`}>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{scenario.featureName}</p>
                    <p className="text-gray-600">{scenario.name}</p>
                    <div className="flex gap-2 mt-2">
                      {scenario.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {(scenario.totalDuration / 1000000000).toFixed(2)}s
                    </p>
                    <p className="text-sm text-gray-500">
                      {scenario.steps.length} steps
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Features Section */}
      {!showSlowestScenarios && filteredFeatures.map(feature => (
        <Card key={feature.name}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <div className="flex gap-1">
                {feature.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {feature.scenarios.map((scenario, scenarioIndex) => (
                <div 
                  key={`${scenario.name}-${scenarioIndex}`} 
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-semibold">{scenario.name}</p>
                    <p className="text-sm">
                      {(scenario.totalDuration / 1000000000).toFixed(2)}s
                    </p>
                  </div>
                  {scenario.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="ml-4 text-sm mt-2">
                      <p className={step.status === 'failed' ? 'text-red-600' : 'text-emerald-600'}>
                        {step.keyword} {step.name}
                        <span className="ml-2 text-gray-500">
                          ({(step.duration / 1000000000).toFixed(2)}s)
                        </span>
                      </p>
                      {step.status === 'failed' && step.errorMessage && (
                        <p className="text-red-500 ml-4 mt-1 font-mono text-xs">
                          {step.errorMessage}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BuildDetails;