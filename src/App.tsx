// App.tsx
import React from 'react';
import './App.css';
import Navbar from './components/CustomNavbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
