import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css'; // 카드 전용 CSS 파일 임포트

// 이 컴포넌트는 레시피 카드 UI를 책임집니다.
const RecipeCard = ({ recipe }) => {
  return (
    // Link 컴포넌트가 카드 전체를 감싸도록 구조 변경
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      <div className="recipe-card-image-wrapper">
        <img src={recipe.thumbnail} alt={recipe.title} className="recipe-card-image" />
      </div>
      <div className="recipe-card-content">
        {/* 카테고리 정보 추가 */}
        {recipe.category && <p className="recipe-card-category">{recipe.category}</p>}
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-author">by {recipe.author}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;