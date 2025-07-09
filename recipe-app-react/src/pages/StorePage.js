import React from 'react';
import { Link } from 'react-router-dom';
import { dummyProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import './StorePage.css';

const StorePage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Link의 기본 동작(페이지 이동)을 막습니다.
    e.stopPropagation(); // 이벤트가 부모 Link 요소로 전파되는 것을 막습니다.
    addToCart(product);
    alert(`${product.name} 상품을 장바구니에 담았습니다!`);
  };

  return (
    <div className="store-page-container">
      <div className="store-header">
        <h1>스토어</h1>
        <p>셰프의 선택, 프리미엄 주방용품과 식재료를 만나보세요.</p>
      </div>

      <div className="product-grid">
        {dummyProducts.map(product => (
          <Link to={`/store/${product.id}`} key={product.id} className="product-card-link">
            <div className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price.toLocaleString()}원</p>
                <button
                  className="btn-add-to-cart"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StorePage;