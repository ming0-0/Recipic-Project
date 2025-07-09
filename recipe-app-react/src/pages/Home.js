import React from 'react';
import homeVideo from '../assets/video/home.mp4';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={homeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
      <div className="home-content">
        <h1>
          <span>세상의 모든 레시피</span>
          <span className="brand-name">Recipic</span>
        </h1>
        <p>
          당신만의 특별한 레시피를 공유하고, 전 세계의 요리들을 만나보세요. 짧은
          동영상(릴스)으로 생생한 레시피를 즐길 수도 있습니다.
        </p>
        <div className="home-buttons">
          <Link to="/recipes" className="btn-primary">레시피 보러가기</Link>
          <Link to="/signup" className="btn-secondary">시작하기</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
