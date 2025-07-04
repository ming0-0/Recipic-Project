import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 50000;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // 앱 시작 시 로컬 스토리지에서 장바구니 데이터 불러오기
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data from localStorage", error);
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    // 앱 시작 시 로컬 스토리지에서 주문 내역 데이터 불러오기
    try {
      const localData = localStorage.getItem('orders');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse orders data from localStorage", error);
      return [];
    }
  });

  // cartItems가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // orders가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item.id === product.id);
      if (exist) {
        // 이미 장바구니에 있는 상품이면 수량만 1 증가
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // 새로운 상품이면 장바구니에 추가
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 주문 관련 값들을 addOrder 함수보다 먼저 계산합니다.
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const totalAmount = subtotal + shippingFee;

  const addOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: new Date().toISOString(), // 간단한 고유 ID 생성
      date: new Date().toLocaleDateString('ko-KR'),
      items: cartItems,
      totalAmount: totalAmount, // 위에서 계산된 totalAmount를 사용
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
  };

  const value = {
    cartItems, addToCart, removeFromCart, updateQuantity, clearCart, addOrder, cartCount,
    orders,
    subtotal,
    shippingFee,
    totalAmount,
    FREE_SHIPPING_THRESHOLD
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};