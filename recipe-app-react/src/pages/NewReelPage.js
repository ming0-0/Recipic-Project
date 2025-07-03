import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewReelPage.css';

const NewReelPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      // 브라우저에서 비디오 파일을 미리 볼 수 있도록 URL을 생성합니다.
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 앱에서는 이 데이터를 서버로 전송하여 저장합니다.
    console.log({ title, description, video });
    alert('릴스가 등록되었습니다! (실제 기능은 구현되지 않았습니다)');
    navigate('/reels'); // 등록 후 릴스 페이지로 이동
  };

  return (
    <div className="new-reel-container">
      <form onSubmit={handleSubmit} className="new-reel-form">
        <h2>새로운 릴스 등록</h2>
        
        <div className="form-group">
          <label htmlFor="title">릴스 제목</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">릴스 설명</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="video">동영상 업로드 (MP4, WebM...)</label>
          <input id="video" type="file" accept="video/*" onChange={handleVideoChange} required />
        </div>

        {videoPreview && (
          <div className="video-preview-container">
            <p>동영상 미리보기</p>
            <video src={videoPreview} controls className="video-preview" />
          </div>
        )}
        
        <button type="submit" className="submit-btn">릴스 등록하기</button>
      </form>
    </div>
  );
};

export default NewReelPage;