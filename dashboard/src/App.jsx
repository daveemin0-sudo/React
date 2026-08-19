import { Routes, Route, Navigate } from 'react-router-dom';
import NewPlan from './components/NewPlan.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewPlan />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
