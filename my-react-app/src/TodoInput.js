import React, { useState } from 'react';
import { useTodos, ACTIONS } from './context/TodoContext'; // useTodos 훅과 ACTIONS를 임포트

function TodoInput() {
  const [name, setName] = useState('');
  const { dispatch } = useTodos(); // Context에서 dispatch 함수만 가져옵니다.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return; // 빈 값은 추가하지 않음
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName(''); // 입력 필드 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="새 할 일 추가" />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoInput;