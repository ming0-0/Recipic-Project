import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dummyProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = dummyProducts.find(p => p.id === parseInt(productId));

  const [quantity, setQuantity] = useState(1);
  // 상품 데이터가 로드된 후 mainImage의 초기 상태를 설정합니다.
  const [mainImage, setMainImage] = useState(product?.imageUrl);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>상품을 찾을 수 없습니다.</h2>
        <p>요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
        <Link to="/store" className="btn-primary">스토어로 돌아가기</Link>
      </div>
    );
  }

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`${product.name} ${quantity}개를 장바구니에 담았습니다!`);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate('/checkout');
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-main">
        <div className="product-images">
          <div className="image-gallery">
            {product.imageGallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} 갤러리 이미지 ${index + 1}`}
                className={mainImage === img ? 'thumbnail active' : 'thumbnail'}
                onMouseOver={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} className="main-image" />
          </div>
        </div>
        <div className="product-purchase-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-short-desc">{product.description}</p>
          <p className="product-price">{product.price.toLocaleString()}원</p>
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="total-price-section">
            <span>총 상품 금액</span>
            <span className="total-price">{(product.price * quantity).toLocaleString()}원</span>
          </div>
          <div className="action-buttons">
            <button className="btn-buy-now" onClick={handleBuyNow}>바로 구매</button>
            <button className="btn-add-to-cart-detail" onClick={handleAddToCart}>장바구니</button>
          </div>
        </div>
      </div>
      <div className="product-long-description">
        <h2>상품 상세 정보</h2>
        <p>{product.longDescription}</p>
        {/* 상품 상세 이미지를 갤러리처럼 보여줄 수도 있습니다. */}
        <div className="description-gallery">
          {product.imageGallery.map((img, index) => (
            <img key={index} src={img} alt={`상세 이미지 ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

