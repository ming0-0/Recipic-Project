import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { dummyChefs } from '../data/chefs';
import { dummyRecipes } from '../data/recipes';
import { dummyReels } from '../data/reels';
import RecipeCard from '../components/RecipeCard';
import './ChefDetailPage.css';

const ChefDetailPage = () => {
  const { chefName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recipes'); // 'recipes' or 'reels'

  // URL 파라미터는 인코딩될 수 있으므로 decodeURIComponent를 사용합니다.
  const chef = dummyChefs.find(c => c.name === decodeURIComponent(chefName));

  if (!chef) {
    return (
      <div className="chef-not-found">
        <h2>셰프를 찾을 수 없습니다.</h2>
        <p>요청하신 셰프 정보가 존재하지 않습니다.</p>
        <button onClick={() => navigate('/chef')} className="btn-primary">셰프 목록으로 돌아가기</button>
      </div>
    );
  }

  const chefRecipes = dummyRecipes.filter(recipe => recipe.author === chef.name);
  const chefReels = dummyReels.filter(reel => reel.author === chef.name);

  const renderContent = () => {
    if (activeTab === 'recipes') {
      return (
        <div className="chef-content-grid">
          {chefRecipes.length > 0 ? (
            chefRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
          ) : (
            <p className="no-content">이 셰프의 레시피가 아직 없습니다.</p>
          )}
        </div>
      );
    }
    if (activeTab === 'reels') {
      return (
        <div className="chef-reels-grid">
          {chefReels.length > 0 ? (
            chefReels.map(reel => (
              // 릴스 페이지는 전체 목록을 보여주므로, 특정 릴스로 바로 이동하는 기능은
              // 릴스 페이지가 개별 릴스 ID를 지원하도록 수정해야 합니다.
              // 여기서는 간단히 릴스 목록 페이지로 이동하도록 링크합니다.
              <Link to="/reels" key={reel.id} className="chef-reel-item">
                <video src={reel.videoSrc} muted playsInline />
                <div className="chef-reel-overlay">
                  <p>{reel.title}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-content">이 셰프의 릴스가 아직 없습니다.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="chef-detail-container">
      <header className="chef-detail-header">
        <img src={chef.profileImage} alt={chef.name} className="chef-detail-profile-image" />
        <div className="chef-detail-info">
          <h1 className="chef-detail-name">{chef.name}</h1>
          <p className="chef-detail-specialty">{chef.specialty}</p>
          <p className="chef-detail-description">{chef.description}</p>
        </div>
      </header>

      <div className="chef-detail-tabs">
        <button
          className={`tab-button ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          레시피 ({chefRecipes.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          릴스 ({chefReels.length})
        </button>
      </div>

      <div className="chef-detail-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChefDetailPage;

