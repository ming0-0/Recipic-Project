import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    name: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 정보:', formValues);
    // TODO: 여기에 실제 회원가입 API 호출 로직을 추가합니다.

    // 회원가입 성공 후, 바로 로그인 처리
    const userData = { name: formValues.name, email: formValues.email };
    login(userData);
    navigate('/'); // 홈으로 이동
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider}로 시작하기`);
    // 여기에 각 소셜 로그인 API 연동 로직을 추가합니다.
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <button onClick={() => navigate(-1)} className="close-button" title="뒤로가기">
          &times;
        </button>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="이름" value={formValues.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="이메일 주소" value={formValues.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="비밀번호" value={formValues.password} onChange={handleChange} required />
          <button type="submit">회원가입</button>
        </form>
        <div className="divider"><span>또는</span></div>
        <div className="social-login">
          <button type="button" className="btn-social btn-kakao" onClick={() => handleSocialLogin('카카오')} aria-label="카카오로 시작하기">
            <RiKakaoTalkFill />
          </button>
          <button type="button" className="btn-social btn-naver" onClick={() => handleSocialLogin('네이버')} aria-label="네이버로 시작하기">
            <SiNaver />
          </button>
          <button type="button" className="btn-social btn-google" onClick={() => handleSocialLogin('구글')} aria-label="구글로 시작하기">
            <FcGoogle />
          </button>
        </div>
        <p>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="form-link" replace>로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
