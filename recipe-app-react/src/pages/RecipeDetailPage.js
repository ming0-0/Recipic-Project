import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './RecipeDetailPage.css';
import {
  FaShoppingBasket, FaClock, FaListOl, FaBalanceScale, FaBookmark, FaRegBookmark
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipeContext';
import CommentSection from '../components/CommentSection';
import api from "../auth/api";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // The currently logged-in user from AuthContext
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useSavedRecipes();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error(`Recipe not found or server error.`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <div className="recipe-detail-container status-message">Loading...</div>;
  }

  if (error) {
    return (
        <div className="recipe-not-found">
          <h2>레시피를 찾을 수 없습니다.</h2>
          <p>{error}</p>
          <Link to="/recipes" className="btn-back">목록으로 돌아가기</Link>
        </div>
    );
  }

  if (!recipe) {
    return null;
  }

  // ✅ KEY CHANGE: Check if the logged-in user is the author of the recipe.
  const isAuthor = user && recipe.user && user.id === recipe.user.id;
  const isSaved = isRecipeSaved(recipe.id);

  const handleSaveToggle = () => { /* ... existing code ... */ };
  const handleDelete = async () => {
    // 1. Confirm the user's intent before deleting
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        setLoading(true);
        // 2. Use the 'api' instance to send the DELETE request
        await api.delete(`/api/recipes/${recipeId}`);
        // 3. On success, show a message and redirect
        alert('Recipe deleted successfully.');
        navigate('/recipes');

      } catch (err) {
        // 4. Handle errors returned from the API
        setError(err.message);
        alert('Failed to delete recipe. You may not be the author or a server error occurred.');
      } finally {
        // 5. Stop the loading indicator regardless of outcome
        setLoading(false);
      }
    }
  };

  return (
      <div className="recipe-detail-container">
        <button onClick={() => navigate(-1)} className="btn-back-floating" title="뒤로가기">
          &larr;
        </button>
        <header className="recipe-detail-header">
          <img src={recipe.imageUrl} alt={recipe.title} className="recipe-detail-image" />
          <div className="recipe-detail-header-content">
            <h1 className="recipe-detail-title">{recipe.title}</h1>

            {/* ✅ KEY CHANGE: Display the author's name from the fetched recipe data */}
            {recipe.user && <p className="recipe-detail-author">by {recipe.user.username}</p>}

            <p className="recipe-detail-description">{recipe.description}</p>
            <div className="recipe-detail-actions">

              {/* ✅ KEY CHANGE: Conditionally render buttons based on 'isAuthor' */}
              {isAuthor ? (
                  <>
                    <button className="btn-action btn-secondary" onClick={() => navigate(`/recipes/${recipe.id}/edit`)}>수정하기</button>
                    <button className="btn-action btn-danger" onClick={handleDelete}>삭제하기</button>
                  </>
              ) : (
                  <button className="btn-action" onClick={handleSaveToggle}>
                    {isSaved ? <><FaBookmark /> 저장 취소</> : <><FaRegBookmark /> 레시피 저장</>}
                  </button>
              )}
            </div>
          </div>
        </header>

        <main className="recipe-detail-body">
          {/* ... The rest of your JSX ... */}
          <section className="recipe-section">
            <CommentSection recipeId={recipe.id} initialComments={recipe.comments || []} />
          </section>
        </main>
      </div>
  );
};

export default RecipeDetailPage;