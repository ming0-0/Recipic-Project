import React from 'react';
import { Link } from 'react-router-dom';
import './ChefCard.css';

const ChefCard = ({ chef }) => {
  return (
    <Link to={`/chef/${chef.name}`} className="chef-card-link">
      <div className="chef-card">
        <img src={chef.profileImage} alt={`${chef.name} 프로필`} className="chef-card-image" />
        <div className="chef-card-info">
          <h3 className="chef-card-name">{chef.name}</h3>
          <p className="chef-card-specialty">{chef.specialty}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChefCard;

