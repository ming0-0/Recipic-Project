import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
  // 리디렉션할 경로를 가져옵니다. state에 from이 없으면 홈('/')으로 보냅니다.
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 정보:', formValues);
    // TODO: 여기에 실제 로그인 API 호출 로직을 추가합니다.
    // 실제로는 API 응답으로 사용자 정보를 받아옵니다.
    const mockUserData = { name: '테스트유저', email: formValues.email };

    // 로그인 상태를 전역으로 업데이트하고, 원래 가려던 페이지로 이동시킵니다.
    login(mockUserData);
    navigate(from, { replace: true }); // 원래 가려던 페이지로 이동
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider}로 로그인 시도`);
    // 여기에 각 소셜 로그인 API 연동 로직을 추가합니다.
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <button onClick={() => navigate(-1)} className="close-button" title="뒤로가기">
          &times;
        </button>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="이메일 주소" value={formValues.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="비밀번호" value={formValues.password} onChange={handleChange} required />
          <button type="submit">로그인</button>
        </form>
        <div className="divider"><span>또는</span></div>
        <div className="social-login">
          <button type="button" className="btn-social btn-kakao" onClick={() => handleSocialLogin('카카오')} aria-label="카카오로 로그인">
            <RiKakaoTalkFill />
          </button>
          <button type="button" className="btn-social btn-naver" onClick={() => handleSocialLogin('네이버')} aria-label="네이버로 로그인">
            <SiNaver />
          </button>
          <button type="button" className="btn-social btn-google" onClick={() => handleSocialLogin('구글')} aria-label="구글로 로그인">
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