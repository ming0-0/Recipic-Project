import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const { orders } = useCart();

  if (!orders || orders.length === 0) {
    return (
      <div className="order-history-container">
        <h2>주문 내역</h2>
        <div className="no-orders">
          <p>아직 주문 내역이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2>주문 내역</h2>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              {/* 날짜 형식을 'YYYY. MM. DD.' 형태로 변경 */}
              <h3>주문일: {new Date(order.id).toLocaleDateString('ko-KR')}</h3>
              <span>주문번호: {order.id.substring(0, 8)}</span>
            </div>
            <div className="order-card-body">
              {order.items.map(item => (
                // Link 컴포넌트로 상품을 감싸서 클릭 시 상세 페이지로 이동
                <Link to={`/store/${item.id}`} key={item.id} className="order-item-summary-link">
                  <div className="order-item-summary">
                    <img src={item.imageUrl} alt={item.name} className="order-item-summary-image" />
                    <div className="order-item-summary-details">
                      <p className="order-item-summary-name">{item.name}</p>
                      <p className="order-item-summary-quantity">수량: {item.quantity}개</p>
                    </div>
                    <p className="order-item-summary-price">{(item.price * item.quantity).toLocaleString()}원</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="order-card-footer">
              <strong>총 결제 금액: {order.totalAmount.toLocaleString()}원</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;