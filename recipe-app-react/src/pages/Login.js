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
    // In your backend, you used 'username', so let's match that.
    // If your backend expects 'email', you can change 'username' back to 'email'.
    username: '',
    password: '',
  });
  const [error, setError] = useState(''); // State to hold login error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const from = location.state?.from?.pathname || '/';

  // Changed to an async function to handle the API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send a POST request to your login endpoint
      const response = await fetch('http://localhost:8080/api/login', { // Using the endpoint from our previous discussion
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      // If the response is successful (e.g., status 200)
      if (response.ok) {
        const data = await response.json();

        // Use the login function from AuthContext to store the token/user data
        login(data); // Assuming your context handles the { accessToken, tokenType } object

        // Navigate to the originally intended page
        navigate(from, { replace: true });
      } else {
        // Handle login errors (e.g., 401 Unauthorized for wrong credentials)
        const errorData = await response.json();
        setError(errorData.message || '로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요.');
      }
    } catch (err) {
      // Handle network errors
      setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Login API call failed:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider}로 로그인 시도`);
    // This is where you would redirect to your backend's social login URL
    // For example: window.location.href = `/oauth2/authorization/${provider}`;
  };

  return (
      <div className="form-container">
        <div className="form-wrapper">
          <button onClick={() => navigate(-1)} className="close-button" title="뒤로가기">
            &times;
          </button>
          <h2>로그인</h2>
          <form onSubmit={handleSubmit}>
            {/* Changed name to 'username' to match the backend DTO */}
            <input name="username" type="text" placeholder="아이디" value={formValues.username} onChange={handleChange} required />
            <input name="password" type="password" placeholder="비밀번호" value={formValues.password} onChange={handleChange} required />

            {/* Display error message if login fails */}
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