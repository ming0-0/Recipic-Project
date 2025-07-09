import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import RecipesPage from './pages/RecipePages';
import NewRecipePage from './pages/NewRecipesPage';
import EditRecipePage from './pages/EditRecipePage'; // 수정 페이지 추가
import RecipeDetailPage from './pages/RecipeDetailPage'; // 상세 페이지
import NewReelPage from './pages/NewReelPage';
import ReelsPage from './pages/ReelsPage';
import StorePage from './pages/StorePage'; // 스토어 페이지
import CartPage from './pages/CartPage'; // 장바구니 페이지
import CheckoutPage from './pages/CheckoutPage'; // 결제 페이지
import MyPage from './pages/Mypage';
import PrivateRoute from './components/PrivateRoute';
import { SavedRecipeProvider } from './context/SavedRecipeContext';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';

function App() {
  return (
    <SavedRecipeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Layout 안에 중첩된 라우트들 */}
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="reels" element={<ReelsPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="store/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="recipes/:recipeId" element={<RecipeDetailPage />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="recipes/new" element={<NewRecipePage />} />
            <Route path="recipes/:recipeId/edit" element={<EditRecipePage />} /> {/* 수정 페이지 라우트 추가 */}
            <Route path="reels/new" element={<NewReelPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Route>
      </Routes>
    </SavedRecipeProvider>
  );
}

export default App;
