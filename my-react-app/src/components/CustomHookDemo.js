import React, { useState, useEffect } from 'react';

/**
 * 1. 커스텀 훅(Custom Hook) 정의
 * - 커스텀 훅은 'use'로 시작하는 이름의 함수입니다.
 * - 컴포넌트 내부의 반복되는 로직(예: 데이터 가져오기, 구독 설정)을 별도의 함수로 추출하여 재사용할 수 있게 해줍니다.
 * - 여기서는 브라우저 창의 너비를 추적하는 `useWindowWidth` 훅을 만듭니다.
 */
const useWindowWidth = () => {
  // 'width'라는 상태(state)를 만들고, 초기값으로 현재 창의 너비를 설정합니다.
  const [width, setWidth] = useState(window.innerWidth);

  // useEffect를 사용하여 컴포넌트가 화면에 처음 렌더링될 때 이벤트 리스너를 설정합니다.
  useEffect(() => {
    // 창 크기가 변경될 때마다 width state를 업데이트하는 함수입니다.
    const handleResize = () => setWidth(window.innerWidth);

    // 'resize' 이벤트가 발생할 때마다 handleResize 함수를 호출하도록 리스너를 추가합니다.
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 화면에서 사라질 때(unmount) 이벤트 리스너를 정리(clean-up)합니다.
    // 이렇게 하지 않으면 메모리 누수가 발생할 수 있어 매우 중요한 부분입니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 의존성 배열을 빈 값으로 두면, 이 effect는 처음 마운트될 때 한 번만 실행됩니다.

  // 최종적으로 계산된 너비 값을 반환합니다.
  return width;
};

// 2. 위에서 만든 커스텀 훅을 사용하는 컴포넌트
const CustomHookDemo = () => {
  // 커스텀 훅을 일반 함수처럼 호출하여 현재 창의 너비를 가져옵니다.
  const width = useWindowWidth();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h2>커스텀 훅(Custom Hook) 예제</h2>
      <p>이 컴포넌트는 `useWindowWidth`라는 커스텀 훅을 사용하여 브라우저 창의 너비를 실시간으로 추적합니다.</p>
      <p>현재 창 너비: <strong>{width}px</strong></p>
      <p>브라우저 창 크기를 조절해보세요!</p>
    </div>
  );
};

export default CustomHookDemo;

