import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  const isReelsPage = location.pathname === '/reels';
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <Header />
      {/* 홈, 릴스 페이지일 경우 패딩이 없는 별도의 레이아웃을 적용합니다. */}
      <main className={isHomePage || isReelsPage ? '' : 'main-content'}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;