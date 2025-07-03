import React, { useState, useCallback } from 'react';

// React.memo를 사용한 자식 컴포넌트
// 이 컴포넌트는 prop가 변경될 때만 리렌더링됩니다.
const MemoizedButton = React.memo(({ onClick, children }) => {
    // 이 로그는 버튼이 리렌더링될 때만 콘솔에 출력됩니다.
    console.log(`렌더링됨 : ${children}`);
    return <button onClick={onClick} style={{margin: '5px'}}>{children}</button>
})

function OptimizationDemo() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // useCallback을 사용하지 않은 함수
    // 이 함수는 OptimizationDemo 컴포넌트가 리렌더링될 때마다 새로 생성됩니다.
    const increment = () => {
        setCount(count + 1);
    };

    // useCallback을 사용한 함수
    // 의존성 배열([])이 비어있으므로, 컴포넌트가 처음 렌더링될 때만 함수가 생성되고
    // 이후에는 계속 동일한 함수를 재사용합니다.
    const incrementWithCallback = useCallback(() => {
        setCount(c => c + 1); // 함수형 업데이트를 사용하면 의존성 배열에서 count를 제거할 수 있습니다.
    }, []);

    console.log('부모 컴포넌트(OptimizationDemo) 렌더링됨');

    return (
        <div>
            <h2>React.memo와 useCallback을 사용한 최적화 데모</h2>
            <p>
                이 예제는 불필요한 자식 컴포넌트의 리렌더링을 어떻게 방지하는지 보여줍니다. <br />
                브라우저의 개발자 도구 콘솔(F12)을 열고 확인해보세요.
            </p>

            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="여기에 입력하면 부모만 리렌더링"
            />
            <p>현재 텍스트: {text}</p>
            <hr />

            <h3>카운터: {count}</h3>

            <h4>1. useCallback 미사용</h4>
            <p>아래 버튼은 <code>text</code>를 입력할 때마다 함께 리렌더링됩니다.</p>
            <MemoizedButton onClick={increment}>카운트 증가 (useCallback 미사용)</MemoizedButton>

            <h4>2. useCallback 사용</h4>
            <p>아래 버튼은 <code>text</code>를 입력해도 리렌더링되지 않습니다.</p>
            <MemoizedButton onClick={incrementWithCallback}>카운트 증가 (useCallback 사용)</MemoizedButton>
        </div>
    );
}

export default OptimizationDemo;