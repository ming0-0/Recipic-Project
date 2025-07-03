import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

// 1. Context 생성
// createContext()의 인자는 Provider를 찾지 못했을 때 사용될 기본값입니다.
const ThemeContext = createContext(null);

// 2. Context를 쉽게 사용하기 위한 커스텀 훅 생성 (권장)
//    이 훅을 사용하면 컴포넌트에서 useContext와 ThemeContext를 직접 임포트할 필요가 없습니다.
export function useTheme() {
  return useContext(ThemeContext);
}

// 3. Provider 컴포넌트 생성
//    이 컴포넌트는 자식 컴포넌트들에게 테마 값과 테마 변경 함수를 제공합니다.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // useCallback을 사용하여 toggleTheme 함수가 컴포넌트가 리렌더링될 때마다
  // 새로 생성되는 것을 방지합니다. 의존성 배열이 비어있으므로, 이 함수는 앱 생명주기 동안 단 한 번만 생성됩니다.
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // useMemo를 사용하여 value 객체가 theme이나 toggleTheme이 변경될 때만
  // 새로 생성되도록 합니다. 이렇게 하면 Provider 하위의 불필요한 리렌더링을 방지하여 성능을 최적화할 수 있습니다.
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
