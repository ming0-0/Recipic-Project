import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipeContext';
import { dummyRecipes } from '../data/recipes';
import './Mypage.css'; // 마이페이지 전용 스타일
import './RecipesPage.css'; // 레시피 카드 스타일 재사용 (이 파일은 이미 존재한다고 가정)
import RecipeCard from '../components/RecipeCard'; // RecipeCard 컴포넌트 임포트
import OrderHistory from '../components/OrderHistory'; // 주문 내역 컴포넌트 임포트
import { FaUserCircle } from 'react-icons/fa'; // 사용자 아이콘 임포트

const MyPage = () => {
  const { user } = useAuth();
  const { savedRecipeIds } = useSavedRecipes();
  const [activeTab, setActiveTab] = useState('my-recipes'); // 탭 상태 관리

  const savedRecipes = dummyRecipes.filter(recipe => savedRecipeIds.includes(recipe.id));
  const myRecipes = user ? dummyRecipes.filter(recipe => recipe.author === user.name) : [];

  // PrivateRoute가 이미 처리하지만, 만약을 위한 안전장치
  if (!user) {
    return <p>사용자 정보를 불러오는 중입니다...</p>; // 이 부분은 PrivateRoute에 의해 거의 보이지 않습니다.
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'my-recipes':
        return (
          <section className="tab-pane">
            <h2>내가 작성한 레시피 ({myRecipes.length})</h2>
            {myRecipes.length > 0 ? (
              <div className="recipe-grid">
                {myRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="no-content-message">
                <p>아직 작성한 레시피가 없습니다.</p>
                <Link to="/recipes/new" className="btn-primary">첫 레시피 등록하기</Link>
              </div>
            )}
          </section>
        );
      case 'saved-recipes':
        return (
          <section className="tab-pane">
            <h2>저장한 레시피 ({savedRecipes.length})</h2>
            {savedRecipes.length > 0 ? (
              <div className="recipe-grid">
                {savedRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="no-content-message">
                <p>아직 저장한 레시피가 없습니다.</p>
                <Link to="/recipes" className="btn-primary">레시피 찾아보기</Link>
              </div>
            )}
          </section>
        );
      case 'order-history':
        return <OrderHistory />; // 주문 내역 컴포넌트 렌더링
      default:
        return null;
    }
  };

  return (
    <div className="mypage-container">
      <section className="user-info-section">
        <div className="user-avatar">
          <FaUserCircle size={80} />
        </div>
        <div className="user-details">
          <h1>{user.name}님, 환영합니다!</h1>
          <p>{user.email}</p>
          <button className="btn-edit-profile">프로필 수정</button>
        </div>
      </section>

      <div className="mypage-tabs">
        <button
          className={`tab-button ${activeTab === 'my-recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-recipes')}
        >
          내 레시피
        </button>
        <button
          className={`tab-button ${activeTab === 'saved-recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved-recipes')}
        >
          저장한 레시피
        </button>
        <button
          className={`tab-button ${activeTab === 'order-history' ? 'active' : ''}`}
          onClick={() => setActiveTab('order-history')}
        >
          주문 내역
        </button>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyPage;
