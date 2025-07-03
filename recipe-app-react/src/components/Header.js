import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/images/rp1.png';
import './Header.css';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'; // 현재 페이지가 인증 관련 페이지인지 확인

  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span>
            <img src={logoImage} alt="RecipePic Logo" className="logo-image" />
          </span>
        </Link>
        <nav className="navigation">
          <Link to="/recipes" className="nav-link">
            레시피
          </Link>
          <Link to="/reels" className="nav-link">
            릴스
          </Link>
          <Link to="/store" className="nav-link">
            스토어
          </Link>
        </nav>
        <div className="auth-links">
          {isLoggedIn ? (
            <>
              <span className="welcome-message">{user?.name}님, 환영합니다!</span>
              <Link to="/mypage" className="auth-link login">내 정보</Link>
              <button onClick={handleLogout} className="auth-link signup">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link login" replace={isAuthPage}>로그인</Link>
              <Link to="/signup" className="auth-link signup" replace={isAuthPage}>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;