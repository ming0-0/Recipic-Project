// useState Hook을 사용하기 위해 react에서 불러옵니다
import React, {useState} from 'react';

// Counter 컴포넌트를 선언합니다.
function Counter() {
    // 'count'라는 새로운 state 변수를 선언합니다.
    // useState는 [현재 state 값, state를 업데이트하는 함수] 형태의 배열을 반환합니다.
    // 여기서는 count의 초기값을 0으로 설정했습니다.
    const [count, setCount] = useState(0);
    
    // 버튼 클릭 시 호출될 함수입니다.
    const increment = () => {
        // setCount 함수를 호출하여 count state를 업데이트합니다.
        // 이전 count 값에 1을 더한 값으로 설정합니다.
        // 이 함수가 호출되면, 리액트는 컴포넌트를 리렌더링하고 화면에 새로운 count 값을 표시합니다.
        setCount(count + 1);
    };
    
    // 컴포넌트가 렌더링할 JSX입니다.
    return (
        <div>
            <h2>카운터</h2>
            {/* 현재 count state 값을 화면에 표시합니다. */}
            <p>현재 숫자: {count}</p>
            {/* 버튼 클릭 시 increment 함수가 실행되도록 onClick 이벤트 핸들러를 설정합니다. */}
            <button onClick={increment}>증가</button>
            <button onClick={() => setCount(count - 1)}>감소</button>
        </div>
    );
}

export default Counter;