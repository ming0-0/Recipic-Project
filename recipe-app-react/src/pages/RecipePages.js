import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipesPage.css';
import { dummyRecipes } from '../data/recipes';

const RecipesPage = () => {
  const [inputValue, setInputValue] = useState(''); // 사용자가 입력하는 값을 실시간으로 관리
  const [searchTerm, setSearchTerm] = useState(''); // 엔터 키를 눌렀을 때 확정된 검색어
  const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리, '전체'를 기본값으로
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const recipesPerPage = 6; // 페이지 당 보여줄 레시피 수

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

  // 필터나 검색어가 변경될 때, 페이지를 1로 리셋합니다.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // 카테고리 목록을 동적으로 생성합니다. '전체'를 맨 앞에 추가합니다.
  const categories = ['전체', ...new Set(dummyRecipes.map(recipe => recipe.category))];

  const filteredRecipes = dummyRecipes.filter(recipe => {
    // 카테고리 필터링 조건: '전체'가 선택되었거나, 레시피의 카테고리가 선택된 카테고리와 일치하는 경우
    const categoryMatch = selectedCategory === '전체' || recipe.category === selectedCategory;
    // 검색어 필터링 조건
    const searchMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // 페이지네이션 계산
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className="recipes-page-container">
      <div className="recipes-header">
        <div>
          <h1>레시피 목록</h1>
          <p>전 세계의 다양한 요리법을 만나보세요.</p>
        </div>
        <Link to="/recipes/new" className="btn-new-recipe">새 레시피 등록</Link>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="레시피를 검색하세요..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>

      <div className="recipe-grid">
        {currentRecipes.length > 0 ? (
          currentRecipes.map(recipe => (
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
          // 사용자가 필터링(검색 또는 카테고리 선택)을 시도했으나 결과가 없을 때 메시지를 표시합니다.
          (searchTerm || selectedCategory !== '전체') && <p className="no-results">조건에 맞는 레시피가 없습니다.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`pagination-button ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
