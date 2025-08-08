import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewRecipePage.css';

const NewRecipePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      image,
    });
    alert('레시피가 등록되었습니다! (개발자 콘솔을 확인해보세요)');
    navigate('/recipes');
  };

  return (
    <div className="new-recipe-container">
      <form onSubmit={handleSubmit} className="new-recipe-form">
        <h2>새로운 레시피 등록</h2>
        
        <div className="form-group">
          <label htmlFor="title">레시피 제목</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">레시피 설명</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="image">이미지 업로드</label>
          <input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
        </div>

        {imagePreview && (
          <div className="image-preview-container">
            <p>이미지 미리보기</p>
            <img src={imagePreview} alt="Recipe preview" className="image-preview" />
          </div>
        )}
        
        <button type="submit" className="submit-btn">레시피 등록하기</button>
      </form>
    </div>
  );
};

export default NewRecipePage;

