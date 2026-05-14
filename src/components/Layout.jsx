import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Wrench, Film, Menu, X } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navItems = [
    { path: '/', label: 'All Tools', icon: <Wrench size={20} /> },
    { path: '/video-to-gif', label: 'Video to GIF', icon: <Film size={20} /> },
  ];

  return (
    <div className="layout">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Toolbox</h2>
          <button onClick={toggleSidebar} className="close-btn d-md-none">
            <X size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="main-content">
        <header className="topbar">
          <button onClick={toggleSidebar} className="menu-btn">
            <Menu size={24} />
          </button>
          <h1>{navItems.find(item => item.path === location.pathname)?.label || 'Toolbox'}</h1>
        </header>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
