import React from 'react';
import TodoInput from '../TodoInput';
import TodoList from '../TodoList';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트합니다.

function Home() {
  // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.
  const navigate = useNavigate();

  // 버튼 클릭 시 실행될 함수
  const handleGoTo404 = () => {
    // navigate 함수를 호출하여 존재하지 않는 경로로 이동합니다.
    // 이 경로는 App.js의 어떤 <Route>와도 일치하지 않으므로, 최종적으로 path="*" 라우트에 의해 NotFound 컴포넌트가 렌더링됩니다.
    navigate('/this-page-does-not-exist-12345');
  };

  return (
    <div>
      <h1>홈 페이지</h1>
      <p>이곳은 애플리케이션의 첫 화면입니다.</p>
      
      <hr />

      <h2>전역 상태 관리 (Context API + useReducer) 데모</h2>
      <p>Todo 상태는 App.js의 TodoProvider를 통해 전역으로 관리됩니다.</p>
      {/*
        TodoInput과 TodoList는 App.js의 TodoProvider에 의해 전역 상태를 공유합니다.
      */}
      <TodoInput />
      <TodoList />

      <hr />

      <h2>404 페이지 테스트</h2>
      <p>아래 버튼을 클릭하면 존재하지 않는 페이지로 이동하여 404 페이지를 볼 수 있습니다.</p>
      <button onClick={handleGoTo404}>404 페이지로 이동</button>
    </div>
  );
}

export default Home;
