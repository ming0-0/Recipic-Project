import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './RecipeDetailPage.css';
// 중앙에서 관리되는 레시피 데이터를 가져옵니다.
import { dummyRecipes } from '../data/recipes';

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  
  // recipeId는 문자열이므로 숫자로 변환하여 비교합니다.
  const recipe = dummyRecipes.find(r => r.id === parseInt(recipeId));

  if (!recipe) {
    return (
      <div className="recipe-not-found">
        <h2>레시피를 찾을 수 없습니다.</h2>
        <p>요청하신 레시피가 존재하지 않거나 삭제되었습니다.</p>
        <Link to="/recipes" className="btn-back">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail-container">
      <button onClick={() => navigate(-1)} className="btn-back-floating" title="뒤로가기">
        &larr;
      </button>
      <img src={recipe.thumbnail} alt={recipe.title} className="recipe-detail-image" />
      <div className="recipe-detail-content">
        <h1 className="recipe-detail-title">{recipe.title}</h1>
        <p className="recipe-detail-author">by {recipe.author}</p>
        <p className="recipe-detail-description">{recipe.description}</p>
        
        <div className="recipe-detail-actions">
          <button className="btn-action">레시피 저장</button>
          <button className="btn-action btn-secondary">만들어보기</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;