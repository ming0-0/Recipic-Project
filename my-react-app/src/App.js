import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'; // 라우팅 예제 페이지
import About from './pages/About'; // 라우팅 예제 페이지
import Profile from './pages/Profile'; // 라우팅 예제 페이지
import NotFound from './pages/NotFound'; // 404 페이지
import { ThemeProvider } from './context/ThemeContext'; // Context API 예제를 위한 ThemeProvider
import { TodoProvider } from './context/TodoContext'; // Todo Context API 예제를 위한 TodoProvider
import OptimizationDemo from './components/OptimizationDemo'; // 최적화 데모 컴포넌트
import CustomHookDemo from './components/CustomHookDemo'; // 커스텀 훅 데모 컴포넌트
import Layout from './components/Layout'; // 공통 레이아웃 컴포넌트

// 이전 예제 컴포넌트들 (주석 처리 또는 제거 가능)
// import Welcome from './Welcome';
// import Counter from './Counter';
// import LoginControl from './LoginControl';
// import NameForm from './NameForm';
// import ReservationForm from './ReservationForm';
// import StylingDemo from './StylingDemo';
// import EffectDemo from './EffectDemo';

function App() {
  return (
    // ThemeProvider로 전체 앱을 감싸서 하위 컴포넌트들이 테마 Context에 접근할 수 있도록 합니다.
    <ThemeProvider>
      {/*
        TodoProvider를 Routes 바깥에 배치하여, 어떤 페이지에 있든
        Todo 관련 상태가 전역적으로 유지되도록 합니다.
      */}
      <TodoProvider>
        <Routes>
          {/*
            Layout Route를 사용해 공통 UI(네비게이션, 헤더 등)를 묶습니다.
            이제 / , /about, /profile/:username 등 모든 경로에 Layout 컴포넌트가 적용됩니다.
            각 경로에 해당하는 컴포넌트(Home, About, Profile)는 Layout의 <Outlet />에 렌더링됩니다.
          */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/optimization" element={<OptimizationDemo />} />
            <Route path="/custom-hook" element={<CustomHookDemo />} />
            {/*
              모든 일치하지 않는 경로를 처리하는 404 라우트.
              이 라우트는 항상 <Routes> 내의 가장 마지막에 위치해야 합니다.
            */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
