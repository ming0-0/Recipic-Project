import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    shippingFee,
    totalAmount,
    FREE_SHIPPING_THRESHOLD
  } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) {
    return (
      <div className="cart-container cart-empty">
        <h2>장바구니가 비어있습니다.</h2>
        <p>스토어에서 마음에 드는 상품을 담아보세요!</p>
        <Link to="/store" className="btn-primary">스토어로 가기</Link>
      </div>
    );
  }

  const handleRemoveFromCart = (productId, productName) => {
    if (window.confirm(`'${productName}' 상품을 장바구니에서 삭제하시겠습니까?`)) {
      removeFromCart(productId);
    }
  };

  return (
    <div className="cart-container">
      <h1>장바구니</h1>
      <div className="cart-items-list">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">{item.price.toLocaleString()}원</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p className="cart-item-subtotal">
                {(item.price * item.quantity).toLocaleString()}원
              </p>
              <button className="btn-remove" onClick={() => handleRemoveFromCart(item.id, item.name)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>상품 금액</span>
          <span>{subtotal.toLocaleString()}원</span>
        </div>
        <div className="summary-row">
          <span>배송비</span>
          <span>{shippingFee > 0 ? `${shippingFee.toLocaleString()}원` : '무료'}</span>
        </div>
        {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="shipping-fee-info">
            {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}원 더 담으면 배송비 무료!
          </div>
        )}
        <div className="total-amount">
          <span>총 결제 금액</span>
          <span className="total-price">{totalAmount.toLocaleString()}원</span>
        </div>
        <button className="btn-checkout" onClick={() => navigate('/checkout')}>
          주문하기
        </button>
      </div>
    </div>
  );
};

export default CartPage;