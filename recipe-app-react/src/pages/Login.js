import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // The login function from your cookie-based AuthContext
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // ✅ Call the login function from AuthContext.
      // It handles the API call and updates the global user state.
      // The browser automatically saves the HttpOnly cookie.
      await login(formValues);

      // If login is successful, navigate to the intended page.
      navigate(from, { replace: true });

    } catch (err) {
      // If the login function in the context throws an error (e.g., 401 response)
      setError('로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요.');
      console.error('Login failed:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    // This logic remains the same. Redirect to the backend OAuth2 endpoint.
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
      <div className="form-container">
        <div className="form-wrapper">
          <button onClick={() => navigate(-1)} className="close-button" title="뒤로가기">
            &times;
          </button>
          <h2>로그인</h2>
          <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="아이디" value={formValues.username} onChange={handleChange} required />
            <input name="password" type="password" placeholder="비밀번호" value={formValues.password} onChange={handleChange} required />
            {error && <p className="form-error">{error}</p>}
            <button type="submit">로그인</button>
          </form>
          <div className="divider"><span>또는</span></div>
          <div className="social-login">
            <button type="button" className="btn-social btn-kakao" onClick={() => handleSocialLogin('kakao')} aria-label="카카오로 로그인">
              <RiKakaoTalkFill />
            </button>
            <button type="button" className="btn-social btn-naver" onClick={() => handleSocialLogin('naver')} aria-label="네이버로 로그인">
              <SiNaver />
            </button>
            <button type="button" className="btn-social btn-google" onClick={() => handleSocialLogin('google')} aria-label="구글로 로그인">
              <FcGoogle />
            </button>
          </div>
          <p>
            계정이 없으신가요?{' '}
            <Link to="/signup" className="form-link" replace>회원가입</Link>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;