import React from 'react';
import { dummyChefs } from '../data/chefs';
import ChefCard from '../components/ChefCard';
import './ChefPage.css';

const ChefPage = () => {
  return (
    <div className="chef-page-container">
      <div className="chef-page-header">
        <h1>셰프를 만나보세요</h1>
        <p>각 분야 최고의 셰프들이 당신의 주방을 특별하게 만들어 드립니다.</p>
      </div>
      <div className="chef-grid">
        {dummyChefs.map(chef => (
          <ChefCard key={chef.name} chef={chef} />
        ))}
      </div>
    </div>
  );
};

export default ChefPage;

