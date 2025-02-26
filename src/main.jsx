import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PortfolioLayout from './components/PortfolioLayout.jsx'; // Import PortfolioLayout

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="App h-full w-full"> {/* add the App class to wrap PortfolioLayout */}
        <PortfolioLayout /> {/* Render PortfolioLayout directly */}
    </div>
  </React.StrictMode>,
);