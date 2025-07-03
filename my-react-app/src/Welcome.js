// React 라이브러리를 불러옵니다.
// JSX(JavaScript XML) 문법을 사용하기 위해서는 이 구문이 반드시 필요함.
// JSX는 HTML처럼 보이지만, 실제로는 JavaScript로 변환되어 실행됩니다.
import React from 'react';

// 함수 컴포넌트는 첫 번째 인자로 'props' 객체를 받습니다.
// 이 props 객체 안에는 부모 컴포넌트가 전달한 모든 속성들이 키값 쌍으로 들어있습니다.
// 여기서는 { name }과 같이 구조 분해 할당(destructuring assignment)을 사용하여
// props 객체에서 'name' 속성만 바로 추출해서 사용해야 합니다.
function Welcome({name}) {
    // 이 컴포넌트가 화면에 보여줄 UI 요소를 반환(return)합니다.
    // 여기서 h1 태그를 반환하고 있습니다.
    // JSX 안에서 JavaScript 변수나 표현식을 사용하려면 중괄호({})로 감싸야 합니다.
    return <h1>안녕하세요, {name}님!</h1>;
}

// 다른 파일에서 이 welcome 컴포넌트를 import 해서 사용할 수 있도록 내보냅니다
// 'default' 키워드는 이 파일에서 기본적으로 내보내는 것이 welcome 함수라는 것을 의미합니다.

export default Welcome;
