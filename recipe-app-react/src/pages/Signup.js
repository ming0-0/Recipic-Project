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
    username: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      // This part is modified for robust error handling
      if (!response.ok) {
        // First, get the raw text of the response.
        const errorText = await response.text();
        let errorMessage = '회원가입에 실패했습니다.'; // Default error message

        // Only try to parse JSON if there's text to parse.
        if (errorText) {
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            // If the text isn't valid JSON, use the raw text as the error message.
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }
      console.log('회원가입 성공!');
      navigate('/login');

    } catch (error) {
      console.error('회원가입 오류:', error);
      alert(error.message);
    }
  };

  const handleSocialLogin = (provider) => {
    // For social login, you would typically redirect to the backend endpoint
    // Example: window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    console.log(`${provider}로 시작하기`);
  };

  // ... rest of your component remains the same
  return (
      <div className="form-container">
        <div className="form-wrapper">
          <button onClick={() => navigate(-1)} className="close-button" title="뒤로가기">
            &times;
          </button>
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="이름" value={formValues.username} onChange={handleChange} required />
            <input name="email" type="email" placeholder="이메일 주소" value={formValues.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="비밀번호" value={formValues.password} onChange={handleChange} required />
            <button type="submit">회원가입</button>
          </form>
          <div className="divider"><span>또는</span></div>
          <div className="social-login">
            <button type="button" className="btn-social btn-kakao" onClick={() => handleSocialLogin('kakao')} aria-label="카카오로 시작하기">
              <RiKakaoTalkFill />
            </button>
            <button type="button" className="btn-social btn-naver" onClick={() => handleSocialLogin('naver')} aria-label="네이버로 시작하기">
              <SiNaver />
            </button>
            <button type="button" className="btn-social btn-google" onClick={() => handleSocialLogin('google')} aria-label="구글로 시작하기">
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