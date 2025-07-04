import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './RecipeDetailPage.css';
// 중앙에서 관리되는 레시피 데이터를 가져옵니다.
import { dummyRecipes } from '../data/recipes';
import { useAuth } from '../context/AuthContext';

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // 현재 로그인한 사용자 정보
  
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

  const handleDelete = () => {
    // 실제 애플리케이션에서는 이 부분에서 서버에 삭제 요청 API를 호출해야 합니다.
    // 예: await api.delete(`/recipes/${recipeId}`);
    if (window.confirm('정말로 이 레시피를 삭제하시겠습니까?')) {
      console.log(`Recipe ${recipeId} deleted.`);
      alert('레시피가 삭제되었습니다. (실제 데이터는 변경되지 않습니다.)');
      // 데이터가 실제로 삭제되었다면, 사용자는 목록으로 돌아가는 것이 자연스럽습니다.
      navigate('/recipes');
    }
  };

  // 현재 로그인한 사용자가 레시피 작성자인지 확인합니다.
  const isAuthor = user && user.name === recipe.author;

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
          {isAuthor ? (
            <>
              <button className="btn-action btn-secondary">수정하기</button>
              <button className="btn-action btn-danger" onClick={handleDelete}>삭제하기</button>
            </>
          ) : (
            /* 작성자가 아닐 경우 '레시피 저장' 같은 다른 버튼을 보여줄 수 있습니다. */
            <button className="btn-action">레시피 저장</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;