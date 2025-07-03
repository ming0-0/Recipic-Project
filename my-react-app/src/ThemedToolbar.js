import React from 'react';
import { useTheme } from './context/ThemeContext'; // 방금 만든 커스텀 훅을 임포트합니다.

// ThemedButton 컴포넌트: Context를 소비하여 스타일을 결정합니다.
function ThemedButton() {
  // useTheme 훅을 호출하여 ThemeContext의 현재 값(theme, toggleTheme)을 가져옵니다.
  // 이제 props를 통해 데이터를 전달받을 필요가 없습니다!
  const { theme, toggleTheme } = useTheme();

  const style = {
    backgroundColor: theme === 'dark' ? '#333' : '#EEE',
    color: theme === 'dark' ? '#FFF' : '#333',
    border: `1px solid ${theme === 'dark' ? '#FFF' : '#333'}`,
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px'
  };

  return (
    <button onClick={toggleTheme} style={style}>
      테마 변경 ({theme === 'light' ? '라이트' : '다크'} 모드)
    </button>
  );
}

// ThemedToolbar 컴포넌트: ThemedButton을 포함합니다.
export default function ThemedToolbar() {
  return (
    <div>
      <h2>Context API와 useContext 훅</h2>
      <ThemedButton />
    </div>
  );
}
