import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BuildList from './components/BuildList';
import BuildDetails from './components/BuildDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<Dashboard data={[]} />} />
            <Route path="/builds" element={<BuildList builds={[]} />} />
            <Route path="/builds/:id" element={
              <BuildDetails build={{
                buildNumber: 'Demo Build',
                timestamp: new Date().toISOString(),
                summary: {
                  passRate: 80,
                  totalScenarios: 10,
                  totalDuration: 5000000000
                },
                features: []
              }} />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;