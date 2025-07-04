import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, subtotal, shippingFee, totalAmount, cartCount, addOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cartCount === 0) {
    return (
      <div className="checkout-container">
        <div className="cart-empty">
          <h2>주문할 상품이 없습니다.</h2>
          <p>스토어에서 마음에 드는 상품을 담아보세요!</p>
          <button onClick={() => navigate('/store')} className="btn-primary">
            스토어로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    // 실제 결제 API 연동 로직이 들어갈 자리입니다.
    // 여기서는 성공했다고 가정하고, 주문을 생성한 후 마이페이지로 이동합니다.
    alert('결제가 완료되었습니다! (시뮬레이션)');
    addOrder();
    navigate('/mypage'); // 주문 내역 등을 볼 수 있는 마이페이지로 이동
  };

  return (
    <div className="checkout-container">
      <h1>주문/결제</h1>
      <div className="checkout-content">
        <div className="checkout-left">
          <section className="checkout-section">
            <h2>배송지 정보</h2>
            <div className="user-info">
              <p><strong>받는 사람:</strong> {user?.name}</p>
              <p><strong>이메일:</strong> {user?.email}</p>
              <p><strong>연락처:</strong> 010-1234-5678 (수정 필요)</p>
              <p><strong>주소:</strong> 서울시 강남구 테헤란로 (수정 필요)</p>
              <button className="btn-edit-address">주소 변경</button>
            </div>
          </section>
          <section className="checkout-section">
            <h2>주문 상품 정보</h2>
            <div className="order-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.imageUrl} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-quantity">수량: {item.quantity}개</p>
                  </div>
                  <p className="order-item-price">{(item.price * item.quantity).toLocaleString()}원</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="checkout-right">
          <div className="payment-summary">
            <h2>결제 요약</h2>
            <div className="summary-row">
              <span>총 상품 금액</span>
              <span>{subtotal.toLocaleString()}원</span>
            </div>
            <div className="summary-row">
              <span>배송비</span>
              <span>{shippingFee > 0 ? `${shippingFee.toLocaleString()}원` : '무료'}</span>
            </div>
            <div className="total-amount">
              <span>최종 결제 금액</span>
              <span className="total-price">{totalAmount.toLocaleString()}원</span>
            </div>
            <button className="btn-payment" onClick={handlePayment}>
              {totalAmount.toLocaleString()}원 결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;