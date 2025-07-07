import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipeContext';
import { dummyRecipes } from '../data/recipes';
import './Mypage.css'; // 마이페이지 전용 스타일
import './RecipesPage.css'; // 레시피 카드 스타일 재사용 (이 파일은 이미 존재한다고 가정)

const MyPage = () => {
  const { user } = useAuth();
  const { savedRecipeIds } = useSavedRecipes();

  const savedRecipes = dummyRecipes.filter(recipe => savedRecipeIds.includes(recipe.id));
  const myRecipes = user ? dummyRecipes.filter(recipe => recipe.author === user.name) : [];

  // PrivateRoute가 이미 처리하지만, 만약을 위한 안전장치
  if (!user) {
    return <p>사용자 정보를 불러오는 중입니다...</p>;
  }

  return (
    <div className="mypage-container">
      <section className="user-info-section">
        <h1>내 정보</h1>
        <div className="user-info-box">
          <p><strong>이름:</strong> {user.name}</p>
          <p><strong>이메일:</strong> {user.email}</p>
        </div>
      </section>

      <section className="my-recipes-section">
        <h2>내가 작성한 레시피 ({myRecipes.length})</h2>
        {myRecipes.length > 0 ? (
          <div className="recipe-grid">
            {myRecipes.map(recipe => (
              <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card-link">
                <div className="recipe-card">
                  <img src={recipe.thumbnail} alt={recipe.title} className="recipe-thumbnail" />
                  <div className="recipe-info">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-author">by {recipe.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-recipes-message">
            아직 작성한 레시피가 없습니다. <Link to="/recipes/new">첫 레시피를 등록해보세요!</Link>
          </p>
        )}
      </section>

      <section className="saved-recipes-section">
        <h2>저장한 레시피 ({savedRecipes.length})</h2>
        {savedRecipes.length > 0 ? (
          <div className="recipe-grid">
            {savedRecipes.map(recipe => (
              <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card-link">
                <div className="recipe-card">
                  <img src={recipe.thumbnail} alt={recipe.title} className="recipe-thumbnail" />
                  <div className="recipe-info">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-author">by {recipe.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-recipes-message">
            아직 저장한 레시피가 없습니다. <Link to="/recipes">마음에 드는 레시피를 찾아보세요.</Link>
          </p>
        )}
      </section>
    </div>
  );
};

export default MyPage;
