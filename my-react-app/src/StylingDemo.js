import React from 'react';
// 1. CSS-in-JS를 위한 styled-components 임포트
import styled from 'styled-components';
// 2. CSS 모듈을 위한 파일 임포트
import styles from './StylingDemo.module.css';

// 3. styled-components를 사용한 컴포넌트 생성
//    - `styled.태그종류` 뒤에 백틱(``)으로 CSS 코드를 작성합니다.
//    - 이 자체로 하나의 리액트 컴포넌트가 됩니다.
const StyledButton = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;

  /* props를 기반으로 동적 스타일링도 가능합니다. */
  ${props => props.primary && `
    background-color: #ff69b4;
  `}

  /* &:hover 같은 가상 클래스도 지원합니다. */
  &:hover {
    background-color: #282c34;
  }
`;

function StylingDemo() {
  // 4. 인라인 스타일을 위한 JavaScript 객체
  //    - CSS 속성은 camelCase(예: border-bottom -> borderBottom)로 작성합니다.
  const inlineStyle = {
    color: 'orange',
    borderBottom: '2px solid orange',
    paddingBottom: '5px'
  };

  return (
    <div>
      <h2>컴포넌트 스타일링 방법</h2>

      <h3 style={inlineStyle}>1. 인라인(Inline) 스타일</h3>

      <h3 className={styles.title}>2. CSS 모듈(CSS Modules)</h3>

      <h3>3. Styled-components (CSS-in-JS)</h3>
      <StyledButton>기본 버튼</StyledButton>
      <StyledButton primary>Primary 버튼</StyledButton>
    </div>
  );
}

export default StylingDemo;