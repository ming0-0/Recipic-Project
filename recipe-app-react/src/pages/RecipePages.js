import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipesPage.css';
import { dummyRecipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

const RecipesPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const categories = ['전체', ...new Set(dummyRecipes.map(recipe => recipe.category))];

  const filteredRecipes = dummyRecipes.filter(recipe => {
    const categoryMatch = selectedCategory === '전체' || recipe.category === selectedCategory;
    const searchMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

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
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
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
