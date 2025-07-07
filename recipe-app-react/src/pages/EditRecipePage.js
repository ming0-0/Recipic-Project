import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyRecipes } from '../data/recipes';
import { useAuth } from '../context/AuthContext';
import './NewRecipePage.css'; // 새 레시피 작성과 동일한 스타일을 재사용합니다.

const EditRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  useEffect(() => {
    const recipeToEdit = dummyRecipes.find(r => r.id === parseInt(recipeId));
    if (recipeToEdit) {
      // 보안 검사: 레시피 작성자만 수정할 수 있도록 합니다.
      if (!user || user.name !== recipeToEdit.author) {
        alert('레시피를 수정할 권한이 없습니다.');
        navigate(`/recipes/${recipeId}`);
        return;
      }
      setRecipe(recipeToEdit);
      setTitle(recipeToEdit.title);
      setDescription(recipeToEdit.description);
      setThumbnailPreview(recipeToEdit.thumbnail);
    } else {
      alert('존재하지 않는 레시피입니다.');
      navigate('/recipes');
    }
  }, [recipeId, user, navigate]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 앱에서는 이 데이터를 서버로 보내 업데이트 API를 호출합니다.
    console.log('Recipe Updated:', {
      id: recipe.id,
      title,
      description,
      author: user.name,
      thumbnail: thumbnail ? thumbnail.name : recipe.thumbnail, // 데모를 위해 단순화
    });
    alert('레시피가 성공적으로 수정되었습니다. (실제 데이터는 변경되지 않습니다.)');
    navigate(`/recipes/${recipe.id}`);
  };

  if (!recipe) {
    return <div>레시피 정보를 불러오는 중...</div>;
  }

  return (
    <div className="new-recipe-container">
      <form onSubmit={handleSubmit} className="new-recipe-form">
        <h2>레시피 수정하기</h2>
        <div className="form-group">
          <label htmlFor="title">레시피 제목</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">레시피 설명</label>
          <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">썸네일 이미지</label>
          <input type="file" id="thumbnail" accept="image/*" onChange={handleThumbnailChange} />
        </div>
        {thumbnailPreview && (
          <div className="image-preview-container">
            <p>이미지 미리보기</p>
            <img src={thumbnailPreview} alt="썸네일 미리보기" className="image-preview" />
          </div>
        )}
        <button type="submit" className="submit-btn">수정 완료</button>
      </form>
    </div>
  );
};

export default EditRecipePage;