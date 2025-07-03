import React, { useState, useEffect } from 'react';

function EffectDemo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [time, setTime] = useState(new Date());

  // 1. 컴포넌트가 마운트될 때 한 번만 실행되는 효과 (componentDidMount 역할)
  useEffect(() => {
    console.log('✅ Effect 1: 컴포넌트가 마운트되었습니다.');
    // 초기 데이터 로딩 등
    // 예: 가상의 API 호출
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        setData(json);
        console.log('✅ Effect 1: 데이터 로딩 완료:', json.title);
      });

    // 클린업 함수: 컴포넌트 언마운트 시 실행
    return () => {
      console.log('❌ Effect 1: 컴포넌트가 언마운트됩니다.');
    };
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  // 2. count 값이 변경될 때마다 실행되는 효과 (componentDidUpdate 역할)
  useEffect(() => {
    console.log('🔄 Effect 2: count가 변경되었습니다:', count);
    // count 값에 따라 특정 로직 실행
  }, [count]); // count가 변경될 때마다 실행

  // 3. 타이머 설정 및 해제 효과 (componentDidMount + componentWillUnmount 역할)
  useEffect(() => {
    console.log('⏰ Effect 3: 타이머를 시작합니다.');
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 클린업 함수: 컴포넌트 언마운트 시 또는 다음 Effect 3 실행 전에 이전 타이머 해제
    return () => {
      console.log('🛑 Effect 3: 타이머를 정리(cleanup)합니다.');
      clearInterval(timerId);
    };
  }, []); // 빈 배열: 마운트 시 한 번만 실행되고, 언마운트 시 클린업

  return (
    <div>
      <h2>useEffect 훅 데모</h2>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>카운트 증가</button>
      <p>현재 시간: {time.toLocaleTimeString()}</p>
      <p>로딩된 데이터: {data ? data.title : '로딩 중...'}</p>
    </div>
  );
}

export default EffectDemo;

