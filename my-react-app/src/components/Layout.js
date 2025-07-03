import { Outlet, Link } from "react-router-dom"; // react-router-dom에서 Outlet과 Link를 가져옵니다. Outlet은 자식 라우트 컴포넌트가 렌더링될 위치를 나타내고, Link는 페이지 이동을 위한 링크를 생성합니다.
import { useTheme } from "../context/ThemeContext"; // ThemeContext에서 useTheme 훅을 가져옵니다. 이 훅은 현재 테마 정보를 제공합니다.
import ThemedToolbar from "../ThemedToolbar"; // ThemedToolbar 컴포넌트를 가져옵니다. 이 컴포넌트는 테마 변경 버튼을 포함합니다.

const Layout = () => { // Layout 컴포넌트를 정의합니다. 이 컴포넌트는 애플리케이션의 공통 레이아웃을 구성합니다.
  const { theme } = useTheme(); // useTheme 훅을 사용하여 현재 테마 정보를 가져옵니다. theme 변수에는 현재 테마('light' 또는 'dark')가 저장됩니다.

  return (
    // useTheme 훅을 사용하기 위해 이 컴포넌트는 ThemeProvider 내부에 있어야 합니다.
    <div className={`App ${theme}-theme`}> {/* 최상위 div에 현재 테마에 따른 클래스를 적용합니다. 예를 들어, 테마가 'dark'이면 'App dark-theme' 클래스가 적용됩니다. */}
      <header> {/* 페이지 상단 헤더 영역을 정의합니다. */}
        <ThemedToolbar /> {/* 테마 변경 버튼을 렌더링합니다. */}
        <hr /> {/* 구분선을 추가합니다. */}
        <nav> {/* 네비게이션 메뉴를 정의합니다. */}
          <h3>라우팅 예제</h3> {/* 네비게이션 메뉴 제목을 표시합니다. */}
          <ul> {/* 네비게이션 링크 목록을 정의합니다. */}
            <li><Link to="/">홈</Link></li> {/* '홈' 링크를 생성합니다. 이 링크를 클릭하면 '/' 경로로 이동합니다. */}
            <li><Link to="/about">소개</Link></li> {/* '소개' 링크를 생성합니다. 이 링크를 클릭하면 '/about' 경로로 이동합니다. */}
            <li><Link to="/profile/velopert">velopert 프로필</Link></li> {/* 'velopert 프로필' 링크를 생성합니다. 이 링크를 클릭하면 '/profile/velopert' 경로로 이동합니다. */}
            <li><Link to="/profile/gildong">gildong 프로필</Link></li> {/* 'gildong 프로필' 링크를 생성합니다. 이 링크를 클릭하면 '/profile/gildong' 경로로 이동합니다. */}
            <li><Link to="/optimization">최적화 데모</Link></li> {/* '최적화 데모' 링크를 생성합니다. 이 링크를 클릭하면 '/optimization' 경로로 이동합니다. */}
            <li><Link to="/custom-hook">커스텀 훅 데모</Link></li> {/* '커스텀 훅 데모' 링크를 생성합니다. 이 링크를 클릭하면 '/custom-hook' 경로로 이동합니다. */}
          </ul>
        </nav>
      </header>
      <hr /> {/* 헤더와 본문 사이의 구분선을 추가합니다. */}
      <main> {/* 페이지의 주요 콘텐츠 영역을 정의합니다. */}
        {/* Outlet은 자식 라우트 컴포넌트가 렌더링될 위치입니다. */}
        <Outlet /> {/* 현재 URL에 매칭되는 자식 라우트 컴포넌트를 렌더링합니다. */}
      </main>
    </div>
  );
};

export default Layout; // Layout 컴포넌트를 다른 곳에서 사용할 수 있도록 export합니다.
