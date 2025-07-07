import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './RecipeDetailPage.css';
// 중앙에서 관리되는 레시피 데이터를 가져옵니다.
import { dummyRecipes } from '../data/recipes';
import {
  FaShoppingBasket,
  FaClock,
  FaListOl,
  FaBalanceScale,
  FaBookmark,
  FaRegBookmark
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipeContext';
import CommentSection from '../components/CommentSection'; // 댓글 컴포넌트 추가

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // 현재 로그인한 사용자 정보
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useSavedRecipes();
  
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

  const isSaved = isRecipeSaved(recipe.id);

  const handleSaveToggle = () => {
    if (!user) {
      alert('레시피를 저장하려면 로그인이 필요합니다.');
      navigate('/login', { state: { from: { pathname: `/recipes/${recipe.id}` } } });
      return;
    }
    if (isSaved) {
      unsaveRecipe(recipe.id);
    } else {
      saveRecipe(recipe.id);
    }
  };

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
      <header className="recipe-detail-header">
        <img src={recipe.thumbnail} alt={recipe.title} className="recipe-detail-image" />
        <div className="recipe-detail-header-content">
          <h1 className="recipe-detail-title">{recipe.title}</h1>
          <p className="recipe-detail-author">by {recipe.author}</p>
          <p className="recipe-detail-description">{recipe.description}</p>
          <div className="recipe-detail-actions">
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
        <section className="recipe-section ingredients-section">
          <h2><FaShoppingBasket /> 재료</h2>
          <div className="ingredients-container">
            <div className="ingredients-main">
              <h3>주재료</h3>
              <ul className="ingredients-list">
                {recipe.ingredients?.map(ing => (
                  <li key={ing.name}>
                    <span>{ing.name}</span>
                    <span className="amount">{ing.amount}</span>
                    {ing.productId && <Link to={`/store?search=${ing.name}`} className="btn-buy">구매</Link>}
                  </li>
                ))}
              </ul>
            </div>
            {recipe.seasonings && recipe.seasonings.length > 0 && (
              <div className="ingredients-seasonings">
                <h3>양념</h3>
                <ul className="ingredients-list">
                  {recipe.seasonings.map(season => (
                    <li key={season.name}>
                      <span>{season.name}</span>
                      <span className="amount">{season.amount}</span>
                      {season.productId && <Link to={`/store?search=${season.name}`} className="btn-buy">구매</Link>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        
        {recipe.measurementGuide && (
          <section className="recipe-section measurement-guide-section">
            <h2><FaBalanceScale /> 계량 안내</h2>
            <ul className="measurement-list">
              {recipe.measurementGuide.map(guide => (
                <li key={guide.unit}>
                  <span>{guide.unit}</span>
                  <span className="amount">{guide.amount}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="recipe-section recipe-steps-section">
          <h2><FaListOl /> 조리 순서</h2>
          <ul className="steps-list">
            {recipe.steps.map(step => (
              <li key={step.order} className="step-item">
                <span className="step-number">{step.order}</span>
                <div className="step-content">
                  <p className="step-description">{step.description}</p>
                  {step.time && <span className="step-time"><FaClock /> {step.time}</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 댓글 섹션 추가 */}
        <section className="recipe-section">
          <CommentSection recipeId={recipe.id} initialComments={recipe.comments || []} />
        </section>
      </main>
    </div>
  );
};

export default RecipeDetailPage;