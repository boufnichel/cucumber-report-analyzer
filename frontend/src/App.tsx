import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BuildList from './components/BuildList';
import BuildDetails from './components/BuildDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/builds" element={<BuildList />} />
          <Route path="/builds/:id" element={<BuildDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;