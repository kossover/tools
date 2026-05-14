import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import './ToolsList.css';

const ToolsList = () => {
  const tools = [
    {
      id: 'video-to-gif',
      title: 'Video to GIF',
      description: 'Convert your MP4 and other video files into high-quality GIFs instantly in your browser.',
      icon: <Film size={32} className="tool-icon" />,
      path: '/video-to-gif',
      color: 'var(--accent-primary)'
    }
  ];

  return (
    <div className="tools-list-container">
      <div className="tools-header">
        <h2>Available Tools</h2>
        <p>Select a tool below to get started. All processing is done locally in your browser for maximum privacy and speed.</p>
      </div>
      
      <div className="tools-grid">
        {tools.map(tool => (
          <Link to={tool.path} key={tool.id} className="tool-card">
            <div className="tool-icon-wrapper" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}>
              {tool.icon}
            </div>
            <div className="tool-content">
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
            <div className="tool-footer">
              <span>Open Tool</span>
              <span className="arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsList;
