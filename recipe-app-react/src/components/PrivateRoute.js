import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * 로그인 상태를 확인하여 접근을 제어하는 라우트 컴포넌트입니다.
 * - 로그인 상태이면 자식 라우트(페이지)를 렌더링합니다.
 * - 비로그인 상태이면 로그인 페이지로 리디렉션하며, 원래 가려던 경로를 state에 저장합니다.
 */
const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

