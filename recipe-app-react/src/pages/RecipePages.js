import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecipePages.css';
// 중앙에서 관리되는 레시피 데이터를 가져옵니다.
import { dummyRecipes } from '../data/recipes';

const RecipesPage = () => {
  const [inputValue, setInputValue] = useState(''); // 사용자가 입력하는 값을 실시간으로 관리
  const [searchTerm, setSearchTerm] = useState(''); // 엔터 키를 눌렀을 때 확정된 검색어

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredRecipes = dummyRecipes.filter(recipe =>
    // 확정된 검색어(searchTerm)로만 필터링
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipes-page-container">
      <div className="recipes-header">
        <div>
          <h1>레시피 목록</h1>
          <p>전 세계의 다양한 요리법을 만나보세요.</p>
        </div>
        <Link to="/recipes/new" className="btn-new-recipe">새 레시피 등록</Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="메뉴 이름으로 검색하세요..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-card-link">
              <div className="recipe-card">
                <img src={recipe.thumbnail} alt={recipe.title} className="recipe-thumbnail" />
                <div className="recipe-info">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-author">by {recipe.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // 검색을 시도했고(searchTerm이 비어있지 않음) 결과가 없을 때만 메시지 표시
          searchTerm && <p className="no-results">"<strong>{searchTerm}</strong>"에 대한 검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
