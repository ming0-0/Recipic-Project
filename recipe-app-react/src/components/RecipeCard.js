import React from 'react';
import { Link } from 'react-router-dom';

// 이 컴포넌트는 레시피 카드 UI를 책임집니다.
// RecipesPage.css의 .recipe-card 관련 스타일을 그대로 활용합니다.
const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card-link">
      <div className="recipe-card">
        <img src={recipe.thumbnail} alt={recipe.title} className="recipe-thumbnail" />
        <div className="recipe-info">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-author">by {recipe.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;