import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import './ToolsList.css';

const ToolsList = () => {
  const tools = [
    {
      id: 'video-to-gif',
      title: 'וידאו ל-GIF',
      description: 'המרת קבצי MP4 ווידאו אחרים ל-GIF באיכות גבוהה ישירות בדפדפן, ללא העלאה לשרת.',
      icon: <Film size={32} className="tool-icon" />,
      path: '/video-to-gif',
      color: 'var(--accent-primary)'
    }
  ];

  return (
    <div className="tools-list-container">
      <div className="tools-header">
        <h2>הכלים הזמינים</h2>
        <p>בחר כלי מהרשימה מטה כדי להתחיל. כל העיבוד מתבצע מקומית בדפדפן שלך לפרטיות מירבית וביצועים מהירים.</p>
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
              <span>פתח כלי</span>
              <span className="arrow">←</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsList;
