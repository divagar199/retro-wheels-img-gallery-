import React from 'react';

// Added wikiUrl to props
const ImageCard = ({ id, title, imageUrl, description, category, wikiUrl, isCollected, onToggle }) => {
  return (
    <div className="retro-card">
      <div className="card-header">
        <span className="category-badge">{category}</span>
      </div>
      
      <div className="image-frame">
        <img src={imageUrl} alt={title} className="card-img" />
        <div className="overlay"></div>
      </div>

      <div className="card-body">
        <h3 className="retro-title">{title}</h3>
        <div className="separator"></div>
        <p className="retro-desc">{description}</p>
        
        {/* New Action Row for two buttons */}
        <div className="action-row">
          <button 
            onClick={() => onToggle(id)} 
            className={`btn-action like-btn ${isCollected ? 'active' : ''}`}
            title="Add to Garage"
          >
            {isCollected ? '♥ SAVED' : '♡ SAVE'}
          </button>

          <a 
            href={wikiUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-action wiki-btn"
            title="Read History on Wikipedia"
          >
            📖 HISTORY
          </a>
        </div>

      </div>
    </div>
  );
};

export default ImageCard;