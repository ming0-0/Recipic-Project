import React from 'react';
import { useTodos, ACTIONS } from './context/TodoContext'; // useTodos 훅과 ACTIONS를 임포트

function TodoList() {
  const { todos, dispatch } = useTodos(); // Context에서 todos 상태와 dispatch 함수를 가져옵니다.

  return (
    <div>
      <h3>할 일 목록</h3>
      {todos.length === 0 && <p>할 일이 없습니다. 추가해보세요!</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px'
          }}>
            <span style={{ flexGrow: 1 }}>{todo.name}</span>
            <button
              onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}
              style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
            >
              {todo.completed ? '미완료' : '완료'}
            </button>
            <button
              onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}
              style={{ marginLeft: '5px', padding: '5px 10px', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none' }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
