import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipesPage.css';
// import { dummyRecipes } from '../data/recipes'; // ❌ We no longer need dummy data

const RecipesPage = () => {
  // --- New State ---
  const [recipes, setRecipes] = useState([]); // To store recipes from the backend
  const [loading, setLoading] = useState(true); // To show a loading indicator
  const [error, setError] = useState(null); // To display fetch errors

  // --- Existing State ---
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // We will generate categories from the fetched data
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recipes');
        if (!response.ok) {
          throw new Error('Something went wrong. Could not fetch recipes.');
        }
        const data = await response.json();
        setRecipes(data); // Set the recipes from the backend
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []); // The empty array [] means this effect runs once when the component mounts

  const handleInputChange = (event) => setInputValue(event.target.value);
  const handleSearch = () => setSearchTerm(inputValue);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // --- Dynamic Categories and Filtering ---
  // The 'category' field is not in our backend model.
  // For this example, we'll remove category filtering.
  // If you need categories, you must add a 'category' field to your backend Recipe model.

  const filteredRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Pagination ---
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  // --- Conditional Rendering ---
  if (loading) {
    return <div className="status-message">Loading recipes...</div>;
  }

  if (error) {
    return <div className="status-message error">Error: {error}</div>;
  }

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
                      {/* Use imageUrl from the backend */}
                      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-thumbnail" />
                      <div className="recipe-info">
                        <h3 className="recipe-title">{recipe.title}</h3>
                        {/* The 'author' field is not in our backend model, so it is removed. */}
                      </div>
                    </div>
                  </Link>
              ))
          ) : (
              searchTerm && <p className="no-results">조건에 맞는 레시피가 없습니다.</p>
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