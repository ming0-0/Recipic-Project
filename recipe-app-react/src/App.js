import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import RecipesPage from './pages/RecipePages';
import NewRecipePage from './pages/NewRecipesPage'; // 파일 이름에 's'를 추가하여 실제 파일 경로와 일치시킵니다.
import RecipeDetailPage from './pages/RecipeDetailPage'; // 상세 페이지 컴포넌트 임포트 추가
import NewReelPage from './pages/NewReelPage';
import ReelsPage from './pages/ReelsPage';
import MyPage from './pages/Mypage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Layout 안에 중첩된 라우트들 */}
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="reels" element={<ReelsPage />} />
        <Route path="recipes/:recipeId" element={<RecipeDetailPage />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="recipes/new" element={<NewRecipePage />} />
          <Route path="reels/new" element={<NewReelPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
