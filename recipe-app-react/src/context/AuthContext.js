import React, { createContext, useState, useContext } from 'react';

// 1. Context 생성: 앱 전체에 공유할 저장소(Context)를 만듭니다.
const AuthContext = createContext(null);

// 2. Provider 생성: Context의 값을 정하고, 자식 컴포넌트들에게 값을 전달하는 역할을 합니다.
export const AuthProvider = ({ children }) => {
  // useState의 초기값으로 함수를 전달하면, 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
  // localStorage에서 'isLoggedIn' 값을 읽어와 초기 상태를 설정합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  // 로그인 함수 (현재는 시뮬레이션)
  const login = (userData) => {
    // 실제로는 서버 응답 성공 시 호출됩니다.
    localStorage.setItem('isLoggedIn', 'true'); // localStorage에 로그인 상태 저장
    localStorage.setItem('user', JSON.stringify(userData)); // 사용자 정보를 JSON 문자열로 저장
    setIsLoggedIn(true);
    setUser(userData);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('isLoggedIn'); // localStorage에서 로그인 상태 제거
    localStorage.removeItem('user'); // 사용자 정보도 제거
    setIsLoggedIn(false);
    setUser(null);
  };

  // Provider가 자식들에게 전달할 값들
  const value = { isLoggedIn, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom Hook 생성: 다른 컴포넌트에서 Context 값을 쉽게 가져다 쓸 수 있도록 도와줍니다.
export const useAuth = () => {
  return useContext(AuthContext);
};
